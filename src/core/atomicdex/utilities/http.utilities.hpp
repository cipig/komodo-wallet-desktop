#pragma once

#include <exception>
#include <memory>

#include <async++.h>
#include <cpprest/http_client.h>

#ifndef _TURN_OFF_PLATFORM_STRING
#   define _TURN_OFF_PLATFORM_STRING
#endif

#ifdef _WIN32
#    define TO_STD_STR(ws_str) utility::conversions::to_utf8string(ws_str)
#    define FROM_STD_STR(utf8str) utility::conversions::to_string_t(utf8str)
#else
#    define TO_STD_STR(ws_str) ws_str
#    define FROM_STD_STR(utf8str) utf8str
#endif

using t_http_client_ptr = std::unique_ptr<web::http::client::http_client>;
using t_http_client     = web::http::client::http_client;
using t_http_request    = web::http::http_request;

void handle_exception_async_task(std::exception_ptr exception);
