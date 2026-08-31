import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import "../../../Qaterial" as Qaterial
import "../../../Components"
import "../../../Constants"
import App 1.0
import Dex.Themes 1.0 as Dex

Widget
{
    id: root
    margins: 0
    spacing: 4
    collapsable: false
    visible: root.page_index === 0
    enabled: visible

    property int page_index: 0
    readonly property string pair_trades_24hr: API.app.trading_pg.pair_trades_24hr
    readonly property string pair_volume_24hr: API.app.trading_pg.pair_volume_24hr
    readonly property string pair: atomic_qt_utilities.retrieve_main_ticker(left_ticker) + "/" + atomic_qt_utilities.retrieve_main_ticker(right_ticker)

    Header {
        Layout.topMargin: 12
        Layout.bottomMargin: 4
        Layout.rightMargin: 4
        Layout.fillWidth: true
    }

    List {
        id: asksList
        isAsk: true
        Layout.topMargin: 4
        Layout.bottomMargin: 6
        Layout.fillWidth: true
        Layout.fillHeight: true
        Layout.preferredHeight: 100
    }

    Rectangle {
        Layout.fillWidth: true
        Layout.preferredHeight: 1
        color: Dex.CurrentTheme.backgroundColor
        opacity: 0.5
    }

    List {
        id: bidsList
        isAsk: false
        Layout.topMargin: 4
        Layout.bottomMargin: 6
        Layout.fillWidth: true
        Layout.fillHeight: true
        Layout.preferredHeight: 100
    }

    DexLabel {
        id: volume_text
        visible: parseFloat(pair_volume_24hr) > 0
        Layout.topMargin: 6
        Layout.bottomMargin: 6
        Layout.alignment: Qt.AlignHCenter
        color: Dex.CurrentTheme.foregroundColor2
        text_value: pair + qsTr(" 24hrs  |  %1  |  %2 trades").arg(General.convertUsd(pair_volume_24hr)).arg(pair_trades_24hr)
        font.pixelSize: Style.textSizeSmall1
    }
}
