import QtQuick 2.15
import QtQuick.Controls 2.15
import QtQuick.Layouts 1.15
import Qt.labs.calendar 1.0

import "../Qaterial" as Qaterial
import Dex.Themes 1.0 as Dex

Item
{
    id: root
    width: 300
    height: 450

    // Replicate the calendar properties used externally
    property date selectedDate: new Date()

    // Properties required for the inner layout calculations
    readonly property int currentMonth: selectedDate.getMonth()
    readonly property int currentYear: selectedDate.getFullYear()

    // Helper functions to mimic the old control API
    function showPreviousYear() { root.selectedDate = new Date(currentYear - 1, currentMonth, 1) }
    function showNextYear() { root.selectedDate = new Date(currentYear + 1, currentMonth, 1) }
    function showPreviousMonth() { root.selectedDate = new Date(currentYear, currentMonth - 1, 1) }
    function showNextMonth() { root.selectedDate = new Date(currentYear, currentMonth + 1, 1) }

    // Background Panel
    DefaultRectangle
    {
        anchors.fill: parent
        color: Dex.CurrentTheme.floatingBackgroundColor
        radius: 18
    }

    ColumnLayout
    {
        anchors.fill: parent
        anchors.margin: 10
        spacing: 5

        // Navigation Bar
        DefaultRectangle
        {
            Layout.fillWidth: true
            Layout.preferredHeight: 50
            color: Dex.CurrentTheme.floatingBackgroundColor
            radius: 18

            DefaultButton
            {
                id: previousYear
                width: previousMonth.width
                height: width
                anchors.left: parent.left
                anchors.leftMargin: 5
                anchors.verticalCenter: parent.verticalCenter
                iconSource: "qrc:/assets/images/qaterial/arrow-left.svg"
                onClicked: root.showPreviousYear()
            }

            DefaultButton
            {
                id: previousMonth
                width: parent.height - 14
                height: width
                anchors.left: previousYear.right
                anchors.leftMargin: 2
                anchors.verticalCenter: parent.verticalCenter
                iconSource: "qrc:/assets/images/qaterial/arrow-left.svg"
                onClicked: root.showPreviousMonth()
            }

            DexLabel
            {
                id: dateText
                // Format title string (e.g., "December 2026") using the systems locale
                text: Qt.locale().standaloneMonthName(root.currentMonth, Locale.LongFormat) + " " + root.currentYear
                elide: Text.ElideRight
                horizontalAlignment: Text.AlignHCenter
                anchors.verticalCenter: parent.verticalCenter
                anchors.left: previousMonth.right
                anchors.leftMargin: 2
                anchors.right: nextMonth.left
                anchors.rightMargin: 2
            }

            DefaultButton
            {
                id: nextYear
                width: nextMonth.width
                height: width
                anchors.right: parent.right
                anchors.rightMargin: 5
                anchors.verticalCenter: parent.verticalCenter
                iconSource: "qrc:/assets/images/qaterial/arrow-right.svg"
                onClicked: root.showNextYear()
            }

            DefaultButton
            {
                id: nextMonth
                width: parent.height - 14
                height: width
                anchors.verticalCenter: parent.verticalCenter
                anchors.right: nextYear.left
                anchors.rightMargin: 2
                iconSource: "qrc:/assets/images/qaterial/arrow-right.svg"
                onClicked: root.showNextMonth()
            }
        }

        // Days of Week Header Row (Mon, Tue, Wed...)
        DayOfWeekRow
        {
            Layout.fillWidth: true
            Layout.preferredHeight: 20
            locale: Qt.locale()

            delegate: DefaultRectangle
            {
                color: "transparent"
                implicitHeight: 20
                Label
                {
                    text: model.shortName // Uses short name from locale
                    anchors.centerIn: parent
                    color: Dex.CurrentTheme.foregroundColor
                }
            }
        }

        // Calendar Days Grid Matrix
        MonthGrid
        {
            id: grid
            Layout.fillWidth: true
            Layout.fillHeight: true
            month: root.currentMonth
            year: root.currentYear
            locale: Qt.locale()

            delegate: DefaultRectangle
            {
                anchors.fill: parent

                // Helper evaluations matching the old styleData layout
                readonly property bool isSelected: model.date.getDate() === root.selectedDate.getDate() &&
                                                    model.date.getMonth() === root.selectedDate.getMonth() &&
                                                    model.date.getFullYear() === root.selectedDate.getFullYear()
                readonly property bool isVisibleMonth: model.month === root.currentMonth

                color: isSelected ? selectedDateColor : hovered ? hoveredDateColor : "transparent"

                readonly property color sameMonthDateTextColor: Dex.CurrentTheme.foregroundColor
                readonly property color hoveredDateColor: Dex.CurrentTheme.buttonColorHovered
                readonly property color selectedDateColor: Dex.CurrentTheme.buttonColorPressed
                readonly property color selectedDateTextColor: Dex.CurrentTheme.foregroundColor
                readonly property color differentMonthDateTextColor: Dex.CurrentTheme.foregroundColor3

                DexLabel
                {
                    id: dayDelegateText
                    text: model.day
                    anchors.centerIn: parent
                    horizontalAlignment: Text.AlignRight
                    font.pixelSize: Math.min(parent.height/3, parent.width/3)
                    color: {
                        var theColor = isVisibleMonth ? sameMonthDateTextColor : differentMonthDateTextColor;
                        if (isSelected)
                            theColor = selectedDateTextColor;
                        theColor;
                    }
                }

                MouseArea
                {
                    anchors.fill: parent
                    hoverEnabled: true
                    onClicked: {
                        root.selectedDate = model.date;
                    }
                }
            }
        }
    }
}
