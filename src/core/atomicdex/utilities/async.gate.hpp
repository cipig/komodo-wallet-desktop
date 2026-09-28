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

#include <chrono>
#include <condition_variable>
#include <cstddef>
#include <memory>
#include <mutex>

namespace atomic_dex
{
    //! Keeps an object alive for the async work that captured `this`.
    //!
    //! Continuations run on thread pools and can fire after their owner is
    //! destroyed -- on logout as well as on exit. The owner holds the gate in a
    //! shared_ptr and every continuation captures its own copy; it enters before
    //! touching the owner and gives up when the gate is closed. The owner's
    //! destructor closes the gate and waits for the work already inside.
    class async_gate
    {
      public:
        class pass
        {
          public:
            pass() = default;
            explicit pass(async_gate* gate) : m_gate(gate) {}
            pass(pass&& other) noexcept : m_gate(other.m_gate) { other.m_gate = nullptr; }
            pass& operator=(pass&&) = delete;
            pass(const pass&)       = delete;
            pass& operator=(const pass&) = delete;
            ~pass()
            {
                if (m_gate != nullptr)
                {
                    m_gate->leave();
                }
            }

            //! False when the owner is being destroyed: do not touch it.
            explicit operator bool() const noexcept { return m_gate != nullptr; }

          private:
            async_gate* m_gate{nullptr};
        };

        [[nodiscard]] pass
        enter()
        {
            std::lock_guard lock(m_mutex);
            if (m_closed)
            {
                return {};
            }
            ++m_active;
            return pass{this};
        }

        //! For long-running work to stop early once the owner is going away.
        [[nodiscard]] bool
        closed() const
        {
            std::lock_guard lock(m_mutex);
            return m_closed;
        }

        //! Refuses any further enter().
        void
        close()
        {
            std::lock_guard lock(m_mutex);
            m_closed = true;
        }

        //! Blocks until no work is inside; `on_wait` is called with the count
        //! still inside each time `report_every` passes without finishing.
        template <typename OnWait>
        void
        wait_idle(std::chrono::milliseconds report_every, OnWait&& on_wait)
        {
            std::unique_lock lock(m_mutex);
            while (!m_idle.wait_for(lock, report_every, [this] { return m_active == 0; }))
            {
                on_wait(m_active);
            }
        }

      private:
        void
        leave()
        {
            std::lock_guard lock(m_mutex);
            if (--m_active == 0)
            {
                m_idle.notify_all();
            }
        }

        mutable std::mutex      m_mutex;
        std::condition_variable m_idle;
        std::size_t             m_active{0};
        bool                    m_closed{false};
    };
} // namespace atomic_dex
