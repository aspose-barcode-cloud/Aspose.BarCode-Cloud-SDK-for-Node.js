#!/usr/bin/env python3
"""Publish the coverage result of one SDK to the test-coverage repository.

The repository https://github.com/aspose-barcode-cloud/test-coverage holds the
results of all SDKs; the README badges read them from there:

    https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/aspose-barcode-cloud/test-coverage/main/<sdk>/coverage-badge.json

Each publish replaces the <sdk>/ folder of that repository with

    coverage-badge.json   shields.io endpoint JSON, written by scripts/coverage.py
    summary.json          percent, covered/total lines, SDK commit, workflow run, date
    <native report>       lcov.info, coverage.xml, cobertura.xml, jacoco.xml or coverage.out

and commits it, so the history of that repository is the coverage trend.

This file lives in the codegen repository (scripts/publish-coverage.py) and is
copied into every SDK by codegen/generate-<sdk>.bash. Edit it there.

Usage (GitHub Actions, on push to the default branch only):
    COVERAGE_TOKEN=... python scripts/publish-coverage.py <sdk>

It reads coverage/coverage-summary.json (written by `make cover`) to find the
native report. Environment:
    COVERAGE_TOKEN        token of the GitHub App installed on the coverage
                          repository with "Contents: write" (required)
    COVERAGE_APP_SLUG     slug of that app, used as the commit author (optional)
    COVERAGE_REPOSITORY   default aspose-barcode-cloud/test-coverage
    COVERAGE_BRANCH       default main
    COVERAGE_SUMMARY      default coverage/coverage-summary.json
    COVERAGE_BADGE        default coverage/coverage-badge.json
    GITHUB_REPOSITORY, GITHUB_SHA, GITHUB_SERVER_URL, GITHUB_API_URL,
    GITHUB_RUN_ID         set by GitHub Actions

The SDK repository's own GITHUB_TOKEN is not used, so the SDK workflows keep
`permissions: contents: read`.
"""

import argparse
import base64
import datetime
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.request
from typing import Dict, List, NoReturn, Optional, Tuple

ATTEMPTS = 3


def fail(message: str) -> NoReturn:
    print(message, file=sys.stderr)
    sys.exit(1)


def require_env(name: str) -> str:
    value = os.environ.get(name, "")
    if not value:
        fail("{} is required".format(name))
    return value


def git_env(token: str) -> Dict[str, str]:
    """Environment that sends the token as an HTTP header.

    Passing it through GIT_CONFIG_* keeps it out of the remote URL, .git/config,
    error messages and the process list.
    """
    basic = base64.b64encode("x-access-token:{}".format(token).encode()).decode()
    env = dict(os.environ)
    env.update(
        {
            "GIT_CONFIG_COUNT": "1",
            "GIT_CONFIG_KEY_0": "http.extraheader",
            "GIT_CONFIG_VALUE_0": "AUTHORIZATION: basic {}".format(basic),
            "GIT_TERMINAL_PROMPT": "0",
        }
    )
    return env


def git(
    args: List[str],
    cwd: Optional[str] = None,
    env: Optional[Dict[str, str]] = None,
    check: bool = True,
    quiet: bool = False,
) -> bool:
    result = subprocess.run(["git"] + args, cwd=cwd, env=env, stderr=subprocess.DEVNULL if quiet else None)
    if check and result.returncode != 0:
        fail("git {} failed with exit code {}".format(args[0], result.returncode))
    return result.returncode == 0


def commit_author(token: str, app_slug: str, api_url: str) -> Tuple[str, str]:
    """Commit as the GitHub App's bot user when the app slug is known."""
    if not app_slug:
        return "github-actions[bot]", "41898282+github-actions[bot]@users.noreply.github.com"
    name = "{}[bot]".format(app_slug)
    request = urllib.request.Request(
        "{}/users/{}%5Bbot%5D".format(api_url, app_slug), headers={"Authorization": "Bearer {}".format(token)}
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            bot_id = json.load(response)["id"]
        return name, "{}+{}@users.noreply.github.com".format(bot_id, name)
    except Exception:  # The noreply address without the id still works.
        return name, "{}@users.noreply.github.com".format(name)


def write_summary(source: str, target: str, sdk: str, report: str) -> None:
    with open(source, encoding="utf-8") as fh:
        summary = json.load(fh)
    server_url = os.environ.get("GITHUB_SERVER_URL", "https://github.com")
    summary.update(
        {
            "sdk": sdk,
            "report": os.path.basename(report),
            "repository": os.environ["GITHUB_REPOSITORY"],
            "commit": os.environ["GITHUB_SHA"],
            "run_url": "{}/{}/actions/runs/{}".format(
                server_url, os.environ["GITHUB_REPOSITORY"], os.environ.get("GITHUB_RUN_ID", "")
            ),
            "published_at": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        }
    )
    with open(target, "w", encoding="utf-8") as fh:
        json.dump(summary, fh, indent=2)
        fh.write("\n")


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(description="Publish an SDK's coverage to the test-coverage repository.")
    parser.add_argument("sdk", help="folder name in the test-coverage repository, e.g. go")
    sdk = parser.parse_args(argv).sdk

    token = require_env("COVERAGE_TOKEN")
    sdk_repository = require_env("GITHUB_REPOSITORY")
    sdk_commit = require_env("GITHUB_SHA")
    repository = os.environ.get("COVERAGE_REPOSITORY") or "aspose-barcode-cloud/test-coverage"
    branch = os.environ.get("COVERAGE_BRANCH") or "main"
    server_url = os.environ.get("GITHUB_SERVER_URL") or "https://github.com"
    api_url = os.environ.get("GITHUB_API_URL") or "https://api.github.com"
    summary_path = os.path.abspath(
        os.environ.get("COVERAGE_SUMMARY") or os.path.join("coverage", "coverage-summary.json")
    )
    badge_path = os.path.abspath(os.environ.get("COVERAGE_BADGE") or os.path.join("coverage", "coverage-badge.json"))

    for path in (summary_path, badge_path):
        if not os.path.isfile(path):
            fail("File not found: {} (run 'make cover' first)".format(path))
    with open(summary_path, encoding="utf-8") as fh:
        summary = json.load(fh)
    report_path = os.path.abspath(summary["report"])
    percent = summary["percent"]
    if not os.path.isfile(report_path):
        fail("Coverage report not found: {}".format(report_path))

    author_name, author_email = commit_author(token, os.environ.get("COVERAGE_APP_SLUG", ""), api_url)
    env = git_env(token)
    clone_url = "{}/{}.git".format(server_url, repository)

    with tempfile.TemporaryDirectory() as work_dir:
        clone_dir = os.path.join(work_dir, "repo")
        if not git(
            ["clone", "--quiet", "--depth", "1", "--branch", branch, clone_url, clone_dir],
            env=env,
            check=False,
            quiet=True,
        ):
            # A freshly created, empty repository has no branch yet.
            shutil.rmtree(clone_dir, ignore_errors=True)
            git(["clone", "--quiet", "--depth", "1", clone_url, clone_dir], env=env)
            git(["checkout", "--quiet", "--orphan", branch], cwd=clone_dir)

        sdk_dir = os.path.join(clone_dir, sdk)
        message = "{}: {}% ({}@{})".format(sdk, percent, sdk_repository, sdk_commit[:7])
        # Another SDK may publish at the same time; on a rejected push start over
        # from the new tip of the branch.
        for attempt in range(1, ATTEMPTS + 1):
            shutil.rmtree(sdk_dir, ignore_errors=True)
            os.makedirs(sdk_dir)
            shutil.copyfile(badge_path, os.path.join(sdk_dir, "coverage-badge.json"))
            shutil.copyfile(report_path, os.path.join(sdk_dir, os.path.basename(report_path)))
            write_summary(summary_path, os.path.join(sdk_dir, "summary.json"), sdk, report_path)
            git(["add", "--all", sdk], cwd=clone_dir)
            git(
                ["-c", "user.name=" + author_name, "-c", "user.email=" + author_email]
                + ["commit", "--quiet", "--message", message],
                cwd=clone_dir,
            )
            if git(["push", "--quiet", "origin", "HEAD:refs/heads/" + branch], cwd=clone_dir, env=env, check=False):
                print("Published {} {}% to {}@{}".format(sdk, percent, repository, branch))
                return 0
            if attempt == ATTEMPTS:
                break
            print("Push attempt {} failed, retrying".format(attempt), file=sys.stderr)
            time.sleep(attempt * 5)
            git(["fetch", "--quiet", "--depth", "1", "origin", branch], cwd=clone_dir, env=env)
            git(["reset", "--quiet", "--hard", "FETCH_HEAD"], cwd=clone_dir)

    print("Could not publish {} coverage to {}".format(sdk, repository), file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
