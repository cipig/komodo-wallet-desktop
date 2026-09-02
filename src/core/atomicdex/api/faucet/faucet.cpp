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

#include <cpr/cpr.h>
#include <nlohmann/json.hpp>
#include "atomicdex/api/faucet/faucet.hpp"

namespace
{
    constexpr const char* g_faucet_api_endpoint = "https://faucet.gleec.com/faucet/";
    const auto            g_faucet_api_client   = std::make_unique<t_http_client>((g_faucet_api_endpoint));
} // namespace

namespace atomic_dex::faucet::api
{
    async::task<t_http_response>
    claim(const claim_request& claim_req)
    {
        return async::spawn([claim_req]() {
            t_http_request http_request;
            const auto encoded_coin_name = atomic_dex::http::materialize_std_string(cpr::util::urlEncode(claim_req.coin_name));
            const auto encoded_wallet_address = atomic_dex::http::materialize_std_string(cpr::util::urlEncode(claim_req.wallet_address));
            http_request.set_request_uri(encoded_coin_name + "/" + encoded_wallet_address);
            http_request.set_method(http_method::GET);
            return g_faucet_api_client->request(http_request).get();
        });
    }

    claim_result
    get_claim_result(const t_http_response& claim_response)
    {
        const std::string resp_body = (claim_response.extract_string(true).get());

        if (claim_response.status_code() == 200)
        {
            auto resp_body_json = nlohmann::json::parse(resp_body);
            return faucet::api::claim_result{
                .message = resp_body_json.at("result")["message"].get<std::string>(), .status = resp_body_json.at("status").get<std::string>()};
        }

        return faucet::api::claim_result{.message = resp_body, .status = "Request Error"};
    }
} // namespace atomic_dex::faucet::api
