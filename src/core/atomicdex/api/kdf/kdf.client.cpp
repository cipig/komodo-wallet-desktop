/******************************************************************************
 * Copyright © 2013-2024 The Komodo Platform Developers.                      *
 *                                                                            *
 * See the AUTHORS, DEVELOPER-AGREEMENT and LICENSE files at                  *
 * the top-level directory of this distribution for the individual copyright  *
 * holder information and the developer policies on copyright and licensing.  *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * Komodo Platform software, including this file may be copied, modified,     *
 * propagated or distributed except according to the terms contained in the   *
 * LICENSE file                                                               *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

#include <filesystem>
#include <meta/detection/detection.hpp>
#include "kdf.hpp"
#include "atomicdex/api/kdf/rpc.hpp"
#include "kdf.client.hpp"
#include "rpc.tx.history.hpp"
#include "atomicdex/constants/dex.constants.hpp"
#include "atomicdex/api/kdf/rpc_v1/rpc.my_tx_history.hpp"
#include "atomicdex/api/kdf/rpc_v2/rpc2.get_public_key.hpp"
#include "atomicdex/api/kdf/rpc_v2/rpc2.my_tx_history.hpp"
#include "atomicdex/api/kdf/rpc_v2/rpc2.orderbook.hpp"
#include "atomicdex/api/kdf/rpc_v2/rpc2.bestorders.hpp"
#include "atomicdex/api/kdf/rpc_v2/rpc2.enable_tendermint_token.hpp"
#include "atomicdex/api/kdf/rpc_v2/rpc2.enable_tendermint_with_assets.hpp"
#include "atomicdex/api/kdf/rpc_v2/rpc2.enable_erc20.hpp"
#include "atomicdex/api/kdf/rpc_v2/rpc2.enable_eth_with_tokens.hpp"

namespace
{
    template <typename T>
    using have_error_field = decltype(std::declval<T&>().error.has_value());

    t_http_client generate_client()
    {
        atomic_dex::http::client_config cfg;
        return t_http_client(atomic_dex::g_dex_rpc, cfg);
    }

    template <atomic_dex::kdf::rpc Rpc>
    t_http_request make_request(typename Rpc::expected_request_type data_req = {})
    {
        t_http_request request;
        nlohmann::json json_req = {{"method", Rpc::endpoint}, {"userpass", atomic_dex::kdf::get_rpc_password()}};
        nlohmann::json json_data;

        nlohmann::to_json(json_data, data_req);
        request.set_method(http_method::POST);
        if (Rpc::is_v2)
        {
            json_req["mmrpc"] = "2.0";
            json_req["id"] = 42;
            json_req.push_back({"params", json_data});
        }
        else
        {
            json_req.insert(json_req.end(), json_data);
        }
        request.set_body(json_req.dump());
        // SPDLOG_DEBUG("request: {}", json_req.dump());
        return request;
    }

    template <atomic_dex::kdf::rpc Rpc>
    Rpc process_rpc_answer(const t_http_response& answer)
    {
        std::string body = (answer.extract_string(true).get());
        nlohmann::json json_answer;
        Rpc rpc;

        if (!body.empty() && nlohmann::json::accept(body))
        {
            try
            {
                json_answer = nlohmann::json::parse(body);
            }
            catch (const nlohmann::json::parse_error& error)
            {
                SPDLOG_ERROR("exception in process_rpc_answer parsing: {}", error.what());
                return rpc;
            }
        }
        else
        {
            SPDLOG_DEBUG("process_rpc_answer: Plaintext or empty payload skipped structural processing (Status {})", answer.status_code());
            rpc.raw_result = body;
            return rpc;
        }

        if (Rpc::is_v2)
        {
            if (answer.status_code() == 200 && json_answer.contains("result"))
            {
                rpc.result = json_answer.at("result").get<typename Rpc::expected_result_type>();
                rpc.raw_result = json_answer.at("result").dump();
            }
            else
            {
                // Gracefully fallback instead of throwing out_of_range
                if (answer.status_code() not_eq 200) {
                    try { rpc.error = json_answer.get<typename Rpc::expected_error_type>(); } catch (...) {}
                }
                rpc.raw_result = json_answer.dump();
            }
        }
        else
        {
            try { rpc.result = json_answer.get<typename Rpc::expected_result_type>(); } catch (...) {}
        }
        return rpc;
    }
} // namespace

namespace atomic_dex::kdf
{
    template <typename RpcReturnType>
    RpcReturnType kdf_client::rpc_process_answer(const t_http_response& resp, const std::string& rpc_command)
    {
        std::string body = (resp.extract_string(true).get());
        RpcReturnType answer;

        try
        {
            if (resp.status_code() not_eq 200)
            {
                answer.rpc_result_code = resp.status_code();
                answer.raw_result      = body;

                // Only attempt logic if it's metadata-detectable and valid JSON
                if constexpr (doom::meta::is_detected_v<have_error_field, RpcReturnType>)
                {
                    if constexpr (std::is_same_v<std::optional<std::string>, decltype(answer.error)>)
                    {
                        // Check if the body contains valid JSON without throwing exceptions
                        if (!body.empty() && nlohmann::json::accept(body))
                        {
                            auto json_data = nlohmann::json::parse(body);
                            if (json_data.contains("error") && json_data.at("error").is_string())
                            {
                                answer.error = json_data.at("error").get<std::string>();
                            }
                            else
                            {
                                answer.error = body;
                            }
                        }
                        else
                        {
                            // It's plain text (like "Not Found") or empty, assign directly
                            answer.error = body.empty() ? "HTTP Status " + std::to_string(resp.status_code()) : body;
                        }
                    }
                }

                //SPDLOG_DEBUG("kdf_client::rpc_process_answer: gracefully handled status {} for command {}", resp.status_code(), rpc_command);
                return answer;
            }

            auto json_answer       = nlohmann::json::parse(body);
            answer.rpc_result_code = resp.status_code();
            answer.raw_result      = body;
            from_json(json_answer, answer);
        }
        catch (const std::exception& error)
        {
            answer.rpc_result_code = -1;
            answer.raw_result      = error.what();
            SPDLOG_ERROR("exception in kdf_client::rpc_process_answer for rpc_command {} with body {} and answer.raw_result: {}", rpc_command, body, answer.raw_result);
        }

        return answer;
    }

    async::task<t_http_response>
    kdf_client::async_rpc_batch_standalone(nlohmann::json&& batch_array, t_http_priority prio)
    {
        auto& scheduler = (prio == t_http_priority::background)
                          ? atomic_dex::http::client::get_background_scheduler()
                          : atomic_dex::http::client::get_interactive_scheduler();

        return async::spawn(scheduler, [batch_array = std::move(batch_array), prio]() mutable {
            try
            {
                t_http_request request;
                request.set_method(http_method::POST);
                request.set_body(batch_array.dump());
                auto resp = generate_client().request(request, prio);
                return resp.get();
            }
            catch (const std::exception& error)
            {
                nlohmann::json masked_batch = batch_array;
                for (auto& item : masked_batch) {
                    if (item.contains("userpass")) {
                        item["userpass"] = "*******";
                    }
                }
                SPDLOG_ERROR("exception in kdf_client::async_rpc_batch_standalone: {} | Request payload: {}", error.what(), masked_batch.dump());
                throw;
            }
        });
    }

    template <rpc Rpc>
    void kdf_client::process_rpc_async(const std::function<void(Rpc)>& on_rpc_processed, t_http_priority prio)
    {
        using request_type = typename Rpc::expected_request_type;
        process_rpc_async<Rpc>(request_type{}, on_rpc_processed, prio);
    }

    template <kdf::rpc Rpc>
    void kdf_client::process_rpc_async(typename Rpc::expected_request_type request, const std::function<void(Rpc)>& on_rpc_processed, t_http_priority prio)
    {
        auto http_request = make_request<Rpc>(request);

        auto& scheduler = (prio == t_http_priority::background)
                          ? atomic_dex::http::client::get_background_scheduler()
                          : atomic_dex::http::client::get_interactive_scheduler();

        generate_client()
            .request(http_request, prio)
            .then(scheduler, [on_rpc_processed, request](const t_http_response& resp)
            {
                try
                {
                    auto rpc = process_rpc_answer<Rpc>(resp);
                    rpc.request = request;
                    on_rpc_processed(rpc);
                    nlohmann::json json_data;
                    nlohmann::to_json(json_data, request);
                }
                catch (const std::exception& ex)
                {
                    SPDLOG_ERROR("exception in kdf_client::process_rpc_async: {}", ex.what());
                }
            });
    }

    template void kdf_client::process_rpc_async<orderbook_rpc>(const std::function<void(orderbook_rpc)>&, t_http_priority);
    template void kdf_client::process_rpc_async<bestorders_rpc>(const std::function<void(bestorders_rpc)>&, t_http_priority);
    template void kdf_client::process_rpc_async<enable_erc20_rpc>(const std::function<void(enable_erc20_rpc)>&, t_http_priority);
    template void kdf_client::process_rpc_async<get_public_key_rpc>(const std::function<void(get_public_key_rpc)>&, t_http_priority);
    template void kdf_client::process_rpc_async<my_tx_history_v1_rpc>(const std::function<void(my_tx_history_v1_rpc)>&, t_http_priority);
    template void kdf_client::process_rpc_async<my_tx_history_v2_rpc>(const std::function<void(my_tx_history_v2_rpc)>&, t_http_priority);
    template void kdf_client::process_rpc_async<enable_eth_with_tokens_rpc>(const std::function<void(enable_eth_with_tokens_rpc)>&, t_http_priority);
    template void kdf_client::process_rpc_async<enable_tendermint_token_rpc>(const std::function<void(enable_tendermint_token_rpc)>&, t_http_priority);
    template void kdf_client::process_rpc_async<enable_tendermint_with_assets_rpc>(const std::function<void(enable_tendermint_with_assets_rpc)>&, t_http_priority);

    template <typename TRequest, typename TAnswer>
    TAnswer
    kdf_client::process_rpc(TRequest&& request, std::string rpc_command, bool is_v2)
    {
        nlohmann::json json_data = kdf::template_request(rpc_command, is_v2);
        kdf::to_json(json_data, request);
        auto json_copy        = json_data;
        json_copy["userpass"] = "*******";

        t_http_request rpc_request(http_method::POST);
        rpc_request.headers().set_content_type(("application/json"));
        rpc_request.set_body(json_data.dump());
        auto resp = generate_client().request(rpc_request).get();
        return rpc_process_answer<TAnswer>(resp, rpc_command);
    }

    t_enable_z_coin_cancel_answer
    kdf_client::rpc_enable_z_coin_cancel(t_enable_z_coin_cancel_request&& request)
    {
        return process_rpc<t_enable_z_coin_cancel_request, t_enable_z_coin_cancel_answer>(std::forward<t_enable_z_coin_cancel_request>(request), "task::enable_z_coin::cancel", true);
    }

    t_disable_coin_answer
    kdf_client::rpc_disable_coin(t_disable_coin_request&& request)
    {
        return process_rpc<t_disable_coin_request, t_disable_coin_answer>(std::forward<t_disable_coin_request>(request), "disable_coin");
    }

    t_recover_funds_of_swap_answer
    kdf_client::rpc_recover_funds(t_recover_funds_of_swap_request&& request)
    {
        return process_rpc<t_recover_funds_of_swap_request, t_recover_funds_of_swap_answer>(
            std::forward<t_recover_funds_of_swap_request>(request), "recover_funds_of_swap");
    }

    void kdf_client::abort_all_tasks()
    {
        try
        {
            generate_client().close();
        }
        catch (...) {}
    }
} // namespace atomic_dex

template atomic_dex::kdf::tx_history_answer   atomic_dex::kdf::kdf_client::rpc_process_answer(const t_http_response& resp, const std::string& rpc_command);
template atomic_dex::kdf::disable_coin_answer atomic_dex::kdf::kdf_client::rpc_process_answer(const t_http_response& resp, const std::string& rpc_command);
