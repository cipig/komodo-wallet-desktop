vcpkg_check_linkage(ONLY_STATIC_LIBRARY)

vcpkg_from_github(
    OUT_SOURCE_PATH SOURCE_PATH
    REPO cipig/asyncplusplus
    HEAD_REF master
    REF 2472b4f49dc50dab3f362cef9823e5c5636abe78
    SHA512 afe3374204d6b9e2aa5504bf81eba85f580536b5e87d764c516632f5222748133a74583a5441bef6cfe6983bd1436931de56b7e65950466778079a14a1a61bc8
)

vcpkg_cmake_configure(
    SOURCE_PATH "${SOURCE_PATH}"
)

vcpkg_cmake_install()

vcpkg_cmake_config_fixup(CONFIG_PATH cmake PACKAGE_NAME async++)

file(REMOVE_RECURSE "${CURRENT_PACKAGES_DIR}/debug/include" "${CURRENT_PACKAGES_DIR}/debug/share")

file(INSTALL "${SOURCE_PATH}/LICENSE" DESTINATION "${CURRENT_PACKAGES_DIR}/share/${PORT}" RENAME copyright)
