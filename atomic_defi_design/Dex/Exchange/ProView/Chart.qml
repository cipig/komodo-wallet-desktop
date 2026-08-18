import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import QtWebEngine 1.10
import "../../Components"
import "../../Constants"
import Dex.Themes 1.0 as Dex
import AtomicDEX.MarketMode 1.0

Item
{
    id: root
    implicitWidth: 530
    implicitHeight: 300

    readonly property string theme: Dex.CurrentTheme.getColorMode() === Dex.CurrentTheme.ColorMode.Dark ? "dark" : "light"
    property string loaded_symbol
    property bool pair_supported: false
    property string selected_testcoin

    onPair_supportedChanged: if (!pair_supported) webEngineViewPlaceHolder.visible = false

    Timer {
        id: startupTimer
        interval: 0
        running: false
        repeat: false
        onTriggered: {
            try {
                loadChart(left_ticker ?? atomic_app_primary_coin,
                          right_ticker ?? atomic_app_secondary_coin)
            } catch (e) { console.error(e) }
        }
    }

    Component.onCompleted: startupTimer.start()

    function loadChart(right_ticker, left_ticker, force = false, source="coinpaprika")
    {
        let chart_html = ""
        let symbol = ""
        selected_testcoin = ""
        let rel_ticker = General.getChartID(right_ticker)
        let base_ticker = General.getChartID(left_ticker)

        if (General.is_testcoin(left_ticker))
        {
            pair_supported = false
            selected_testcoin = left_ticker
            console.log("no chart, testcoin", selected_testcoin)
            return
        }
        if (General.is_testcoin(right_ticker))
        {
            pair_supported = false
            selected_testcoin = right_ticker
            console.log("no chart, testcoin", selected_testcoin)
            return
        }
        if (rel_ticker != "" && base_ticker != "")
        {
            pair_supported = true
            symbol = rel_ticker+"-"+base_ticker

            if (symbol === loaded_symbol && !force)
            {
                webEngineViewPlaceHolder.visible = true
                console.log("symbol === loaded_symbol, ok")
                return
            }
        }

        if (source == "livecoinwatch" && pair_supported)
        {
            let widget_x = 390
            let widget_y = 200
            let scale_x = root.implicitWidth / widget_x
            let scale_y = root.implicitHeight / widget_y

            chart_html = `
            <style>
                body { margin: auto; }
                .livecoinwatch-widget-1 {
                    transform: scale(${Math.min(scale_x, scale_y)});
                    transform-origin: top left;
                }
                a { pointer-events: none; }
            </style>
            <script defer src="https://www.livecoinwatch.com/static/lcw-widget.js"></script>
            <div class="livecoinwatch-widget-1" lcw-coin="${rel_ticker}" lcw-base="${API.app.settings_pg.current_currency}" lcw-secondary="${base_ticker}" lcw-period="m" lcw-color-tx="${Dex.CurrentTheme.foregroundColor}" lcw-color-pr="#58c7c5" lcw-color-bg="${Dex.CurrentTheme.comboBoxBackgroundColor}" lcw-border-w="0" lcw-digits="9" ></div>
            `
        }

        if (source == "coingecko" && pair_supported)
        {
            chart_html = `
            <script src="https://widgets.coingecko.com/gecko-coin-price-chart-widget.js"></script>
            <gecko-coin-price-chart-widget locale="en" dark-mode="true" outlined="true" coin-id="${rel_ticker}" initial-currency="${API.app.settings_pg.current_currency}" width="${root.implicitWidth}" height="${root.implicitHeight}"></gecko-coin-price-chart-widget>
            `
        }

        if (source == "coinpaprika" && pair_supported)
        {
            let widget_x = 570
            let widget_y = 600
            let scale_x = root.implicitWidth / widget_x
            let scale_y = root.implicitHeight / widget_y

            chart_html = `
            <style>
                body { margin: auto; }
                .coinpaprika-currency-widget {
                    transform: scale(${Math.min(scale_x, scale_y)});
                    transform-origin: top left;
                }
                a { pointer-events: none; }
            </style>
            <script type="text/javascript" src="https://unpkg.com/@coinpaprika/widget-currency@2.0.13/dist/widget.min.js"></script>
            <div class="coinpaprika-currency-widget cp-widget__night-mode" data-primary-currency="${API.app.settings_pg.current_currency}" data-currency="${rel_ticker}" data-custom-date="false" data-start-date="0" data-end-date="0" data-modules='["market_details","chart"]' data-update-active="false"></div>
            `
        }

        console.log(chart_html)
        dashboard.webEngineView.loadHtml(chart_html)
    }

    Item {
        anchors.fill: parent
        visible: !webEngineViewPlaceHolder.visible

        Row {
            anchors.centerIn: parent
            spacing: 10

            DefaultBusyIndicator {
                visible: pair_supported
                scale: 0.5
            }

            DexLabel {
                text_value: {
                    if (pair_supported) return qsTr("Loading pair chart data") + "..."
                    if (selected_testcoin !== "") return qsTr("There is no chart data for %1 (testcoin) pairs").arg(selected_testcoin)
                    return qsTr("There is no chart data for this pair")
                }
            }
        }
    }

    Item
    {
        id: webEngineViewPlaceHolder
        anchors.fill: parent
        anchors.centerIn: parent
        visible: true

        Component.onCompleted:
        {
            dashboard.webEngineView.parent = webEngineViewPlaceHolder
            dashboard.webEngineView.anchors.fill = webEngineViewPlaceHolder
        }
        Component.onDestruction:
        {
            dashboard.webEngineView.visible = false
            dashboard.webEngineView.stop()
        }
        onVisibleChanged: dashboard.webEngineView.visible = visible

        Connections
        {
            target: dashboard.webEngineView

            function onLoadingChanged(webEngineLoadReq)
            {
                if (webEngineLoadReq.status === WebEngineView.LoadSucceededStatus)
                {
                    webEngineViewPlaceHolder.visible = true
                }
                else webEngineViewPlaceHolder.visible = false
            }
        }
    }

    MouseArea {
        id: chart_mousearea
        anchors.fill: webEngineViewPlaceHolder
    }

    Connections
    {
        target: app
        function onPairChanged(left, right)
        {
            if (API.app.trading_pg.market_mode == MarketMode.Sell)
            {
                root.loadChart(left, right)
            }
            else
            {
                root.loadChart(right, left)
            }
        }
    }

    Connections
    {
        target: Dex.CurrentTheme
        function onThemeChanged()
        {
            loadChart(left_ticker?? atomic_app_primary_coin,
                      right_ticker?? atomic_app_secondary_coin,
                      true)
        }
    }
}
