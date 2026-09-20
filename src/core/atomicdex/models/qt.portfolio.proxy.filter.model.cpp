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

#include <QtMath>
#include "atomicdex/models/qt.portfolio.proxy.filter.model.hpp"
#include "atomicdex/models/qt.portfolio.model.hpp"
#include "atomicdex/pages/qt.portfolio.page.hpp"

namespace atomic_dex
{
    //! Constructor
    portfolio_proxy_model::portfolio_proxy_model(ag::ecs::system_manager& system_manager, QObject* parent) :
        QSortFilterProxyModel(parent), m_system_mgr(system_manager)
    {
    }

    bool
    portfolio_proxy_model::lessThan(const QModelIndex& source_left, const QModelIndex& source_right) const
    {
        int      role       = this->sortRole();
        QVariant left_data  = sourceModel()->data(source_left, role);
        QVariant right_data = sourceModel()->data(source_right, role);

        switch (static_cast<atomic_dex::portfolio_model::PortfolioRoles>(role))
        {
        case atomic_dex::portfolio_model::TickerRole:
            return left_data.toString() > right_data.toString();
        case atomic_dex::portfolio_model::NameRole:
            return left_data.toString().toLower() < right_data.toString().toLower();

        // Optimize standard balance sorting tracks to prevent recursive string conversions
        case atomic_dex::portfolio_model::BalanceRole:
        case atomic_dex::portfolio_model::RawBalanceRole:
        {
            double left_val  = sourceModel()->data(source_left, atomic_dex::portfolio_model::RawBalanceRole).toDouble();
            double right_val = sourceModel()->data(source_right, atomic_dex::portfolio_model::RawBalanceRole).toDouble();
            return left_val < right_val;
        }

        case atomic_dex::portfolio_model::RawMainCurrencyBalanceRole:
        case atomic_dex::portfolio_model::MainCurrencyBalanceRole:
        {
            double left_val = sourceModel()->data(source_left, atomic_dex::portfolio_model::RawMainCurrencyBalanceRole).toDouble();
            double right_val = sourceModel()->data(source_right, atomic_dex::portfolio_model::RawMainCurrencyBalanceRole).toDouble();

            // Tie-breaker: If fiat values match exactly (e.g., both are $0.00), sort by native coin balance quantity
            if (qFuzzyCompare(left_val, right_val) || left_val == right_val)
            {
                left_val  = sourceModel()->data(source_left, atomic_dex::portfolio_model::RawBalanceRole).toDouble();
                right_val = sourceModel()->data(source_right, atomic_dex::portfolio_model::RawBalanceRole).toDouble();
            }
            return left_val < right_val;
        }

        case atomic_dex::portfolio_model::RawChange24HRole:
        case atomic_dex::portfolio_model::Change24H:
        {
            double left_val  = sourceModel()->data(source_left, atomic_dex::portfolio_model::RawChange24HRole).toDouble();
            double right_val = sourceModel()->data(source_right, atomic_dex::portfolio_model::RawChange24HRole).toDouble();
            return left_val < right_val;
        }

        case atomic_dex::portfolio_model::MainCurrencyPriceForOneUnit:
        case atomic_dex::portfolio_model::RawMainCurrencyPriceRole:
        {
            double left_val  = sourceModel()->data(source_left, atomic_dex::portfolio_model::RawMainCurrencyPriceRole).toDouble();
            double right_val = sourceModel()->data(source_right, atomic_dex::portfolio_model::RawMainCurrencyPriceRole).toDouble();
            return left_val < right_val;
        }

        case portfolio_model::MainFiatPriceForOneUnit:
            return sourceModel()->data(source_left, atomic_dex::portfolio_model::MainFiatPriceForOneUnit).toDouble() <
                   sourceModel()->data(source_right, atomic_dex::portfolio_model::MainFiatPriceForOneUnit).toDouble();

        case portfolio_model::Trend7D:
        case portfolio_model::ActivationStatus:
        case portfolio_model::Excluded:
        case portfolio_model::Display:
        case portfolio_model::NameAndTicker:
        case portfolio_model::MultiTickerCurrentlyEnabled:
        case portfolio_model::MultiTickerData:
        case portfolio_model::MultiTickerError:
        case portfolio_model::MultiTickerPrice:
        case portfolio_model::MultiTickerReceiveAmount:
        case portfolio_model::MultiTickerFeesInfo:
        case portfolio_model::CoinType:
        case portfolio_model::Address:
        case portfolio_model::PrivKey:
        case portfolio_model::PercentMainCurrency:
        case portfolio_model::PriceProvider:
        case portfolio_model::LastPriceTimestamp:
        default:
            return false;
        }
    }

    bool
    portfolio_proxy_model::filterAcceptsRow(int source_row, const QModelIndex& source_parent) const
    {
        auto* model = this->sourceModel();
        if (!model || source_row < 0 || source_row >= model->rowCount(source_parent)) [[unlikely]]
        {
            return false;
        }

        QModelIndex idx = model->index(source_row, 0, source_parent);

        QString ticker = model->data(idx, atomic_dex::portfolio_model::TickerRole).toString();

        if (this->filterRole() == atomic_dex::portfolio_model::MultiTickerCurrentlyEnabled)
        {
            if (!model->data(idx, atomic_dex::portfolio_model::MultiTickerCurrentlyEnabled).toBool())
            {
                return false;
            }
        }

        if (!m_search_exp.isEmpty())
        {
            if (!ticker.contains(m_search_exp, Qt::CaseInsensitive))
            {
                return false;
            }
        }

        if (am_i_a_market_selector)
        {
            if (m_system_mgr.get_system<portfolio_page>().get_global_cfg()->is_wallet_only(ticker.toStdString()))
            {
                return false;
            }
        }

        if (m_excluded_coin == ticker)
        {
            return false;
        }

        if (m_with_balance)
        {
            double raw_balance = model->data(idx, portfolio_model::RawBalanceRole).toDouble();
            if (qFuzzyIsNull(raw_balance) || raw_balance <= 0.0)
            {
                return false;
            }
        }

        if (m_with_fiat_balance)
        {
            double raw_fiat = model->data(idx, portfolio_model::RawMainCurrencyBalanceRole).toDouble();
            if (qFuzzyIsNull(raw_fiat) || raw_fiat <= 0.0)
            {
                return false;
            }
        }

        return true;
    }

    void
    portfolio_proxy_model::reset()
    {
        this->beginResetModel();
        this->endResetModel();
    }

    void
    portfolio_proxy_model::set_excluded_coin(const QString& ticker)
    {
        m_excluded_coin = ticker;
        this->invalidateFilter();
    }

    void
    portfolio_proxy_model::is_a_market_selector(bool is_market_selector)
    {
        this->am_i_a_market_selector = is_market_selector;
    }
} // namespace atomic_dex

//! QML API
namespace atomic_dex
{
    void
    portfolio_proxy_model::sort_by_name(bool is_ascending)
    {
        this->setSortRole(atomic_dex::portfolio_model::NameRole); // HOTSPOT 0.2%
        this->sort(0, is_ascending ? Qt::AscendingOrder : Qt::DescendingOrder); // HOTSPOT 0.6%
    }

    void
    portfolio_proxy_model::sort_by_currency_balance(bool is_ascending)
    {
        this->setSortRole(atomic_dex::portfolio_model::RawMainCurrencyBalanceRole); // HOTSPOT 0.6%
        this->sort(0, is_ascending ? Qt::AscendingOrder : Qt::DescendingOrder); // HOTSPOT 0.7%
    }

    void
    portfolio_proxy_model::sort_by_change_last24h(bool is_ascending)
    {
        this->setSortRole(atomic_dex::portfolio_model::RawChange24HRole); // HOTSPOT 0.4%
        this->sort(0, is_ascending ? Qt::AscendingOrder : Qt::DescendingOrder); // HOTSPOT 0.6%
    }

    void
    portfolio_proxy_model::sort_by_currency_unit(bool is_ascending)
    {
        this->setSortRole(atomic_dex::portfolio_model::RawMainCurrencyPriceRole); // HOTSPOT 0.4%
        this->sort(0, is_ascending ? Qt::AscendingOrder : Qt::DescendingOrder); // HOTSPOT 0.6%
    }

    bool
    portfolio_proxy_model::get_with_balance() const
    {
        return m_with_balance;
    }

    void
    portfolio_proxy_model::set_with_balance(bool value)
    {
        if (value != m_with_balance)
        {
            m_with_balance = value;
            this->invalidateFilter();
        }
    }

    void
    portfolio_proxy_model::set_with_fiat_balance(bool value)
    {
        if (value != m_with_fiat_balance)
        {
            m_with_fiat_balance = value;
            this->invalidateFilter();
        }
    }

    void
    portfolio_proxy_model::set_search_exp(QString search_exp)
    {
        if (search_exp != m_search_exp)
        {
            m_search_exp = std::move(search_exp);
            this->invalidateFilter();
        }
    }

    QString
    portfolio_proxy_model::get_search_exp() const
    {
        return m_search_exp;
    }

    QVariantMap
    atomic_dex::portfolio_proxy_model::get(int row)
    {
        QHash<int, QByteArray>         names = roleNames();
        QHashIterator<int, QByteArray> i(names);
        QVariantMap                    res;
        while (i.hasNext())
        {
            i.next();
            QModelIndex idx  = index(row, 0);
            QVariant    data = idx.data(i.key());
            res[i.value()]   = data;
        }
        return res;
    }
} // namespace atomic_dex
