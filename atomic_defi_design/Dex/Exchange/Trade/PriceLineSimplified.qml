import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import "../../Components"
import "../../Constants"
import App 1.0
import Dex.Themes 1.0 as Dex

ColumnLayout
{
    id: price_line_root
    Layout.fillWidth: true
    spacing: 0

    readonly property string price: non_null_price
    readonly property string price_reversed: API.app.trading_pg.price_reversed
    readonly property string cex_price: API.app.trading_pg.cex_price
    readonly property string cex_price_reversed: API.app.trading_pg.cex_price_reversed
    readonly property string cexPriceDiff: API.app.trading_pg.cex_price_diff
    readonly property string l_ticker: General.coinWithoutSuffix(left_ticker)
    readonly property string r_ticker: General.coinWithoutSuffix(right_ticker)
    readonly property bool has_valid_cex_feed: cex_price !== "" && cex_price !== "0" && cex_price !== "0.00" && cexPriceDiff !== "" && cexPriceDiff !== "0" && cexPriceDiff !== "0.00" && cexPriceDiff.indexOf("NaN") === -1
    readonly property bool price_entered: !General.isZero(non_null_price)
    readonly property int fontSize: Style.textSizeSmall1
    readonly property int fontSizeBigger: Style.textSizeSmall2
    readonly property int lineScale: General.getComparisonScale(cexPriceDiff)

    // EXCHANGE RATES TEXT BOXES ROW (Using a flat Item shell prevents recursive loops)
    Item
    {
        Layout.fillWidth: true
        Layout.preferredHeight: 65

        // Left Side: Local Rates
        Column
        {
            anchors.left: parent.left
            anchors.leftMargin: has_valid_cex_feed ? 0 : parent.width * 0.22
            anchors.verticalCenter: parent.verticalCenter
            width: has_valid_cex_feed ? parent.width * 0.5 : parent.width * 0.56
            spacing: 2
            visible: price_entered

            DexLabel
            {
                width: parent.width
                horizontalAlignment: !has_valid_cex_feed ? Text.AlignHCenter : Text.AlignLeft
                text_value: qsTr("Exchange rate") + (preferred_order.price !== undefined ? (" (" + qsTr("Selected") + ")") : "")
                font.pixelSize: fontSize
            }

            DexLabel
            {
                width: parent.width
                horizontalAlignment: !has_valid_cex_feed ? Text.AlignHCenter : Text.AlignLeft
                text_value: General.formatCrypto("", "1", r_ticker) + " = " + General.formatCrypto("", price_reversed, l_ticker)
                font.pixelSize: fontSize
            }

            DexLabel
            {
                visible: price != 1
                width: parent.width
                horizontalAlignment: !has_valid_cex_feed ? Text.AlignHCenter : Text.AlignLeft
                text_value: General.formatCrypto("", price, r_ticker) + " = " + General.formatCrypto("", "1", l_ticker)
                font.pixelSize: fontSize
            }
        }

        // Right Side: Global CEX Rates
        Column
        {
            anchors.right: parent.right
            anchors.verticalCenter: parent.verticalCenter
            width: parent.width * 0.5
            spacing: 2
            visible: has_valid_cex_feed

            DexLabel
            {
                width: parent.width
                horizontalAlignment: Text.AlignRight
                text_value: qsTr("CEXchange rate")
                font.pixelSize: fontSize
            }

            DexLabel
            {
                width: parent.width
                horizontalAlignment: Text.AlignRight
                text_value: General.formatCrypto("", "1", r_ticker) + " = " + General.formatCrypto("", cex_price_reversed, l_ticker)
                font.pixelSize: fontSize
            }

            DexLabel
            {
                width: parent.width
                horizontalAlignment: Text.AlignRight
                text_value: General.formatCrypto("", cex_price, r_ticker) + " = " + General.formatCrypto("", "1", l_ticker)
                font.pixelSize: fontSize
            }
        }
    }

    // CEX COMPARISON SLIDER BAR Row
    RowLayout
    {
        id: priceComparisonContainer
        visible: price_entered && has_valid_cex_feed
        Layout.fillWidth: true
        Layout.topMargin: 8
        Layout.preferredHeight: 30

        GradientRectangle
        {
            Layout.alignment: Qt.AlignBottom
            Layout.fillWidth: true
            Layout.preferredHeight: 6
            start_color: Dex.CurrentTheme.okColor
            end_color: Dex.CurrentTheme.warningColor

            AnimatedRectangle
            {
                width: 4
                height: parent.height * 2
                anchors.verticalCenter: parent.verticalCenter
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.horizontalCenterOffset: 0.5 * parent.width * Math.min(Math.max(parseFloat(cexPriceDiff) / lineScale, -1), 1)
            }

            DexLabel
            {
                text_value: General.formatPercent(lineScale)
                font.pixelSize: fontSize
                anchors.left: parent.left
                anchors.top: parent.top
                anchors.topMargin: -15
            }

            DexLabel
            {
                id: price_diff_text
                anchors.top: parent.top
                anchors.topMargin: -15
                anchors.horizontalCenter: parent.horizontalCenter
                color: parseFloat(cexPriceDiff) <= 0 ? Dex.CurrentTheme.okColor : Dex.CurrentTheme.warningColor
                text_value: (parseFloat(cexPriceDiff) > 0 ? qsTr("Expensive") : qsTr("Expedient")) + ":&nbsp;&nbsp;&nbsp;&nbsp;" + qsTr("%1 compared to CEX", "PRICE_DIFF%").arg("<b>" + General.formatPercent(General.limitDigits(cexPriceDiff)) + "</b>")
                font.pixelSize: fontSizeBigger
            }

            DexLabel
            {
                text_value: General.formatPercent(-lineScale)
                font.pixelSize: fontSize
                anchors.top: parent.top
                anchors.topMargin: -15
                anchors.right: parent.right
            }
        }
    }
}
