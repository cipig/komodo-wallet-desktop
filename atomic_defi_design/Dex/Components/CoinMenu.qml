import QtQuick 2.15
import QtQuick.Controls 2.15
import "../Constants"
import App 1.0

Menu {
    property bool can_disable;

    // Ugly but required hack for automatic menu width, otherwise long texts are being cut
    width: {
        let result = 0
        let padding = 0

        for (let i = 0; i < count; ++i) {
            let item = itemAt(i)
            result = Math.max(item.contentItem.implicitWidth, result)
            padding = Math.max(item.padding, padding)
        }

        return result + padding * 2
    }

    MenuItem {
        id: disable_action
        height: 40
        text: qsTr("Disable %1", "TICKER").arg(ticker)
        onTriggered: API.app.disable_coins([ticker])
        enabled: can_disable
    }

    MenuItem {
        height: 40
        enabled: !General.prevent_coin_disabling.running
        text: qsTr("Disable all %1 assets").arg(type)
        onTriggered: API.app.disable_coins(API.app.portfolio_pg.get_all_coins_by_type(type))
    }

    MenuItem {
        height: 40
        enabled: !General.prevent_coin_disabling.running
        text: qsTr("Disable all assets")
        onTriggered: API.app.disable_coins(API.app.portfolio_pg.get_all_enabled_coins())
    }

    MenuItem
    {
        height: 40
        enabled: !General.prevent_coin_disabling.running
        text: qsTr("Disable 0 balance assets")
        onTriggered: API.app.disable_no_balance_coins()
    }
}
