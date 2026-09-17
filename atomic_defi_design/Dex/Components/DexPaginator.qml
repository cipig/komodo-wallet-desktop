import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import "../Qaterial" as Qaterial
import "../Constants" as Constants
import App 1.0
import Dex.Themes 1.0 as Dex

RowLayout
{
    id: root
    spacing: 8

    property int pageSize: {
        let totalSwaps = Constants.API.app.orders_mdl.total_swaps
        let currentLimit = Constants.API.app.orders_mdl.limit_nb_elements
        return Math.max(1, Math.ceil(totalSwaps / (currentLimit > 0 ? currentLimit : 20)))
    }

    property var currentValue: Constants.API.app.orders_mdl.current_page
    property alias itemsPerPageComboBox: itemsPerPageComboBox

    function refreshBtn()
    {
        currentValue = Constants.API.app.orders_mdl.current_page
        var rawPages = []

        if (pageSize <= 7) {
            for (var i = 1; i <= pageSize; i++) rawPages.push(i);
        } else {
            rawPages.push(1);

            var start = Math.max(2, currentValue - 1);
            var end = Math.min(pageSize - 1, currentValue + 1);

            if (currentValue <= 3) {
                end = 4;
            } else if (currentValue >= pageSize - 2) {
                start = pageSize - 3;
            }

            if (start > 2) rawPages.push(-1);
            for (var k = start; k <= end; k++) rawPages.push(k);
            if (end < pageSize - 1) rawPages.push(-1);

            rawPages.push(pageSize);
        }

        var cleanModel = []
        for (var m = 0; m < rawPages.length; m++) {
            cleanModel.push({
                number: rawPages[m],
                selected: currentValue === rawPages[m]
            })
        }
        btnGroup.model = cleanModel
    }

    onPageSizeChanged:
    {
        currentValue = 1
        if (pageSize < 1) {
            pageSize = 1
        }
        refreshBtn()
    }

    Connections {
        target: Constants.API.app.orders_mdl
        function onTotalSwapsChanged() {
            refreshBtn()
        }
    }

    Component.onCompleted: {
        refreshBtn()
    }

    DefaultComboBox
    {
        id: itemsPerPageComboBox

        readonly property int item_count: Constants.API.app.orders_mdl.limit_nb_elements
        readonly property
        var options: [10, 15, 20, 25, 30]

        Layout.preferredWidth: 74
        Layout.maximumWidth: 74
        Layout.preferredHeight: 35
        Layout.alignment: Qt.AlignLeft

        model: options
        currentIndex: options.indexOf(item_count)
        onCurrentValueChanged: {
            if (Constants.API.app.orders_mdl.limit_nb_elements !== currentValue) {
                Constants.API.app.orders_mdl.limit_nb_elements = currentValue
            }
        }
    }

    DexLabel
    {
        Layout.preferredWidth: 60
        Layout.alignment: Qt.AlignLeft
        font.pixelSize: 12
        text: qsTr("Per page")
        color: Dex.CurrentTheme.foregroundColor2
    }

    Item
    {
        Layout.fillWidth: true
    }

    DefaultButton
    {
        Layout.preferredWidth: 28
        Layout.preferredHeight: 28
        font.pixelSize: 12
        radius: 18
        opacity: enabled ? 1 : .5

        Qaterial.ColorIcon
        {
            anchors.centerIn: parent
            iconSize: 14
            color: Dex.CurrentTheme.foregroundColor
            source: "qrc:/assets/images/qaterial/skip-previous-outline.svg"
        }
        enabled: currentValue > 1

        onClicked: {
            --Constants.API.app.orders_mdl.current_page
            refreshBtn()
        }
    }

    Repeater
    {
        id: btnGroup
        model: [{ number: 1, selected: true }]

        delegate: DefaultButton
        {
            text: modelData.number === -1 ? "..." : ("" + modelData.number)
            font.pixelSize: 12
            radius: 28
            Layout.preferredWidth: 23
            Layout.preferredHeight: 23
            Layout.alignment: Qt.AlignVCenter
            color: modelData.number === currentValue ? 'transparent' : Dex.CurrentTheme.buttonColorEnabled

            onClicked: {
                const page = btnGroup.model[index].number
                if (page === -1) return
                if (currentValue !== page) {
                    Constants.API.app.orders_mdl.current_page = page
                    refreshBtn()
                }
            }
        }
    }

    DefaultButton
    {
        Layout.preferredWidth: 28
        Layout.preferredHeight: 28
        font.pixelSize: 12
        radius: 18
        opacity: enabled ? 1 : .5

        Qaterial.ColorIcon
        {
            anchors.centerIn: parent
            iconSize: 14
            color: Dex.CurrentTheme.foregroundColor
            source: "qrc:/assets/images/qaterial/skip-next-outline.svg"
        }
        enabled: pageSize > 1 && currentValue < pageSize

        onClicked: {
            ++Constants.API.app.orders_mdl.current_page
            refreshBtn()
        }

    }
}
