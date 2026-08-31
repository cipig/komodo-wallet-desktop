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
    spacing: 4

    property var pageSize: Constants.API.app.orders_mdl.nb_pages
    property var currentValue: Constants.API.app.orders_mdl.current_page
    property alias itemsPerPageComboBox: itemsPerPageComboBox

    function refreshBtn()
    {
        currentValue = Constants.API.app.orders_mdl.current_page
        var model = []
        if (pageSize < 7) {
            for (var i = 0; i < pageSize; i++) {
                model.push({
                    number: i + 1,
                    selected: currentValue === i + 1
                })
            }
        } else {

            [1, 2].map(v => model.push({
                number: v,
                selected: currentValue === v
            }));

            model.push({
                number: currentValue - 2 > 1 + 3 ? -1 : 1 + 2,
                selected: currentValue === 3
            });

            for (var k = Math.max(1 + 3, currentValue - 2); k <= Math.min(pageSize - 3, currentValue + 2); k++) {
                model.push({
                    number: k,
                    selected: currentValue === k
                });
            }

            model.push({
                number: currentValue + 2 < pageSize - 3 ? -1 : pageSize - 2,
                selected: currentValue === pageSize - 2
            });
            [pageSize - 1, pageSize].map(v => model.push({
                number: v,
                selected: currentValue === v
            }));
        }
        btnGroup.model = model
    }

    onPageSizeChanged:
    {
        currentValue = 1
        if (pageSize < 1) {
            pageSize = 1
        }
        refreshBtn()
    }

    DefaultComboBox
    {
        id: itemsPerPageComboBox

        readonly property int item_count: Constants.API.app.orders_mdl.limit_nb_elements
        readonly property
        var options: [10, 15, 20, 25, 30]

        Layout.preferredWidth: (root.width / 100) * 13
        Layout.maximumWidth: 62
        Layout.preferredHeight: 35
        Layout.alignment: Qt.AlignLeft

        model: options
        currentIndex: options.indexOf(item_count)
        onCurrentValueChanged: Constants.API.app.orders_mdl.limit_nb_elements = currentValue
    }

    DexLabel
    {
        Layout.preferredWidth: (root.width / 100) * 15
        Layout.alignment: Qt.AlignLeft
        font.pixelSize: 12
        text: qsTr("items per page")
        color: Dex.CurrentTheme.foregroundColor2
    }

    Item
    {
        Layout.fillWidth: true
    }

    DefaultButton
    {
        Layout.preferredWidth: (root.width / 100) * 5
        Layout.preferredHeight: width
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

        model:
        [{
            number: 1,
            selected: true
        }]

        delegate: DefaultButton
        {
            text: modelData.number === -1 ? "..." : ("" + modelData.number)
            font.pixelSize: 12
            radius: 28
            Layout.preferredWidth: (root.width / 100) * 4
            Layout.preferredHeight: width
            Layout.alignment: Qt.AlignVCenter
            color: modelData.number === currentValue ? 'transparent' : Dex.CurrentTheme.buttonColorEnabled
            onClicked: {
                if (currentValue !== model.modelData) {
                    Constants.API.app.orders_mdl.current_page = btnGroup.model[index].number
                    refreshBtn()
                }
            }
        }
    }

    DefaultButton
    {
        Layout.preferredWidth: (root.width / 100) * 5
        Layout.preferredHeight: width
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
