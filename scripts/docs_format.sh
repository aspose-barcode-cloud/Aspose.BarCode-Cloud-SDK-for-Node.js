#!/bin/bash

set -euo pipefail

trim_trailing_spaces () {
  echo "$1"
  sed -i -e 's/[[:space:]]*$//' "$1"
}

trim_trailing_spaces "README.md"

for filename in ./docs/*.md; do
  trim_trailing_spaces "$filename"
done
