import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import App 1.0
import "../../../Components"
import Dex.Themes 1.0 as Dex

Item
{
    id: root
    property string title
    property var    items
    property bool   is_history: false

    ColumnLayout
    {
        width: parent.width
        height: parent.height
        anchors.horizontalCenter: parent.horizontalCenter

        HorizontalLine
        {
            Layout.fillWidth: true
            Layout.preferredHeight: 1
            Layout.maximumHeight: 1
        }

        DefaultListView
        {
            id: list
            clip: true
            Layout.fillWidth: true
            Layout.fillHeight: true
            model: items.orders_proxy_mdl
            enabled: !is_history || !API.app.orders_mdl.fetching_busy
            visible: enabled

            // Row
            delegate: OrderLine
            {
                details: model
                opacity: 1
                width: list.width
            }
        }

        DexPaginator
        {
            id: historyPaginator
            visible: is_history && list.count > 0
            enabled: list.enabled
            Layout.maximumHeight: 50
            Layout.preferredHeight: visible ? 50 : 0
            Layout.fillWidth: true
            Layout.bottomMargin: 10
            itemsPerPageComboBox.mainBackgroundColor: Dex.CurrentTheme.comboBoxBackgroundColor
            itemsPerPageComboBox.popupBackgroundColor: Dex.CurrentTheme.comboBoxBackgroundColor
            property bool syncingFromModel: false

            onCurrentValueChanged: {
                if (syncingFromModel) return
                if (API.app.orders_mdl.current_page !== historyPaginator.currentValue) {
                    list.currentIndex = -1
                    API.app.orders_mdl.current_page = historyPaginator.currentValue
                }
            }

            Connections {
                target: historyPaginator.itemsPerPageComboBox
                function onCurrentValueChanged() {
                    list.currentIndex = -1
                    API.app.orders_mdl.limit_nb_elements = historyPaginator.itemsPerPageComboBox.currentValue
                }
            }

            Connections {
                target: API.app.orders_mdl
                function onCurrentPageChanged() {
                    if (historyPaginator.currentValue !== API.app.orders_mdl.current_page) {
                        historyPaginator.syncingFromModel = true
                        historyPaginator.currentValue = API.app.orders_mdl.current_page
                        historyPaginator.syncingFromModel = false
                    }
                }
            }
        }
    }

    DexLabel
    {
        visible: list.count === 0
        anchors.centerIn: parent
        text: qsTr("No results found")
    }
}
