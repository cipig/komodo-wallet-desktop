#include "atomicdex/api/kdf/generic.error.hpp"

namespace atomic_dex::kdf
{
    void from_json(const nlohmann::json& j, generic_answer_error& res)
    {
        //! Tolerate missing fields: KDF omits some of them for some errors, and
        //! a throw here leaves the answer with neither error nor result.
        const auto text = [&j](const char* key) -> std::string
        {
            if (!j.contains(key) || j.at(key).is_null())
            {
                return {};
            }
            const auto& value = j.at(key);
            return value.is_string() ? value.get<std::string>() : value.dump();
        };
        res.error       = text("error");
        res.error_path  = text("error_path");
        res.error_trace = text("error_trace");
        res.error_type  = text("error_type");
        res.error_data  = j.contains("error_data") ? j.at("error_data") : nlohmann::json{};
    }
} // namespace atomic_dex::kdf