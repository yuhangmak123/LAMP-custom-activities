#!/bin/bash
# npx --yes --package inline-source-cli inline-source --attribute "" --compress false --root ./build ./build/index.html > dist.html
# openssl base64 -in dist.html -out dist.html.b64

name=$(basename "$(pwd)")

mkdir -p "../dist/in" "../dist/out"

npx --yes --package inline-source-cli inline-source \
  --attribute "" \
  --compress false \
  --root ./dist \
  ./dist/index.html > "../dist/in/$name.html"

openssl base64 -A \
  -in "../dist/in/$name.html" \
  -out "../dist/out/$name.html.b64"