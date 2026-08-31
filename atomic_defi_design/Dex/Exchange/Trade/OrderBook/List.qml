import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import "../../../Qaterial" as Qaterial
import App 1.0

Item
{
    id: _control
    implicitWidth: 100
    implicitHeight: 200

    property bool isAsk

    ListView
    {
        id: orderbook_list
        anchors.fill: parent
        model: isAsk ? API.app.trading_pg.orderbook.asks.proxy_mdl : API.app.trading_pg.orderbook.bids.proxy_mdl
        reuseItems: true
        spacing: 8
        opacity: API.app.trading_pg.maker_mode ? 0.6 : 1
        clip: true

        Component.onCompleted: {
            if (isAsk) { positionViewAtEnd() }
            else { positionViewAtBeginning() }
        }

        onContentHeightChanged:
        {
            if (isAsk){
                // Duplication is intended. Sometimes data takes too long to load so slowscroll is a backup. 
                slowscroll_timer.start();
                quickscroll_timer.start()
            } 
        }

        delegate: ListDelegate
        {
            width: _control.width
            height: 24
            isAsk: _control.isAsk
        }

        Timer
        {
            id: slowscroll_timer
            interval: 1500
            onTriggered:
            {
                orderbook_list.positionViewAtEnd()
            }
        }
        Timer
        {
            id: quickscroll_timer
            interval: 500
            onTriggered:
            {
                orderbook_list.positionViewAtEnd()
            }
        }
        onModelChanged: {
            if (isAsk) quickscroll_timer.start()
        }
    }

    Connections {
        target: API.app.trading_pg

        function onMarketModeChanged()
        {
            if (isAsk)
            {
                quickscroll_timer.start()
            }
        }
        function onOrderbookChanged()
        {
            if (isAsk)
            {
                quickscroll_timer.start()
            }
        }
        function onMarketPairsChanged()
        {
            if (isAsk)
            {
                quickscroll_timer.start()
            }
        }
    }
}
