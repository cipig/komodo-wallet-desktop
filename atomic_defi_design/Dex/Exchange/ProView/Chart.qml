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
    implicitWidth: 570
    implicitHeight: parent.height

    readonly property bool dark_theme: Dex.CurrentTheme.getColorMode() === Dex.CurrentTheme.ColorMode.Dark
    property bool pair_supported: false
    property string activeChartKey: ""

    onPair_supportedChanged: if (!pair_supported) webEngineViewPlaceHolder.visible = false

    function loadChart(right_ticker, left_ticker, source="coinpaprika")
    {
        let chart_url = ""
        let chart_html = ""
        let rel_ticker = ""
        let base_ticker = ""

        if (source == "coingecko")
        {
            rel_ticker = API.app.portfolio_pg.global_cfg_mdl.get_coin_info(right_ticker).coingecko_id
            base_ticker = ""
            if (rel_ticker != "")
            {
                pair_supported = true
                chart_url = "https://widgets.coingecko.com"
                chart_html = `
                <link rel="icon" href="data:,">
                <gecko-coin-price-chart-widget locale="en" dark-mode="${dark_theme}" transparent-background="true" coin-id="${rel_ticker}" initial-currency="usd" width="${root.implicitWidth}" height="${root.implicitHeight}"></gecko-coin-price-chart-widget>
                <script src="https://widgets.coingecko.com/gecko-coin-price-chart-widget.js"></script>
                `
            }
            else
            {
                pair_supported = false
                source = "coinpaprika"
            }
        }

        // https://npm.io/package/%40coinpaprika/widget-currency
        // https://github.com/coinpaprika/widget-currency
        if (source == "coinpaprika")
        {
            rel_ticker = API.app.portfolio_pg.global_cfg_mdl.get_coin_info(right_ticker).coinpaprika_id
            base_ticker = ""
            if (rel_ticker != "")
            {
                pair_supported = true
                let night_mode = dark_theme ? "cp-widget__night-mode" : ""
                chart_url = `https://coinpaprika.com/coin/${rel_ticker}/`
                chart_html = `
                <link rel="icon" href="data:,">
                <style>
                  .coinpaprika-currency-widget {
                    height: 100% !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                    overflow: hidden !important;
                    position: relative !important;
                  }
                  .coinpaprika-currency-widget .cp-widget__main,
                  .coinpaprika-currency-widget .cp-widget__chart,
                  .coinpaprika-currency-widget .cp-widget__chart > div {
                    display: block !important;
                    height: 100% !important;
                    max-height: 100% !important;
                  }
                  .coinpaprika-currency-widget .cp-widget__volume-toggle {
                    position: absolute !important;
                    white-space: nowrap !important;
                    display: inline-flex !important;
                    align-items: center !important;
                    right: 15px !important;
                    bottom: 46px !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    transform: none !important;
                  }
                  .coinpaprika-currency-widget .cp-widget__footer {
                    position: absolute !important;
                    bottom: 5px !important;
                    right: 20px !important;
                    z-index: 100 !important;
                    background: transparent !important;
                    margin: 0 !important;
                    padding: 0 !important;
                  }
                  .coinpaprika-currency-widget .cp-widget__main h3 a,
                  .coinpaprika-currency-widget .cp-widget__footer a {
                    pointer-events: none !important;
                  }
                </style>
                <div class="coinpaprika-currency-widget ${night_mode}"
                     data-primary-currency="${API.app.settings_pg.current_currency}"
                     data-currency="${rel_ticker}"
                     data-icon-src="${General.coinIcon(right_ticker)}"
                     data-language="en"
                     data-range="30d"
                     data-modules='["chart"]'
                     data-update-active="false"
                     data-volume-visible="false"></div>
                <script
                    src="qrc:/coinpaprika/dist/widget.min.js"
                    data-cp-currency-widget='{
                        "origin-src": "https://unpkg.com/@coinpaprika/widget-currency@2.0.13",
                        "img-src": "qrc:/coinpaprika/dist/img/logo_widget.svg",
                        "style-src": "qrc:/coinpaprika/dist/widget.min.css"
                    }'>
                </script>
                <script>
                  window.addEventListener('load', function() {
                    window.dispatchEvent(new Event('resize'));
                  });
                </script>
                `
            }
            else
            {
                pair_supported = false
                source = "livecoinwatch"
            }
        }

        if (source == "livecoinwatch")
        {
            rel_ticker = API.app.portfolio_pg.global_cfg_mdl.get_coin_info(right_ticker).livecoinwatch_id
            base_ticker = API.app.portfolio_pg.global_cfg_mdl.get_coin_info(left_ticker).livecoinwatch_id
            if (rel_ticker != "" && base_ticker != "")
            {
                pair_supported = true
                let widget_x = 390
                let widget_y = 200
                let scale_x = root.implicitWidth / widget_x
                let scale_y = root.implicitHeight / widget_y
                chart_url = "https://www.livecoinwatch.com"
                chart_html = `
                <link rel="icon" href="data:,">
                <style>
                    body { margin: auto; overflow: hidden; }
                    .livecoinwatch-widget-1 {
                        transform: scale(${Math.min(scale_x, scale_y)});
                        transform-origin: top left;
                    }
                    a { pointer-events: none; }
                </style>
                <div class="livecoinwatch-widget-1"
                     lcw-coin="${rel_ticker}"
                     lcw-base="${API.app.settings_pg.current_currency}"
                     lcw-secondary="${base_ticker}"
                     lcw-period="m"
                     lcw-color-tx="${Dex.CurrentTheme.foregroundColor}"
                     lcw-color-pr="#58c7c5"
                     lcw-color-bg="${Dex.CurrentTheme.comboBoxBackgroundColor}"
                     lcw-border-w="0"
                     lcw-digits="9"></div>
                <script src="https://www.livecoinwatch.com/static/lcw-widget.js"></script>
                `
            }
            else
            {
                pair_supported = false
                source = ""
            }
        }

        const chartKey = [source, rel_ticker, base_ticker, dark_theme ? "dark" : "light"].join("|")
        if (activeChartKey === chartKey)
        {
            console.log("Skipping duplicate chart load:", chartKey)
            return
        }
        activeChartKey = chartKey

        dashboard.webEngineView.visible = false
        webEngineViewPlaceHolder.visible = false
        if (pair_supported)
        {
            //console.log(chart_html)
            dashboard.webEngineView.loadHtml(chart_html, chart_url)
        }
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
                else if (webEngineLoadReq.status === WebEngineView.LoadFailedStatus)
                {
                    webEngineViewPlaceHolder.visible = false
                    activeChartKey = ""
                }
            }
        }
    }

    Connections
    {
        target: app
        function onPairChanged(left, right)
        {
            // left/right needs to be "reinverted" before use (it is inverted somewhere else)
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
                      right_ticker?? atomic_app_secondary_coin)
        }
    }
}
