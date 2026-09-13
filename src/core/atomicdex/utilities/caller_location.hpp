#pragma once

#if __has_include(<source_location>)
#  include <source_location>
   namespace atomic_dex::utils {
       using caller_location = std::source_location;
   }
#else
   namespace atomic_dex::utils {
       // Fallback structure for older macOS Xcode compilers
       struct caller_location {
           const char* file;
           int line;
           const char* func;
           static constexpr caller_location current() { return { "unknown", 0, "unknown" }; }
           constexpr const char* file_name() const { return file; }
           constexpr const char* function_name() const { return func; }
           constexpr int line() const { return line; }
       };
   }
#endif
