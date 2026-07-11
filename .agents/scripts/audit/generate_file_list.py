#!/usr/bin/env python3
"""
Crawl the repository for auditable source files and write .agents/todo/FILE_LIST.json.
Excludes node_modules, dist, build, and .git. Uses atomic write for JSON integrity.
"""

from __future__ import annotations

import json
import os
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

EXCLUDED_DIR_NAMES = frozenset({"node_modules", "dist", ".git", "build"})

SOURCE_SUFFIXES = frozenset({
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    ".css",
    ".scss",
    ".sass",
    ".less",
    ".mdx",
})


def repo_root_from_script() -> Path:
    return Path(__file__).resolve().parents[3]


def is_relevant_file(path: Path) -> bool:
    return path.suffix.lower() in SOURCE_SUFFIXES and path.is_file()


def collect_relative_paths(root: Path) -> list[str]:
    paths: list[str] = []
    root = root.resolve()
    for dirpath, dirnames, filenames in os.walk(root, topdown=True):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIR_NAMES]
        for name in filenames:
            full = Path(dirpath) / name
            if is_relevant_file(full):
                rel = full.relative_to(root)
                paths.append(rel.as_posix())
    paths.sort()
    return paths


def atomic_write_json(target: Path, data: object) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    encoded = json.dumps(data, indent=2, sort_keys=False)
    encoded_bytes = (encoded + "\n").encode("utf-8")
    fd, tmp_path = tempfile.mkstemp(
        dir=str(target.parent),
        prefix=".file_list_",
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


def main() -> int:
    root = repo_root_from_script()
    if len(sys.argv) > 1:
        first = sys.argv[1]
        if first in ("-h", "--help"):
            print(
                "Usage: python3 generate_file_list.py [ROOT]\n"
                "  Write .agents/todo/FILE_LIST.json under ROOT (default: repo root).",
                file=sys.stderr,
            )
            return 0
        root = Path(first).resolve()
    out_path = root / ".agents" / "todo" / "FILE_LIST.json"
    file_list = collect_relative_paths(root)
    payload = {
        "generatedAt": datetime.now(tz=timezone.utc).isoformat().replace("+00:00", "Z"),
        "root": root.as_posix(),
        "files": file_list,
    }
    atomic_write_json(out_path, payload)
    print(f"Wrote {len(file_list)} paths to {out_path}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
