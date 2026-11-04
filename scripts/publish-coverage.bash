#!/bin/bash
#
# Publish the coverage result of one SDK to the test-coverage repository
# (https://github.com/aspose-barcode-cloud/test-coverage), where the README
# badges read it:
#
#   https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/aspose-barcode-cloud/test-coverage/main/<sdk>/coverage-badge.json
#
# Each publish replaces the <sdk>/ folder of that repository with
#
#   coverage-badge.json   shields.io endpoint JSON, written by scripts/coverage.py
#   summary.json          percent, covered/total lines, SDK commit, workflow run, date
#   <native report>       lcov.info, coverage.xml, clover.xml, jacoco.xml, coverage.out ...
#
# and commits it, so the history of that repository is the coverage trend.
#
# This file lives in the codegen repository (scripts/publish-coverage.bash) and
# is copied into every SDK by codegen/generate-<sdk>.bash. Edit it there.
#
# Usage (GitHub Actions, on push to the default branch only):
#   COVERAGE_TOKEN=... ./scripts/publish-coverage.bash <sdk>
#
# It reads coverage/coverage-summary.json (written by `make cover`) to find the
# native report. Environment:
#   COVERAGE_TOKEN        token of the GitHub App installed on the coverage
#                         repository with "Contents: write" (required)
#   COVERAGE_APP_SLUG     slug of that app, used as the commit author (optional)
#   COVERAGE_REPOSITORY   default aspose-barcode-cloud/test-coverage
#   COVERAGE_BRANCH       default main
#   GITHUB_REPOSITORY, GITHUB_SHA, GITHUB_SERVER_URL, GITHUB_API_URL,
#   GITHUB_RUN_ID         set by GitHub Actions
#
# The SDK repository's own GITHUB_TOKEN is not used, so the SDK workflows keep
# `permissions: contents: read`.
set -euo pipefail

sdk="${1:?usage: publish-coverage.bash <sdk>}"
summary_file="${COVERAGE_SUMMARY:-coverage/coverage-summary.json}"
badge_file="${COVERAGE_BADGE:-coverage/coverage-badge.json}"
repository="${COVERAGE_REPOSITORY:-aspose-barcode-cloud/test-coverage}"
branch="${COVERAGE_BRANCH:-main}"
server_url="${GITHUB_SERVER_URL:-https://github.com}"
api_url="${GITHUB_API_URL:-https://api.github.com}"

: "${COVERAGE_TOKEN:?COVERAGE_TOKEN is required}"
: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}"
: "${GITHUB_SHA:?GITHUB_SHA is required}"
for f in "${summary_file}" "${badge_file}"; do
    if [ ! -f "${f}" ]; then
        >&2 echo "File not found: ${f} (run 'make cover' first)"
        exit 1
    fi
done

report_file="$(python3 -c 'import json, sys; print(json.load(open(sys.argv[1]))["report"])' "${summary_file}")"
percent="$(python3 -c 'import json, sys; print(json.load(open(sys.argv[1]))["percent"])' "${summary_file}")"
if [ ! -f "${report_file}" ]; then
    >&2 echo "Coverage report not found: ${report_file}"
    exit 1
fi

# Absolute paths of the inputs, for use after cd into the clone.
absolute() { case "$1" in /*) echo "$1" ;; *) echo "${PWD}/$1" ;; esac; }
summary_path="$(absolute "${summary_file}")"
badge_path="$(absolute "${badge_file}")"
report_path="$(absolute "${report_file}")"

# Commit as the GitHub App's bot user when the app slug is known.
author_name="github-actions[bot]"
author_email="41898282+github-actions[bot]@users.noreply.github.com"
if [ -n "${COVERAGE_APP_SLUG:-}" ]; then
    author_name="${COVERAGE_APP_SLUG}[bot]"
    bot_id="$(curl -fsS -H "Authorization: Bearer ${COVERAGE_TOKEN}" "${api_url}/users/${COVERAGE_APP_SLUG}%5Bbot%5D" 2>/dev/null \
        | python3 -c 'import json, sys; print(json.load(sys.stdin)["id"])' 2>/dev/null || true)"
    author_email="${bot_id:+${bot_id}+}${author_name}@users.noreply.github.com"
fi

work_dir="$(mktemp -d)"
trap 'rm -rf "${work_dir}"' EXIT
clone_dir="${work_dir}/repo"

# Pass the token as an HTTP header through the environment, not the remote URL
# or the command line, so it never ends up in .git/config, an error message or
# the process list.
auth_header="AUTHORIZATION: basic $(printf 'x-access-token:%s' "${COVERAGE_TOKEN}" | base64 | tr -d '\n')"
git_auth() {
    GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=http.extraheader GIT_CONFIG_VALUE_0="${auth_header}" git "$@"
}

clone_url="${server_url}/${repository}.git"
if git_auth clone --quiet --depth 1 --branch "${branch}" "${clone_url}" "${clone_dir}" 2>/dev/null; then
    cd "${clone_dir}"
else
    # A freshly created, empty repository has no branch yet.
    git_auth clone --quiet --depth 1 "${clone_url}" "${clone_dir}"
    cd "${clone_dir}"
    git checkout --quiet --orphan "${branch}"
fi

publish() {
    rm -rf "${sdk}"
    mkdir -p "${sdk}"
    cp "${badge_path}" "${sdk}/coverage-badge.json"
    cp "${report_path}" "${sdk}/$(basename "${report_path}")"
    python3 - "${summary_path}" "${sdk}/summary.json" "${sdk}" "${report_path}" <<'PY'
import datetime
import json
import os
import sys

source, target, sdk, report = sys.argv[1:5]
with open(source, encoding="utf-8") as fh:
    summary = json.load(fh)
summary.update(
    {
        "sdk": sdk,
        "report": os.path.basename(report),
        "repository": os.environ["GITHUB_REPOSITORY"],
        "commit": os.environ["GITHUB_SHA"],
        "run_url": "{}/{}/actions/runs/{}".format(
            os.environ.get("GITHUB_SERVER_URL", "https://github.com"),
            os.environ["GITHUB_REPOSITORY"],
            os.environ.get("GITHUB_RUN_ID", ""),
        ),
        "published_at": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    }
)
with open(target, "w", encoding="utf-8") as fh:
    json.dump(summary, fh, indent=2)
    fh.write("\n")
PY
    git add --all "${sdk}"
    git -c user.name="${author_name}" -c user.email="${author_email}" \
        commit --quiet --message "${sdk}: ${percent}% (${GITHUB_REPOSITORY}@${GITHUB_SHA:0:7})"
    git_auth push --quiet origin "HEAD:refs/heads/${branch}"
}

# Another SDK may publish at the same time; on a rejected push start over from
# the new tip of the branch.
for attempt in 1 2 3; do
    if publish; then
        echo "Published ${sdk} ${percent}% to ${repository}@${branch}"
        exit 0
    fi
    >&2 echo "Push attempt ${attempt} failed, retrying"
    sleep $((attempt * 5))
    git_auth fetch --quiet --depth 1 origin "${branch}"
    git reset --quiet --hard FETCH_HEAD
done

>&2 echo "Could not publish ${sdk} coverage to ${repository}"
exit 1
