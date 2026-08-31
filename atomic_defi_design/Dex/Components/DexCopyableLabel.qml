import QtQuick 2.15
import QtQuick.Controls 2.15
import "../Qaterial" as Qaterial
import App 1.0

// DexCopyableLabel is a label which content can be copied to clipboard with the help of a copy icon right to te text.
// It is not editable by users.
Item
{
    id: control

    property alias  text: label.text
    property string onCopyNotificationTitle
    property string onCopyNotificationMsg

    implicitWidth: label.width + copyIcon.width + copyIcon._leftMargin
    implicitHeight: label.height

    DexLabel
    {
        id: label
        font: Qt.font({
            pixelSize: 13,
            letterSpacing: 0.25,
            weight: Font.Normal
        })
        color: DexTheme.foregroundColor
    }

    Qaterial.Icon
    {
        id: copyIcon

        property int _leftMargin: 10

        anchors.left: label.right
        anchors.leftMargin: _leftMargin
        size: 16
        icon: "qrc:/assets/images/qaterial/content-copy.svg"
        color: copyArea.containsMouse ? DexTheme.accentColor : DexTheme.foregroundColor

        DefaultMouseArea
        {
            id: copyArea
            anchors.fill: parent
            hoverEnabled: true
            onClicked:
            {
                clipboardHelper.text = label.text
                clipboardHelper.selectAll()
                clipboardHelper.copy()
                app.notifyCopy(onCopyNotificationTitle, onCopyNotificationMsg)
            }
        }
    }

    TextInput {
        id: clipboardHelper
        visible: false
    }
}
