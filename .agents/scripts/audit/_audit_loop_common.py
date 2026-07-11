"""Shared helpers for interactive SOLID audit loops (stdin verdict → atomic JSON merge)."""

from __future__ import annotations

import argparse
import json
import os
import random
import sys
import tempfile
from collections.abc import Callable
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
FILE_LIST_PATH = REPO / ".agents/todo/FILE_LIST.json"


def utc_timestamp() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def atomic_write_json(target: Path, data: object, tmp_prefix: str) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    encoded = json.dumps(data, indent=2, sort_keys=False)
    encoded_bytes = (encoded + "\n").encode("utf-8")
    fd, tmp_path = tempfile.mkstemp(
        dir=str(target.parent),
        prefix=tmp_prefix,
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


def is_ts_code_audit_path(rel: str) -> bool:
    """Same rules as SRP driver: .ts/.tsx only; exclude *.test.* and *.stories.* filenames."""
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


def load_candidates(done: set[str], path_filter: Callable[[str], bool] | None = None) -> list[str]:
    file_list_data = load_json(FILE_LIST_PATH, None)
    if not isinstance(file_list_data, dict) or "files" not in file_list_data:
        return []
    files = file_list_data["files"]
    if not isinstance(files, list):
        return []
    out: list[str] = []
    for p in files:
        if not isinstance(p, str) or p in done:
            continue
        if path_filter is None or path_filter(p):
            out.append(p)
    return out


def pick_batch(candidates: list[str], batch: int, rng: random.Random) -> list[str]:
    if not candidates:
        return []
    pool = list(candidates)
    rng.shuffle(pool)
    return pool[: min(batch, len(pool))]


def read_line_stdin(prompt: str, no_tty_env: str) -> str:
    no_tty = os.environ.get(no_tty_env, "").strip() in ("1", "true", "yes")
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


def print_iteration_header(*, label: str, prompt_rel: str, paths: list[str]) -> None:
    print(flush=True)
    print("=" * 72, flush=True)
    print(f"{label} audit — use this prompt in Cursor:", flush=True)
    print(f"  @{prompt_rel}", flush=True)
    print(flush=True)
    print("Analyze only:", flush=True)
    for p in paths:
        print(f"  {p}", flush=True)
    print(flush=True)
    print(f"(Open: {REPO / paths[0]})" if len(paths) == 1 else f"(Repo: {REPO})", flush=True)
    print("=" * 72, flush=True)


def _require_status(obj: dict[str, object]) -> int:
    status = obj["status"]
    if status not in (0, 1):
        raise ValueError('"status" must be 0 or 1')
    return status


def _path_from_obj(obj: dict[str, object], expected_path: str) -> str:
    path = obj.get("path", expected_path)
    if not isinstance(path, str) or not path:
        raise ValueError('Missing or invalid "path"')
    if path != expected_path:
        raise ValueError(f"path mismatch: expected {expected_path!r}, got {path!r}")
    return path


EntryRow = tuple[str, dict[str, object]]
ParseSingle = Callable[[str, str], EntryRow]
ParseBatch = Callable[[str, list[str]], list[EntryRow]]


@dataclass(frozen=True)
class LoopConfig:
    label: str
    violations_path: Path
    prompt_rel: str
    no_tty_env: str
    tmp_prefix: str
    parse_single: ParseSingle
    parse_batch: ParseBatch
    single_example_json: str
    batch_field_hint: str
    path_filter: Callable[[str], bool] | None = None


def cmd_next(cfg: LoopConfig, seed: int | None) -> int:
    violations = load_json(cfg.violations_path, {})
    if not isinstance(violations, dict):
        violations = {}
    candidates = load_candidates(set(violations.keys()), path_filter=cfg.path_filter)
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


def cmd_merge_stdin(cfg: LoopConfig, expected_path: str) -> int:
    os.environ.setdefault(cfg.no_tty_env, "1")
    line = sys.stdin.readline()
    if not line or not line.strip():
        print("No verdict line on stdin.", file=sys.stderr)
        return 2
    line = line.strip()
    violations = load_json(cfg.violations_path, {})
    if not isinstance(violations, dict):
        violations = {}
    try:
        path, entry = cfg.parse_single(line, expected_path)
    except (json.JSONDecodeError, ValueError, KeyError) as e:
        print(f"Invalid verdict: {e}", file=sys.stderr)
        return 2
    ts = utc_timestamp()
    violations[path] = {**entry, "timestamp": ts}
    atomic_write_json(cfg.violations_path, violations, cfg.tmp_prefix)
    remaining = len(load_candidates(set(violations.keys()), path_filter=cfg.path_filter))
    print(f"Wrote {cfg.violations_path} (1 entry). ~{remaining} path(s) left.", file=sys.stderr)
    return 0


def add_standard_interactive_audit_args(parser: argparse.ArgumentParser) -> None:
    parser.add_argument(
        "--next",
        action="store_true",
        help="Print one random unaudited path to stdout (single line); for agents.",
    )
    parser.add_argument(
        "--merge-stdin",
        metavar="EXPECTED_PATH",
        default=None,
        help="Read one-line JSON verdict from stdin; merge for EXPECTED_PATH (set NO_TTY env for piping).",
    )
    parser.add_argument("--batch", type=int, default=1, help="Paths per iteration (default: 1)")
    parser.add_argument("--seed", type=int, default=None, help="RNG seed")
    parser.add_argument(
        "--max-iterations",
        type=int,
        default=None,
        help="Stop after N successful merges",
    )


def run_interactive_audit_main(cfg: LoopConfig, args: argparse.Namespace) -> int:
    if not FILE_LIST_PATH.is_file():
        print(f"Missing {FILE_LIST_PATH}. Run: python3 .agents/scripts/audit/generate_file_list.py", file=sys.stderr)
        return 1
    if args.next and args.merge_stdin is not None:
        print("Use only one of --next or --merge-stdin.", file=sys.stderr)
        return 2
    if args.next:
        return cmd_next(cfg, seed=args.seed)
    if args.merge_stdin is not None:
        return cmd_merge_stdin(cfg, args.merge_stdin)
    if args.batch < 1:
        print("--batch must be >= 1", file=sys.stderr)
        return 2
    return run_config_loop(
        cfg,
        batch=args.batch,
        seed=args.seed,
        max_iterations=args.max_iterations,
    )


def run_config_loop(
    cfg: LoopConfig,
    *,
    batch: int,
    seed: int | None,
    max_iterations: int | None,
) -> int:
    violations = load_json(cfg.violations_path, {})
    if not isinstance(violations, dict):
        violations = {}

    rng = random.Random(seed)
    iteration = 0

    while True:
        if max_iterations is not None and iteration >= max_iterations:
            print(f"Stopped after --max-iterations={max_iterations}.", file=sys.stderr)
            return 0

        done = set(violations.keys())
        candidates = load_candidates(done, path_filter=cfg.path_filter)
        if not candidates:
            print("No remaining paths. Regenerate with: python3 .agents/scripts/audit/generate_file_list.py", file=sys.stderr)
            return 0

        paths = pick_batch(candidates, batch, rng)
        if not paths:
            return 0

        print_iteration_header(label=cfg.label, prompt_rel=cfg.prompt_rel, paths=paths)

        attempt = 0
        rows: list[EntryRow]
        while True:
            attempt += 1
            if len(paths) == 1:
                if attempt == 1:
                    hint = (
                        f"Paste one JSON line, e.g. {cfg.single_example_json} "
                        f'(path defaults to {paths[0]!r})\n'
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
                    f"each with {cfg.batch_field_hint}.\n"
                    "Keep pasting until no paths remain; empty line / Ctrl-D only to stop early.\n"
                    "> "
                )
            else:
                hint = (
                    "Invalid verdict — paste a valid JSON array for the same batch "
                    "(empty line / Ctrl-D to exit without logging this batch)\n> "
                )

            line = read_line_stdin(hint, cfg.no_tty_env)
            if not line:
                if attempt == 1:
                    msg = "this file" if len(paths) == 1 else "this batch"
                else:
                    msg = "this path (after invalid input)" if len(paths) == 1 else "this batch (after invalid input)"
                print(f"EOF — exiting without logging {msg}.", file=sys.stderr)
                return 0
            try:
                if len(paths) == 1:
                    path, entry = cfg.parse_single(line, paths[0])
                    rows = [(path, entry)]
                else:
                    rows = cfg.parse_batch(line, paths)
                break
            except (json.JSONDecodeError, ValueError, KeyError) as e:
                print(f"Invalid verdict: {e}", file=sys.stderr)

        ts = utc_timestamp()
        for path, entry in rows:
            violations[path] = {**entry, "timestamp": ts}

        atomic_write_json(cfg.violations_path, violations, cfg.tmp_prefix)
        remaining = len(load_candidates(set(violations.keys()), path_filter=cfg.path_filter))
        n = len(rows)
        suffix = "entry" if n == 1 else "entries"
        print(f"Wrote {cfg.violations_path} ({n} {suffix}). ~{remaining} path(s) left.", file=sys.stderr)
        if remaining > 0:
            print(
                f"{cfg.label}: {remaining} path(s) still unaudited — paste the next verdict when ready "
                "(run until 'No remaining paths').",
                file=sys.stderr,
            )
        iteration += 1


# --- ISP ---


def isp_entry_from_obj(obj: dict[str, object]) -> dict[str, object]:
    status = _require_status(obj)
    if status == 0:
        return {"status": 0, "fat_interface": "", "unused_methods": [], "split_suggestion": ""}
    fi = obj.get("fat_interface", "")
    um = obj.get("unused_methods", [])
    ss = obj.get("split_suggestion", "")
    if not isinstance(fi, str):
        raise ValueError('"fat_interface" must be a string')
    if not isinstance(um, list) or not all(isinstance(x, str) for x in um):
        raise ValueError('"unused_methods" must be an array of strings')
    if not isinstance(ss, str):
        raise ValueError('"split_suggestion" must be a string')
    return {
        "status": 1,
        "fat_interface": fi,
        "unused_methods": um,
        "split_suggestion": ss,
    }


def isp_parse_single(line: str, expected_path: str) -> EntryRow:
    obj = json.loads(line)
    if not isinstance(obj, dict):
        raise ValueError("Verdict must be a JSON object")
    path = _path_from_obj(obj, expected_path)
    return path, isp_entry_from_obj(obj)


def isp_parse_batch(line: str, expected_paths: list[str]) -> list[EntryRow]:
    data = json.loads(line)
    if not isinstance(data, list):
        raise ValueError("Batch verdict must be a JSON array")
    if len(data) != len(expected_paths):
        raise ValueError(f"Expected {len(expected_paths)} array elements, got {len(data)}")
    out: list[EntryRow] = []
    for item, exp in zip(data, expected_paths):
        if not isinstance(item, dict):
            raise ValueError("Each batch item must be an object")
        path = _path_from_obj(item, exp)
        out.append((path, isp_entry_from_obj(item)))
    return out


# --- DIP ---


def dip_entry_from_obj(obj: dict[str, object]) -> dict[str, object]:
    status = _require_status(obj)
    ds = obj.get("dependency_smell", "")
    inj = obj.get("injection_fix", "")
    if not isinstance(ds, str):
        raise ValueError('"dependency_smell" must be a string')
    if not isinstance(inj, str):
        raise ValueError('"injection_fix" must be a string')
    if status == 0:
        return {"status": 0, "dependency_smell": "", "injection_fix": ""}
    return {"status": 1, "dependency_smell": ds, "injection_fix": inj}


def dip_parse_single(line: str, expected_path: str) -> EntryRow:
    obj = json.loads(line)
    if not isinstance(obj, dict):
        raise ValueError("Verdict must be a JSON object")
    path = _path_from_obj(obj, expected_path)
    return path, dip_entry_from_obj(obj)


def dip_parse_batch(line: str, expected_paths: list[str]) -> list[EntryRow]:
    data = json.loads(line)
    if not isinstance(data, list):
        raise ValueError("Batch verdict must be a JSON array")
    if len(data) != len(expected_paths):
        raise ValueError(f"Expected {len(expected_paths)} array elements, got {len(data)}")
    out: list[EntryRow] = []
    for item, exp in zip(data, expected_paths):
        if not isinstance(item, dict):
            raise ValueError("Each batch item must be an object")
        path = _path_from_obj(item, exp)
        out.append((path, dip_entry_from_obj(item)))
    return out


# --- LSP ---


def lsp_entry_from_obj(obj: dict[str, object]) -> dict[str, object]:
    status = _require_status(obj)
    vt = obj.get("violation_type", "")
    imp = obj.get("impact", "")
    if not isinstance(vt, str):
        raise ValueError('"violation_type" must be a string')
    if not isinstance(imp, str):
        raise ValueError('"impact" must be a string')
    if status == 0:
        return {"status": 0, "violation_type": "", "impact": ""}
    return {"status": 1, "violation_type": vt, "impact": imp}


def lsp_parse_single(line: str, expected_path: str) -> EntryRow:
    obj = json.loads(line)
    if not isinstance(obj, dict):
        raise ValueError("Verdict must be a JSON object")
    path = _path_from_obj(obj, expected_path)
    return path, lsp_entry_from_obj(obj)


def lsp_parse_batch(line: str, expected_paths: list[str]) -> list[EntryRow]:
    data = json.loads(line)
    if not isinstance(data, list):
        raise ValueError("Batch verdict must be a JSON array")
    if len(data) != len(expected_paths):
        raise ValueError(f"Expected {len(expected_paths)} array elements, got {len(data)}")
    out: list[EntryRow] = []
    for item, exp in zip(data, expected_paths):
        if not isinstance(item, dict):
            raise ValueError("Each batch item must be an object")
        path = _path_from_obj(item, exp)
        out.append((path, lsp_entry_from_obj(item)))
    return out


# --- OCP ---


def ocp_entry_from_obj(obj: dict[str, object]) -> dict[str, object]:
    status = _require_status(obj)
    smell = obj.get("smell", "")
    ref = obj.get("refactor_suggestion", "")
    if not isinstance(smell, str):
        raise ValueError('"smell" must be a string')
    if not isinstance(ref, str):
        raise ValueError('"refactor_suggestion" must be a string')
    return {"status": status, "smell": smell, "refactor_suggestion": ref}


def ocp_parse_single(line: str, expected_path: str) -> EntryRow:
    obj = json.loads(line)
    if not isinstance(obj, dict):
        raise ValueError("Verdict must be a JSON object")
    path = _path_from_obj(obj, expected_path)
    return path, ocp_entry_from_obj(obj)


def ocp_parse_batch(line: str, expected_paths: list[str]) -> list[EntryRow]:
    data = json.loads(line)
    if not isinstance(data, list):
        raise ValueError("Batch verdict must be a JSON array")
    if len(data) != len(expected_paths):
        raise ValueError(f"Expected {len(expected_paths)} array elements, got {len(data)}")
    out: list[EntryRow] = []
    for item, exp in zip(data, expected_paths):
        if not isinstance(item, dict):
            raise ValueError("Each batch item must be an object")
        path = _path_from_obj(item, exp)
        out.append((path, ocp_entry_from_obj(item)))
    return out
