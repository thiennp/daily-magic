#!/usr/bin/env python3
"""
DIP interactive audit: print @.cursor/skills/skill-solid-code-quality-audit/SKILL.md + path(s), read verdict
JSON from stdin, atomically merge .agents/todo/DIP_VIOLATIONS.json.

Candidates: .ts/.tsx only; excludes filenames containing .test. or .stories. (same as SRP scope).

Single-file verdict (path optional):
  {"status":0,"dependency_smell":"","injection_fix":""}

Batch: JSON array; each object needs "path" plus "status", "dependency_smell", "injection_fix".

Environment: DIP_NO_TTY=1 for piping.

Usage (repo root):
  python3 .agents/scripts/audit/dip_audit_loop.py
  python3 .agents/scripts/audit/dip_audit_loop.py --batch N [--seed S] [--max-iterations M]

Agent / Cursor (non-interactive):
  python3 .agents/scripts/audit/dip_audit_loop.py --next
  echo '{"status":0,"dependency_smell":"","injection_fix":""}' | DIP_NO_TTY=1 python3 .agents/scripts/audit/dip_audit_loop.py --merge-stdin "PATH_FROM_PREV_LINE"

Invalid JSON re-prompts for the same path(s) until valid or empty stdin / Ctrl-D.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

_SCRIPT_DIR = Path(__file__).resolve().parent
if str(_SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(_SCRIPT_DIR))

import _audit_loop_common as _alc


CONFIG = _alc.LoopConfig(
    label="DIP",
    violations_path=_alc.REPO / ".agents/todo/DIP_VIOLATIONS.json",
    prompt_rel=".cursor/skills/skill-solid-code-quality-audit/SKILL.md",
    no_tty_env="DIP_NO_TTY",
    tmp_prefix=".dip_violations_interactive_",
    parse_single=_alc.dip_parse_single,
    parse_batch=_alc.dip_parse_batch,
    single_example_json='{"status":0,"dependency_smell":"","injection_fix":""}',
    batch_field_hint='"path", "status", "dependency_smell", "injection_fix"',
    path_filter=_alc.is_ts_code_audit_path,
)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    _alc.add_standard_interactive_audit_args(parser)
    args = parser.parse_args()
    return _alc.run_interactive_audit_main(CONFIG, args)


if __name__ == "__main__":
    raise SystemExit(main())
