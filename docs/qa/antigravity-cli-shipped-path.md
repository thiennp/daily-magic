# How does Agent Witch run the Antigravity (agy) CLI on a Linux/Mac host?

## Query aliases

- antigravity argv agy -p dangerously-skip-permissions
- agy credentials ~/.gemini/antigravity-cli
- ensure-writer antigravity auth
- Antigravity Waiting on you sign-in
- Writer API key missing antigravity wrong chip

## Short answer

Headless tasks invoke **`agy --dangerously-skip-permissions -p "<prompt>"`** (flags before `-p`, prompt as its own argument). Sign-in is detected from **`~/.gemini/antigravity-cli/antigravity-oauth-token`** (agy 1.2.x), not only legacy `~/.config/agy/credentials.json`. Antigravity runs do **not** emit the Anthropic Writer API “CLI fallback” honesty marker; auth gaps surface **Waiting on you** with Antigravity sign-in copy, and real CLI errors surface **Failed**.

## Details

| Area          | Behavior                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| Argv builder  | `scripts/buildWriterCliInvocation.ts` — antigravity branch                                                      |
| ensure-writer | Install bundle `ensure-writer.sh` checks gemini token path + legacy credentials                                 |
| Honesty       | No `[[AGENT_RUN_WRITER_EXECUTION]]` Writer-missing stamp for `writerAgent=antigravity`                          |
| Terminal chip | Auth → **Waiting on you** — “Antigravity sign-in required — run agy in a terminal and complete Google sign-in.” |
| User cancel   | Local exit code **130** maps to **Stopped** in terminal honesty                                                 |

## Related

- `docs/qa/delegate-local-cli-conversation-context.md`
- `src/lib/agentWitch/resolveAntigravityCliOAuthTokenPresent.ts`
- `src/lib/dispatch/tryResolveAgentRunHonestyAuthStopTerminalOutcome.ts`

## Last reviewed

2026-10-05
