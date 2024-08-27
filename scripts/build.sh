#!/usr/bin/env bash
set -eou pipefail

# Generate typedoc docs
pushd ../misti
yarn docs --customCss ../nowarp.github.io/src/css/typedoc-custom.css
popd
rm -rf static/api
mv ../misti/docs/api static

# Generate docusaurus docs
rm -rf ./build
docusaurus build --out-dir build/tools/misti
