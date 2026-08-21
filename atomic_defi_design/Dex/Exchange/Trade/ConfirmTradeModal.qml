import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import Qaterial 1.0 as Qaterial
import AtomicDEX.TradingError 1.0
import "../../Components"
import "../../Constants"
import ".."
import "Orders/"
import App 1.0
import Dex.Themes 1.0 as Dex

MultipageModal
{
    id: root
    readonly property var fees: API.app.trading_pg.fees
    width: 720
    horizontalPadding: 10
    verticalPadding: 30
    closePolicy: Popup.NoAutoClose

    MultipageModalContent
    {
        titleText: qsTr(" ")
        titleAlignment: Qt.AlignHCenter
        titleTopMargin: 5
        topMarginAfterTitle: 5
        flickMax: 750

        header: [
            RowLayout
            {
                id: dex_pair_badges
                Layout.fillWidth: true
                Layout.preferredHeight: 70
                Layout.preferredWidth: 480

                Item { Layout.preferredWidth: 40 }

                PairItemBadge
                {
                    ticker: base_ticker
                    is_left: true
                    fullname: General.coinName(base_ticker)
                    amount: base_amount
                    Layout.fillHeight: true
                }

                Item { Layout.preferredWidth: 20 }

                Qaterial.Icon
                {
                    Layout.alignment: Qt.AlignVCenter
                    color: Dex.CurrentTheme.foregroundColor
                    icon: Qaterial.Icons.swapHorizontal
                    Layout.fillHeight: true
                }

                Item { Layout.preferredWidth: 20 }

                PairItemBadge
                {
                    ticker: rel_ticker
                    fullname: General.coinName(rel_ticker)
                    amount: rel_amount
                    Layout.fillHeight: true
                }

                Item { Layout.preferredWidth: 40 }
            },

            PriceLineSimplified
            {
                id: price_line
                Layout.leftMargin: 40
                Layout.rightMargin: 40
                Layout.fillWidth: true
            }
        ]

        ColumnLayout
        {
            id: config_section
            Layout.alignment: Qt.AlignCenter
            Layout.preferredWidth: dex_pair_badges.width - 40
            Layout.topMargin: 4
            spacing: 5

            readonly property var default_config: API.app.trading_pg.get_raw_kdf_coin_cfg(rel_ticker)
            readonly property bool is_dpow_configurable: config_section.default_config.requires_notarization || false

            // Fees Area
            DefaultRectangle {
                Layout.alignment: Qt.AlignCenter
                Layout.preferredHeight: 150
                Layout.preferredWidth: parent.width - 40
                color: DexTheme.contentColorTop
                visible: !buy_sell_rpc_busy

                ColumnLayout
                {
                    anchors.centerIn: parent
                    visible: !fees_detail.visible

                    DefaultBusyIndicator
                    {
                        Layout.preferredHeight: 100
                        Layout.preferredWidth: 100
                        Layout.alignment: Qt.AlignHCenter
                        scale: 0.8
                    }

                    DexLabel
                    {
                        text_value: qsTr("Loading fees...")
                        Layout.alignment: Qt.AlignHCenter
                    }
                }

                ColumnLayout
                {
                    id: fees_error
                    width: parent.width - 20
                    anchors.centerIn: parent
                    visible: root.fees.hasOwnProperty('error') // Should be handled before this modal, but leaving here as a fallback

                    DexLabel
                    {
                        width: parent.width
                        text_value: root.fees.hasOwnProperty('error') ? root.fees["error"].split("] ").slice(-1) : ""
                        Layout.bottomMargin: 8
                    }
                }

                ColumnLayout
                {
                    id: fees_detail
                    width: parent.width - 20
                    anchors.centerIn: parent
                    spacing: 6
                    visible: root.fees.hasOwnProperty('base_transaction_fees_ticker') && !API.app.trading_pg.preimage_rpc_busy

                    Repeater
                    {
                        model: visible ? General.getFeesDetail(root.fees) : []

                        delegate: DexLabel
                        {
                            wrapMode: Text.NoWrap
                            font.pixelSize: Style.textSizeSmall1
                            text: General.getFeesDetailText(modelData.label, modelData.fee, modelData.ticker)
                        }
                    }

                    Repeater
                    {
                        Layout.alignment: Qt.AlignHCenter
                        model: root.fees.hasOwnProperty('base_transaction_fees_ticker')  && !API.app.trading_pg.preimage_rpc_busy ? root.fees.total_fees : []

                        delegate: DexLabel
                        {
                            wrapMode: Text.NoWrap
                            text: General.getFeesDetailText(
                                    qsTr("<b>Total %1 fees:</b>").arg(modelData.coin),
                                    modelData.required_balance,
                                    modelData.coin)
                        }
                    }

                    DexLabel
                    {
                        id: errors
                        visible: text_value != ''
                        Layout.alignment: Qt.AlignHCenter
                        width: parent.width
                        horizontalAlignment: DexLabel.AlignHCenter
                        font: DexTypo.caption
                        color: Dex.CurrentTheme.warningColor
                        text_value: General.getTradingError(
                                        last_trading_error,
                                        curr_fee_info,
                                        base_ticker,
                                        rel_ticker, left_ticker, right_ticker)
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

                DexSwitch
                {
                    id: enable_dpow_confs
                    visible: enable_custom_config.checked && config_section.is_dpow_configurable
                    checked: true
                    Layout.preferredWidth: 260
                    Layout.alignment: Qt.AlignCenter
                    mouseArea.hoverEnabled: true
                    labelWidth: 200
                    label.wrapMode: Label.NoWrap
                    label.text: qsTr("Enable Komodo dPoW security")
                    label2.text: General.cex_icon + ' <a href="https://komodoplatform.com/security-delayed-proof-of-work-dpow/">' + qsTr('Read more about dPoW') + '</a>'
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
                            ? '<a href="https://komodoplatform.com/security-delayed-proof-of-work-dpow/">'
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
                Layout.preferredHeight: 90
                height: childrenRect.height
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
