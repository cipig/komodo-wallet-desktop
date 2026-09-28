#include <nlohmann/json.hpp>

#include "atomicdex/api/kdf/rpc.hpp"

namespace atomic_dex::kdf
{
    //! KDF's error bodies vary: error_data is usually an object (e.g.
    //! {"ticker":"KCS","error":"..."}) and some errors omit fields. Parsing
    //! must not throw on either -- a failed parse leaves the answer with
    //! neither error nor result, which callers read as success.
    void from_json(const nlohmann::json& j, rpc_basic_error_type& in)
    {
        const auto text = [&j](const char* key) -> std::string
        {
            if (!j.contains(key) || j.at(key).is_null())
            {
                return {};
            }
            const auto& value = j.at(key);
            return value.is_string() ? value.get<std::string>() : value.dump();
        };
        in.error       = text("error");
        in.error_path  = text("error_path");
        in.error_trace = text("error_trace");
        in.error_type  = text("error_type");
        in.error_data  = text("error_data");
    }
}