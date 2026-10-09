# How can a local agent report project knowledge without AWC sign-in?

## Query aliases

- AWB knowledge update API
- local agent report knowledge global rule
- POST /knowledge/update bridge
- agent-witch-knowledge-report.mdc

## Short answer

Post to **AWB** on the paired Mac: `POST http://127.0.0.1:<wakePort>/knowledge/update` with `{ "projectId", "lesson", "sourceRunId?" }`. Default installs use **47892** (production bundle) or **47893** (localhost bundle); multi-account installs often allocate a custom port in **`wake-port.json`**. Token-saver embeds the port read from that file when it writes agent instructions; it does **not** live-sync — after a port change, restart AWL / re-run `writeGlobalTriggers` (install start) or **setup_project** to refresh rules, or agents should re-read `wakePort` from `wake-port.json` as the rules say.

On install / AWL start, token-saver writes the **same** knowledge-report text to:

| Agent / surface | Global path                                        |
| --------------- | -------------------------------------------------- |
| Cursor          | `~/.cursor/rules/agent-witch-knowledge-report.mdc` |
| Codex           | `~/.codex/AGENTS.md` (marked block)                |
| Claude Code     | `~/.claude/CLAUDE.md` (marked block)               |

After **setup_project** accept, the project also gets repo **`AGENTS.md`** and **`CLAUDE.md`** blocks (plus Cursor `.cursor/rules/agent-witch-check-context.mdc`). Any CLI can use the same `POST /knowledge/update` URL.

## Related

- [04-mac-bridge-awl-awb-awi.md](../guides/developer-guide/04-mac-bridge-awl-awb-awi.md)

## Last reviewed

2026-10-09
