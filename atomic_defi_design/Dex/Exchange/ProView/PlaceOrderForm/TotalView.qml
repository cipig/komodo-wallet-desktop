import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import QtQuick.Controls.Material 2.15
import "../../../Qaterial" as Qaterial
import Qt.labs.settings 1.0
import "../../../Components"
import "../../../Constants"
import Dex.Themes 1.0 as Dex

ColumnLayout
{
    spacing: 2

    RowLayout
    {
        Layout.preferredWidth: parent.width
        Layout.preferredHeight: 30

        DexLabel
        {
            Layout.preferredWidth: 150
            Layout.alignment: Qt.AlignLeft
            color: Dex.CurrentTheme.foregroundColor3
            text: "Trade Value " + API.app.settings_pg.current_fiat
            font.pixelSize:  14
            font.weight: Font.Normal
            opacity: .6
        }

        DexLabel
        {
            Layout.fillWidth: true
            horizontalAlignment: Text.AlignRight
            font.weight: Font.DemiBold
            font.pixelSize: 16
            font.family: 'Lato'
            text_value: General.getFiatText(total_amount, right_ticker).replace(General.cex_icon, "")
        }
    }

    HorizontalLine
    {
        color: Dex.CurrentTheme.lineSeparatorColor
        Layout.preferredWidth: parent.width
        Layout.preferredHeight: 1
        Layout.alignment: Qt.AlignHCenter
    }

    RowLayout
    {
        Layout.preferredWidth: parent.width
        Layout.preferredHeight: 30

        DexLabel
        {
            Layout.preferredWidth: 150
            color: Dex.CurrentTheme.foregroundColor3
            text: sell_mode ? qsTr("Receive %1").arg(right_ticker) : qsTr("Send %1").arg(right_ticker)
            font.pixelSize:  14
            opacity: .6
            font.weight: Font.Normal
        }

        DexLabel
        {
            Layout.fillWidth: true
            horizontalAlignment: Text.AlignRight
            font.weight: Font.DemiBold
            font.pixelSize: 16
            font.family: 'Lato'
            text_value: General.formatCrypto("", total_amount, right_ticker).replace(right_ticker, "")
        }
    }
}
