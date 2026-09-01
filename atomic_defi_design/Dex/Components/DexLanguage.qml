import QtQuick 2.15
import QtQuick.Layouts 1.15
import QtQuick.Controls 2.15
import "../Constants"
import App 1.0
import Dex.Themes 1.0 as Dex

DefaultComboBox
{
    id: control
    model: API.app.settings_pg.get_available_langs()
    height: 50
    leftPadding: 5
    displayText: API.app.settings_pg.lang

    // Each dropdown item
    delegate: ItemDelegate
    {
        id: combo_item
        width: control.width
        height: 35
        highlighted: control.highlightedIndex === index

        contentItem: RowLayout
        {
            anchors.fill: parent
            spacing: -25

            DefaultImage
            {
                id: image
                Layout.preferredHeight: 25
                source: General.image_path + "lang/" + modelData + ".png"
            }

            DexLabel
            {
                text: modelData
            }
        }

        background: Rectangle
        {
            anchors.fill: combo_item
            radius: 8
            color: combo_item.highlighted ? Dex.CurrentTheme.comboBoxDropdownItemHighlightedColor : Dex.CurrentTheme.comboBoxBackgroundColor
        }

        onClicked:
        {
            if (modelData !== API.app.settings_pg.lang)
            {
                API.app.settings_pg.lang = modelData
            }
        }
    }

    // Main, selected item
    contentItem: Text
    {
        anchors.fill: parent
        leftPadding: 0
        rightPadding: control.indicator.width + control.spacing
        verticalAlignment: Text.AlignVCenter

        DefaultImage
        {
            id: image
            height: 25
            x: 12
            anchors.verticalCenter: parent.verticalCenter
            source: General.image_path + "lang/" + control.displayText + ".png"
        }
    }

    background: FloatingBackground
    {
        radius: 18
        color: Dex.CurrentTheme.comboBoxBackgroundColor
    }

    DefaultMouseArea
    {
        anchors.fill: parent
        acceptedButtons: Qt.NoButton
    }
}
