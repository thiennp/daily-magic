#!/usr/bin/env python3
"""
LSP interactive audit: print @.cursor/skills/skill-solid-code-quality-audit/SKILL.md + path(s), read verdict
JSON from stdin, atomically merge .agents/todo/LSP_VIOLATIONS.json.

Candidates: .ts/.tsx only; excludes filenames containing .test. or .stories. (same as SRP scope).

Single-file verdict (path optional):
  {"status":0,"violation_type":"","impact":""}

Batch: JSON array; each object needs "path" plus "status", "violation_type", "impact".

Environment: LSP_NO_TTY=1 for piping (prompt to stderr, verdict on stdin).

Usage (repo root):
  python3 .agents/scripts/audit/lsp_audit_loop.py
  python3 .agents/scripts/audit/lsp_audit_loop.py --batch N [--seed S] [--max-iterations M]

Agent / Cursor (non-interactive):
  python3 .agents/scripts/audit/lsp_audit_loop.py --next
  echo '{"status":0,"violation_type":"","impact":""}' | LSP_NO_TTY=1 python3 .agents/scripts/audit/lsp_audit_loop.py --merge-stdin "PATH_FROM_PREV_LINE"

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
    label="LSP",
    violations_path=_alc.REPO / ".agents/todo/LSP_VIOLATIONS.json",
    prompt_rel=".cursor/skills/skill-solid-code-quality-audit/SKILL.md",
    no_tty_env="LSP_NO_TTY",
    tmp_prefix=".lsp_violations_interactive_",
    parse_single=_alc.lsp_parse_single,
    parse_batch=_alc.lsp_parse_batch,
    single_example_json='{"status":0,"violation_type":"","impact":""}',
    batch_field_hint='"path", "status", "violation_type", "impact"',
    path_filter=_alc.is_ts_code_audit_path,
)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    _alc.add_standard_interactive_audit_args(parser)
    args = parser.parse_args()
    return _alc.run_interactive_audit_main(CONFIG, args)


if __name__ == "__main__":
    raise SystemExit(main())
