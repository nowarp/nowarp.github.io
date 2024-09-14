#!/usr/bin/env bash
set -eou pipefail

echo 'Generating Misti TypeDoc documentation...'
pushd ../misti
yarn docs --customCss ../nowarp.github.io/src/css/typedoc-custom.css
popd > /dev/null
rm -rf static/tools/misti/api
mkdir -pv static/tools/misti
mv ../misti/docs/api static/tools/misti/

echo 'Generating Souffle.js TypeDoc documentation...'
pushd ../souffle.js
yarn docs --customCss ../nowarp.github.io/src/css/typedoc-custom.css
popd > /dev/null
rm -rf static/lib/souffle-js/api
mkdir -pv static/lib/souffle-js
mv ../souffle.js/docs/api static/lib/souffle-js/

echo 'Generating docusaurus documentation...'
rm -rf ./build
docusaurus build --out-dir build/

