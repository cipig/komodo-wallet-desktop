import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import QtGraphicalEffects 1.15
import "../Qaterial" as Qaterial
import ModelHelper 0.1
import "../Components"
import "../Constants"
import App 1.0
import Dex.Themes 1.0 as Dex
import Dex.Components 1.0 as Dex

Qaterial.Dialog
{
    id: setting_modal
    property alias selectedMenuIndex: menu_list.currentIndex
    property var recommended_fiats: API.app.settings_pg.get_recommended_fiats()
    property var fiats: API.app.settings_pg.get_available_fiats()
    property var orders: API.app.orders_mdl.orders_proxy_mdl.ModelHelper
    readonly property date default_min_date: new Date("2019-01-01")
    readonly property date default_max_date: new Date(new Date().setDate(new Date().getDate()))

    width: 950
    height: 650
    padding: 20
    topPadding: 30
    bottomPadding: 30
    anchors.centerIn: parent
    dim: true
    modal: true
    title: "Settings"

    header: Item
    {}

    Overlay.modal: Item
    {
        Rectangle
        {
            anchors.fill: parent
            color: 'black'
            opacity: .7
        }
    }

    background: DefaultRectangle
    {
        color: DexTheme.backgroundColor
        border.width: 0
        radius: 18
    }

    Item
    {
        width: parent.width
        height: 60

        DexIconButton
        {
            anchors.right: parent.right
            anchors.rightMargin: 30
            iconSize: 30
            icon: "qrc:/assets/images/qaterial/close.svg"
            anchors.verticalCenter: parent.verticalCenter
            onClicked: setting_modal.close()
        }

        Row
        {
            anchors.verticalCenter: parent.verticalCenter
            leftPadding: 60

            DexLabel
            {
                id: settingLabel
                anchors.verticalCenter: parent.verticalCenter
                text: qsTr("Settings")

                font: Qt.font(
                {
                    pixelSize: 20,
                    letterSpacing: 0.15,
                    family: DexTypo.fontFamily,
                    weight: Font.Normal
                })
            }
        }

        Qaterial.DebugRectangle
        {
            anchors.fill: parent
            visible: false
        }
    }

    Item
    {
        width: parent.width
        height: parent.height - 110
        y: 60

        RowLayout
        {
            anchors.fill: parent

            Item
            {
                Layout.fillHeight: true
                Layout.preferredWidth: 280

                ListView
                {
                    id: menu_list
                    height: parent.height
                    width: 200
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.topMargin: 10
                    spacing: 5
                    currentIndex: 0
                    model: [qsTr("General"), qsTr("Language"), qsTr("User Interface"), qsTr("Security"), qsTr("About & Version")]

                    delegate: DefaultRectangle
                    {
                        width: parent.width
                        height: 60
                        radius: 18
                        border.width: 0

                        gradient: Gradient
                        {
                            orientation: Qt.Horizontal

                            GradientStop
                            {
                                position: 0.0
                                color: delegateMouseArea.containsMouse ? DexTheme.buttonColorEnabled : menu_list.currentIndex === index ? DexTheme.buttonColorHovered : 'transparent'
                            }

                            GradientStop
                            {
                                position: 1
                                color: 'transparent'
                            }
                        }

                        DexLabel
                        {
                            anchors.verticalCenter: parent.verticalCenter
                            text: modelData
                            width: parent.width
                            leftPadding: 20
                            font: Qt.font(
                            {
                                pixelSize: 17,
                                letterSpacing: 0.15,
                                family: DexTypo.fontFamily,
                                weight: Font.Normal
                            })
                        }

                        DefaultMouseArea
                        {
                            id: delegateMouseArea
                            hoverEnabled: true
                            anchors.fill: parent
                            onClicked: menu_list.currentIndex = index
                        }
                    }
                }
            }

            DefaultRectangle
            {
                Layout.fillHeight: true
                width: 1
                color: DexTheme.foregroundColor
                opacity: .10
            }

            Item
            {
                Layout.fillHeight: true
                Layout.fillWidth: true

                StackLayout
                {
                    anchors.fill: parent
                    currentIndex: menu_list.currentIndex

                    Item
                    {
                        anchors.margins: 10

                        Column
                        {
                            anchors.fill: parent
                            topPadding: 10
                            spacing: 15

                            // Notifications toggle
                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 50

                                DexLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    font: DexTypo.subtitle1
                                    text: qsTr("Enable Desktop Notifications")
                                }

                                Item { Layout.fillWidth: true }

                                DexSwitch
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Component.onCompleted: checked = API.app.settings_pg.notification_enabled
                                    onCheckedChanged: API.app.settings_pg.notification_enabled = checked
                                }
                            }

                            // Spam filter toggle
                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 50

                                DexLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    font: DexTypo.subtitle1
                                    text: qsTr("Hide Poison Transactions in History")
                                }

                                Item { Layout.fillWidth: true }

                                DexSwitch
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Component.onCompleted: checked = API.app.settings_pg.spamfilter_enabled
                                    onCheckedChanged: API.app.settings_pg.spamfilter_enabled = checked
                                }
                            }

                            SettingsButton
                            {
                                noBackground: true
                                width: parent.width - 30
                                height: 50
                                title: qsTr("Logs")
                                buttonText: qsTr("Open Folder")
                                onClicked: openLogsFolder()
                            }

                            // Sync date picker
                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 50

                                DexLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    font: DexTypo.subtitle1
                                    text: qsTr("ZHTLC sync date")
                                }

                                Item { Layout.fillWidth: true }

                                DefaultCheckBox
                                {
                                    id: use_sync_date_checkbox

                                    spacing: 2

                                    label.wrapMode: Label.NoWrap
                                    label.font.pixelSize: 14
                                    text: qsTr("use date sync")
                                    textColor: Dex.CurrentTheme.foregroundColor2
                                    Component.onCompleted: checked = API.app.settings_pg.get_use_sync_date()
                                    onToggled: {
                                        atomic_settings2.setValue(
                                            "UseSyncDate",
                                            checked
                                        )
                                    }
                                }

                                Item { Layout.fillWidth: true }

                                DatePicker
                                {
                                    id: sync_date
                                    enabled: use_sync_date_checkbox.checked
                                    titleText: qsTr("Sync Date")
                                    minimumDate: default_min_date
                                    maximumDate: default_max_date
                                    selectedDate: {
                                        var date = new Date(new Date(0).setUTCSeconds(API.app.settings_pg.get_pirate_sync_date()));
                                        console.log(API.app.settings_pg.get_pirate_sync_date());
                                        console.log(date);
                                        return date;
                                    }
                                    onAccepted: {
                                        atomic_settings2.setValue(
                                            "PirateSyncDate",
                                            parseInt(selectedDate.getTime().valueOf()/1000)
                                        )
                                    }
                                }
                            }

                            SettingsButton
                            {
                                width: parent.width - 30
                                height: 50
                                title: qsTr("Reset wallet configuration")
                                buttonText: qsTr("Reset")

                                onClicked:
                                {
                                    reset_dialog = app.showDialog(
                                    {
                                        title: qsTr("Reset wallet configuration"),
                                        text: qsTr("This will restart your wallet with default settings"),
                                        standardButtons: Dialog.Yes | Dialog.Cancel,
                                        yesButtonText: qsTr("Confirm"),
                                        cancelButtonText: qsTr("Cancel"),
                                        onAccepted: function()
                                        {
                                            restart_modal.open()
                                            restart_modal.item.onTimerEnded = () =>
                                            {
                                                API.app.reset_coin_cfg()
                                            }
                                        }
                                    })
                                    reset_dialog.close()
                                }
                            }
                        }
                    }

                    Combo_fiat
                    {
                        anchors.margins: 10
                    }

                    Item
                    {
                        anchors.margins: 10

                        Column
                        {
                            anchors.fill: parent
                            topPadding: 10
                            spacing: 15

                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 50

                                Dex.Text
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    font: DexTypo.subtitle1
                                    text: qsTr("Current Font")
                                }

                                Item { Layout.fillWidth: true }

                                Dex.ComboBox
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    editable: true
                                    model: ["Ubuntu", "Montserrat", "Roboto"]

                                    onCurrentTextChanged:
                                    {
                                        DexTypo.fontFamily = currentText
                                        console.info(qsTr("Current font changed to %1.").arg(currentText))
                                    }

                                    Component.onCompleted:
                                    {
                                        let current = DexTypo.fontFamily
                                        currentIndex = model.indexOf(current)
                                    }
                                }
                            }

                            RowLayout
                            {
                                Layout.topMargin: 20
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 50

                                Dex.Text
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    font: DexTypo.subtitle1
                                    text: qsTr("Theme")
                                }

                                Item { Layout.fillWidth: true }

                                Dex.ComboBox
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    model: API.qt_utilities.get_themes_list()
                                    currentIndex: model.indexOf(atomic_settings2.value("CurrentTheme"))

                                    onActivated:
                                    {
                                        let chosenTheme = model[index];

                                        console.info(qsTr("Changing theme to %1").arg(chosenTheme));
                                        atomic_settings2.setValue("CurrentTheme", chosenTheme);
                                        atomic_settings2.sync();
                                        Dex.CurrentTheme.loadFromFilesystem(chosenTheme);
                                    }

                                    Component.onCompleted:
                                    {
                                        let current = atomic_settings2.value("CurrentTheme")
                                        currentIndex = model.indexOf(current)
                                    }
                                }
                            }
                            
                            // Post-order placement toggle
                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 50

                                DexLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    font: DexTypo.subtitle1
                                    text: qsTr("Show orders after placement")
                                }

                                Item { Layout.fillWidth: true }

                                DexSwitch
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Component.onCompleted: checked = API.app.settings_pg.postorder_enabled
                                    onCheckedChanged: API.app.settings_pg.postorder_enabled = checked
                                }
                            }

                        }
                    }

                    Item
                    {
                        Column
                        {
                            anchors.fill: parent
                            topPadding: 10
                            spacing: 15

                            ModalLoader
                            {
                                id: view_seed_modal
                                sourceComponent: RecoverSeedModal
                                {}
                            }

                            ModalLoader
                            {
                                id: eula_modal
                                sourceComponent: EulaModal
                                {
                                    close_only: true
                                }
                            }

                            ModalLoader
                            {
                                id: camouflage_password_modal
                                sourceComponent: CamouflagePasswordModal
                                {}
                            }

                            SettingsButton
                            {
                                width: parent.width - 30
                                height: 50
                                title: qsTr("View seed and private keys")
                                buttonText: qsTr("Show")
                                onClicked: view_seed_modal.open()
                            }

                            SettingsButton
                            {
                                width: parent.width - 30
                                height: 50
                                title: qsTr("Setup Camouflage Password")
                                buttonText: qsTr("Open")
                                onClicked: camouflage_password_modal.open()
                            }

                            // Spam filter toggle
                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 50

                                DexLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    font: DexTypo.subtitle1
                                    text: qsTr("Reuse static RPC password")
                                }

                                Item { Layout.fillWidth: true }

                                DexSwitch
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Component.onCompleted: checked = API.app.settings_pg.static_rpcpass_enabled
                                    onCheckedChanged: API.app.settings_pg.static_rpcpass_enabled = checked
                                }
                            }
                        }
                    }

                    Item
                    {
                        Column
                        {
                            anchors.fill: parent
                            topPadding: 10
                            spacing: 12

                            ModalLoader
                            {
                                id: delete_wallet_modal
                                sourceComponent: DeleteWalletModal
                                {}
                            }

                            SettingsButton
                            {
                                width: parent.width - 30
                                height: 50
                                title: qsTr("Disclaimer and ToS")
                                buttonText: qsTr("Show")
                                onClicked: eula_modal.open()
                            }

                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 60

                                DexLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    text: qsTr("Application version")
                                }
                                DexCopyableLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    text: API.app.settings_pg.get_version()
                                    onCopyNotificationTitle: qsTr("Application Version")
                                    onCopyNotificationMsg: qsTr("copied to clipboard")
                                }
                            }

                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 60

                                DexLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    text: qsTr("KDF version")
                                }

                                DexCopyableLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    text: API.app.settings_pg.get_kdf_version()
                                    onCopyNotificationTitle: qsTr("KDF Version")
                                    onCopyNotificationMsg: qsTr("KDF Version copied to clipboard.")
                                }
                            }

                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 60

                                DexLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    text: qsTr("RPC Port")
                                }

                                DexCopyableLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    text: API.app.settings_pg.get_rpcport()
                                    onCopyNotificationTitle: qsTr("RPC Port")
                                    onCopyNotificationMsg: qsTr("RPC Port copied to clipboard.")
                                }
                            }

                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 60

                                DexLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    text: qsTr("Peer ID")
                                }

                                DexCopyableLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    text: API.app.settings_pg.get_peerid()
                                    onCopyNotificationTitle: qsTr("Peer ID")
                                    onCopyNotificationMsg: qsTr("Peer ID copied to clipboard.")
                                }
                            }

                            RowLayout
                            {
                                width: parent.width - 30
                                anchors.horizontalCenter: parent.horizontalCenter
                                height: 60

                                DexLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    Layout.fillWidth: true
                                    text: qsTr("Qt version")
                                }

                                DexCopyableLabel
                                {
                                    Layout.alignment: Qt.AlignVCenter
                                    text: qtversion
                                    onCopyNotificationTitle: qsTr("Qt Version")
                                    onCopyNotificationMsg: qsTr("Qt Version copied to clipboard.")
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    Item
    {
        width: parent.width
        height: 50
        anchors.bottom: parent.bottom

        Row
        {
            spacing: 10
            anchors.right: parent.right
            anchors.rightMargin: 10
            anchors.verticalCenter: parent.verticalCenter

            DefaultButton
            {
                text: qsTr("Logout")
                color: containsMouse ? DexTheme.buttonColorHovered : 'transparent'
                height: 48
                radius: 18
                font: Qt.font(
                {
                    pixelSize: 19,
                    letterSpacing: 0.15,
                    family: DexTypo.fontFamily,
                    weight: Font.Normal
                })
                iconSource: "qrc:/assets/images/qaterial/logout.svg"

                onClicked:
                {
                    setting_modal.close()
                    if (orders.count != 0) logout_modal.open()
                    else return_to_login()
                }
            }
        }
    }
}
