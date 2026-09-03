import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import "../Qaterial" as Qaterial
import AtomicDEX.CoinType 1.0
import "../Components"
import "../Constants"
import App 1.0
import Dex.Themes 1.0 as Dex

MultipageModal
{
    id: root
    horizontalPadding: 30
    verticalPadding: 30
    width: 600

    property var coin_cfg_model: API.app.portfolio_pg.global_cfg_mdl

    function setCheckState(checked) 
    {
        coin_cfg_model.all_disabled_proxy.set_all_state(checked)
    }

    function filterCoins(text) 
    {
        coin_cfg_model.all_disabled_proxy.setFilterFixedString(text === undefined ? input_coin_filter.textField.text : text)
    }

    onOpened: 
    {
        filterCoins("");
        setCheckState(false);
        coin_cfg_model.checked_nb = 0;
    }

    onClosed: 
    {
        filterCoins("");
        setCheckState(false);
        coin_cfg_model.checked_nb = 0;
    }

    ColumnLayout
    {
        spacing: 5
        Layout.fillWidth: true
        Layout.fillHeight: true

        // Search input
        SearchField
        {
            id: input_coin_filter
            searchIconLeftMargin: 20
            Layout.alignment: Qt.AlignHCenter
            Layout.topMargin: 15
            Layout.fillWidth: true
            Layout.preferredHeight: 40
            textField.placeholderText: qsTr("Search assets")
            textField.forceFocus: true
            textField.onTextChanged: filterCoins()
        }

        MultipageModalContent
        {
            titleTopMargin: 0
            topMarginAfterTitle: 0
            spacing: 5
            flickMax: window.height - 20

            RowLayout
            {
                spacing: 0
                Layout.topMargin: 10
                Layout.fillWidth: true
                Layout.preferredHeight: 24

                DefaultCheckBox
                {
                    id: _selectAllCheckBox
                    Layout.fillWidth: true
                    spacing: 0
                    boxWidth: 20
                    boxHeight: 20
                    labelWidth: parent.width - 40
                    label.wrapMode: Label.NoWrap
                    label.leftPadding: 24
                    text: qsTr("Select all assets")
                    visible: list.visible

                    onToggled: root.setCheckState(checked)
                }
            }

            HorizontalLine { Layout.topMargin: 5; Layout.alignment: Qt.AlignHCenter; Layout.fillWidth: true }

            DefaultListView
            {
                id: list
                visible: coin_cfg_model.all_disabled_proxy.length > 0
                model: coin_cfg_model.all_disabled_proxy
                Layout.topMargin: 5
                Layout.alignment: Qt.AlignHCenter
                Layout.preferredHeight: window.height - 400
                Layout.fillWidth: true

                Component.onCompleted: {
                    positionViewAtBeginning()
                }

                delegate: Item
                {
                    height: 30
                    width: list.width

                    RowLayout
                    {
                        spacing: 0
                        Layout.topMargin: 10
                        Layout.fillWidth: true
                        Layout.preferredHeight: 24

                        DefaultCheckBox
                        {
                            id: listInnerRowCheckbox
                            Layout.fillWidth: true
                            spacing: 0
                            boxWidth: 20
                            boxHeight: 20
                            labelWidth: parent.width - 40

                            readonly property bool backend_checked: model.checked

                            onBackend_checkedChanged: if (checked !== backend_checked) checked = backend_checked

                            onCheckStateChanged:
                            {
                                if (checked !== backend_checked)
                                {
                                    var data_index = coin_cfg_model.all_disabled_proxy.index(index, 0)
                                    if ((coin_cfg_model.all_disabled_proxy.setData(data_index, checked, Qt.UserRole + 9)) === false)
                                    {
                                        checked = false
                                    }
                                }
                            }

                            contentItem: RowLayout
                            {
                                Layout.alignment: Qt.AlignVCenter
                                spacing: 0

                                // Icon
                                DefaultImage
                                {
                                    id: icon
                                    Layout.leftMargin: 24
                                    Layout.alignment: Qt.AlignVCenter
                                    source: General.coinIcon(model.ticker)
                                    Layout.preferredWidth: 18
                                    Layout.preferredHeight: 18
                                }

                                DexLabel
                                {
                                    Layout.leftMargin: 4
                                    Layout.alignment: Qt.AlignVCenter
                                    text: model.name + " (" + model.ticker + ")"
                                }

                                CoinTypeTag
                                {
                                    id: typeTag
                                    Layout.leftMargin: 6
                                    Layout.alignment: Qt.AlignVCenter
                                    type: model.type
                                }

                                CoinTypeTag
                                {
                                    Layout.leftMargin: 6
                                    Layout.alignment: Qt.AlignVCenter
                                    enabled: API.app.portfolio_pg.global_cfg_mdl.get_coin_info(model.ticker).is_wallet_only
                                    visible: enabled
                                    type: "WALLET ONLY"
                                }
                            }
                        }
                    }

                    DefaultMouseArea
                    {
                        anchors.fill: parent
                        onClicked: listInnerRowCheckbox.checked = !listInnerRowCheckbox.checked
                    }
                }
            }
        }

        // Footer
        RowLayout
        {
            id: _footer
            Layout.topMargin: Style.rowSpacing
            spacing: Style.buttonSpacing
            height: 40

            CancelButton
            {
                Layout.preferredWidth: 200
                text: qsTr("Cancel")
                radius: 18
                onClicked: root.close()
            }

            Item { Layout.fillWidth: true }

            DexAppOutlineButton
            {
                Layout.preferredWidth: 200
                visible: coin_cfg_model.length > 0
                enabled: coin_cfg_model.checked_nb > 0
                text: qsTr("Enable")
                radius: 18

                onClicked:
                {
                    API.app.enable_coins(coin_cfg_model.get_checked_coins());
                    root.setCheckState(false);
                    coin_cfg_model.checked_nb = 0
                    root.close()
                }
            }
        }
    }
}
