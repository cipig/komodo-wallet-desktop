//! Deps
#include <cstdint>
#include <cpr/cpr.h>
#include <spdlog/spdlog.h>
#include <stdexcept>

//! Project Headers
#include "atomicdex/utilities/http.utilities.hpp"

namespace
{
    std::string
    build_url(const std::string& base_url, const std::string& request_uri)
    {
        if (request_uri.empty())
        {
            return base_url;
        }
        if (request_uri.rfind("http://", 0) == 0 || request_uri.rfind("https://", 0) == 0)
        {
            return request_uri;
        }

        const bool base_has_slash = !base_url.empty() && base_url.back() == '/';
        const bool uri_has_slash  = !request_uri.empty() && request_uri.front() == '/';

        if (base_has_slash && uri_has_slash)
        {
            return base_url + request_uri.substr(1);
        }
        if (!base_has_slash && !uri_has_slash)
        {
            return base_url + '/' + request_uri;
        }
        return base_url + request_uri;
    }
} // namespace

namespace atomic_dex::http
{
    void
    headers::set_content_type(std::string content_type)
    {
        m_values["Content-Type"] = std::move(content_type);
    }

    const std::unordered_map<std::string, std::string>&
    headers::values() const
    {
        return m_values;
    }

    request::request(method request_method) : m_method(request_method) {}

    void
    request::set_method(method request_method)
    {
        m_method = request_method;
    }

    void
    request::set_request_uri(std::string uri)
    {
        m_request_uri = std::move(uri);
    }

    void
    request::set_body(std::string body)
    {
        m_body = std::move(body);
    }

    http::http_headers_t&
    request::headers()
    {
        return m_headers;
    }

    const http::http_headers_t&
    request::headers() const
    {
        return m_headers;
    }

    method
    request::method() const
    {
        return m_method;
    }

    const std::string&
    request::request_uri() const
    {
        return m_request_uri;
    }

    const std::string&
    request::body() const
    {
        return m_body;
    }

    response::response(int status_code, std::string body, std::unordered_map<std::string, std::string> response_headers) :
        m_status_code(status_code), m_body(std::move(body)), m_headers(std::move(response_headers))
    {
    }

    int
    response::status_code() const
    {
        return m_status_code;
    }

    async::task<std::string>
    response::extract_string(bool) const
    {
        return async::spawn([body = m_body]() { return body; });
    }

    const std::unordered_map<std::string, std::string>&
    response::headers() const
    {
        return m_headers;
    }

    void
    client_config::set_validate_certificates(bool validate)
    {
        m_validate_certificates = validate;
    }

    void
    client_config::set_timeout(std::chrono::seconds timeout)
    {
        m_timeout = timeout;
    }

    bool
    client_config::validate_certificates() const
    {
        return m_validate_certificates;
    }

    std::chrono::seconds
    client_config::timeout() const
    {
        return m_timeout;
    }

    client::client(std::string base_url, client_config config) : m_base_url(std::move(base_url)), m_config(std::move(config)) {}

    async::task<response>
    client::request(const http::request& req) const
    {
        return async::spawn([base_url = m_base_url, config = m_config, req]() {
            const auto url = build_url(base_url, req.request_uri());
            cpr::Header cpr_headers(req.headers().values().begin(), req.headers().values().end());
            cpr::VerifySsl verify_ssl(config.validate_certificates());
            cpr::Timeout timeout(static_cast<std::int64_t>(std::chrono::duration_cast<std::chrono::milliseconds>(config.timeout()).count()));
            cpr::Response cpr_response;

            switch (req.method())
            {
            case method::post:
                cpr_response = cpr::Post(cpr::Url{url}, cpr_headers, cpr::Body{req.body()}, verify_ssl, timeout);
                break;
            case method::get:
                cpr_response = cpr::Get(cpr::Url{url}, cpr_headers, verify_ssl, timeout);
                break;
            }

            if (cpr_response.error.code != cpr::ErrorCode::OK)
            {
                throw std::runtime_error(cpr_response.error.message);
            }

            std::unordered_map<std::string, std::string> response_headers(cpr_response.header.begin(), cpr_response.header.end());
            return response{cpr_response.status_code, cpr_response.text, std::move(response_headers)};
        });
    }

    const std::string&
    client::base_url() const
    {
        return m_base_url;
    }
} // namespace atomic_dex::http

void
handle_exception_async_task(std::exception_ptr exception)
{
    try
    {
        std::rethrow_exception(exception);
    }
    catch (const std::exception& e)
    {
        SPDLOG_ERROR("exception in handle_exception_async_task: {}", e.what());
    }
}
