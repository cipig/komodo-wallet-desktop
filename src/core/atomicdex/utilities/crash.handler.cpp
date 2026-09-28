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

//! Everything reachable from a crash handler below runs in a process that is
//! already broken: the faulting thread may hold the heap lock, its stack may be
//! exhausted, and the logger's queue may never drain again. So the handlers use
//! fixed buffers and raw OS file calls only -- no spdlog, no std::string, no
//! system(). Only `note()` and the terminate handler run in normal context.

//! PCH Headers
#include "atomicdex/pch.hpp"

//! Std Headers
#include <atomic>
#include <csignal>
#include <cstdlib>
#include <cstring>
#include <cwchar>
#include <exception>
#include <iterator>
#include <string>

//! Platform Headers
#if defined(_WIN32) || defined(WIN32)
#    include <windows.h>
#    include <dbghelp.h>
#    pragma comment(lib, "dbghelp.lib")
#else
#    include <execinfo.h>
#    include <fcntl.h>
#    include <time.h>
#    include <unistd.h>
#endif

//! Project Headers
#include "atomicdex/constants/dex.constants.hpp"
#include "atomicdex/utilities/crash.handler.hpp"

namespace
{
#if defined(_WIN32) || defined(WIN32)
    using path_char = wchar_t;
#else
    using path_char = char;
#endif

    constexpr std::size_t g_path_cap = 1024;

    path_char g_report_path[g_path_cap]{};
    path_char g_dump_path[g_path_cap]{};
    path_char g_kdf_cfg_path[g_path_cap]{};
    char      g_version[128]{};

    std::atomic<std::int64_t> g_kdf_pid{0};
    std::atomic<bool>         g_kdf_cfg_set{false};
    std::atomic<bool>         g_installed{false};
    //! The first crashing thread reports; any other thread that crashes while
    //! it does is parked, since the first one ends the process anyway.
    std::atomic<bool> g_crashing{false};

    template <typename CharT>
    void
    copy_path(path_char (&dst)[g_path_cap], const std::basic_string<CharT>& src)
    {
        const std::size_t n = std::min(src.size(), g_path_cap - 1);
        for (std::size_t i = 0; i < n; ++i) { dst[i] = static_cast<path_char>(src[i]); }
        dst[n] = 0;
    }

    std::filesystem::path::string_type
    with_suffix(const std::filesystem::path& base, const char* suffix)
    {
        auto native = base.native();
        for (const char* p = suffix; *p; ++p) { native.push_back(static_cast<std::filesystem::path::value_type>(*p)); }
        return native;
    }

    //! Appends to the report file through a fixed buffer with raw OS calls.
    class report_file
    {
      public:
        report_file()
        {
#if defined(_WIN32) || defined(WIN32)
            m_handle = CreateFileW(g_report_path, FILE_APPEND_DATA, FILE_SHARE_READ, nullptr, OPEN_ALWAYS, FILE_ATTRIBUTE_NORMAL, nullptr);
#else
            m_fd = ::open(g_report_path, O_WRONLY | O_CREAT | O_APPEND | O_CLOEXEC, 0600);
#endif
        }

        ~report_file()
        {
            flush();
#if defined(_WIN32) || defined(WIN32)
            if (m_handle != INVALID_HANDLE_VALUE) { CloseHandle(m_handle); }
#else
            if (m_fd >= 0) { ::close(m_fd); }
#endif
        }

        report_file(const report_file&)            = delete;
        report_file& operator=(const report_file&) = delete;

        report_file&
        put(const char* s)
        {
            while (s != nullptr && *s != 0) { put_char(*s++); }
            return *this;
        }

        report_file&
        put(const char* s, std::size_t n)
        {
            for (std::size_t i = 0; i < n; ++i) { put_char(s[i]); }
            return *this;
        }

        report_file&
        put_hex(std::uint64_t v)
        {
            char        tmp[16];
            std::size_t n = 0;
            do {
                tmp[n++] = "0123456789abcdef"[v & 0xF];
                v >>= 4;
            } while (v != 0);
            put("0x");
            while (n > 0) { put_char(tmp[--n]); }
            return *this;
        }

        report_file&
        put_dec(std::int64_t v, int min_width = 1)
        {
            char          tmp[24];
            int           n   = 0;
            const bool    neg = v < 0;
            std::uint64_t u   = neg ? 0 - static_cast<std::uint64_t>(v) : static_cast<std::uint64_t>(v);
            do {
                tmp[n++] = static_cast<char>('0' + u % 10);
                u /= 10;
            } while (u != 0);
            while (n < min_width) { tmp[n++] = '0'; }
            if (neg) { put_char('-'); }
            while (n > 0) { put_char(tmp[--n]); }
            return *this;
        }

        void
        flush()
        {
            if (m_len == 0) { return; }
#if defined(_WIN32) || defined(WIN32)
            if (m_handle != INVALID_HANDLE_VALUE)
            {
                DWORD written = 0;
                WriteFile(m_handle, m_buf, static_cast<DWORD>(m_len), &written, nullptr);
            }
#else
            std::size_t off = 0;
            while (m_fd >= 0 && off < m_len)
            {
                const auto w = ::write(m_fd, m_buf + off, m_len - off);
                if (w <= 0) { break; }
                off += static_cast<std::size_t>(w);
            }
#endif
            m_len = 0;
        }

#if !defined(_WIN32) && !defined(WIN32)
        int
        fd()
        {
            flush();
            return m_fd;
        }
#endif

      private:
        void
        put_char(char c)
        {
            if (m_len == sizeof(m_buf)) { flush(); }
            m_buf[m_len++] = c;
        }

#if defined(_WIN32) || defined(WIN32)
        HANDLE m_handle{INVALID_HANDLE_VALUE};
#else
        int m_fd{-1};
#endif
        char        m_buf[512];
        std::size_t m_len{0};
    };

    //! "YYYY-MM-DD hh:mm:ss UTC", without localtime (it takes locks).
    void
    put_utc_now(report_file& out)
    {
        std::int64_t y, mo, d, h, mi, s;
#if defined(_WIN32) || defined(WIN32)
        SYSTEMTIME st;
        GetSystemTime(&st);
        y = st.wYear, mo = st.wMonth, d = st.wDay, h = st.wHour, mi = st.wMinute, s = st.wSecond;
#else
        timespec ts{};
        clock_gettime(CLOCK_REALTIME, &ts);
        const std::int64_t secs = ts.tv_sec;
        std::int64_t       days = secs / 86400;
        const std::int64_t rem  = secs % 86400;
        h = rem / 3600, mi = rem % 3600 / 60, s = rem % 60;
        //! civil_from_days (H. Hinnant)
        days += 719468;
        const std::int64_t era = days / 146097;
        const std::int64_t doe = days - era * 146097;
        const std::int64_t yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
        const std::int64_t doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
        const std::int64_t mp  = (5 * doy + 2) / 153;
        d  = doy - (153 * mp + 2) / 5 + 1;
        mo = mp < 10 ? mp + 3 : mp - 9;
        y  = yoe + era * 400 + (mo <= 2 ? 1 : 0);
#endif
        out.put_dec(y, 4).put("-").put_dec(mo, 2).put("-").put_dec(d, 2).put(" ");
        out.put_dec(h, 2).put(":").put_dec(mi, 2).put(":").put_dec(s, 2).put(" UTC");
    }

    void
    put_header(report_file& out, const char* what)
    {
        out.put("\n=== ").put(what).put(" at ");
        put_utc_now(out);
        out.put(" -- ").put(DEX_PROJECT_NAME).put(" ").put(g_version).put(" ===\n");
    }

    //! Ends the KDF instance this wallet started and deletes its config (the
    //! passphrase is in it) -- nothing else would once the wallet is gone.
    void
    cleanup_kdf(report_file& out)
    {
        const auto pid = g_kdf_pid.load();
        if (pid > 0)
        {
#if defined(_WIN32) || defined(WIN32)
            HANDLE proc = OpenProcess(PROCESS_TERMINATE | PROCESS_QUERY_LIMITED_INFORMATION, FALSE, static_cast<DWORD>(pid));
            if (proc != nullptr)
            {
                //! Guard against PID reuse: only terminate if it still is KDF.
                wchar_t image[MAX_PATH];
                DWORD   size = MAX_PATH;
                bool    is_kdf = false;
                if (QueryFullProcessImageNameW(proc, 0, image, &size))
                {
                    const wchar_t* base = image;
                    for (const wchar_t* p = image; *p; ++p)
                    {
                        if (*p == L'\\' || *p == L'/') { base = p + 1; }
                    }
                    wchar_t expected[64];
                    std::size_t n = 0;
                    for (const char* p = atomic_dex::g_dex_api; *p && n < 58; ++p) { expected[n++] = static_cast<wchar_t>(*p); }
                    for (const wchar_t* p = L".exe"; *p; ++p) { expected[n++] = *p; }
                    expected[n] = 0;
                    is_kdf = _wcsicmp(base, expected) == 0;
                }
                if (is_kdf && TerminateProcess(proc, 1))
                {
                    out.put("kdf (pid ").put_dec(pid).put(") terminated\n");
                }
                else
                {
                    out.put("kdf (pid ").put_dec(pid).put(") not terminated\n");
                }
                CloseHandle(proc);
            }
#else
            bool is_kdf = true;
#    if defined(__linux__)
            //! Guard against PID reuse: /proc/<pid>/comm must still name KDF.
            char path[64] = "/proc/";
            {
                char        tmp[24];
                int         n = 0;
                std::int64_t v = pid;
                do { tmp[n++] = static_cast<char>('0' + v % 10); v /= 10; } while (v != 0);
                std::size_t len = std::strlen(path);
                while (n > 0) { path[len++] = tmp[--n]; }
                std::memcpy(path + len, "/comm", 6);
            }
            const int fd = ::open(path, O_RDONLY | O_CLOEXEC);
            if (fd >= 0)
            {
                char comm[32]{};
                const auto r = ::read(fd, comm, sizeof(comm) - 1);
                ::close(fd);
                const std::size_t expected_len = std::strlen(atomic_dex::g_dex_api);
                is_kdf = r > 0 && std::strncmp(comm, atomic_dex::g_dex_api, expected_len) == 0 &&
                         (comm[expected_len] == '\n' || comm[expected_len] == 0);
            }
            else
            {
                is_kdf = false;
            }
#    endif
            if (is_kdf && ::kill(static_cast<pid_t>(pid), SIGTERM) == 0)
            {
                out.put("kdf (pid ").put_dec(pid).put(") sent SIGTERM\n");
            }
            else
            {
                out.put("kdf (pid ").put_dec(pid).put(") not signalled\n");
            }
#endif
        }
        if (g_kdf_cfg_set.load())
        {
#if defined(_WIN32) || defined(WIN32)
            const bool removed = DeleteFileW(g_kdf_cfg_path) != 0;
#else
            const bool removed = ::unlink(g_kdf_cfg_path) == 0;
#endif
            out.put(removed ? "kdf config file deleted\n" : "kdf config file NOT deleted, remove it by hand\n");
        }
    }

    [[noreturn]] void
    on_terminate()
    {
        if (const auto eptr = std::current_exception())
        {
            try
            {
                std::rethrow_exception(eptr);
            }
            catch (const std::exception& error)
            {
                atomic_dex::crash::note(std::string("std::terminate: uncaught exception: ") + error.what());
            }
            catch (...)
            {
                atomic_dex::crash::note("std::terminate: uncaught exception of a non-std type");
            }
        }
        else
        {
            atomic_dex::crash::note("std::terminate called without an active exception");
        }
        std::abort();
    }

#if defined(_WIN32) || defined(WIN32)
    //! Windows: the report and the minidump are produced by a dedicated thread
    //! created at startup. The crashing thread may have no stack left (stack
    //! overflow) and MiniDumpWriteDump must not run on the thread being dumped
    //! anyway; the crashing thread only hands over and waits.

    HANDLE              g_dump_request{nullptr};
    HANDLE              g_dump_done{nullptr};
    EXCEPTION_POINTERS* g_exception{nullptr};
    DWORD               g_crash_tid{0};
    const char*         g_reason{nullptr};
    void*               g_frames[62]{};
    USHORT              g_frame_count{0};
    bool                g_full_dump{false};

    const char*
    exception_name(DWORD code)
    {
        switch (code)
        {
        case EXCEPTION_ACCESS_VIOLATION: return "ACCESS_VIOLATION";
        case EXCEPTION_STACK_OVERFLOW: return "STACK_OVERFLOW";
        case EXCEPTION_ILLEGAL_INSTRUCTION: return "ILLEGAL_INSTRUCTION";
        case EXCEPTION_PRIV_INSTRUCTION: return "PRIV_INSTRUCTION";
        case EXCEPTION_IN_PAGE_ERROR: return "IN_PAGE_ERROR";
        case EXCEPTION_INT_DIVIDE_BY_ZERO: return "INT_DIVIDE_BY_ZERO";
        case EXCEPTION_ARRAY_BOUNDS_EXCEEDED: return "ARRAY_BOUNDS_EXCEEDED";
        case EXCEPTION_DATATYPE_MISALIGNMENT: return "DATATYPE_MISALIGNMENT";
        case EXCEPTION_FLT_DIVIDE_BY_ZERO: return "FLT_DIVIDE_BY_ZERO";
        case EXCEPTION_FLT_INVALID_OPERATION: return "FLT_INVALID_OPERATION";
        case 0xC0000374: return "HEAP_CORRUPTION";
        case 0xC0000409: return "STACK_BUFFER_OVERRUN / fail-fast";
        case 0xE06D7363: return "unhandled C++ exception";
        default: return "unknown";
        }
    }

    void
    put_address(report_file& out, DWORD64 address)
    {
        out.put_hex(address).put("  ");
        HMODULE module = nullptr;
        if (GetModuleHandleExW(
                GET_MODULE_HANDLE_EX_FLAG_FROM_ADDRESS | GET_MODULE_HANDLE_EX_FLAG_UNCHANGED_REFCOUNT, reinterpret_cast<LPCWSTR>(address), &module))
        {
            wchar_t wide[MAX_PATH];
            if (GetModuleFileNameW(module, wide, MAX_PATH) > 0)
            {
                const wchar_t* base = wide;
                for (const wchar_t* p = wide; *p; ++p)
                {
                    if (*p == L'\\' || *p == L'/') { base = p + 1; }
                }
                char name[MAX_PATH * 3];
                if (WideCharToMultiByte(CP_UTF8, 0, base, -1, name, sizeof(name), nullptr, nullptr) > 0) { out.put(name); }
            }
            out.put("+").put_hex(address - reinterpret_cast<DWORD64>(module));
        }
        else
        {
            out.put("?");
        }

        alignas(SYMBOL_INFO) char storage[sizeof(SYMBOL_INFO) + 256];
        auto*                     symbol = reinterpret_cast<SYMBOL_INFO*>(storage);
        symbol->SizeOfStruct             = sizeof(SYMBOL_INFO);
        symbol->MaxNameLen               = 255;
        DWORD64 displacement             = 0;
        if (SymFromAddr(GetCurrentProcess(), address, &displacement, symbol))
        {
            out.put("  (").put(symbol->Name).put("+").put_hex(displacement).put(")");
        }
        out.put("\n");
    }

    void
    write_report_and_dump()
    {
        HANDLE process = GetCurrentProcess();
        SymSetOptions(SYMOPT_UNDNAME | SYMOPT_DEFERRED_LOADS | SYMOPT_FAIL_CRITICAL_ERRORS | SYMOPT_NO_PROMPTS);
        SymInitialize(process, nullptr, TRUE);

        {
            report_file out;
            put_header(out, "crash");
            out.put("thread ").put_dec(g_crash_tid).put("\n");
            if (g_exception != nullptr)
            {
                const EXCEPTION_RECORD* record = g_exception->ExceptionRecord;
                out.put("exception ").put_hex(record->ExceptionCode).put(" ").put(exception_name(record->ExceptionCode)).put(" at ");
                put_address(out, reinterpret_cast<DWORD64>(record->ExceptionAddress));
                if (record->ExceptionCode == EXCEPTION_ACCESS_VIOLATION && record->NumberParameters >= 2)
                {
                    const auto op = record->ExceptionInformation[0];
                    out.put(op == 0 ? "reading " : op == 1 ? "writing " : "executing ").put_hex(record->ExceptionInformation[1]).put("\n");
                }

#    if defined(_M_X64) || defined(_M_AMD64)
                out.put("stack:\n");
                CONTEXT      context = *g_exception->ContextRecord;
                STACKFRAME64 frame{};
                frame.AddrPC.Offset    = context.Rip;
                frame.AddrFrame.Offset = context.Rbp;
                frame.AddrStack.Offset = context.Rsp;
                frame.AddrPC.Mode = frame.AddrFrame.Mode = frame.AddrStack.Mode = AddrModeFlat;
                HANDLE thread = OpenThread(THREAD_GET_CONTEXT | THREAD_QUERY_INFORMATION, FALSE, g_crash_tid);
                for (int i = 0; i < 64; ++i)
                {
                    if (!StackWalk64(
                            IMAGE_FILE_MACHINE_AMD64, process, thread != nullptr ? thread : GetCurrentThread(), &frame, &context, nullptr,
                            SymFunctionTableAccess64, SymGetModuleBase64, nullptr) ||
                        frame.AddrPC.Offset == 0)
                    {
                        break;
                    }
                    out.put("  #").put_dec(i, 2).put(" ");
                    put_address(out, frame.AddrPC.Offset);
                }
                if (thread != nullptr) { CloseHandle(thread); }
#    endif
            }
            else
            {
                out.put(g_reason != nullptr ? g_reason : "fatal error").put("\nstack:\n");
                for (USHORT i = 0; i < g_frame_count; ++i)
                {
                    out.put("  #").put_dec(i, 2).put(" ");
                    put_address(out, reinterpret_cast<DWORD64>(g_frames[i]));
                }
            }
        }

        HANDLE file = CreateFileW(g_dump_path, GENERIC_WRITE, 0, nullptr, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, nullptr);
        report_file out;
        if (file == INVALID_HANDLE_VALUE)
        {
            out.put("minidump: cannot create file, error ").put_dec(GetLastError()).put("\n");
            return;
        }
        MINIDUMP_EXCEPTION_INFORMATION info{};
        info.ThreadId          = g_crash_tid;
        info.ExceptionPointers = g_exception;
        info.ClientPointers    = FALSE;
        const auto type        = g_full_dump ? MiniDumpWithFullMemory
                                             : static_cast<MINIDUMP_TYPE>(
                                            MiniDumpWithIndirectlyReferencedMemory | MiniDumpWithThreadInfo | MiniDumpWithUnloadedModules |
                                            MiniDumpWithHandleData);
        if (MiniDumpWriteDump(process, GetCurrentProcessId(), file, type, g_exception != nullptr ? &info : nullptr, nullptr, nullptr))
        {
            out.put("minidump written next to this report (may contain wallet secrets -- do not share it publicly)\n");
        }
        else
        {
            out.put("minidump failed, error ").put_hex(GetLastError()).put("\n");
        }
        CloseHandle(file);
    }

    DWORD WINAPI
    dump_thread_proc(LPVOID)
    {
        WaitForSingleObject(g_dump_request, INFINITE);
        write_report_and_dump();
        SetEvent(g_dump_done);
        return 0;
    }

    //! Called on the crashing thread: hands over to the dump thread, then cleans up KDF.
    void
    report_crash()
    {
        if (g_dump_request != nullptr && g_dump_done != nullptr)
        {
            SetEvent(g_dump_request);
            WaitForSingleObject(g_dump_done, 120000);
        }
        else
        {
            report_file out;
            put_header(out, "crash");
            out.put("(dump thread unavailable) ");
            if (g_exception != nullptr) { out.put("exception ").put_hex(g_exception->ExceptionRecord->ExceptionCode).put("\n"); }
            else { out.put(g_reason != nullptr ? g_reason : "fatal error").put("\n"); }
        }
        report_file out;
        cleanup_kdf(out);
    }

    LONG WINAPI
    unhandled_exception_filter(EXCEPTION_POINTERS* exception)
    {
        if (g_crashing.exchange(true))
        {
            //! A fault inside our own reporting: let Windows end the process.
            if (GetCurrentThreadId() == g_crash_tid) { return EXCEPTION_CONTINUE_SEARCH; }
            Sleep(INFINITE);
        }
        g_exception = exception;
        g_crash_tid = GetCurrentThreadId();
        report_crash();
        //! Let Windows Error Reporting see it too (Event Viewer, LocalDumps).
        return EXCEPTION_CONTINUE_SEARCH;
    }

    void
    abort_handler(int)
    {
        if (g_crashing.exchange(true)) { return; }
        g_reason      = "SIGABRT (abort)";
        g_crash_tid   = GetCurrentThreadId();
        g_frame_count = RtlCaptureStackBackTrace(1, static_cast<DWORD>(std::size(g_frames)), g_frames, nullptr);
        report_crash();
        //! Returning lets abort() finish ending the process.
    }

    void
    invalid_parameter_handler(const wchar_t*, const wchar_t*, const wchar_t*, unsigned int, uintptr_t)
    {
        //! The release CRT would fail-fast here, past every handler.
        atomic_dex::crash::note("invalid parameter passed to a C runtime function");
        std::abort();
    }

    void
    purecall_handler()
    {
        atomic_dex::crash::note("pure virtual function call");
        std::abort();
    }
#else
    //! Linux / macOS: one signal handler on an alternate stack (so a stack
    //! overflow on the main thread is still reported).

    alignas(16) char g_alt_stack[64 * 1024];

    const char*
    signal_name(int sig)
    {
        switch (sig)
        {
        case SIGSEGV: return "SIGSEGV";
        case SIGBUS: return "SIGBUS";
        case SIGILL: return "SIGILL";
        case SIGFPE: return "SIGFPE";
        case SIGABRT: return "SIGABRT";
        default: return "signal";
        }
    }

    void
    crash_signal_handler(int sig, siginfo_t* info, void*)
    {
        if (g_crashing.exchange(true))
        {
            for (;;) { pause(); }
        }
        {
            report_file out;
            put_header(out, "crash");
            out.put(signal_name(sig)).put(" (").put_dec(sig).put(")");
            if (sig != SIGABRT && info != nullptr) { out.put(" at address ").put_hex(reinterpret_cast<std::uintptr_t>(info->si_addr)); }
            out.put("\nstack:\n");
            void*     frames[64];
            const int count = backtrace(frames, 64);
            const int fd    = out.fd();
            if (fd >= 0) { backtrace_symbols_fd(frames, count, fd); }
            cleanup_kdf(out);
        }
        //! SA_RESETHAND restored the default action: crash for real (core dump, exit status).
        raise(sig);
    }
#endif
} // namespace

namespace atomic_dex::crash
{
    void
    install(const std::filesystem::path& report_base, std::string_view version)
    {
        if (g_installed.exchange(true)) { return; }

        copy_path(g_report_path, with_suffix(report_base, ".crash.txt"));
        copy_path(g_dump_path, with_suffix(report_base, ".dmp"));
        const std::size_t n = std::min(version.size(), sizeof(g_version) - 1);
        std::memcpy(g_version, version.data(), n);
        g_version[n] = 0;

        std::set_terminate(&on_terminate);

#if defined(_WIN32) || defined(WIN32)
        g_full_dump    = std::getenv("ATOMICDEX_FULL_CRASH_DUMP") != nullptr;
        g_dump_request = CreateEventW(nullptr, TRUE, FALSE, nullptr);
        g_dump_done    = CreateEventW(nullptr, TRUE, FALSE, nullptr);
        if (g_dump_request != nullptr && g_dump_done != nullptr)
        {
            if (HANDLE thread = CreateThread(nullptr, 256 * 1024, &dump_thread_proc, nullptr, 0, nullptr); thread != nullptr)
            {
                CloseHandle(thread);
            }
            else
            {
                CloseHandle(g_dump_request);
                g_dump_request = nullptr;
            }
        }

        //! Leave the main thread enough stack to run the filter after an overflow.
        ULONG guarantee = 64 * 1024;
        SetThreadStackGuarantee(&guarantee);

        SetUnhandledExceptionFilter(&unhandled_exception_filter);
        std::signal(SIGABRT, &abort_handler);
        _set_invalid_parameter_handler(&invalid_parameter_handler);
        _set_purecall_handler(&purecall_handler);
#else
        //! backtrace() loads its unwinder lazily (which allocates) on first use;
        //! do that now rather than in the handler.
        void* warmup[1];
        backtrace(warmup, 1);

        stack_t alt{};
        alt.ss_sp    = g_alt_stack;
        alt.ss_size  = sizeof(g_alt_stack);
        alt.ss_flags = 0;
        sigaltstack(&alt, nullptr);

        struct sigaction action{};
        action.sa_sigaction = &crash_signal_handler;
        action.sa_flags     = SA_SIGINFO | SA_ONSTACK | SA_RESETHAND | SA_NODEFER;
        sigemptyset(&action.sa_mask);
        for (int sig: {SIGSEGV, SIGBUS, SIGILL, SIGFPE, SIGABRT}) { sigaction(sig, &action, nullptr); }
#endif
        SPDLOG_INFO("crash handler installed, a crash report would be written to {}", std::filesystem::path(g_report_path).string());
    }

    void
    reinstall()
    {
#if defined(_WIN32) || defined(WIN32)
        if (!g_installed.load()) { return; }
        auto previous = SetUnhandledExceptionFilter(&unhandled_exception_filter);
        if (previous != &unhandled_exception_filter)
        {
            SPDLOG_WARN("unhandled exception filter had been replaced by a library, restored it");
        }
#endif
    }

    void
    set_kdf(std::int64_t pid, const std::filesystem::path& cfg_path)
    {
        g_kdf_cfg_set = false;
        copy_path(g_kdf_cfg_path, cfg_path.native());
        g_kdf_cfg_set = true;
        g_kdf_pid     = pid;
    }

    void
    clear_kdf_cfg()
    {
        g_kdf_cfg_set = false;
    }

    void
    note(std::string_view message)
    {
        if (!g_installed.load()) { return; }
        report_file out;
        put_header(out, "fatal");
        out.put(message.data(), message.size()).put("\n");
    }
} // namespace atomic_dex::crash
