include(${CMAKE_CURRENT_LIST_DIR}/../../project.metadata.cmake)

message(STATUS "OSX POST INSTALL CMAKE")
message(STATUS "PROJECT_ROOT_DIR (before readjusting) -> ${PROJECT_ROOT_DIR}")

get_filename_component(PROJECT_ROOT_DIR ${CMAKE_SOURCE_DIR} DIRECTORY)
if (EXISTS ${PROJECT_ROOT_DIR}/build-Release OR EXISTS ${PROJECT_ROOT_DIR}/build-Debug)
    message(STATUS "from ci tools, readjusting")
    get_filename_component(PROJECT_ROOT_DIR ${PROJECT_ROOT_DIR} DIRECTORY)
endif ()

set(BIN_DIR ${CMAKE_CURRENT_SOURCE_DIR}/bin)
set(TARGET_APP_PATH ${PROJECT_ROOT_DIR}/bundled/osx/)
set(PROJECT_APP_DIR ${DEX_PROJECT_NAME}.app)
set(PROJECT_APP_PATH ${BIN_DIR}/${PROJECT_APP_DIR})
set(PROJECT_QML_DIR ${PROJECT_ROOT_DIR}/atomic_defi_design/Dex)
set(MAC_DEPLOY_PATH $ENV{QT_ROOT}/clang_64/bin/macdeployqt)

message(STATUS "VCPKG package manager enabled")
message(STATUS "QT_ROOT -> ${QT_ROOT}")
message(STATUS "BIN_DIR -> ${BIN_DIR}")
message(STATUS "TARGET_APP_PATH -> ${TARGET_APP_PATH}")
message(STATUS "PROJECT_APP_DIR -> ${PROJECT_APP_DIR}")
message(STATUS "PROJECT_QML_DIR -> ${PROJECT_QML_DIR}")
message(STATUS "PROJECT_ROOT_DIR (after readjusting) -> ${PROJECT_ROOT_DIR}")

if (EXISTS ${PROJECT_APP_PATH})
    message(STATUS "PROJECT_APP_PATH -> ${PROJECT_APP_PATH}")
else ()
    message(FATAL_ERROR "Didn't find PROJECT_APP_PATH")
endif ()

if (EXISTS ${MAC_DEPLOY_PATH})
    message(STATUS "MAC_DEPLOY_PATH -> ${MAC_DEPLOY_PATH}")
else ()
    message(FATAL_ERROR "Didn't find MAC_DEPLOY_PATH")
endif ()

message(STATUS "CREATING DMG")
if (NOT EXISTS ${CMAKE_SOURCE_DIR}/bin/${DEX_PROJECT_NAME}.dmg)
    message(STATUS "${MAC_DEPLOY_PATH} ${PROJECT_APP_PATH} -qmldir=${PROJECT_QML_DIR} -always-overwrite -timestamp -verbose=1")
    execute_process(
            COMMAND
            ${MAC_DEPLOY_PATH} ${PROJECT_APP_PATH} -qmldir=${PROJECT_QML_DIR} -always-overwrite -timestamp -verbose=1
            WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
            ECHO_OUTPUT_VARIABLE
            ECHO_ERROR_VARIABLE
            )

    message(STATUS "Performing macOS application bundle pruning...")
    set(MAC_QML_DIR "${PROJECT_APP_PATH}/Contents/Resources/qml")
    if (EXISTS "${MAC_QML_DIR}")
        file(REMOVE_RECURSE "${MAC_QML_DIR}/QtQuick/Controls")
        file(REMOVE_RECURSE "${MAC_QML_DIR}/QtQuick/PrivateWidgets")
        set(MAC_C2_DIR "${MAC_QML_DIR}/QtQuick/Controls.2")
        file(REMOVE_RECURSE "${MAC_C2_DIR}/designer" "${MAC_C2_DIR}/Fusion" "${MAC_C2_DIR}/Imagine" "${MAC_C2_DIR}/Universal")
        file(REMOVE_RECURSE "${MAC_QML_DIR}/QtWebEngine/Controls1Delegates")
    endif()
    set(MAC_PAK_DIR "${PROJECT_APP_PATH}/Contents/Resources/qtwebengine_locales")
    if (EXISTS "${MAC_PAK_DIR}")
        message(STATUS "Filtering macOS QtWebEngine localization packs...")
        file(GLOB MAC_CHROMIUM_PAKS "${MAC_PAK_DIR}/*.pak")
        foreach(PAK_FILE ${MAC_CHROMIUM_PAKS})
            if (NOT PAK_FILE MATCHES "(de|en-US|en-GB|es|fr|ru|tr)\\.pak")
                file(REMOVE "${PAK_FILE}")
            endif()
        endforeach()
    endif()

    message(STATUS "Fixing QTWebengineProcess")
    set(QTWEBENGINE_BUNDLED_PATH ${PROJECT_APP_PATH}/Contents/Frameworks/QtWebEngineCore.framework/Helpers/QtWebEngineProcess.app/Contents/MacOS/QtWebEngineProcess)
    message(STATUS "Executing: [install_name_tool -add_rpath @executable_path/../../../../../../Frameworks ${QTWEBENGINE_BUNDLED_PATH}]")
    execute_process(COMMAND install_name_tool -add_rpath "@executable_path/../../../../../../Frameworks" "${QTWEBENGINE_BUNDLED_PATH}"
            WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
            ECHO_OUTPUT_VARIABLE
            ECHO_ERROR_VARIABLE)

    message(STATUS "Packaging the DMG")
    set(PACKAGER_PATH ${PROJECT_ROOT_DIR}/ci_tools_atomic_dex/dmg-packager/package.sh)
    if (EXISTS ${PACKAGER_PATH})
        message(STATUS "packager path is -> ${PACKAGER_PATH}")
    else ()
        message(FATAL_ERROR "Didn't find PACKAGER_PATH")
    endif ()

    execute_process(COMMAND ${PACKAGER_PATH} ${DEX_PROJECT_NAME} ${DEX_PROJECT_NAME} ${CMAKE_SOURCE_DIR}/bin/
            WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
            ECHO_OUTPUT_VARIABLE
            ECHO_ERROR_VARIABLE)
else()
    message(STATUS "dmg already generated - skipping")
endif ()

file(COPY ${CMAKE_SOURCE_DIR}/bin/${DEX_PROJECT_NAME}.dmg DESTINATION ${TARGET_APP_PATH})

get_filename_component(QT_ROOT_DIR $ENV{QT_ROOT} DIRECTORY)
set(IFW_ROOT ${QT_ROOT_DIR}/Tools/QtInstallerFramework)
message(STATUS "IFW_ROOT PATH IS ${IFW_ROOT}")
execute_process(COMMAND ls ${IFW_ROOT})

# Find all subdirectories
file(GLOB subdirs "${IFW_ROOT}/*")
# Initialize variables to track the highest version and folder
set(IFW_VERSION "")
# Loop through the subdirectories
foreach(subdir ${subdirs})
    get_filename_component(folder_name ${subdir} NAME)
	message(STATUS "scanning: ${subdir} [${folder_name}]")
    # Use string manipulation to extract version from folder name
    string(REGEX MATCH "([0-9]+\\.[0-9]+\\.[0-9]+)" version ${folder_name})
    # Check if the extracted version is higher than the current highest
	# TODO: For some reason this var fails to populate in windows
    if(version STREQUAL "")
        continue()
    elseif(version STRGREATER IFW_VERSION)
        set(IFW_VERSION ${version})
    endif()
endforeach()
# Fallback to last scanned subfolder if variable empty. Usually there is only one folder.
if(version STREQUAL "")
	set(IFW_VERSION ${folder_name})
endif()

