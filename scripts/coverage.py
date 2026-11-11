#!/usr/bin/env python3
"""Line coverage gate and badge generator shared by all Aspose.BarCode Cloud SDKs.

This file lives in the codegen repository (scripts/coverage.py) and is copied
into every SDK by codegen/generate-<sdk>.bash. Edit it there, not in an SDK.

Every SDK's `make cover` runs its tests with its native coverage tool and then
calls this script with the report. The script:

1. reads the report and computes line coverage of the SDK library code;
2. prints one summary line:  Line coverage: 84.69% (2020/2385 lines, threshold: 80%)
3. writes a shields.io endpoint JSON (default coverage/coverage-badge.json) for
   the README badge and a summary (default coverage/coverage-summary.json) that
   scripts/publish-coverage.py publishes to the test-coverage repository;
4. exits with code 1 when coverage is below the threshold.

Usage:
    python scripts/coverage.py FORMAT REPORT [--threshold N] [--badge PATH] [--summary PATH] [--include SUBSTRING]

Supported formats:
    lcov       LCOV tracefile (dart `coverage:format_coverage`, jest, `llvm-cov export -format=lcov`)
    cobertura  Cobertura XML (coverlet, coverage.py `--cov-report xml`, PHPUnit `--coverage-cobertura`)
    jacoco     JaCoCo XML (jacoco-maven-plugin `report`)
    go         Go cover profile (`go test -coverprofile`)

The threshold defaults to the COVERAGE_THRESHOLD environment variable, or 80.
`--include` keeps only source files whose path contains SUBSTRING (repeatable);
it works with the per-file formats lcov and go.
"""

import argparse
import json
import os
import sys
import xml.etree.ElementTree as ET
from typing import Callable, Dict, List, Optional, Sequence, Tuple

DEFAULT_THRESHOLD = 80.0
DEFAULT_BADGE = os.path.join("coverage", "coverage-badge.json")
DEFAULT_SUMMARY = os.path.join("coverage", "coverage-summary.json")

Counts = Tuple[int, int]  # (covered lines, total lines)


def _included(path: str, include: Sequence[str]) -> bool:
    return not include or any(part in path for part in include)


def parse_lcov(path: str, include: Sequence[str]) -> Counts:
    covered = total = 0
    source = ""
    with open(path, encoding="utf-8") as report:
        for raw in report:
            line = raw.strip()
            if line.startswith("SF:"):
                source = line[3:]
            elif not _included(source, include):
                continue
            elif line.startswith("LH:"):
                covered += int(line[3:])
            elif line.startswith("LF:"):
                total += int(line[3:])
    return covered, total


def parse_cobertura(path: str, include: Sequence[str]) -> Counts:
    # Report totals only; `--include` is rejected for this format in main().
    root = ET.parse(path).getroot()
    return int(root.get("lines-covered", "0")), int(root.get("lines-valid", "0"))


def parse_jacoco(path: str, include: Sequence[str]) -> Counts:
    # The report-level LINE counter is the bundle total that `jacoco:check` uses;
    # `--include` is rejected for this format in main().
    for counter in ET.parse(path).getroot().findall("counter"):
        if counter.get("type") == "LINE":
            hit = int(counter.get("covered", "0"))
            return hit, hit + int(counter.get("missed", "0"))
    return 0, 0


def parse_go(path: str, include: Sequence[str]) -> Counts:
    # A profile written by `go test -coverpkg` for several test packages repeats the
    # same block once per package; merge them the way `go tool cover` does.
    blocks: Dict[str, Tuple[int, bool]] = {}
    with open(path, encoding="utf-8") as report:
        for raw in report:
            line = raw.strip()
            if not line or line.startswith("mode:"):
                continue
            block, statements, count = line.rsplit(" ", 2)
            if not _included(block.split(":", 1)[0], include):
                continue
            hit = int(count) > 0
            previous = blocks.get(block)
            blocks[block] = (int(statements), hit or (previous is not None and previous[1]))
    total = sum(statements for statements, _ in blocks.values())
    covered = sum(statements for statements, hit in blocks.values() if hit)
    return covered, total


# Formats that list coverage per source file, so `--include` can filter them.
PER_FILE_FORMATS = ("lcov", "go")

PARSERS: Dict[str, Callable[[str, Sequence[str]], Counts]] = {
    "lcov": parse_lcov,
    "cobertura": parse_cobertura,
    "jacoco": parse_jacoco,
    "go": parse_go,
}


def badge_color(percent: float) -> str:
    for limit, color in ((90, "brightgreen"), (80, "green"), (70, "yellowgreen"), (60, "yellow"), (50, "orange")):
        if percent >= limit:
            return color
    return "red"


def write_json(path: str, document: Dict[str, object]) -> None:
    directory = os.path.dirname(path)
    if directory:
        os.makedirs(directory, exist_ok=True)
    with open(path, "w", encoding="utf-8") as output:
        json.dump(document, output, indent=2)
        output.write("\n")


def write_badge(path: str, percent: float) -> None:
    write_json(
        path,
        {
            "schemaVersion": 1,
            "label": "coverage",
            "message": "{:.1f}%".format(percent),
            "color": badge_color(percent),
        },
    )


def default_threshold() -> float:
    value = os.environ.get("COVERAGE_THRESHOLD", "").strip()
    return float(value) if value else DEFAULT_THRESHOLD


def main(argv: Optional[List[str]] = None) -> int:
    parser = argparse.ArgumentParser(description="Line coverage gate and badge generator.")
    parser.add_argument("format", choices=sorted(PARSERS), help="coverage report format")
    parser.add_argument("report", help="path to the coverage report")
    parser.add_argument("--threshold", type=float, default=None, help="minimum line coverage, percent")
    parser.add_argument("--badge", default=DEFAULT_BADGE, help="shields.io endpoint JSON to write")
    parser.add_argument("--summary", default=DEFAULT_SUMMARY, help="summary JSON to write")
    parser.add_argument("--include", action="append", default=[], help="keep only files whose path contains this")
    args = parser.parse_args(argv)

    threshold = args.threshold if args.threshold is not None else default_threshold()

    if not os.path.isfile(args.report):
        print("Coverage report not found: {}".format(args.report), file=sys.stderr)
        return 2

    if args.include and args.format not in PER_FILE_FORMATS:
        parser.error("--include works only with {}".format(", ".join(PER_FILE_FORMATS)))

    covered, total = PARSERS[args.format](args.report, args.include)
    if total == 0:
        print("Coverage report {} has no executable lines".format(args.report), file=sys.stderr)
        return 2

    percent = 100.0 * covered / total
    print("Line coverage: {:.2f}% ({}/{} lines, threshold: {:g}%)".format(percent, covered, total, threshold))
    write_badge(args.badge, percent)
    write_json(
        args.summary,
        {
            "format": args.format,
            "report": args.report,
            "percent": round(percent, 2),
            "covered": covered,
            "total": total,
            "threshold": threshold,
        },
    )

    # Compare the rounded value we print, so 79.996% never prints as "80.00%" and fails.
    if round(percent, 2) < threshold:
        print("FAIL: line coverage {:.2f}% is below the {:g}% threshold".format(percent, threshold), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
