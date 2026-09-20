//
// Created by Sztergbaum Roman on 12/03/2021.
//

#include <boost/algorithm/string/replace.hpp>
#include "atomicdex/utilities/safe.float.hpp"

t_float_50
safe_float(const std::string& from) 
{
    try
    {
        if (from.empty())
        {
            return t_float_50(0);
        }
        t_float_50 out(boost::algorithm::replace_all_copy(from, ",", "."));
        return out;
    }
    catch (const std::exception& error)
    {
        SPDLOG_ERROR("exception caught when creating a floating point number from {}: {}", from, error.what());
        return t_float_50(0);
    }
}
