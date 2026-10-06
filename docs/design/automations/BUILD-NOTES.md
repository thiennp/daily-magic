# Automations — Human UI build notes

1. Base branch on `origin/main` only — do not merge Pricing into this branch.
2. Locked rules win over Claude HTML. HTML is project-tab flavored and omits webhook / timezone / sync amber — keep those from live Automations.
3. Update in place under `src/features/automations/**` + paired Marketplace picker label/badges.
4. Keep every working live action wired (create schedule/webhook, run/pause/resume/delete, sync, reports link).
5. Prefer assistant in Automations body copy; keep **My bots** where that label already ships.
6. Automations stays in primary nav for all signed-in users (not team-only).
7. Download AgentWitch + Connect remain visible when a computer is connected (existing Home/Computers HARD tests).
8. Focused vitest only — must-keeps + picker copy; `--maxWorkers=1` or `2`.
