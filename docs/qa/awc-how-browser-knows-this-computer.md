# How does AWC know which Mac is “this computer”?

## Query aliases

- AWC this computer badge
- How does Agent Witch Console know my Mac
- this Mac vs Connect this Mac
- tokenHash pairing token local identity
- lam sao AWC biet may cua nguoi dung la may nao
- browser links this computer to your account
- wake server identity endpoint
- deviceMatchesLocalTokenHash
- I don't see identity request on this Mac
- agentwitch send identity request to get device identity
- AWC not calling /identity

## Short answer

**AWC (the browser app) does not infer your machine from cloud IP or hardware IDs.** It compares **pairing-token hashes**: each claimed Mac in `/api/agent-witch/devices` has a `tokenHash`, and on **macOS** the page reads the **local** hash from **AWB** at `GET http://127.0.0.1:{wakePort}/identity`. When they match, the UI marks that row as **this Mac** and shows local-only actions. The static label **“This computer”** on the Connect row is product copy (“the Mac you’re using now”), not a server-side device match.

## Details

### Two different UI strings

| UI                                          | Meaning                                                                                                                       |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **“This computer”** (`ConnectThisMacRow`)   | Fixed copy for the **Connect this Mac** placeholder: link the Mac where you opened the browser. Not computed from device IDs. |
| **“this Mac”** badge / **On this Mac** menu | Computed: `device.tokenHash` from cloud **equals** `localTokenHash` from the wake `/identity` probe.                          |

### Cloud side (AWC → API)

- Authenticated `GET /api/agent-witch/devices` returns the user’s Mac rows.
- Each row includes `tokenHash`: SHA-256 of the **pairing token** stored when that install was claimed (`hashPairingToken` in server code).
- AWC **never** receives the raw pairing token in the device list—only the hash.

### Local side (browser on the same Mac as AWB)

- Only when the user agent is **macOS**, the client probes **Agent Witch Bridge (AWB)** wake ports (production `47892`, localhost `47893`, and ports from known devices’ `wakePort`).
- Request: `GET http://127.0.0.1:{port}/identity` (CORS to localhost). Look for **`127.0.0.1`**, not `www.agentwitch.com`.
- AWL Status/Traffic shows WebSocket `agent.register` + `device.auth.attestation`, not this HTTP `/identity` call.
- Signed-out marketing Home does not probe. Signed-in AWC retries on tab focus if the first probe failed (HOME-050).
- Response includes `tokenHash` and optionally `tokenHashes` from local install config (`readAgentWitchRunConfig` / profile tokens on the Mac).
- The browser stores the resolved hash in client state (`localMacTokenHashStore`); it may also be seeded from a URL query param after install flows.

### Match rule

- `isThisMac` is true when `localTokenHash !== null` and `deviceMatchesLocalTokenHash(device.tokenHash, localTokenHash)` (case-insensitive string compare).
- **Hostname is not used** for this badge (HOME-029): two accounts on one physical Mac used to both look “local” when only hostname matched.

### What AWC cannot do

- If the browser runs on **Windows, iPhone, or another Mac without AWB reachable**, `localTokenHash` stays null → **no** “this Mac” badge; cloud devices still list normally.
- The **production server** does not know which tab is on which laptop unless the **browser** successfully reads localhost identity.

### Notifications and live UI

- Live progress and stuck banners use the same rule (`useIsAgentLiveSessionThisMac`: session `deviceId` → that device’s `tokenHash` vs local hash) to tailor copy for **this Mac** vs a remote Mac.

### Product wording

Install instructions state: _“While signed in on the same Mac, the browser links this computer to your account.”_ That refers to the **token-hash link** via AWB `/identity`, not cloud-side machine fingerprinting.

## Related

- [local-bridge.md](../agent-witch/local-bridge.md) — AWB ports and browser ↔ Mac glue
- [agent-witch-deployables.md](../product/agent-witch-deployables.md) — AWC vs AWB
- ADR 0005 — presence, devices, dispatch (successor device IDs)
- Feature: `src/features/home/KNOWN_ISSUES.md` (HOME-029, HOME-030, HOME-036)
- Code (update this doc when behavior changes): `useLocalMacHostname`, `deviceMatchesLocalTokenHash`, `buildAgentWitchWakeIdentityResponse`

## Last reviewed

2026-09-18
