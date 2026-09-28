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

#pragma once

#include <cstdint>
#include <filesystem>
#include <string_view>

//! Crash capture.
//!
//! The regular log is asynchronous and cannot record a crash: whatever is still
//! queued when the process dies is lost. These handlers write a small report
//! straight to disk from the crashing process instead, without the logger,
//! the heap-heavy parts of the runtime, or a shell:
//!
//!   <logs>/<timestamp>.crash.txt  -- what happened, where, and a stack trace
//!   <logs>/<timestamp>.dmp        -- Windows only: a minidump for WinDbg / VS
//!
//! They also terminate the KDF process this wallet started and delete the KDF
//! config file (it holds the wallet passphrase), because nothing else will once
//! the wallet is gone.
//!
//! What cannot be caught in-process: on Windows, heap corruption and other
//! fail-fast terminations (0xC0000374, 0xC0000409) skip every handler -- only
//! Windows Error Reporting's LocalDumps sees those; on Linux/macOS, a stack
//! overflow on any thread but the main one.
namespace atomic_dex::crash
{
    //! Installs the handlers. `report_base` is the path without extension; the
    //! report and the dump are written next to it on demand, so a normal run
    //! leaves no files behind. Call once, as early as possible.
    void install(const std::filesystem::path& report_base, std::string_view version);

    //! Windows: puts the top-level exception filter back if a library replaced it
    //! (QtWebEngine's Chromium may). No-op elsewhere. Safe to call repeatedly.
    void reinstall();

    //! The KDF instance to terminate and its config file to delete on a crash.
    void set_kdf(std::int64_t pid, const std::filesystem::path& cfg_path);

    //! The config file is gone (KDF has read and deleted it); stop tracking it.
    void clear_kdf_cfg();

    //! Appends a line of context to the crash report, for fatal paths that know
    //! why they are about to abort (qFatal, std::terminate). Normal context only.
    void note(std::string_view message);
} // namespace atomic_dex::crash
