#!/usr/bin/env python3
"""
ISP interactive audit: print @.cursor/skills/skill-solid-code-quality-audit/SKILL.md + path(s), read verdict
JSON from stdin, atomically merge .agents/todo/ISP_VIOLATIONS.json.

Does not replace heuristic batch: python3 .agents/scripts/audit/isp_audit_loop.py (repo root).

Candidates: .ts/.tsx only; excludes filenames containing .test. or .stories. (same as SRP scope).

Single-file verdict (path optional):
  {"status":0,"fat_interface":"","unused_methods":[],"split_suggestion":""}

Batch: JSON array; each object needs "path" matching the printed order plus fields above.

Environment: ISP_NO_TTY=1 for piping (prompts to stderr, one line stdin).

Usage (repo root):
  python3 .agents/scripts/audit/isp_interactive_audit_loop.py
  python3 .agents/scripts/audit/isp_interactive_audit_loop.py --batch N [--seed S] [--max-iterations M]

Agent / Cursor (non-interactive):
  python3 .agents/scripts/audit/isp_interactive_audit_loop.py --next
  echo '{"status":0,"fat_interface":"","unused_methods":[],"split_suggestion":""}' | ISP_NO_TTY=1 python3 .agents/scripts/audit/isp_interactive_audit_loop.py --merge-stdin "PATH_FROM_PREV_LINE"

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
    label="ISP",
    violations_path=_alc.REPO / ".agents/todo/ISP_VIOLATIONS.json",
    prompt_rel=".cursor/skills/skill-solid-code-quality-audit/SKILL.md",
    no_tty_env="ISP_NO_TTY",
    tmp_prefix=".isp_violations_interactive_",
    parse_single=_alc.isp_parse_single,
    parse_batch=_alc.isp_parse_batch,
    single_example_json='{"status":0,"fat_interface":"","unused_methods":[],"split_suggestion":""}',
    batch_field_hint='"path", "status", "fat_interface", "unused_methods", "split_suggestion"',
    path_filter=_alc.is_ts_code_audit_path,
)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    _alc.add_standard_interactive_audit_args(parser)
    args = parser.parse_args()
    return _alc.run_interactive_audit_main(CONFIG, args)


if __name__ == "__main__":
    raise SystemExit(main())
