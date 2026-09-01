//! Deps
#include <spdlog/spdlog.h>

//! Project Headers
#include "atomicdex/utilities/http.utilities.hpp"

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
