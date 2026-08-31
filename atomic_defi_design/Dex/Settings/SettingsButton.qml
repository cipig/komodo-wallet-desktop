import QtQuick 2.15
import "../Components/"
import App 1.0
import QtQuick.Layouts 1.15
import "../Qaterial" as Qaterial

RowLayout
{
    id: control
    anchors.horizontalCenter: parent.horizontalCenter
    property bool noBackground: false
    property string title
    property string buttonText

    signal clicked()

    DexLabel
    {
        Layout.alignment: Qt.AlignVCenter
        font: DexTypo.subtitle1
        text: control.title
    }

    Item { Layout.fillWidth: true }

    Item
    {
        width: 120
        Layout.alignment: Qt.AlignVCenter
        Layout.preferredWidth: 200

        Row
        {
            anchors.verticalCenter: parent.verticalCenter
            anchors.right: parent.right

            DefaultButton
            {
                visible: control.noBackground
                text: control.buttonText
                color: containsMouse ? DexTheme.buttonColorHovered : 'transparent'
                height: 40
                radius: 18
                padding: 20
                font: DexTypo.body1
                iconSource: "qrc:/assets/images/qaterial/logout.svg"
                onClicked: control.clicked()
            }

            DexAppOutlineButton
            {
                height: 40
                padding: 20
                radius: 18
                font: DexTypo.body1
                visible: !control.noBackground
                text: control.buttonText
                onClicked: control.clicked()
            }
        }
    }
}
