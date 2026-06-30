#!/bin/bash

set -euo pipefail

TEST_DIR="demo"
SCRIPT_DIR="scripts"
CONFIG_FILE_PATH="test/configuration.json"

rm -rf "${TEST_DIR}" || true
mkdir -p "${TEST_DIR}"
node "${SCRIPT_DIR}/insert-credentials.js" "example.js" "${CONFIG_FILE_PATH}" "${TEST_DIR}"

pushd ${TEST_DIR}
mkdir -p node_modules/aspose-barcode-cloud-node
pushd "$_"
ln -sv -f ../../../package.json .
ln -sv -F ../../../dist/ .
popd

# Run
node example.js
popd
