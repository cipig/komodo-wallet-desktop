import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import "../../Qaterial" as Qaterial
import ModelHelper 0.1
import "../../Components"
import "../../Constants"
import App 1.0
import Dex.Themes 1.0 as Dex
import Dex.Components 1.0 as Dex
import AtomicDEX.TradingError 1.0

MultipageModal
{
    id: root
    readonly property var fees: API.app.trading_pg.fees
    width: 720
    horizontalPadding: 10
    verticalPadding: 20
    closePolicy: Popup.NoAutoClose

    MultipageModalContent
    {
        titleText: qsTr("")
        titleAlignment: Qt.AlignHCenter
        titleTopMargin: 0
        topMarginAfterTitle: 10
        flickMax: window.height - 20

        header: [
            RowLayout
            {
                id: dex_pair_badges
                Layout.alignment: Qt.AlignHCenter
                Layout.preferredHeight: 70
                Layout.preferredWidth: 540

                Item { Layout.preferredWidth: 20 }

                PairItemBadge
                {
                    ticker: base_ticker
                    is_left: true
                    fullname: General.coinName(base_ticker)
                    amount: base_amount
                    Layout.fillHeight: true
                    Layout.preferredWidth: 220
                }

                Item { Layout.preferredWidth: 10 }

                Qaterial.Icon
                {
                    Layout.alignment: Qt.AlignVCenter
                    color: Dex.CurrentTheme.foregroundColor
                    icon: "qrc:/assets/images/qaterial/swap-horizontal.svg"
                    size: 24
                }

                Item { Layout.preferredWidth: 10 }

                PairItemBadge
                {
                    ticker: rel_ticker
                    fullname: General.coinName(rel_ticker)
                    amount: rel_amount
                    Layout.fillHeight: true
                    Layout.preferredWidth: 220
                }

                Item { Layout.preferredWidth: 20 }
            },

            PriceLineSimplified
            {
                id: price_line
                Layout.topMargin: 10
                Layout.leftMargin: 40
                Layout.rightMargin: 40
                Layout.fillWidth: true
            }
        ]

        ColumnLayout
        {
            id: config_section
            Layout.alignment: Qt.AlignCenter
            Layout.fillWidth: true
            Layout.leftMargin: 4
            Layout.rightMargin: 4
            Layout.topMargin: 10
            spacing: 5

            readonly property var default_config: API.app.trading_pg.get_raw_kdf_coin_cfg(rel_ticker)
            readonly property bool is_dpow_configurable: config_section.default_config.requires_notarization || false

            DefaultRectangle {
                id: feesAreaBox
                Layout.alignment: Qt.AlignCenter
                Layout.preferredWidth: parent.width - 20
                Layout.preferredHeight: 185 // Centered height allocation safely accommodates up to 8 lines
                color: DexTheme.contentColorTop
                visible: !buy_sell_rpc_busy

                ColumnLayout {
                    anchors.centerIn: parent
                    width: parent.width - 40 // Explicit boundary prevents layout loop feedback recursion
                    spacing: 2

                    // 1. Loading State Panel (RESTORED)
                    ColumnLayout {
                        Layout.fillWidth: true
                        Layout.alignment: Qt.AlignCenter
                        visible: !fees_detail.visible && !fees_error.visible

                        DefaultBusyIndicator {
                            Layout.preferredHeight: 40
                            Layout.preferredWidth: 40
                            Layout.alignment: Qt.AlignHCenter
                            scale: 0.65
                        }

                        DexLabel {
                            text_value: qsTr("Loading fees...")
                            Layout.alignment: Qt.AlignHCenter
                            font.pixelSize: Style.textSize
                        }
                    }

                    // 2. Error State Panel (RESTORED)
                    ColumnLayout {
                        id: fees_error
                        Layout.fillWidth: true
                        Layout.alignment: Qt.AlignCenter
                        visible: root.fees.hasOwnProperty("error")

                        DexLabel {
                            Layout.fillWidth: true
                            color: Dex.CurrentTheme.warningColor
                            horizontalAlignment: DexLabel.AlignHCenter
                            font.pixelSize: Style.textSize
                            text_value: root.fees.hasOwnProperty("error") ? root.fees["error"].split("] ").slice(-1) : ""
                        }
                    }

                    // 3. Consolidated Details Panel
                    ColumnLayout {
                        id: fees_detail
                        Layout.fillWidth: true
                        Layout.alignment: Qt.AlignCenter
                        spacing: 1
                        visible: root.fees.hasOwnProperty("base_transaction_fees_ticker")
                                 && !API.app.trading_pg.preimage_rpc_busy
                                 && !root.fees.hasOwnProperty("error")

                        // Itemized Fee Lines
                        Repeater {
                            model: root.fees.hasOwnProperty("base_transaction_fees_ticker") ? General.getFeesDetail(root.fees) : []
                            delegate: DexLabel {
                                width: parent.width
                                horizontalAlignment: Text.AlignHCenter
                                font.pixelSize: Style.textSize // HIGH-DPI UPGRADE: Elevated text scale
                                text: General.getFeesDetailText(modelData.label, modelData.fee, modelData.ticker)
                            }
                        }

                        // Static divider line
                        Rectangle {
                            Layout.alignment: Qt.AlignHCenter
                            width: parent.width * 0.6
                            height: 1
                            color: Dex.CurrentTheme.foregroundColor3
                            opacity: 0.15
                            visible: summary_repeater.count > 0
                        }

                        // Aggregated Summary Lines
                        Repeater {
                            id: summary_repeater
                            model: root.fees.hasOwnProperty("base_transaction_fees_ticker") && !API.app.trading_pg.preimage_rpc_busy ? root.fees.total_fees : []
                            delegate: DexLabel {
                                width: parent.width
                                horizontalAlignment: Text.AlignHCenter
                                font.pixelSize: Style.textSize // HIGH-DPI UPGRADE: Elevated text scale
                                text: General.getFeesDetailText(qsTr("<b>Total %1 fees:</b>").arg(modelData.coin), modelData.required_balance, modelData.coin)
                            }
                        }

                        // Block Validation Errors Label (RESTORED)
                        DexLabel {
                            id: errors
                            visible: text_value !== ""
                            Layout.fillWidth: true
                            horizontalAlignment: DexLabel.AlignHCenter
                            font: DexTypo.caption
                            color: Dex.CurrentTheme.warningColor
                            text_value: General.getTradingError(last_trading_error, curr_fee_info, base_ticker, rel_ticker, left_ticker, right_ticker)
                        }
                    }
                }
            }

            // Large margin warning
            FloatingBackground
            {
                Layout.alignment: Qt.AlignCenter
                Layout.preferredWidth: margin_row.implicitWidth + 30
                Layout.preferredHeight: margin_row.implicitHeight + 8
                color: Style.colorRed2
                visible: Math.abs(parseFloat(API.app.trading_pg.cex_price_diff)) >= 50

                RowLayout
                {
                    id: margin_row
                    anchors.centerIn: parent

                    Item { width: 3 }

                    DefaultCheckBox
                    {
                        id: allow_bad_trade
                        Layout.alignment: Qt.AlignCenter
                        textColor: Style.colorWhite0
                        visible:  Math.abs(parseFloat(API.app.trading_pg.cex_price_diff)) >= 50
                        spacing: 2
                        boxWidth: 16
                        boxHeight: 16
                        boxRadius: 8
                        label.wrapMode: Text.NoWrap
                        text: qsTr("Trade price is more than 50% different to CEX! Confirm?")
                        font: DexTypo.caption
                    }

                    Item { width: 3 }
                }
            }

            // Custom config section
            ColumnLayout
            {
                id: use_custom
                Layout.alignment: Qt.AlignCenter
                Layout.preferredWidth: parent.width - 10
                spacing: 5
                visible: !buy_sell_rpc_busy

                DefaultCheckBox
                {
                    id: _cancelPreviousCheckbox
                    visible: API.app.trading_pg.maker_mode
                    boxWidth: 20
                    boxHeight: 20
                    checked: true
                    Layout.preferredHeight: 40
                    Layout.alignment: Qt.AlignCenter
                    text: qsTr("Cancel all existing orders for %1/%2?").arg(base_ticker).arg(rel_ticker)
                }

                DefaultCheckBox
                {
                    id: _goodUntilCanceledCheckbox
                    visible: !API.app.trading_pg.maker_mode
                    boxWidth: 20
                    boxHeight: 20
                    checked: true
                    Layout.preferredHeight: 40
                    Layout.alignment: Qt.AlignCenter
                    text: qsTr("Good until cancelled (order will remain on orderbook until filled or cancelled)")
                    label.wrapMode: Text.WordWrap
                }

                DefaultCheckBox
                {
                    id: enable_custom_config
                    spacing: 2
                    boxWidth: 20
                    boxHeight: 20
                    Layout.preferredHeight: 40
                    Layout.alignment: Qt.AlignCenter
                    text: qsTr("Use custom protection settings for incoming %1 transactions", "TICKER").arg(rel_ticker)
                    label.wrapMode: Label.NoWrap
                }

                // FIXED SWITCH INTERFACE BRIDGE: Externally wrapping the switch component
                // breaks the anchor-to-layout feedback loop on High-DPI displays completely.
                RowLayout
                {
                    Layout.alignment: Qt.AlignCenter
                    Layout.preferredWidth: 380
                    Layout.preferredHeight: 50
                    visible: enable_custom_config.checked && config_section.is_dpow_configurable

                    DexSwitch
                    {
                        id: enable_dpow_confs
                        Layout.alignment: Qt.AlignVCenter
                        checked: true
                        mouseArea.hoverEnabled: true
                        labelWidth: 320
                        label.text: qsTr("Enable Komodo dPoW security")
                        label2.text: General.cex_icon + ' <a href="https://komodoplatform.com">' + qsTr('Read more about dPoW') + '</a>'
                    }
                }

                ColumnLayout
                {
                    height: 50
                    Layout.alignment: Qt.AlignCenter
                    spacing: 5

                    DexLabel
                    {
                        height: 16
                        Layout.alignment: Qt.AlignCenter
                        visible: !enable_custom_config.checked
                        text_value: qsTr("Security configuration")
                        font.weight: Font.Medium
                    }

                    DexLabel
                    {
                        height: 12
                        font: DexTypo.caption
                        Layout.alignment: Qt.AlignCenter
                        horizontalAlignment: Text.AlignHCenter
                        visible: !enable_custom_config.checked
                        text_value: "✅ " + (
                            config_section.is_dpow_configurable
                            ? '<a href="https://komodoplatform.com">'
                            + qsTr("dPoW protected ") + General.cex_icon +  '</a>'
                            : qsTr("%1 confirmations for incoming %2 transactions")
                            .arg(config_section.default_config.required_confirmations || 1).arg(rel_ticker)
                        )
                    }
                }
            }

            // Configuration settings
            Item
            {
                Layout.alignment: Qt.AlignCenter
                Layout.preferredWidth: parent.width - 10
                Layout.preferredHeight: 160
                visible: !buy_sell_rpc_busy

                ColumnLayout
                {
                    id: security_config
                    anchors.horizontalCenter: parent.horizontalCenter
                    height: 60
                    spacing: 3

                    ColumnLayout
                    {
                        Layout.alignment: Qt.AlignCenter
                        spacing: 3

                        DexLabel
                        {
                            height: 30
                            Layout.alignment: Qt.AlignCenter
                            horizontalAlignment: Text.AlignHCenter
                            visible: required_confirmation_count.visible
                            text_value: qsTr("Required Confirmations") + ": " + required_confirmation_count.value
                            color: Dex.CurrentTheme.foregroundColor
                            opacity: parent.enabled ? 1 : .6
                        }

                        DefaultSlider
                        {
                            id: required_confirmation_count
                            height: 24
                            Layout.alignment: Qt.AlignCenter
                            visible: enable_custom_config.checked && (!config_section.is_dpow_configurable || !enable_dpow_confs.checked)
                            readonly property int default_confirmation_count: 3
                            stepSize: 1
                            from: 1
                            to: 5
                            live: true
                            snapMode: Slider.SnapAlways
                            value: default_confirmation_count
                        }
                    }

                    // No dPoW Warning
                    FloatingBackground
                    {
                        Layout.alignment: Qt.AlignCenter
                        width: dpow_off_warning.implicitWidth + 30
                        height: dpow_off_warning.implicitHeight + 10
                        color: Style.colorRed2
                        visible: enable_custom_config.checked && (config_section.is_dpow_configurable && !enable_dpow_confs.checked)

                        DexLabel
                        {
                            id: dpow_off_warning
                            anchors.centerIn: parent
                            wrapMode: Text.NoWrap
                            font: DexTypo.body2
                            color: Style.colorWhite0
                            horizontalAlignment: Qt.AlignHCenter
                            verticalAlignment: Qt.AlignVCenter
                            text_value: Style.warningCharacter + " " + qsTr("Warning, this atomic swap is not dPoW protected!")
                        }
                    }
                }
            }

            ColumnLayout
            {
                id: warnings_text
                Layout.fillWidth: true
                Layout.alignment: Qt.AlignHCenter

                DexLabel
                {
                    Layout.alignment: Qt.AlignHCenter
                    text_value: qsTr("This swap request can not be undone and is a final event!")
                    font: DexTypo.italic12
                    color: Dex.CurrentTheme.foregroundColor2
                }

                DexLabel
                {
                    id: warnings_tx_time_text
                    Layout.alignment: Qt.AlignHCenter
                    text_value: qsTr("This transaction can take up to 60 mins - DO NOT close this application!")
                    font: DexTypo.italic12
                    color: Dex.CurrentTheme.foregroundColor2
                }
            }

            Item
            {
                visible: buy_sell_rpc_busy
                height: config_section.height
                width: config_section.width

                DefaultBusyIndicator
                {
                    id: rpcBusyIndicator
                    anchors.fill: parent
                    anchors.centerIn: parent
                }
            }
        }

        footer:
        [
            Item { Layout.preferredWidth: 100 },

            CancelButton
            {
                text: qsTr("Cancel")
                padding: 10
                leftPadding: 45
                rightPadding: 45
                radius: 18
                onClicked: {
                    root.close()
                    API.app.trading_pg.reset_fees()
                }
            },

            Item { Layout.fillWidth: true },

            DexAppOutlineButton
            {
                text: qsTr("Confirm")
                padding: 10
                leftPadding: 45
                rightPadding: 45
                radius: 18
                enabled: General.is_swap_safe(allow_bad_trade)
                onClicked:
                {
                    trade({ enable_custom_config: enable_custom_config.checked,
                            is_dpow_configurable: config_section.is_dpow_configurable,
                            enable_dpow_confs: enable_dpow_confs.checked,
                            required_confirmation_count: required_confirmation_count.value,
                            cancel_previous: _cancelPreviousCheckbox.checked,
                            good_until_canceled: _goodUntilCanceledCheckbox.checked},
                            config_section.default_config)
                    API.app.trading_pg.reset_fees()
                }
            },

            Item { Layout.preferredWidth: 100 }
        ]
    }
}
