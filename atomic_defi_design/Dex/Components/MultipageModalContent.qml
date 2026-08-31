import QtQuick 2.15
import QtQuick.Layouts 1.15
import "../Constants"
import App 1.0
import Dex.Themes 1.0 as Dex

ColumnLayout
{
    id: root
    Layout.fillWidth: true
    visible: true
    Layout.fillHeight: false
    Layout.maximumHeight: flickMax

    property alias         title:               _title
    property alias         titleText:           _title.text
    property alias         subtitle:            _subtitle
    property alias         subtitleText:        _subtitle.text
    property var           titleAlignment:      Qt.AlignLeft
    property var           subtitleAlignment:   Qt.AlignLeft
    property int           titleTopMargin:      20
    property int           topMarginAfterTitle: 30
    property alias         flickable:           modal_flickable
    property int           flickMax:            window.height - 240
    property alias         header:              _header.data
    default property alias content:             _innerLayout.data
    property alias         contentSpacing:      _innerLayout.spacing
    property alias         footer:              _footer.data

    DexLabel
    {
        id: _title
        Layout.topMargin: root.titleTopMargin
        Layout.alignment: root.titleAlignment
        font: DexTypo.head6
        visible: text != ''
    }

    DexLabel
    {
        id: _subtitle
        Layout.topMargin: 5
        Layout.alignment: root.subtitleAlignment
        color: Dex.CurrentTheme.foregroundColor2
        font.pixelSize: 13
        visible: text != ''
    }

    ColumnLayout
    {
        id: _header
        spacing: 10
        Layout.topMargin: root.topMarginAfterTitle
        Layout.preferredHeight: childrenRect.height
        visible: childrenRect.height > 0
    }

    DefaultFlickable
    {
        id: modal_flickable
        flickableDirection: Flickable.VerticalFlick
        boundsBehavior: Flickable.StopAtBounds
        Layout.topMargin: root.topMarginAfterTitle
        Layout.fillWidth: true
        Layout.preferredHeight: contentHeight
        Layout.maximumHeight: flickMax - 200
        contentHeight: _innerLayout.height

        ColumnLayout
        {
            id: _innerLayout
            Layout.alignment: Qt.AlignHCenter | Qt.AlignVCenter
            width: parent.width
        }
    }

    RowLayout
    {
        id: _footer
        Layout.topMargin: Style.rowSpacing
        Layout.fillWidth: true
        Layout.preferredHeight: implicitHeight
        spacing: Style.buttonSpacing
        visible: children.length > 0
    }
}
