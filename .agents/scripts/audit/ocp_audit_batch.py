#!/usr/bin/env python3
"""
Batch OCP heuristic pass: merge entries for every path in FILE_LIST.json not yet in OCP_VIOLATIONS.json.
Conservative status:1 flags (switch/case fan-out, long else-if). Idempotent merge; atomic JSON write.

Run from repo root after: python3 .agents/scripts/audit/generate_file_list.py
  python3 .agents/scripts/audit/ocp_audit_batch.py
"""

from __future__ import annotations

import json
import os
import re
from datetime import datetime, timezone

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
FILE_LIST = os.path.join(REPO_ROOT, ".agents", "todo", "FILE_LIST.json")
OCP_PATH = os.path.join(REPO_ROOT, ".agents", "todo", "OCP_VIOLATIONS.json")
TMP_PATH = OCP_PATH + ".tmp"

TRIVIAL_EXT = frozenset({
    "scss",
    "css",
    "svg",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "webp",
    "ico",
    "woff",
    "woff2",
    "ttf",
    "eot",
    "md",
    "mdx",
    "snap",
    "graphql",
    "gql",
})

GENERATED_PREFIXES = (
    ".react-router/types/",
    "node_modules/",
)

IMMUTABLE_SUBSTR = (
    "DTO",
    "RequestParams",
    "TextManager.constant.ts",
)


def iso_utc() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def is_trivial_path(rel: str) -> bool | str:
    lower = rel.lower()
    for sub in IMMUTABLE_SUBSTR:
        if sub in rel:
            return "N/A — immutable or policy-excluded path"
    for prefix in GENERATED_PREFIXES:
        if lower.startswith(prefix) or f"/{prefix}" in lower:
            return "N/A — generated or vendor path"
    ext = rel.rsplit(".", 1)[-1].lower() if "." in rel else ""
    if ext in TRIVIAL_EXT:
        return "N/A — non-behavioral or trivial for OCP"
    return False


def is_test_path(rel: str) -> bool:
    base = os.path.basename(rel).lower()
    return ".test." in base or ".spec." in base or base.endswith(".test.tsx") or base.endswith(".spec.tsx")


def analyze_source(rel: str, content: str) -> tuple[int, str, str]:
    is_test = is_test_path(rel)
    case_threshold = 12 if is_test else 8
    elif_threshold = 20 if is_test else 12

    case_count = len(re.findall(r"\bcase\s+", content))
    elif_count = content.count("else if")

    if case_count >= case_threshold:
        return (
            1,
            "Rigid conditional — many switch/case branches (extend via map/strategy/registry)",
            "Replace enum/string switch with handler map, polymorphism, or plugin registry.",
        )
    if elif_count >= elif_threshold:
        return (
            1,
            "Rigid conditional — long else-if chain",
            "Use discriminated union handlers, strategy map, or small focused functions.",
        )

    return (
        0,
        "Automated pass — no strong heuristic OCP smell",
        "Re-audit manually if this file owns evolving product behavior.",
    )


def classify(rel: str) -> tuple[int, str, str]:
    trivial = is_trivial_path(rel)
    if trivial is not False:
        return (0, trivial, "No change needed for OCP batch; manual review optional.")

    ext = rel.rsplit(".", 1)[-1].lower() if "." in rel else ""
    if ext not in ("ts", "tsx", "js", "jsx", "mjs", "cjs"):
        return (
            0,
            "N/A — extension not scored by heuristics",
            "Manual audit if behavior-heavy.",
        )

    abs_path = os.path.join(REPO_ROOT, rel)
    if not os.path.isfile(abs_path):
        return (0, "N/A — file missing on disk", "Regenerate FILE_LIST or fix path.")

    try:
        size = os.path.getsize(abs_path)
    except OSError:
        return (0, "N/A — unreadable", "Skip.")

    if size > 800_000:
        return (
            0,
            "Automated pass — file large; heuristics skipped",
            "Spot-check for switch/else-if manually if needed.",
        )

    try:
        with open(abs_path, encoding="utf-8", errors="replace") as handle:
            content = handle.read()
    except OSError:
        return (0, "N/A — read error", "Skip.")

    return analyze_source(rel, content)


def main() -> None:
    os.chdir(REPO_ROOT)
    with open(FILE_LIST, encoding="utf-8") as handle:
        files = json.load(handle)["files"]
    if os.path.isfile(OCP_PATH):
        with open(OCP_PATH, encoding="utf-8") as handle:
            data: dict = json.load(handle)
    else:
        data = {}

    ts = iso_utc()
    added = 0
    for rel in files:
        if rel in data:
            continue
        status, smell, hint = classify(rel)
        data[rel] = {
            "status": status,
            "smell": smell,
            "refactor_suggestion": hint,
            "timestamp": ts,
        }
        added += 1

    with open(TMP_PATH, "w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2, ensure_ascii=False)
        handle.write("\n")
    os.replace(TMP_PATH, OCP_PATH)

    flagged = sum(1 for entry in data.values() if entry.get("status") == 1)
    print(f"OCP batch: merged {added} new paths; total logged {len(data)}; status=1 count {flagged}")


if __name__ == "__main__":
    main()
