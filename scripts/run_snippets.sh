#!/bin/bash

set -euo pipefail

RUN_DIR="snippets_test"
SNIPPETS_DIR="snippets"
SCRIPT_DIR="scripts"
CONFIG_FILE_PATH="test/configuration.json"

rm -rf "${RUN_DIR}" || true
mkdir -p "${RUN_DIR}"

pushd ${RUN_DIR}
mkdir -p node_modules/aspose-barcode-cloud-node
pushd "$_"
ln -sv -f ../../../package.json .
ln -sv ../../../dist/ .
popd
popd

for file in $(find "${SNIPPETS_DIR}" -name "*.js" ! -name "manualFetchToken.js"); do
    ${SCRIPT_DIR}/run_snippet.sh "$file" $RUN_DIR $SCRIPT_DIR $CONFIG_FILE_PATH || { echo "Error processing $file"; exit 1; }
done

#Other dependencies for manualFetchToken
pushd ${RUN_DIR}
npm i axios qs
popd

${SCRIPT_DIR}/run_snippet.sh "${SNIPPETS_DIR}/manualFetchToken.js" $RUN_DIR $SCRIPT_DIR $CONFIG_FILE_PATH || exit 1;

rm -rf "${RUN_DIR}" || true
