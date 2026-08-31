import QtQuick 2.15
import QtQuick.Layouts 1.15
import "../Qaterial" as Qaterial
import App 1.0


Qaterial.Icon
{
    property int iconSize: 14
    property string linkURL: ""

    Layout.alignment: Qt.AlignVCenter

    size: iconSize
    icon: "qrc:/assets/images/qaterial/link-variant.svg"
    color: linkArea.containsMouse ? Style.colorText2 : DexTheme.foregroundColor
    
    DefaultMouseArea
    {
        id: linkArea
        anchors.fill: parent
        hoverEnabled: true
        onClicked: Qt.openUrlExternally(linkURL)
    }
}