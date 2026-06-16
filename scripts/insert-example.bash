#!/bin/bash
set -euo pipefail

cd "$( dirname "${BASH_SOURCE[0]}" )/.."

tmp_readme="$(mktemp README.md.XXXXXX)"
trap 'rm -f "$tmp_readme"' EXIT

python3 "./scripts/insert-example.py" "README.template" > "$tmp_readme"
mv "$tmp_readme" "README.md"
rm -f "README.template"
trap - EXIT
