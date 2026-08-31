import QtQuick 2.15
import QtQuick.Layouts 1.15
import "../Qaterial" as Qaterial
import App 1.0

Qaterial.Icon
{
    property int iconSize: 14
    property string copyText: ""
    property string notifyTitle: ""
    property string notifyMsg: qsTr("copied to clipboard")

    Layout.alignment: Qt.AlignVCenter
    size: iconSize
    icon: "qrc:/assets/images/qaterial/content-copy.svg"
    color: copyArea.containsMouse ? Style.colorText2 : DexTheme.foregroundColor

    DefaultMouseArea
    {
        id: copyArea
        anchors.fill: parent
        hoverEnabled: true
        onClicked:
        {
            clipboardHelper.text = copyText
            clipboardHelper.selectAll()
            clipboardHelper.copy()
            app.notifyCopy(notifyTitle, notifyMsg)
        }
    }

    TextInput {
        id: clipboardHelper
        visible: false
    }
}
