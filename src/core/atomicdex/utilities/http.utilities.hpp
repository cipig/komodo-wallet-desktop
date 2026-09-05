#pragma once

#include <chrono>
#include <exception>
#include <functional>
#include <memory>
#include <string>
#include <unordered_map>
#include <async++.h>

namespace atomic_dex::http
{
    template <typename StringLike>
    [[nodiscard]] inline std::string
    materialize_std_string(const StringLike& value)
    {
        return {value.data(), value.size()};
    }

    enum class verb
    {
        get,
        post
    };

    enum class priority
    {
        interactive, // Default configuration: concurrent standalone connections
        background   // Throttled: persistent worker-thread-bound sessions
    };

    namespace methods
    {
        inline constexpr verb GET  = verb::get;
        inline constexpr verb POST = verb::post;
    } // namespace methods

    namespace status_codes
    {
        inline constexpr int ok              = 200;
        inline constexpr int request_timeout = 408;
        inline constexpr int internal_error  = 500;
    } // namespace status_codes

    class headers
    {
      public:
        void set_content_type(std::string content_type);
        [[nodiscard]] const std::unordered_map<std::string, std::string>& values() const;

      private:
        std::unordered_map<std::string, std::string> m_values;
    };

    using http_headers_t = headers;

    class request
    {
      public:
        request() = default;
        explicit request(verb request_method);

        void set_method(verb request_method);
        void set_request_uri(std::string uri);
        void set_body(std::string body);

        http_headers_t&       headers();
        const http_headers_t& headers() const;

        [[nodiscard]] verb               method() const;
        [[nodiscard]] const std::string& request_uri() const;
        [[nodiscard]] const std::string& body() const;

      private:
        http::verb   m_method{methods::GET};
        std::string  m_request_uri;
        std::string  m_body;
        http_headers_t m_headers;
    };

    class response
    {
      public:
        response() = default;
        response(int status_code, std::string body, std::unordered_map<std::string, std::string> response_headers = {});

        [[nodiscard]] int status_code() const;
        [[nodiscard]] async::task<std::string> extract_string(bool) const;
        [[nodiscard]] const std::unordered_map<std::string, std::string>& headers() const;

      private:
        int                                           m_status_code{0};
        std::string                                   m_body;
        std::unordered_map<std::string, std::string> m_headers;
    };

    class client_config
    {
      public:
        void set_validate_certificates(bool validate);
        void set_timeout(std::chrono::seconds timeout);

        [[nodiscard]] bool                  validate_certificates() const;
        [[nodiscard]] std::chrono::seconds  timeout() const;

      private:
        bool                 m_validate_certificates{true};
        std::chrono::seconds m_timeout{0};
    };

    class client
    {
      public:
        explicit client(std::string base_url, client_config config = {});

        [[nodiscard]] async::task<response> request(const http::request& req, priority prio = priority::interactive) const;
        [[nodiscard]] const std::string&    base_url() const;

      private:
        std::string   m_base_url;
        client_config m_config;
        mutable async::threadpool_scheduler m_network_pool;
    };
} // namespace atomic_dex::http

using t_http_client_ptr = std::unique_ptr<atomic_dex::http::client>;
using t_http_client     = atomic_dex::http::client;
using t_http_request    = atomic_dex::http::request;
using t_http_response   = atomic_dex::http::response;
using t_http_method     = atomic_dex::http::verb;
using t_http_priority   = atomic_dex::http::priority;
namespace http_method       = atomic_dex::http::methods;
namespace http_status_codes = atomic_dex::http::status_codes;

void handle_exception_async_task(std::exception_ptr exception);
