# Linux Agent Witch host (M1 smoke)

M1 ships a **Linux x64** AWI runner using the same install-token pairing flow as macOS. WebSocket opcodes are unchanged; Send still requires `presenceTier: live`.

## Prerequisites

- x86_64 Linux with `curl`, `tar`, and `systemd` user session (or foreground mode below).
- AWC reachable from the host (`https://www.agentwitch.com` or local `http://localhost:3000`).
- Install token from AWC Home (same curl pipe flow as Mac).

## Install (systemd user unit — default)

```bash
curl -fsSL "https://www.agentwitch.com/install/agent-witch.sh?token=<PAIRING_TOKEN>&email=<YOUR_EMAIL>" | bash
```

On Linux this:

1. Downloads the bundled AWI client + optional Node LTS tarball under `~/.agent-witch/.node` when system Node is missing.
2. `POST /api/agent-witch/register-install` with `platform: "linux"`.
3. Writes `~/.config/systemd/user/agent-witch.service` and runs `systemctl --user enable --now agent-witch.service`.

Check status:

```bash
systemctl --user status agent-witch.service
journalctl --user -u agent-witch.service -n 50 --no-pager
```

## Foreground spike / dev

Skip systemd and run the client in the foreground:

```bash
AGENT_WITCH_FOREGROUND=1 curl -fsSL "http://localhost:3000/install/agent-witch.sh?token=<TOKEN>&email=test@agentwitch.com" | bash
```

Or from a dev checkout after config exists under `~/.agent-witch`:

```bash
set -a; . ./.env.local; set +a   # Cloud VM only — see AGENTS.md
AGENT_WITCH_HOME=~/.agent-witch npm run agent-witch
```

## Proof checklist (pair → live → Send)

1. **Pair** — install script completes; `register-install` returns `{ ok: true, deviceId }`.
2. **Devices API** — signed-in AWC `GET /api/agent-witch/devices` shows the row with `"platform": "linux"`.
3. **Live** — after the client WebSocket registers, `presenceTier` becomes `"live"` and `isDispatchReady` is true.
4. **Send** — New task / Send stays blocked until live; succeeds when the Linux host is live (same readiness rules as Mac).

Device picker labels show **Linux device** (not “Your Mac”). Existing `mac_*` readiness reason codes are unchanged.
