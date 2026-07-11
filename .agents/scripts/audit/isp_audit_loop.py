#!/usr/bin/env python3
"""
Batch ISP audit: random sample from .agents/todo/FILE_LIST.json, heuristic analysis,
merge into .agents/todo/ISP_VIOLATIONS.json (one atomic write per run; optional per-file).

Heuristics (conservative status 1):
- Dummy / not-implemented bodies together with explicit `implements` in the same file.

Otherwise status 0. Does not replace human review for partial-usage across call sites.

Sampling scope: .ts/.tsx only; excludes filenames with .test. or .stories. (aligned with SRP / interactive ISP).

Usage (from repo root):
  python3 .agents/scripts/audit/isp_audit_loop.py              # default 50 files
  python3 .agents/scripts/audit/isp_audit_loop.py --count 200
  python3 .agents/scripts/audit/isp_audit_loop.py --seed 42 --count 10
  python3 .agents/scripts/audit/isp_audit_loop.py --atomic-per-file   # persist after each file
"""

from __future__ import annotations

import argparse
import json
import os
import random
import re
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import _audit_loop_common as _alc

REPO = Path(__file__).resolve().parents[3]
FILE_LIST_PATH = REPO / ".agents/todo/FILE_LIST.json"
VIOLATIONS_PATH = REPO / ".agents/todo/ISP_VIOLATIONS.json"

DUMMY_RES = [
    re.compile(r"throw\s+new\s+Error\s*\(\s*['\"][^'\"]*[Nn]ot\s+implemented", re.I),
    re.compile(r"throw\s+new\s+Error\s*\(\s*['\"][^'\"]*must\s+implement", re.I),
    re.compile(r"NotImplementedError", re.I),
    re.compile(r"UnsupportedOperationError", re.I),
    re.compile(r"unsupportedOperationException", re.I),
]

IMPLEMENTS_RE = re.compile(
    r"\bimplements\s+([A-Za-z_][A-Za-z0-9_]*(?:\s*,\s*[A-Za-z_][A-Za-z0-9_]*)*)",
)


def utc_timestamp() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def atomic_write_json(target: Path, data: object) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    encoded = json.dumps(data, indent=2, sort_keys=False)
    encoded_bytes = (encoded + "\n").encode("utf-8")
    fd, tmp_path = tempfile.mkstemp(
        dir=str(target.parent),
        prefix=".isp_violations_",
        suffix=".json.tmp",
    )
    try:
        with os.fdopen(fd, "wb") as tmp_file:
            tmp_file.write(encoded_bytes)
            tmp_file.flush()
            os.fsync(tmp_file.fileno())
        os.replace(tmp_path, target)
    except Exception:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass
        raise


def load_json(path: Path, default: object) -> object:
    if not path.is_file():
        return default
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def first_implements_names(text: str) -> list[str]:
    match = IMPLEMENTS_RE.search(text)
    if not match:
        return []
    raw = match.group(1)
    return [part.strip() for part in raw.split(",") if part.strip()]


def has_dummy_evidence(text: str) -> bool:
    return any(pattern.search(text) for pattern in DUMMY_RES)


def analyze_file(rel_path: str, text: str) -> dict[str, object]:
    implements = first_implements_names(text)
    if implements and has_dummy_evidence(text):
        primary = implements[0]
        return {
            "status": 1,
            "fat_interface": primary,
            "unused_methods": [],
            "split_suggestion": (
                "Segregate contract so implementors are not forced to stub unused "
                "members; consider role-specific interfaces or default adapter."
            ),
            "timestamp": utc_timestamp(),
        }
    return {
        "status": 0,
        "fat_interface": "",
        "unused_methods": [],
        "split_suggestion": "",
        "timestamp": utc_timestamp(),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Batch ISP audit into ISP_VIOLATIONS.json")
    parser.add_argument(
        "--count",
        type=int,
        default=50,
        help="Number of random files to process (default: 50)",
    )
    parser.add_argument("--seed", type=int, default=None, help="RNG seed (optional)")
    parser.add_argument(
        "--atomic-per-file",
        action="store_true",
        help="Write ISP_VIOLATIONS.json after each file (slower; survives interruption)",
    )
    args = parser.parse_args()
    if args.count < 1:
        print("--count must be >= 1", file=sys.stderr)
        return 2

    file_list_data = load_json(FILE_LIST_PATH, None)
    if not isinstance(file_list_data, dict) or "files" not in file_list_data:
        print(f"Missing or invalid {FILE_LIST_PATH}", file=sys.stderr)
        return 1

    violations = load_json(VIOLATIONS_PATH, {})
    if not isinstance(violations, dict):
        violations = {}

    done = set(violations.keys())
    candidates = [
        p
        for p in file_list_data["files"]
        if isinstance(p, str) and p not in done and _alc.is_ts_code_audit_path(p)
    ]

    if not candidates:
        print("No remaining .ts/.tsx paths (regenerate FILE_LIST or all audited).")
        return 0

    rng = random.Random(args.seed)
    rng.shuffle(candidates)
    batch = candidates[: args.count]

    status_1 = 0
    for rel in batch:
        full = REPO / rel
        if not full.is_file():
            entry = {
                "status": 0,
                "fat_interface": "",
                "unused_methods": [],
                "split_suggestion": "",
                "timestamp": utc_timestamp(),
            }
        else:
            try:
                text = full.read_text(encoding="utf-8", errors="replace")
            except OSError:
                text = ""
            entry = analyze_file(rel, text)

        violations[rel] = entry
        if args.atomic_per_file:
            atomic_write_json(VIOLATIONS_PATH, violations)
        if entry["status"] == 1:
            status_1 += 1
            print(f"[ISP 1] {rel} -> {entry['fat_interface']}")

    if not args.atomic_per_file:
        atomic_write_json(VIOLATIONS_PATH, violations)

    print(f"Processed {len(batch)} file(s). status=1: {status_1}. Log: {VIOLATIONS_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
