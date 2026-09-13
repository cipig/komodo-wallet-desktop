#pragma once

#if __has_include(<source_location>)
#  include <source_location>
   namespace atomic_dex::utils {
       using caller_location = std::source_location;
   }
#else
   namespace atomic_dex::utils {
       struct caller_location {
           const char* _file;
           int         _line;
           const char* _func;

           static constexpr caller_location current() { return { "unknown", 0, "unknown" }; }

           constexpr const char* file_name() const { return _file; }
           constexpr const char* function_name() const { return _func; }
           constexpr int line() const { return _line; }
       };
   }
#endif
