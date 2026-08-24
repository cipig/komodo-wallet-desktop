import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import Qaterial 1.0 as Qaterial
import Dex.Themes 1.0 as Dex
import Dex.Components 1.0 as Dex
import AtomicDEX.MarketMode 1.0
import "../../../Constants"
import "../../../Components"
import "../../Trade"
import "../../ProView"

ColumnLayout {
    id: root
    Layout.fillWidth: true 
    Layout.maximumWidth: 570
    Layout.fillHeight: true
    spacing: 0

    property alias currentIndex: tabView.currentIndex

    function refreshChart()
    {
        chart.loadChart(API.app.trading_pg.market_pairs_mdl.left_selected_coin,
                        API.app.trading_pg.market_pairs_mdl.right_selected_coin)
    }

    Qaterial.LatoTabBar {
        id: tabView
        Layout.fillWidth: true
        Layout.leftMargin: 6
        background: null

        property int pair_chart_idx: 0
        property int order_idx: 1
        property int history_idx: 2

        Qaterial.LatoTabButton {
            text: qsTr("Chart")
            font.pixelSize: 14
            textColor: checked ? Dex.CurrentTheme.foregroundColor : Dex.CurrentTheme.foregroundColor2
            textSecondaryColor: Dex.CurrentTheme.foregroundColor2
            indicatorColor: Dex.CurrentTheme.foregroundColor
        }
        Qaterial.LatoTabButton {
            text: qsTr("Orders")
            font.pixelSize: 14
            textColor: checked ? Dex.CurrentTheme.foregroundColor : Dex.CurrentTheme.foregroundColor2
            textSecondaryColor: Dex.CurrentTheme.foregroundColor2
            indicatorColor: Dex.CurrentTheme.foregroundColor
        }
        Qaterial.LatoTabButton {
            text: qsTr("History")
            font.pixelSize: 14
            textColor: checked ? Dex.CurrentTheme.foregroundColor : Dex.CurrentTheme.foregroundColor2
            textSecondaryColor: Dex.CurrentTheme.foregroundColor2
            indicatorColor: Dex.CurrentTheme.foregroundColor
        }
    }

    Rectangle {
        Layout.fillWidth: true
        Layout.fillHeight: true
        color: Dex.CurrentTheme.floatingBackgroundColor
        radius: 10

        Qaterial.SwipeView {
            id: swipeView
            interactive: false
            currentIndex: tabView.currentIndex
            anchors.fill: parent
            clip: true

            Item {
                id: chartPageWrapper
                implicitWidth: swipeView.width
                implicitHeight: swipeView.height

                ColumnLayout {
                    anchors.fill: parent
                    anchors.topMargin: 8
                    spacing: 6
                    visible: swipeView.currentIndex === tabView.pair_chart_idx

                    TickerSelectors {
                        id: selectors
                        Layout.fillWidth: true
                        Layout.preferredHeight: 85
                        Layout.leftMargin: 8
                        Layout.rightMargin: 8
                    }

                    Chart {
                        id: chart
                        Layout.preferredWidth: 570
                        Layout.fillWidth: true
                        Layout.preferredHeight: 550
                        Layout.fillHeight: true
                    }

                    PriceLineSimplified {
                        id: price_line
                        Layout.fillWidth: true
                        Layout.preferredHeight: 95
                        Layout.bottomMargin: 4
                        Layout.leftMargin: 8
                        Layout.rightMargin: 8
                    }
                }
            }

            Loader {
                id: ordersLoader
                active: swipeView.currentIndex === tabView.order_idx
                sourceComponent: OrdersPage { is_history: false }
            }

            Loader {
                id: historyLoader
                active: swipeView.currentIndex === tabView.history_idx
                sourceComponent: OrdersPage { is_history: true }
            }

            onCurrentIndexChanged: {
                if (currentIndex === tabView.order_idx && ordersLoader.item) {
                    ordersLoader.item.page_index = currentIndex
                    ordersLoader.item.update()
                } else if (currentIndex === tabView.history_idx && historyLoader.item) {
                    historyLoader.item.page_index = currentIndex
                    historyLoader.item.update()
                }
            }
        }
    }
}
