import QtQuick 2.15
import QtQuick.Layouts 1.15
import "../Qaterial" as Qaterial
import Dex.Themes 1.0 as Dex
import Dex.Components 1.0 as Dex
import "../Constants" as Dex

Dex.MultipageModal
{
    id: root

    property var contactModel: { "name": "", "categories": [] }

    Dex.MultipageModalContent
    {
        titleText: qsTr("Edit contact")
        titleTopMargin: 0
        titleAlignment: Qt.AlignHCenter
        contentSpacing: 24
        flickMax: window.height - 40

        Dex.TextFieldWithTitle
        {
            id: contactNameInput
            title: qsTr("Contact name")
            field.placeholderText: qsTr("Enter a contact name")
            field.text: contactModel.name
            field.onTextChanged: if (field.text.length > 30) field.text = field.text.substring(0, 30)
        }

        Column
        {
            id: addressList
            property bool contactAddAddressMode: false
            Layout.fillWidth: true
            spacing: 18

            Dex.Text
            {
                text: qsTr("Address list")
            }

            Dex.ListView
            {
                id: addressListView
                visible: !addressList.contactAddAddressMode
                model: contactModel.proxyFilter
                spacing: 10
                height: contentHeight > 190 ? 190 : contentHeight
                width: parent.width

                delegate: Dex.MouseArea
                {
                    id: addressRowMouseArea
                    width: addressListView.width
                    height: 90
                    hoverEnabled: true

                    Dex.Rectangle
                    {
                        visible: parent.containsMouse
                        anchors.fill: parent
                        radius: 18
                        color: Dex.CurrentTheme.accentColor
                    }

                    ColumnLayout
                    {
                        id: delegateLayout
                        anchors.fill: parent
                        anchors.leftMargin: 15
                        anchors.rightMargin: 15
                        spacing: 2

                        property var coinInfo: Dex.API.app.portfolio_pg.global_cfg_mdl.get_coin_info(address_type)

                        RowLayout
                        {
                            Layout.fillWidth: true
                            Layout.preferredHeight: 30
                            spacing: 10

                            Item {
                                Layout.preferredWidth: 25
                                Layout.preferredHeight: 25
                                Layout.alignment: Qt.AlignVCenter
                                Dex.Image {
                                    anchors.fill: parent
                                    source: Dex.General.coinIcon(address_type.toLowerCase())
                                }
                            }

                            Dex.Text {
                                text: address_type
                                Layout.alignment: Qt.AlignVCenter
                            }

                            Dex.Text {
                                text: delegateLayout.coinInfo ? delegateLayout.coinInfo.type : ""
                                color: Dex.Style.getCoinTypeColor(text)
                                font: Dex.DexTypo.overLine
                                Layout.alignment: Qt.AlignVCenter
                            }

                            Item { Layout.fillWidth: true }

                            Dex.ClickableText
                            {
                                Layout.alignment: Qt.AlignVCenter
                                visible: addressRowMouseArea.containsMouse
                                text: qsTr("Edit")
                                font.underline: true
                                onClicked:
                                {
                                    addAddressForm.editionMode = true
                                    addAddressForm.addressType = address_type
                                    addAddressForm.addressKey = address_key
                                    addAddressForm.addressValue = address_value
                                    addressList.contactAddAddressMode = true
                                }
                            }

                            Dex.Button
                            {
                                Layout.alignment: Qt.AlignVCenter
                                Layout.preferredWidth: 30
                                Layout.preferredHeight: 30
                                radius: 18
                                visible: addressRowMouseArea.containsMouse
                                iconSource: "qrc:/assets/images/qaterial/send-outline.svg"
                                onClicked: trySend(address_value, address_type)
                            }

                            Dex.Button
                            {
                                Layout.alignment: Qt.AlignVCenter
                                Layout.preferredWidth: 16
                                Layout.preferredHeight: 16
                                color: "transparent"
                                visible: addressRowMouseArea.containsMouse
                                iconSource: "qrc:/assets/images/qaterial/close.svg"
                                onClicked: contactModel.removeAddressEntry(address_type, address_key)
                            }
                        }

                        Dex.Text {
                            text: address_key
                            Layout.leftMargin: 35
                            Layout.fillWidth: true
                            font: Dex.DexTypo.caption
                            color: Dex.CurrentTheme.foregroundColor2
                            elide: Text.ElideRight
                        }

                        RowLayout {
                            Layout.fillWidth: true
                            Layout.leftMargin: 35
                            Layout.bottomMargin: 6
                            spacing: 5

                            Dex.Text {
                                text: address_value
                                Layout.fillWidth: true
                                font: Dex.DexTypo.caption
                                elide: Text.ElideRight
                            }

                            Dex.Button {
                                Layout.alignment: Qt.AlignVCenter
                                Layout.preferredWidth: 16
                                Layout.preferredHeight: 16
                                color: "transparent"
                                iconSource: "qrc:/assets/images/qaterial/content-copy.svg"
                                onClicked:
                                {
                                    Dex.API.qt_utilities.copy_text_to_clipboard(address_value)
                                    app.notifyCopy(qsTr("Address Book"), qsTr("address copied to clipboard"))
                                }
                            }
                        }
                    }
                }
            }

            Dex.Button
            {
                visible: !addressList.contactAddAddressMode
                anchors.horizontalCenter: parent.horizontalCenter
                text: qsTr("+ Add Address")
                width: 211
                height: 38
                radius: 18
                onClicked: addressList.contactAddAddressMode = true
            }

            AddAddressForm
            {
                id: addAddressForm
                visible: addressList.contactAddAddressMode
                contactModel: root.contactModel
                onCancel: addressList.contactAddAddressMode = false
                onAddressCreated: addressList.contactAddAddressMode = false
            }
        }

        Column
        {
            Layout.fillWidth: true
            spacing: 12

            Dex.Text
            {
                text: qsTr("Tags")
            }

            Dex.ListView
            {
                width: parent.width
                model: contactModel.categories
                orientation: Qt.Horizontal
                spacing: 4
                delegate: Dex.MouseArea
                {
                    width: tagBg.width + tagRemoveBut.width + 2
                    height: tagBg.height
                    hoverEnabled: true

                    Dex.Rectangle
                    {
                        id: tagBg
                        property int _currentColorIndex: contactTable._getCurrentTagColorId()
                        anchors.verticalCenter: parent.verticalCenter
                        width: tagLabel.width + 12
                        height: 20
                        radius: 18
                        color: Dex.CurrentTheme.addressBookTagColors[_currentColorIndex]

                        Dex.Text
                        {
                            id: tagLabel
                            anchors.centerIn: parent
                            text: modelData
                            color: "white"
                        }
                    }

                    Dex.Button
                    {
                        id: tagRemoveBut
                        visible: parent.containsMouse
                        anchors.left: tagBg.right
                        anchors.leftMargin: 2
                        anchors.verticalCenter: parent.verticalCenter
                        width: 16
                        height: 16
                        color: "transparent"
                        iconSource: "qrc:/assets/images/qaterial/close.svg"
                        onClicked: contactModel.removeCategory(modelData)
                    }
                }
            }

            Dex.Button
            {
                iconSource: "qrc:/assets/images/qaterial/plus.svg"
                text: qsTr("Add tag")
                font: Dex.DexTypo.body2
                color: "transparent"
                onClicked: addTagPopup.open()

                AddTagPopup
                {
                    y: -10
                    x: parent.width + 10
                    id: addTagPopup
                }
            }
        }

        footer:
        [
            Dex.CancelButton
            {
                Layout.preferredWidth: 200
                Layout.preferredHeight: 40
                radius: 18
                text: qsTr("Cancel Updates")
                onClicked: root.close()
            },

            Item { Layout.fillWidth: true },

            Dex.GradientButton
            {
                Layout.preferredWidth: 200
                Layout.preferredHeight: 40
                radius: 18
                text: qsTr("Save Updates")
                onClicked:
                {
                    contactModel.name = contactNameInput.field.text
                    contactModel.save()
                    root.close()
                }
            }
        ]
    }
}
