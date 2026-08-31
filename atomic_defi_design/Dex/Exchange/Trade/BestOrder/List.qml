import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import "../../../Qaterial" as Qaterial
import "../../../Constants"
import "../../../Components"
import App 1.0 as App
import AtomicDEX.MarketMode 1.0
import Dex.Themes 1.0 as Dex
import Dex.Components 1.0 as Dex

Widget
{
    id: _control
    margins: 6
    spacing: 4
    collapsable: false
    visible: _control.page_index === 1
    enabled: visible

    property int page_index: 0

    Header
    {
        visible: !warning_text.visible
        Layout.topMargin: 8
        Layout.bottomMargin: 4
        Layout.fillWidth: true
    }

    Item
    {
        id: warning_text
        visible: API.app.trading_pg.volume == 0
        Layout.preferredWidth: parent.width
        Layout.preferredHeight: parent.height

        DexLabel
        {
            text_value: qsTr("Enter volume to see best orders.")
            anchors.fill: parent
            anchors.centerIn: parent
            horizontalAlignment: Text.AlignHCenter
            verticalAlignment: Text.AlignVCenter
            font.pixelSize: Style.textSizeSmall4
            color: Dex.CurrentTheme.foregroundColor2
        }
    }

    Dex.ListView
    {
        id: _listView
        Layout.fillWidth: true
        Layout.fillHeight: true
        Layout.bottomMargin: 6
        spacing: 6
        visible: !warning_text.visible
        model: API.app.trading_pg.orderbook.best_orders.proxy_mdl
        reuseItems: true
        scrollbar_visible: false

        Component.onCompleted: {
            positionViewAtBeginning()
        }

        delegate: ListDelegate
        {
            width: _listView.width
            height: 30
        }
    }
}
