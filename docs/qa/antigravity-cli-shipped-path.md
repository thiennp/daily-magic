# How does Agent Witch run the Antigravity (agy) CLI on a Linux/Mac host?

## Query aliases

- antigravity argv agy --sandbox -p permissions.allow command(*)
- agy credentials ~/.gemini/antigravity-cli
- ensure-writer antigravity auth
- Antigravity Waiting on you sign-in
- Writer API key missing antigravity wrong chip

## Short answer

Headless tasks invoke **`agy --sandbox -p "<prompt>"`** (flags before `-p`, prompt as its own argument). Before spawn, the host **merges** `command(*)` into **`~/.gemini/antigravity-cli/settings.json`** `permissions.allow` (non-destructive; keeps `--sandbox` instead of `--dangerously-skip-permissions`). Sign-in is detected from **`~/.gemini/antigravity-cli/antigravity-oauth-token`** (agy 1.2.x), not only legacy `~/.config/agy/credentials.json`. Jetski **permission auto-deny** or **no output** with exit `0` maps to **Failed**, not Success. Antigravity runs do **not** emit the Anthropic Writer API “CLI fallback” honesty marker; auth gaps surface **Waiting on you** with Antigravity sign-in copy.

## Details

| Area           | Behavior                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| Argv builder   | `scripts/buildWriterCliInvocation.ts` — antigravity branch (`--sandbox -p`)                                     |
| Headless allow | `scripts/mergeAntigravityCliHeadlessPermissions.ts` — merges `command(*)` into agy `settings.json`              |
| ensure-writer  | Install bundle `ensure-writer.sh` checks gemini token path + legacy credentials                                 |
| Honesty        | No `[[AGENT_RUN_WRITER_EXECUTION]]` Writer-missing stamp for `writerAgent=antigravity`                          |
| Terminal chip  | Auth → **Waiting on you** — “Antigravity sign-in required — run agy in a terminal and complete Google sign-in.” |
| User cancel    | Local exit code **130** maps to **Stopped** in terminal honesty                                                 |

## Related

- `docs/qa/delegate-local-cli-conversation-context.md`
- `src/lib/agentWitch/resolveAntigravityCliOAuthTokenPresent.ts`
- `src/lib/dispatch/tryResolveAgentRunHonestyAuthStopTerminalOutcome.ts`

## Last reviewed

2026-10-08
