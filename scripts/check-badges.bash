#!/bin/bash
set -euo pipefail

readme_file=$1

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

pushd "${SCRIPT_DIR}/.." >/dev/null

(grep -oP '[^/]+\.yml(?=/badge.svg)' "${readme_file}" || (>&2 echo "No badges in ${readme_file}" ; exit 1)) | while read -r workflow_file; do
    path_to_workflow=".github/workflows/${workflow_file}"
    if [ ! -e "${path_to_workflow}" ]
    then
        >&2 echo "Error, workflow does not exist \"${path_to_workflow}\""
        exit 1
    fi
done

(grep -oP '[^/]+\.yml/badge.svg(?!\?branch=(main|v4)\b)' "${readme_file}" || echo ) | while read -r badge_without_branch; do
    if [ -z "${badge_without_branch}" ]; then continue; fi
    >&2 echo "Badge without branch \"${badge_without_branch}\""
    exit 1
done

popd >/dev/null
