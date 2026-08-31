import QtQuick 2.15
import QtQuick.Layouts 1.15

import "../Qaterial" as Qaterial

import Dex.Themes 1.0 as Dex
import "../Constants"

DefaultMouseArea {
    id: control

    property alias titleText: title.text
    property alias minimumDate: calendar.minimumDate
    property alias maximumDate: calendar.maximumDate
    property alias selectedDate: calendar.selectedDate

    signal accepted()

    implicitWidth: 100
    implicitHeight: column.implicitHeight

    onClicked: modal.open()

    Column {
        id: column
        anchors.left: parent.left
        anchors.right: parent.right

        DexLabel {
            id: title
            text: qsTr("Date")
            font: DexTypo.overLine
            color: Dex.CurrentTheme.foregroundColor2
            width: parent.width
        }

        RowLayout {
            anchors.left: parent.left
            anchors.right: parent.right
            spacing: 4

            DexLabel {
                id: label
                text: selectedDate.toLocaleDateString(Locale.ShortFormat, "yyyy-MM-dd")
                font: DexTypo.caption
                Layout.fillWidth: true
            }

            DefaultImage {
                Layout.preferredWidth: 25
                Layout.preferredHeight: 25
                source: "qrc:/assets/images/qaterial/calendar-blank.svg"

                DefaultColorOverlay {
                    source: parent
                    anchors.fill: parent
                    color: Dex.CurrentTheme.foregroundColor2
                }
            }
        }
    }

    DefaultModal
    {
        id: modal
        width: 300
        height: 450
        verticalPadding: 0
        horizontalPadding: 0

        DefaultCalendar
        {
            id: calendar
            anchors.fill: parent
            onSelectedDateChanged: {modal.close(); control.accepted()}
        }
    }
}
