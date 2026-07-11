#!/usr/bin/env python3
"""Print random file paths from FILE_LIST.json not yet present in DIP_VIOLATIONS.json."""

from __future__ import annotations

import argparse
import json
import random
import sys
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--count", type=int, default=10, help="Number of paths to print")
    parser.add_argument(
        "--ts-only",
        action="store_true",
        help="Only .ts / .tsx paths; exclude .react-router/types",
    )
    parser.add_argument("--seed", type=int, default=None, help="RNG seed (reproducible picks)")
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[3]
    list_path = root / ".agents" / "todo" / "FILE_LIST.json"
    ledger_path = root / ".agents" / "todo" / "DIP_VIOLATIONS.json"

    if not list_path.is_file():
        print(f"missing {list_path}", file=sys.stderr)
        sys.exit(1)

    files: list[str] = json.loads(list_path.read_text(encoding="utf-8"))["files"]
    done: set[str] = set()
    if ledger_path.is_file():
        done = set(json.loads(ledger_path.read_text(encoding="utf-8")).keys())

    remaining = [p for p in files if p not in done]
    if args.ts_only:
        remaining = [
            p
            for p in remaining
            if p.endswith((".ts", ".tsx")) and ".react-router/types" not in p
        ]

    if not remaining:
        print("no remaining paths", file=sys.stderr)
        sys.exit(0)

    rng = random.Random(args.seed)
    rng.shuffle(remaining)
    for path in remaining[: args.count]:
        print(path)


if __name__ == "__main__":
    main()
