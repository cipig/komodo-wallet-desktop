import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import App 1.0
import "../../../Components"
import "../../../"
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
            Layout.fillHeight: true
        }

        DefaultListView
        {
            id: list
            clip: true
            Layout.fillWidth: true
            Layout.preferredHeight: is_history ? parent.height - 70 : parent.height

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

        Item
        {
            Layout.fillHeight: true
        }

        // Pagination
        DexPaginator
        {
            visible: is_history && list.count > 0
            enabled: list.enabled
            Layout.maximumHeight: 70
            Layout.fillWidth: true
            Layout.bottomMargin: 10
            itemsPerPageComboBox.mainBackgroundColor: Dex.CurrentTheme.comboBoxBackgroundColor
            itemsPerPageComboBox.popupBackgroundColor: Dex.CurrentTheme.comboBoxBackgroundColor
        }
    }

    DexLabel
    {
        visible: list.count === 0
        anchors.centerIn: parent
        text: qsTr("No results found")
    }
}
