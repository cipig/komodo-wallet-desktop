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

#include <fstream>
#include <iostream>
#include <algorithm>
#include <chrono>
#include <cwctype>
#include <filesystem>

//! PCH Headers
#include "atomicdex/pch.hpp"

#if defined(_WIN32) || defined(WIN32)
#    include <windows.h>
#    include <tlhelp32.h>
#endif

//! Project Headers
#include "atomicdex/utilities/kill.hpp"

namespace atomic_dex
{
    ENTT_API void
    kill_executable(const char* exec_name)
    {
#if defined(__APPLE__) || defined(__linux__)
        std::string cmd_line_check = "pgrep " + std::string(exec_name);
        std::string response = execute(cmd_line_check);
        if (response != "")
        {
            std::string cmd_line = "killall " + std::string(exec_name);
            std::string response = execute(cmd_line);
        }
#else
        //! Not `taskkill /F /IM kdf.exe > temp.txt`: cmd skips the whole command
        //! when it cannot create temp.txt, which it cannot when the working
        //! directory is read-only (an install under Program Files) -- so a stale
        //! KDF survived and kept the RPC port from the next launch.
        const std::string target = std::string(exec_name) + ".exe";
        HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
        if (snapshot == INVALID_HANDLE_VALUE)
        {
            SPDLOG_ERROR("cannot list processes to stop {}: error {}", target, GetLastError());
            return;
        }
        PROCESSENTRY32W entry{};
        entry.dwSize = sizeof(entry);
        for (BOOL ok = Process32FirstW(snapshot, &entry); ok; ok = Process32NextW(snapshot, &entry))
        {
            const std::wstring name(entry.szExeFile);
            if (name.size() != target.size() || !std::equal(name.begin(), name.end(), target.begin(), [](wchar_t a, char b) {
                    return std::towlower(a) == std::towlower(static_cast<wchar_t>(static_cast<unsigned char>(b)));
                }))
            {
                continue;
            }
            HANDLE process = OpenProcess(PROCESS_TERMINATE | SYNCHRONIZE, FALSE, entry.th32ProcessID);
            if (process == nullptr)
            {
                SPDLOG_ERROR("cannot open {} (pid {}) to stop it: error {}", target, entry.th32ProcessID, GetLastError());
                continue;
            }
            if (TerminateProcess(process, 1))
            {
                WaitForSingleObject(process, 5000);
                SPDLOG_INFO("stopped {} (pid {})", target, entry.th32ProcessID);
            }
            else
            {
                SPDLOG_ERROR("cannot stop {} (pid {}): error {}", target, entry.th32ProcessID, GetLastError());
            }
            CloseHandle(process);
        }
        CloseHandle(snapshot);
#endif
    }

    std::string
    execute(const std::string& command)
    {
        //! Capture through a file in the temp directory, never the working
        //! directory, which may be read-only.
        const auto out_path = std::filesystem::temp_directory_path() / ("dex-execute-" + std::to_string(std::chrono::steady_clock::now().time_since_epoch().count()) + ".txt");
        system((command + " > \"" + out_path.string() + "\"").c_str());

        std::ifstream ifs(out_path);
        std::string ret{ std::istreambuf_iterator<char>(ifs), std::istreambuf_iterator<char>() };
        ifs.close(); // must close the inout stream so the file can be cleaned up
        std::error_code ec;
        if (!std::filesystem::remove(out_path, ec)) {
            SPDLOG_DEBUG("Error deleting temporary file");
        }
        return ret;
    }
} // namespace atomic_dex
