#!/usr/bin/env bash
set -eou pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
MISTI_PATH=${MISTI_PATH:-../misti}
SOUFFLE_PATH=${SOUFFLE_PATH:-../souffle.js}
CSS="$ROOT/src/css/typedoc-custom.css"

api() {
  (cd "$1" && yarn docs --customCss "$CSS")
  rm -rf "static/api/$2"
  mkdir -p static/api
  mv "$1/docs/api" "static/api/$2"
}

echo 'Generating Misti TypeDoc documentation...'
api "$MISTI_PATH" misti
mkdir -p static/api/misti/media
sed 's|fill="currentColor">|><style>path{fill:#0A3D62}@media (prefers-color-scheme:dark){path{fill:#4B87B3}}</style>|' \
  static/img/tools/misti.svg > static/api/misti/media/misti.svg
cat src/css/typedoc-misti.css >> static/api/misti/assets/custom.css

echo 'Generating Souffle.js TypeDoc documentation...'
api "$SOUFFLE_PATH" souffle-js

echo 'Generating docusaurus documentation...'
rm -rf ./build
docusaurus build --out-dir build/
