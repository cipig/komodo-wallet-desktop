include(${CMAKE_CURRENT_LIST_DIR}/../../project.metadata.cmake)

## 2 case root_dir/build_folder root_dir/ci_tools/build_folder
execute_process(COMMAND bash -c "echo -n `git rev-parse --short HEAD`"
        OUTPUT_VARIABLE VERSION_ID
        )

message(STATUS "PROJECT_ROOT_DIR (before readjusting) -> ${PROJECT_ROOT_DIR}")

get_filename_component(PROJECT_ROOT_DIR ${CMAKE_SOURCE_DIR} DIRECTORY)
if (EXISTS ${PROJECT_ROOT_DIR}/build-Release OR EXISTS ${PROJECT_ROOT_DIR}/build-Debug)
    message(STATUS "from ci tools, readjusting")
    get_filename_component(PROJECT_ROOT_DIR ${PROJECT_ROOT_DIR} DIRECTORY)
endif ()

set(PROJECT_QML_DIR ${PROJECT_ROOT_DIR}/atomic_defi_design/Dex)
set(PROJECT_APP_DIR AntaraAtomicDexAppDir)
set(PROJECT_APP_PATH ${CMAKE_SOURCE_DIR}/bin/${PROJECT_APP_DIR})
set(PROJECT_BIN_PATH ${PROJECT_APP_PATH}/usr/bin/${DEX_PROJECT_NAME})
set(PROJECT_LIB_PATH ${PROJECT_APP_PATH}/usr/lib)
set(TARGET_APP_PATH ${PROJECT_ROOT_DIR}/bundled/linux)

message(STATUS "VCPKG package manager enabled")
message(STATUS "PROJECT_ROOT_DIR (after readjusting) -> ${PROJECT_ROOT_DIR}")
message(STATUS "PROJECT_QML_DIR -> ${PROJECT_QML_DIR}")
message(STATUS "VERSION_ID -> ${VERSION_ID}")

if (EXISTS ${PROJECT_APP_PATH})
    message(STATUS "PROJECT_APP_PATH path is -> ${PROJECT_APP_PATH}")
    message(STATUS "PROJECT_BIN_PATH path is -> ${PROJECT_BIN_PATH}")
    message(STATUS "PROJECT_LIB_PATH path is -> ${PROJECT_LIB_PATH}")
    message(STATUS "TARGET_APP_PATH path is -> ${TARGET_APP_PATH}")
else ()
    message(FATAL_ERROR "Didn't find ${PROJECT_APP_PATH}")
endif ()

set(LINUX_DEPLOY_PATH ${PROJECT_ROOT_DIR}/ci_tools_atomic_dex/linux_misc/linuxdeployqt-continuous-x86_64.AppImage)
if (EXISTS ${LINUX_DEPLOY_PATH})
    message(STATUS "linuxdeployqt path is -> ${LINUX_DEPLOY_PATH}")
else ()
    message(FATAL_ERROR "Didn't find ${LINUX_DEPLOY_PATH}")
endif ()

message(STATUS "Copying required libraries for QtWebEngine")
list(APPEND LIST_LIBS
        "/usr/lib/x86_64-linux-gnu/libsmime3.so"
        "/usr/lib/x86_64-linux-gnu/libssl3.so"
        "/usr/lib/x86_64-linux-gnu/libfreebl3.chk"
        "/usr/lib/x86_64-linux-gnu/libfreebl3.so"
        "/usr/lib/x86_64-linux-gnu/libnssckbi.so"
        "/usr/lib/x86_64-linux-gnu/libnssdbm3.chk"
        "/usr/lib/x86_64-linux-gnu/libnssdbm3.so"
        "/usr/lib/x86_64-linux-gnu/libsoftokn3.chk"
        "/usr/lib/x86_64-linux-gnu/libsoftokn3.so")

file(COPY ${PROJECT_APP_PATH}/usr/share/icons/default/64x64/apps/dex-logo-64.png DESTINATION ${PROJECT_APP_PATH})
file(COPY ${PROJECT_APP_PATH}/usr/share/applications/dex.desktop DESTINATION ${PROJECT_APP_PATH})

foreach (current_lib ${LIST_LIBS})
    message(STATUS "copying ${current_lib} to ${PROJECT_LIB_PATH}")
    file(COPY ${current_lib} DESTINATION ${PROJECT_LIB_PATH})
endforeach ()

message(STATUS "Executing linuxdeployqt to fix dependencies")
execute_process(COMMAND ${LINUX_DEPLOY_PATH} ${PROJECT_BIN_PATH}
        -qmake=/usr/lib/qt5/bin/qmake
        -qmldir=${PROJECT_QML_DIR}
        -bundle-non-qt-libs
        -exclude-libs='libnss3.so,libnssutil3.so'
        -unsupported-allow-new-glibc
        -no-copy-copyright-files
        -extra-plugins=iconengines,platformthemes/libqgtk3.so
        -appimage
        WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
        ECHO_OUTPUT_VARIABLE
        ECHO_ERROR_VARIABLE)

if (EXISTS "${PROJECT_APP_PATH}/usr/qml/QtQuick/Controls")
    message(STATUS "Wiping out unused legacy Controls v1 style directories")
    file(REMOVE_RECURSE "${PROJECT_APP_PATH}/usr/qml/QtQuick/Controls")
endif()
if (EXISTS "${PROJECT_APP_PATH}/usr/qml/QtQuick/PrivateWidgets")
    file(REMOVE_RECURSE "${PROJECT_APP_PATH}/usr/qml/QtQuick/PrivateWidgets")
endif()
if (EXISTS "${PROJECT_APP_PATH}/usr/qml/QtQuick/Controls.2/Universal")
    file(REMOVE_RECURSE "${PROJECT_APP_PATH}/usr/qml/QtQuick/Controls.2/Universal")
endif()
if (EXISTS "${PROJECT_APP_PATH}/usr/qml/QtQuick/Controls.2/designer")
    file(REMOVE_RECURSE "${PROJECT_APP_PATH}/usr/qml/QtQuick/Controls.2/designer")
endif()
if (EXISTS "${PROJECT_APP_PATH}/usr/qml/QtQuick/Controls.2/Fusion")
    file(REMOVE_RECURSE "${PROJECT_APP_PATH}/usr/qml/QtQuick/Controls.2/Fusion")
endif()
if (EXISTS "${PROJECT_APP_PATH}/usr/qml/QtQuick/Controls.2/Imagine")
    file(REMOVE_RECURSE "${PROJECT_APP_PATH}/usr/qml/QtQuick/Controls.2/Imagine")
endif()
if (EXISTS "${PROJECT_APP_PATH}/usr/qml/QtWebEngine/Controls1Delegates")
    message(STATUS "Pruning unused QtWebEngine legacy Controls1Delegates...")
    file(REMOVE_RECURSE "${PROJECT_APP_PATH}/usr/qml/QtWebEngine/Controls1Delegates")
endif()

# =====================================================================
# TRANSLATION OPTIMIZATION: Keep only supported Qt language strings
# =====================================================================
set(TRANS_DIR "${PROJECT_APP_PATH}/usr/translations")
if (EXISTS "${TRANS_DIR}")
    message(STATUS "Optimizing Qt translation strings...")

    # Create a temporary staging folder
    file(MAKE_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/trans_stage")

    # List of baseline languages your app supports
    set(ALLOWED_LANGS "de" "en" "es" "fr" "ru" "tr")

    # Copy only matching files over to the staging area safely
    foreach(LANG ${ALLOWED_LANGS})
        if(EXISTS "${TRANS_DIR}/qt_${LANG}.qm")
            file(COPY "${TRANS_DIR}/qt_${LANG}.qm" DESTINATION "${CMAKE_CURRENT_BINARY_DIR}/trans_stage")
        endif()
    endforeach()

    # Completely clear the original translation repository folder
    file(REMOVE_RECURSE "${TRANS_DIR}")
    file(MAKE_DIRECTORY "${TRANS_DIR}")

    # Move your streamlined translations back into place
    file(COPY "${CMAKE_CURRENT_BINARY_DIR}/trans_stage/" DESTINATION "${TRANS_DIR}")
    file(REMOVE_RECURSE "${CMAKE_CURRENT_BINARY_DIR}/trans_stage")
endif()

# =====================================================================
# WEBENGINE OPTIMIZATION: Keep only supported Chromium language packs
# =====================================================================
set(PAK_DIR "${PROJECT_APP_PATH}/usr/translations/qtwebengine_locales")
if (EXISTS "${PAK_DIR}")
    message(STATUS "Pruning unused QtWebEngine localization packs...")

    # Create staging folder for .pak elements
    file(MAKE_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/pak_stage")
    set(ALLOWED_PAKS "de.pak" "en-US.pak" "en-GB.pak" "es.pak" "fr.pak" "ru.pak" "tr.pak")

    foreach(PAK ${ALLOWED_PAKS})
        if(EXISTS "${PAK_DIR}/${PAK}")
            file(COPY "${PAK_DIR}/${PAK}" DESTINATION "${CMAKE_CURRENT_BINARY_DIR}/pak_stage")
        endif()
    endforeach()

    # Clear old folder footprint and drop the clean versions back down
    file(REMOVE_RECURSE "${PAK_DIR}")
    file(MAKE_DIRECTORY "${PAK_DIR}")

    file(COPY "${CMAKE_CURRENT_BINARY_DIR}/pak_stage/" DESTINATION "${PAK_DIR}")
    file(REMOVE_RECURSE "${CMAKE_CURRENT_BINARY_DIR}/pak_stage")
endif()

message(STATUS "Renaming ${CMAKE_SOURCE_DIR}/${DEX_PROJECT_NAME}-${VERSION_ID}-x86_64.AppImage to ${CMAKE_SOURCE_DIR}/${DEX_PROJECT_NAME}-linux-${VERSION_ID}-x86_64.AppImage")
file(RENAME ${CMAKE_SOURCE_DIR}/${DEX_PROJECT_NAME}-${VERSION_ID}-x86_64.AppImage ${CMAKE_SOURCE_DIR}/${DEX_PROJECT_NAME}-linux-${VERSION_ID}-x86_64.AppImage)

file(COPY ${CMAKE_SOURCE_DIR}/${DEX_PROJECT_NAME}-linux-${VERSION_ID}-x86_64.AppImage DESTINATION ${TARGET_APP_PATH})

message(STATUS "Copying ${PROJECT_APP_PATH} to ${TARGET_APP_PATH}/${PROJECT_APP_DIR}")
file(COPY ${PROJECT_APP_PATH} DESTINATION ${TARGET_APP_PATH})
execute_process(COMMAND zip -r ${DEX_PROJECT_NAME}-linux-${VERSION_ID}.zip AntaraAtomicDexAppDir
        WORKING_DIRECTORY ${TARGET_APP_PATH}
        ECHO_OUTPUT_VARIABLE
        ECHO_ERROR_VARIABLE)

execute_process(COMMAND tar --zstd -cf ${DEX_PROJECT_NAME}-linux-${VERSION_ID}.tar.zst AntaraAtomicDexAppDir
        WORKING_DIRECTORY ${TARGET_APP_PATH}
        ECHO_OUTPUT_VARIABLE
        ECHO_ERROR_VARIABLE)
