#!/usr/bin/env bash
set -eou pipefail

# Use paths from environment variables if set
MISTI_PATH=${MISTI_PATH:-../misti}
SOUFFLE_PATH=${SOUFFLE_PATH:-../souffle.js}
CUSTOM_CSS_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/../src/css/typedoc-custom.css"

echo 'Generating Misti TypeDoc documentation...'
pushd "$MISTI_PATH"
yarn docs --customCss "$CUSTOM_CSS_PATH"
popd > /dev/null
rm -rf static/tools/misti/api
mkdir -pv static/tools/misti
mv "$MISTI_PATH/docs/api" static/tools/misti/

echo 'Generating Souffle.js TypeDoc documentation...'
pushd "$SOUFFLE_PATH"
yarn docs --customCss "$CUSTOM_CSS_PATH"
popd > /dev/null
rm -rf static/lib/souffle-js/api
mkdir -pv static/lib/souffle-js
mv "$SOUFFLE_PATH/docs/api" static/lib/souffle-js/

echo 'Generating docusaurus documentation...'
rm -rf ./build
docusaurus build --out-dir build/
