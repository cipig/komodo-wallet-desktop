##! Dependancies
include(FetchContent)

if (WIN32)
    find_package(ZLIB)
    set(BUILD_SHARED_LIBS OFF CACHE BOOL "Override option" FORCE)
endif ()

find_package(asio REQUIRED)
find_package(Async++ REQUIRED)
find_package(EnTT REQUIRED)
find_package(nlohmann_json REQUIRED)
find_package(range-v3 REQUIRED)
find_package(date REQUIRED)
find_package(cpprestsdk REQUIRED)

find_package(fmt REQUIRED)
add_library(fmt INTERFACE)
target_link_libraries(fmt INTERFACE fmt::fmt)

find_package(spdlog REQUIRED)
add_library(spdlog INTERFACE)
target_link_libraries(spdlog INTERFACE spdlog::spdlog)

if (APPLE)
    get_target_property(ACTUAL_VAR cpprestsdk::cpprest INTERFACE_LINK_LIBRARIES)
    message("Property of cpprestsdk::cpprest: ${ACTUAL_VAR}")
    set(NEW_INTERFACES "")
    foreach (CUR_LIB ${ACTUAL_VAR})
        #message(STATUS "CUR_LIB-> ${CUR_LIB}")
        if (CUR_LIB MATCHES "MacOSX")
            message(STATUS "NEED TO BE SKIPPED -> ${CUR_LIB}")
        else ()
            list(APPEND NEW_INTERFACES ${CUR_LIB})
            #message("KK-> ${NEW_INTERFACES}")
        endif ()
    endforeach ()
    set_target_properties(cpprestsdk::cpprest PROPERTIES INTERFACE_LINK_LIBRARIES "${NEW_INTERFACES}")
    get_target_property(KK_VAR cpprestsdk::cpprest INTERFACE_LINK_LIBRARIES)
    message("Property of cpprestsdk::cpprest: ${KK_VAR}")
endif ()
#find_package(absl CONFIG REQUIRED)
find_package(Boost COMPONENTS random system thread REQUIRED)
if (CONAN_ENABLED)
    if (NOT TARGET Boost::random)
        add_library(Boost::random INTERFACE IMPORTED)
        if (WIN32)
            target_link_libraries(Boost::random INTERFACE CONAN_LIB::Boost_libboost_random)
        else ()
            target_link_libraries(Boost::random INTERFACE CONAN_LIB::Boost_boost_random)
        endif ()
    endif ()
endif ()

add_library(komodo-date INTERFACE)
if (CONAN_ENABLED)
    target_link_libraries(komodo-date INTERFACE date::date)
else ()
    target_link_libraries(komodo-date INTERFACE date::date-tz)
endif ()
add_library(komodo-date::date ALIAS komodo-date)

find_package(Qt5 5.15 COMPONENTS Core Quick LinguistTools Svg WebEngine WebEngineCore WebEngineWidgets Widgets REQUIRED)

set(BUILD_TESTING OFF CACHE BOOL "Override option" FORCE)
set(EXPECTED_ENABLE_TESTS OFF CACHE BOOL "Override option" FORCE)

FetchContent_Declare(
        doom_meta
        URL https://github.com/doom/meta/archive/master.zip
)
FetchContent_MakeAvailable(doom_meta)

find_package(strong_type CONFIG REQUIRED)
find_package(tl-expected CONFIG REQUIRED)

add_library(antara_entt INTERFACE)
target_link_libraries(antara_entt INTERFACE EnTT::EnTT)
add_library(antara::entt ALIAS antara_entt)

add_library(refl-cpp INTERFACE)
target_include_directories(refl-cpp INTERFACE ${refl-cpp_SOURCE_DIR})
add_library(antara::refl-cpp ALIAS refl-cpp)


##! Sodium
add_library(komodo-sodium INTERFACE)
if (CONAN_ENABLED)
    find_package(libsodium REQUIRED)
else ()
    find_package(unofficial-sodium CONFIG REQUIRED)
    target_link_libraries(komodo-sodium INTERFACE unofficial-sodium::sodium)
endif ()
add_library(komodo-sodium::sodium ALIAS komodo-sodium)


## Unofficial BTC
add_library(unofficial-bitcoin INTERFACE)
if (WIN32)
    target_link_libraries(unofficial-bitcoin INTERFACE ${PROJECT_SOURCE_DIR}/libwally-core/wally.lib)
    target_include_directories(unofficial-bitcoin INTERFACE ${PROJECT_SOURCE_DIR}/libwally-core/include)
else ()
    find_library(unofficial-secp secp256k1)
    find_library(unofficial-wally wallycore)
    find_path(unofficial-wally-headers wally_core.h)
    target_link_libraries(unofficial-bitcoin INTERFACE ${unofficial-wally} ${unofficial-secp})
    target_include_directories(unofficial-bitcoin INTERFACE ${unofficial-wally-headers})
    message(STATUS "Found wally -> ${unofficial-wally} ${unofficial-wally-headers}")
endif ()
add_library(unofficial-btc::bitcoin ALIAS unofficial-bitcoin)
