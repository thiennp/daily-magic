#!/usr/bin/env python3
"""
SRP audit driver: pick target path(s), print prompt reference for Cursor, read verdict JSON
from stdin, atomically merge into .agents/todo/SRP_VIOLATIONS.json (script owns the ledger write).

Flow each iteration:
  1. Random path(s) from FILE_LIST.json (only .ts/.tsx, excluding .test.* and .stories.*) not already in SRP_VIOLATIONS.json
  2. Stdout: reference @.cursor/skills/skill-solid-code-quality-audit/SKILL.md and the path(s) to analyze
  3. Stdin: paste only the verdict JSON (not the whole SRP_VIOLATIONS file)

Single path — one JSON object, path optional (responsibility required):
  {"status": 0, "reason": "", "responsibility": "mobile layout for the price chip on small viewports"}
  {"status": 1, "reason": "mixed UI and fetch in one module", "responsibility": "tariff card UI plus API calls"}

Batch (--batch N) — one JSON array, length N, each object must include "path" and "responsibility":
  [
    {"path": "app/foo.ts", "status": 0, "reason": "", "responsibility": "pure date formatting helpers"},
    {"path": "app/bar.tsx", "status": 1, "reason": "god module", "responsibility": "mixed filters, tracking, and layout"}
  ]

Usage (repo root):
  python3 .agents/scripts/audit/srp_audit_loop.py
  python3 .agents/scripts/audit/srp_audit_loop.py --batch 3 --seed 7
  python3 .agents/scripts/audit/srp_audit_loop.py --max-iterations 10

Agent / Cursor (non-interactive, no input() pause):
  python3 .agents/scripts/audit/srp_audit_loop.py --next
  echo '{"status":0,"reason":"","responsibility":"…"}' | SRP_NO_TTY=1 python3 .agents/scripts/audit/srp_audit_loop.py --merge-stdin "PATH_FROM_PREV_LINE"

Invalid JSON does not exit the driver: it re-prompts for the same path(s) until a valid line or empty line / Ctrl-D.

Environment:
  SRP_NO_TTY=1  Echo instructions to stdout and read verdict JSON from stdin lines (for piping).
"""

from __future__ import annotations

import argparse
import json
import os
import random
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path


REPO = Path(__file__).resolve().parents[3]
FILE_LIST_PATH = REPO / ".agents/todo/FILE_LIST.json"
VIOLATIONS_PATH = REPO / ".agents/todo/SRP_VIOLATIONS.json"
PROMPT_REL = ".cursor/skills/skill-solid-code-quality-audit/SKILL.md"


def utc_timestamp() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def atomic_write_json(target: Path, data: object) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    encoded = json.dumps(data, indent=2, sort_keys=False)
    encoded_bytes = (encoded + "\n").encode("utf-8")
    fd, tmp_path = tempfile.mkstemp(
        dir=str(target.parent),
        prefix=".srp_violations_",
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
        text = f.read().strip()
        if not text:
            return default
        return json.loads(text)


def is_srp_candidate_path(rel: str) -> bool:
    if not isinstance(rel, str) or not rel:
        return False
    lower = rel.lower()
    if not (lower.endswith(".tsx") or lower.endswith(".ts")):
        return False
    name = Path(rel).name.lower()
    if ".test." in name:
        return False
    if ".stories." in name:
        return False
    return True


def load_candidates(done: set[str]) -> list[str]:
    file_list_data = load_json(FILE_LIST_PATH, None)
    if not isinstance(file_list_data, dict) or "files" not in file_list_data:
        return []
    files = file_list_data["files"]
    if not isinstance(files, list):
        return []
    return [
        p
        for p in files
        if isinstance(p, str) and p not in done and is_srp_candidate_path(p)
    ]


def pick_batch(candidates: list[str], batch: int, rng: random.Random) -> list[str]:
    if not candidates:
        return []
    pool = list(candidates)
    rng.shuffle(pool)
    return pool[: min(batch, len(pool))]


def read_line_stdin(prompt: str) -> str:
    no_tty = os.environ.get("SRP_NO_TTY", "").strip() in ("1", "true", "yes")
    if no_tty:
        if prompt:
            print(prompt, file=sys.stderr)
        line = sys.stdin.readline()
        if not line:
            return ""
        return line.strip()
    try:
        return input(prompt).strip()
    except EOFError:
        return ""


def parse_responsibility(obj: dict[str, object]) -> str:
    raw = obj.get("responsibility", "")
    if not isinstance(raw, str):
        raise ValueError('"responsibility" must be a string')
    responsibility = raw.strip()
    if not responsibility:
        raise ValueError('"responsibility" must be a non-empty string (one-line primary role of the file)')
    return responsibility


def parse_verdict_single(line: str, expected_path: str) -> tuple[str, int, str, str]:
    obj = json.loads(line)
    if not isinstance(obj, dict):
        raise ValueError("Verdict must be a JSON object")
    path = obj.get("path", expected_path)
    if not isinstance(path, str) or not path:
        raise ValueError('Missing or invalid "path"')
    if path != expected_path:
        raise ValueError(f"path mismatch: expected {expected_path!r}, got {path!r}")
    status = obj["status"]
    if status not in (0, 1):
        raise ValueError('"status" must be 0 or 1')
    reason = obj.get("reason", "")
    if not isinstance(reason, str):
        raise ValueError('"reason" must be a string')
    if status == 0:
        reason = ""
    responsibility = parse_responsibility(obj)
    return path, status, reason, responsibility


def parse_verdict_batch(line: str, expected_paths: list[str]) -> list[tuple[str, int, str, str]]:
    data = json.loads(line)
    if not isinstance(data, list):
        raise ValueError("Batch verdict must be a JSON array")
    if len(data) != len(expected_paths):
        raise ValueError(f"Expected {len(expected_paths)} array elements, got {len(data)}")
    out: list[tuple[str, int, str, str]] = []
    for item, exp in zip(data, expected_paths):
        if not isinstance(item, dict):
            raise ValueError("Each batch item must be an object")
        path = item.get("path", "")
        if path != exp:
            raise ValueError(f"Order/path mismatch: expected {exp!r}, got {path!r}")
        status = item["status"]
        if status not in (0, 1):
            raise ValueError('"status" must be 0 or 1')
        reason = item.get("reason", "")
        if not isinstance(reason, str):
            raise ValueError('"reason" must be a string')
        if status == 0:
            reason = ""
        responsibility = parse_responsibility(item)
        out.append((path, status, reason, responsibility))
    return out


def print_iteration_header(paths: list[str]) -> None:
    print(flush=True)
    print("=" * 72, flush=True)
    print("SRP audit — use this prompt in Cursor:", flush=True)
    print(f"  @{PROMPT_REL}", flush=True)
    print(flush=True)
    print("Analyze only:", flush=True)
    for p in paths:
        print(f"  {p}", flush=True)
    print(flush=True)
    print(f"(Open: {REPO / paths[0]})" if len(paths) == 1 else f"(Repo: {REPO})", flush=True)
    print(
        'Verdict JSON must include non-empty "responsibility" (one line: this file\'s primary role). '
        "After a successful merge, the driver prints it on stderr.",
        flush=True,
    )
    print("=" * 72, flush=True)


def merge_entries(
    violations: dict[str, object],
    entries: list[tuple[str, int, str, str]],
) -> None:
    ts = utc_timestamp()
    for path, status, reason, responsibility in entries:
        violations[path] = {
            "status": status,
            "reason": reason,
            "responsibility": responsibility,
            "timestamp": ts,
        }


def print_recorded_responsibilities(entries: list[tuple[str, int, str, str]]) -> None:
    if len(entries) == 1:
        _path, _status, _reason, responsibility = entries[0]
        print(f"Responsibility: {responsibility}", file=sys.stderr)
        return
    for path, _status, _reason, responsibility in entries:
        print(f"Responsibility ({path}): {responsibility}", file=sys.stderr)


def cmd_next(seed: int | None) -> int:
    violations = load_json(VIOLATIONS_PATH, {})
    if not isinstance(violations, dict):
        violations = {}
    candidates = load_candidates(set(violations.keys()))
    if not candidates:
        print("No remaining paths. Regenerate with: python3 .agents/scripts/audit/generate_file_list.py", file=sys.stderr)
        return 0
    rng = random.Random(seed)
    paths = pick_batch(candidates, 1, rng)
    if not paths:
        return 0
    sys.stdout.write(paths[0] + "\n")
    sys.stdout.flush()
    return 0


def cmd_merge_stdin(expected_path: str) -> int:
    os.environ.setdefault("SRP_NO_TTY", "1")
    line = sys.stdin.readline()
    if not line or not line.strip():
        print("No verdict line on stdin.", file=sys.stderr)
        return 2
    line = line.strip()
    violations = load_json(VIOLATIONS_PATH, {})
    if not isinstance(violations, dict):
        violations = {}
    try:
        resolved = parse_verdict_single(line, expected_path)
        merge_entries(violations, [resolved])
    except (json.JSONDecodeError, ValueError, KeyError) as e:
        print(f"Invalid verdict: {e}", file=sys.stderr)
        return 2
    atomic_write_json(VIOLATIONS_PATH, violations)
    remaining = len(load_candidates(set(violations.keys())))
    print(f"Wrote {VIOLATIONS_PATH} (1 entry). ~{remaining} path(s) left.", file=sys.stderr)
    print_recorded_responsibilities([resolved])
    return 0


def run_loop(batch: int, seed: int | None, max_iterations: int | None) -> int:
    violations = load_json(VIOLATIONS_PATH, {})
    if not isinstance(violations, dict):
        violations = {}

    rng = random.Random(seed)
    iteration = 0

    while True:
        if max_iterations is not None and iteration >= max_iterations:
            print(f"Stopped after --max-iterations={max_iterations}.", file=sys.stderr)
            return 0

        done = set(violations.keys())
        candidates = load_candidates(done)
        if not candidates:
            print("No remaining paths. Regenerate with: python3 .agents/scripts/audit/generate_file_list.py", file=sys.stderr)
            return 0

        paths = pick_batch(candidates, batch, rng)
        if not paths:
            return 0

        print_iteration_header(paths)

        attempt = 0
        while True:
            attempt += 1
            if len(paths) == 1:
                if attempt == 1:
                    hint = (
                        'Paste one JSON line with non-empty "responsibility" (one-line primary role), '
                        'e.g. {"status": 0, "reason": "", "responsibility": "…"} '
                        f'(path defaults to {paths[0]!r})\n'
                        "Or include path explicitly. "
                        "Keep pasting until no paths remain; empty line / Ctrl-D only to stop early.\n"
                        "> "
                    )
                else:
                    hint = (
                        "Invalid verdict — paste a valid one-line JSON for the same path "
                        "(empty line / Ctrl-D to exit without logging this path)\n> "
                    )
            elif attempt == 1:
                hint = (
                    f"Paste one JSON array of {len(paths)} objects in the same order, "
                    'each with "path", "status", "reason", "responsibility".\n'
                    "Keep pasting until no paths remain; empty line / Ctrl-D only to stop early.\n"
                    "> "
                )
            else:
                hint = (
                    "Invalid verdict — paste a valid JSON array for the same batch "
                    "(empty line / Ctrl-D to exit without logging this batch)\n> "
                )

            line = read_line_stdin(hint)
            if not line:
                if attempt == 1:
                    msg = "this file" if len(paths) == 1 else "this batch"
                else:
                    msg = "this path (after invalid input)" if len(paths) == 1 else "this batch (after invalid input)"
                print(f"EOF — exiting without logging {msg}.", file=sys.stderr)
                return 0
            try:
                if len(paths) == 1:
                    merged_rows = [parse_verdict_single(line, paths[0])]
                else:
                    merged_rows = parse_verdict_batch(line, paths)
                merge_entries(violations, merged_rows)
                break
            except (json.JSONDecodeError, ValueError, KeyError) as e:
                print(f"Invalid verdict: {e}", file=sys.stderr)

        atomic_write_json(VIOLATIONS_PATH, violations)
        remaining = len(load_candidates(set(violations.keys())))
        n = len(paths)
        suffix = "entry" if n == 1 else "entries"
        print(f"Wrote {VIOLATIONS_PATH} ({n} {suffix}). ~{remaining} path(s) left.", file=sys.stderr)
        print_recorded_responsibilities(merged_rows)
        if remaining > 0:
            print(
                f"SRP: {remaining} path(s) still unaudited — paste the next verdict when ready "
                "(run until 'No remaining paths').",
                file=sys.stderr,
            )
        iteration += 1


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--next",
        action="store_true",
        help="Print one random unaudited path to stdout (single line); stderr if none left. For agents.",
    )
    parser.add_argument(
        "--merge-stdin",
        metavar="EXPECTED_PATH",
        default=None,
        help="Read one-line JSON verdict from stdin; merge for EXPECTED_PATH (use with SRP_NO_TTY=1).",
    )
    parser.add_argument(
        "--batch",
        type=int,
        default=1,
        help="Paths to pick per iteration (default: 1)",
    )
    parser.add_argument("--seed", type=int, default=None, help="RNG seed (optional)")
    parser.add_argument(
        "--max-iterations",
        type=int,
        default=None,
        help="Stop after N successful merges (optional; default runs until no candidates or empty stdin)",
    )
    args = parser.parse_args()
    if not FILE_LIST_PATH.is_file():
        print(f"Missing {FILE_LIST_PATH}. Run: python3 .agents/scripts/audit/generate_file_list.py", file=sys.stderr)
        return 1

    if args.next and args.merge_stdin is not None:
        print("Use only one of --next or --merge-stdin.", file=sys.stderr)
        return 2
    if args.next:
        return cmd_next(seed=args.seed)
    if args.merge_stdin is not None:
        return cmd_merge_stdin(args.merge_stdin)

    if args.batch < 1:
        print("--batch must be >= 1", file=sys.stderr)
        return 2

    return run_loop(batch=args.batch, seed=args.seed, max_iterations=args.max_iterations)


if __name__ == "__main__":
    raise SystemExit(main())
