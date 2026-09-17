# Why did Update local leave Agent Witch reconnecting?

## Query aliases

- Update local still reconnecting
- Agent Witch was seen recently after update
- Start it on your Mac with wake.sh if it stays offline
- com.agent-witch.plist invalid bash
- AGENT-067 LaunchAgent plist
- cap nhat local van reconnecting
- AWL update default wake port 47892
- launchctl bootstrap rejected plist

## Short answer

**Update local can rewrite the macOS LaunchAgent.** A bug (AGENT-067) put install-script bash inside `~/Library/LaunchAgents/com.agent-witch.plist`, so `launchctl` refused to load Agent Witch Install (AWI). Default Agent Witch Bridge (AWB) **`:47892`** stayed down. Cloud then showed **Mac reconnecting** (`presenceTier: recent`): heartbeats from a leftover process, no live hub socket. New bundles heal a broken plist on start, on AWL **Update**, and on self-update; lint XML before `launchctl`; and post `/update/run` to the **runtime** wake port from `wake-port.json`.

## Details

| Piece                        | What went wrong                                               | What prevents it now                                                                                        |
| ---------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Install script plist heredoc | Process-host `if` / `cat` bash was copied **into** the XML    | Optional env keys are appended with `cat >> "$PLIST_PATH"` **after** the XML heredoc closes                 |
| `launchctl bootstrap`        | Invalid plist failed silently (`2>/dev/null`, `\|\| true`)    | `plutil -lint` + grep for leaked bash; bootstrap errors are visible                                         |
| Self-update / kickstart      | Kickstart assumed the on-disk plist was loadable              | `ensureAgentWitchLaunchAgentPlist` rewrites missing/invalid XML (AGENT-067) then bootstraps                 |
| AWL **Update**               | Always posted to default `:47892`; did not repair plist first | Rewrites invalid plist, then posts to `resolveAgentWitchRuntimeWakePort()` (`wake-port.json`, else default) |

If cloud still says **This Mac identity is not linked**, the pairing token under `~/.agent-witch` is not a claimed device. That is separate from the plist bug: run **Connect this Mac** from Agent Witch Console (AWC) Home while signed in.

## Related

- `src/features/agent-witch/KNOWN_ISSUES.md` — AGENT-067
- Install script: `buildAgentWitchInstallScriptLaunchAgent.ts`, `buildAgentWitchInstallScriptRegisterLaunchAgent.ts`
- Heal path: `ensureAgentWitchLaunchAgentPlist.ts` (client start, AWL Update, heartbeat update, `kickstartAgentWitchLaunchAgent`)
- AWL update URL: `requestLocalAgentWitchSelfUpdate.ts`

## Last reviewed

2026-09-17
