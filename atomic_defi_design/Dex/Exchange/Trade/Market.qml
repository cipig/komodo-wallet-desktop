import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import "../../Qaterial" as Qaterial
import Dex.Themes 1.0 as Dex
import "../../Components"
import "../../Constants"
import "OrderBook/" as OrderBook
import "BestOrder/" as BestOrder

ColumnLayout
{
    Layout.fillWidth: true
    Layout.maximumWidth: 350
    Layout.fillHeight: true
    spacing: 0

    property alias currentIndex: marketTabView.currentIndex

    Qaterial.LatoTabBar
    {
        id: marketTabView
        Layout.fillWidth: true
        Layout.leftMargin: 6
        background: null

        property int orderbook: 0
        property int best_orders: 1

        Qaterial.LatoTabButton
        {
            text: qsTr("Orderbook")
            font.pixelSize: 14
            textColor: checked ? Dex.CurrentTheme.foregroundColor : Dex.CurrentTheme.foregroundColor2
            textSecondaryColor: Dex.CurrentTheme.foregroundColor2
            indicatorColor: Dex.CurrentTheme.foregroundColor
        }
        Qaterial.LatoTabButton
        {
            text: qsTr("Best Orders")
            font.pixelSize: 14
            textColor: checked ? Dex.CurrentTheme.foregroundColor : Dex.CurrentTheme.foregroundColor2
            textSecondaryColor: Dex.CurrentTheme.foregroundColor2
            indicatorColor: Dex.CurrentTheme.foregroundColor
        }
    }

    Rectangle
    {
        Layout.preferredWidth: 350
        Layout.fillHeight: true
        color: Dex.CurrentTheme.floatingBackgroundColor
        radius: 10

        Qaterial.SwipeView
        {
            id: marketSwipeView
            interactive: false
            currentIndex: marketTabView.currentIndex
            anchors.fill: parent
            clip: true

            OrderBook.Vertical
            {
                id: orderBook
                page_index: currentIndex
            }

            BestOrder.List
            {
                id: bestOrders
                page_index: currentIndex
            }

            onCurrentIndexChanged:
            {
                marketSwipeView.currentItem.update();
            }
        }
    }
}
