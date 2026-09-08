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

// Project Headers
#include "atomicdex/models/qt.addressbook.model.hpp"
#include "atomicdex/models/qt.addressbook.proxy.filter.model.hpp"
#include "atomicdex/pages/qt.portfolio.page.hpp"

// Ctor
namespace atomic_dex
{
    addressbook_proxy_model::addressbook_proxy_model(ag::ecs::system_manager& system_manager, QObject* parent) :
        QSortFilterProxyModel(parent), m_system_manager(system_manager)
    {}
}

// QSortFilterProxyModel Functions
namespace atomic_dex
{
    bool
    addressbook_proxy_model::lessThan(const QModelIndex& source_left, const QModelIndex& source_right) const
    {
        int      role       = sortRole();
        QVariant left_data  = sourceModel()->data(source_left, role);
        QVariant right_data = sourceModel()->data(source_right, role);
        
        switch (static_cast<addressbook_model::AddressBookRoles>(role))
        {
        case addressbook_model::SubModelRole:
        {
            auto* left_obj      = qvariant_cast<QObject*>(left_data);
            auto* left_contact  = qobject_cast<addressbook_contact_model*>(left_obj);
            auto* right_obj     = qvariant_cast<QObject*>(right_data);
            auto* right_contact = qobject_cast<addressbook_contact_model*>(right_obj);
            return left_contact->get_name().toLower() < right_contact->get_name().toLower();
        }
        default:
            SPDLOG_WARN("No sort behavior on role {}", role);
            break;
        }
        return false;
    }
    
    bool addressbook_proxy_model::filterAcceptsRow(int source_row, const QModelIndex& source_parent) const
    {
        int role        = filterRole();
        QModelIndex idx = sourceModel()->index(source_row, 0, source_parent);
        assert(sourceModel()->hasIndex(idx.row(), 0));
        
        switch (static_cast<addressbook_model::AddressBookRoles>(role))
        {
        case addressbook_model::NameRoleAndCategoriesRole:
        {
            QStringList search_pattern = m_search_exp.split(' ', Qt::SplitBehaviorFlags::SkipEmptyParts);
            QString     data           = idx.data(addressbook_model::NameRoleAndCategoriesRole).toString();

            for (auto& word: search_pattern)
            {
                if (!data.contains(word, Qt::CaseInsensitive))
                {
                    return false;
                }
            }
            break;
        }
        default:
            SPDLOG_WARN("No filter behavior on role {}", role);
            break;
        }

        if (!m_type_filter.isEmpty())
        {
            const auto& glb_coins_cfg = m_system_manager.get_system<portfolio_page>().get_global_cfg();
            QObject* contact_obj = qvariant_cast<QObject*>(idx.data(addressbook_model::SubModelRole));
            auto* contact = qobject_cast<addressbook_contact_model*>(contact_obj);

            if (!contact) return false;

            const auto& addresses = contact->get_address_entries();
            const std::string filter_type_std = m_type_filter.toStdString();
            const std::string filter_coin_family = glb_coins_cfg->get_coin_info(filter_type_std).type;
            const bool is_filter_a_coin_type = glb_coins_cfg->is_coin_type(m_type_filter);

            auto it = std::find_if(addresses.begin(), addresses.end(),
                [this, &glb_coins_cfg, &filter_type_std, &filter_coin_family, is_filter_a_coin_type](const auto& address)
                {
                    if (glb_coins_cfg->is_coin_type(address.type))
                    {
                        return address.type == m_type_filter ||
                               filter_coin_family == address.type.toStdString();
                    }
                    if (is_filter_a_coin_type)
                    {
                        return address.type == m_type_filter ||
                               glb_coins_cfg->get_coin_info(address.type.toStdString()).type == filter_type_std;
                    }
                    return address.type == m_type_filter;
                });

            if (it == addresses.end())
            {
                return false;
            }
        }

        return true;
    }
} // namespace atomic_dex

// Getters/Setters
namespace atomic_dex
{
    const QString& addressbook_proxy_model::get_search_exp() const 
    {
        return m_search_exp;
    }
    
    void addressbook_proxy_model::set_search_exp(QString expression) 
    {
        m_search_exp = std::move(expression);
        invalidateFilter();
    }
    
    const QString& addressbook_proxy_model::get_type_filter() const 
    {
        return m_type_filter;
    }
    
    void addressbook_proxy_model::set_type_filter(QString value) 
    {
        m_type_filter = std::move(value);
        invalidateFilter();
    }
}
