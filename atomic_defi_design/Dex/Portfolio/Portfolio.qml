import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import QtWebEngine 1.10
import QtGraphicalEffects 1.15
import Qaterial 1.0 as Qaterial
import ModelHelper 0.1
import "../Components"
import "../Constants" as Constants
import App 1.0
import Dex.Themes 1.0 as Dex

// Portfolio
Item {
    id: portfolio
    Layout.fillWidth: true
    Layout.fillHeight: true
    Layout.margins: 10

    readonly property int sort_by_name: 0
    readonly property int sort_by_value: 1
    readonly property int sort_by_change: 3
    readonly property int sort_by_trend: 4
    readonly property int sort_by_price: 5
    readonly property int sort_by_unset: 6
    property bool ascending: false
    property int current_sort: sort_by_value

    function applyCurrentSort() {
        switch (current_sort) {
        case sort_by_name:
            portfolio_coins.sort_by_name(ascending)
            break
        case sort_by_value:
            portfolio_coins.sort_by_currency_balance(ascending)
            break
        case sort_by_price:
            portfolio_coins.sort_by_currency_unit(ascending)
            break
        case sort_by_trend:
        case sort_by_change:
            portfolio_coins.sort_by_change_last24h(ascending)
            break
        }
    }

    DefaultFlickable {
        id: flick
        anchors.fill: parent
        anchors.topMargin: 16
        contentHeight: _column.height
        scrollbar_visible: false
        boundsBehavior: Flickable.StopAtBounds

        Column {
            id: _column
            topPadding: 0
            width: parent.width
            spacing: 16

            // Filters (search and balance)
            Item {
                width: parent.parent.width - 80
                anchors.horizontalCenter: parent.horizontalCenter
                height: 30
                visible: true

                Item {
                    anchors.fill: parent
                    anchors.topMargin: 5

                    RowLayout {
                        anchors.fill: parent

                        SearchField
                        {
                            id: coinSearchField
                            Layout.alignment: Qt.AlignVCenter
                            Layout.preferredWidth: 200
                            Layout.preferredHeight: 40
                            textField.placeholderText: qsTr("Search asset")
                            forceFocus: true
                            textField.font.pixelSize: Constants.Style.textSizeSmall3
                            textField.onTextChanged: portfolio_coins.setFilterFixedString(textField.text)
                            Component.onDestruction: portfolio_coins.setFilterFixedString("")
                        }

                        Item {
                            Layout.fillWidth: true
                        }

                        DefaultCheckBox
                        {
                            id: hide_zero_balance_checkbox
                            spacing: 2
                            label.wrapMode: Label.NoWrap
                            label.font.pixelSize: 14
                            text: qsTr("Show only coins with balance") + " <b>%1</b>".arg(qsTr("(%1/%2)").arg(coinsList.count).arg(portfolio_mdl.length))
                            textColor: Dex.CurrentTheme.foregroundColor2
                            checked: portfolio_coins.with_balance
                            onCheckedChanged: portfolio_coins.with_balance = checked
                            Component.onDestruction: portfolio_coins.with_balance = false
                        }
                    }
                }
            }

            AssetsList
            {
                id: coinsList
                width: parent.parent.width - 80
                Layout.preferredHeight: parent.height - 40
                anchors.horizontalCenter: parent.horizontalCenter
            }
        }
    }
}
