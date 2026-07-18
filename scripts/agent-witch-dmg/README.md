# Agent Witch macOS DMG

Double-click installer packaging so users do not need to paste `curl | bash` into Terminal.

## Build

```bash
# Production (default origin https://www.agentwitch.com)
npm run agent-witch:dmg

# Local / connection-lab
AGENT_WITCH_DMG_ORIGIN=http://localhost:3000 npm run agent-witch:dmg
```

Outputs:

- `dist/agent-witch-dmg/AgentWitch.dmg`
- `dist/agent-witch-dmg/Agent Witch Installer.app` (same app, for quick local tests)
- `public/install/AgentWitch.dmg` (production bake — committed for `www.agentwitch.com`)
- `public/install/AgentWitch-local.dmg` (localhost bake — gitignored; built with `AGENT_WITCH_DMG_ORIGIN=http://localhost:3000`)

`GET /install/agent-witch.dmg` picks local vs production file from the request Host.
Env overrides:

| Variable                  | Default                      | Purpose                      |
| ------------------------- | ---------------------------- | ---------------------------- |
| `AGENT_WITCH_DMG_ORIGIN`  | `https://www.agentwitch.com` | Baked into the installer     |
| `AGENT_WITCH_DMG_VERSION` | `1.1.0`                      | `CFBundleShortVersionString` |
| `AGENT_WITCH_DMG_OUT_DIR` | `dist/agent-witch-dmg`       | Output folder                |
| `AGENT_WITCH_DMG_NAME`    | `AgentWitch.dmg`             | DMG filename                 |

## What the installer does

1. If Agent Witch is not installed → **Install** (runs `/install/agent-witch.sh`)
2. If already installed → choose **Update** (runs `~/.<home>/self-update.sh`) or **Install** (full refresh)
3. On success, offers to open the origin in the browser so the user can link the Mac

Background LaunchAgent updater still checks hourly; this app is the manual, no-Terminal path.

It does **not** replace account linking in the browser.

## Distribution notes

- Unsigned builds may be blocked by Gatekeeper. For internal use: right-click → Open, or `xattr -cr` on the `.app`.
- Public releases should be **signed and notarized** with an Apple Developer ID.
- Keep localhost and production DMGs separate (different origins → different install dirs / LaunchAgents).
