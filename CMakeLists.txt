cmake_minimum_required(VERSION 3.30)

list(APPEND CMAKE_MODULE_PATH ${CMAKE_SOURCE_DIR}/cmake)

include(project.metadata)           ##> generate_dex_project_metafiles()
generate_dex_project_metafiles()

include(build_type)
include(compiler_prerequisites)
include(vcpkg_prerequisites)
include(qt_prerequisites)

project(${DEX_PROJECT_NAME} LANGUAGES CXX VERSION 0.9.9)
message(STATUS "${PROJECT_NAME} is version ${PROJECT_VERSION}")

include(cmake_default_options)
include(ipo_prerequisites)

##! Antara
include(antara)
##! Calling this macros provided by the sdk will if you are on Apple init the environment for this OS (std::filesystem).
init_antara_env()

if (${CMAKE_SYSTEM_NAME} STREQUAL "Linux")
    set(LINUX TRUE)
endif ()

##! We fetch our dependencies
if (APPLE)
    FetchContent_Declare(kdf
            URL https://devbuilds.gleec.com/dev/kdf_a12695e-mac-x86-64.zip)
elseif (UNIX AND NOT APPLE)
    FetchContent_Declare(kdf
            URL https://devbuilds.gleec.com/dev/kdf_a12695e-linux-x86-64.zip)
else ()
    FetchContent_Declare(kdf
            URL https://devbuilds.gleec.com/dev/kdf_a12695e-win-x86-64.zip)
endif ()

FetchContent_Declare(
        qmaterial
        GIT_REPOSITORY https://github.com/OlivierLDff/Qaterial.git
        GIT_TAG c2f32d23523baabe406a8de6809dc9d41f9a881e
)

FetchContent_Declare(jl777-coins
        URL https://github.com/cipig/coins/archive/nogeo.zip)

FetchContent_MakeAvailable(kdf jl777-coins qmaterial)

##! Configure our needs.
if (UNIX)
    configure_file(${jl777-coins_SOURCE_DIR}/utils/coins_config_tcp.json ${CMAKE_CURRENT_SOURCE_DIR}/assets/config/${PROJECT_VERSION}-coins.json COPYONLY)
    configure_file(${jl777-coins_SOURCE_DIR}/coins ${CMAKE_CURRENT_SOURCE_DIR}/assets/tools/kdf/coins COPYONLY)
    configure_file(${kdf_SOURCE_DIR}/kdf ${CMAKE_CURRENT_SOURCE_DIR}/assets/tools/kdf/${DEX_API} COPYONLY)
    file(COPY ${jl777-coins_SOURCE_DIR}/icons/ DESTINATION ${CMAKE_CURRENT_SOURCE_DIR}/atomic_defi_design/assets/images/coins/)
else ()
    configure_file(${jl777-coins_SOURCE_DIR}/utils/coins_config_tcp.json ${CMAKE_BINARY_DIR}/bin/assets/config/${PROJECT_VERSION}-coins.json COPYONLY)
    configure_file(${jl777-coins_SOURCE_DIR}/coins ${CMAKE_BINARY_DIR}/bin/assets/tools/kdf/coins COPYONLY)
    configure_file(${kdf_SOURCE_DIR}/kdf.exe ${CMAKE_BINARY_DIR}/bin/assets/tools/kdf/${DEX_API}.exe COPYONLY)
endif ()

add_subdirectory(vendor/antara-gaming_sdk/modules)

##! Osx bundle icon
set(ICON)
configure_icon_osx(${CMAKE_CURRENT_SOURCE_DIR}/cmake/install/macos/dex-logo.icns ICON dex-logo.icns)
##! End antara

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

add_subdirectory(src)

add_library(antara_qrcode STATIC)
target_sources(antara_qrcode PRIVATE vendor/qrcode/QrCode.cpp)
target_include_directories(antara_qrcode PUBLIC vendor/qrcode)
target_link_libraries(antara_qrcode PUBLIC antara::default_settings)
