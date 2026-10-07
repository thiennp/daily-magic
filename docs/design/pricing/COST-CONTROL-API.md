# AgentWitch cost-control API — contract

**Server gates (where asserts run, error codes, LIVE vs missing):** `docs/design/cost-control/GATES-CONTRACT.md`.

Owner: NRG AgentWitch (API / DB / gates).  
UI knobs: AW Human UI (AWC admin/settings; AWL only if Local needed).  
Locked: Pricing product lock + NRG Lead alignment (2026-10-07). Land lock free — stack claim with Human UI when both suite-ready.  
Never hide live Marketplace, Connect, Automations, or Download. Plain English only.  
Companies work is separate until Product EN green.

## Plans

| Plan | How you get it | Customer Pricing |
|------|----------------|------------------|
| `trial` | Default on signup — 1 calendar month | Shown as free trial |
| `pro` | Paid after trial (or upgrade) | Pro package |
| `team` | Paid after trial (or upgrade) | Team package |
| `admin_free` | Admin flag on the user only — not self-serve | Edge note only, not a package CTA |

No permanent self-serve Free. No Free seat-cap product. Internal loss budget still applies to trial + admin_free.

## Entitlements (gated)

| Gate | Trial | Pro | Team | Admin Free |
|------|-------|-----|------|------------|
| Max computers | 2 | 2 | 2 | 2 |
| Assistant connect limit | same as Pro until paid rules differ — **Pro 3 / Team 10** once on paid; trial uses **Pro 3** | 3 | 10 | 3 (same as Pro unless admin overrides later) |
| Cloud message storage (Neon long-tail / server retention beyond local) | **Off** | On | On | Off unless admin overrides |
| AI credits in package | None | None | None | None |

Cloud message storage starts only after **paid** billing (`pro` or `team`). Trial and admin_free do not get cloud message storage.

## Internal cost control (not on Pricing page)

- Tracks **Railway + Neon + related infra** spend for trial and admin_free users (not only LLM/seat cost).
- Ops budget: Free/trial loss **≤ €200 / month** (ops currency). When budget would be exceeded, **gate new trial signups / trial usage** toward Pro (exact UX: Human UI knobs; API returns `trialGate: "open" | "closed"` + reason).
- Do **not** expose margin math, COGS, or € loss figures on customer endpoints.
- Admin/ops read endpoints may return coarse status (`under_budget` / `near_limit` / `over_budget`) without raw euros if Lead prefers — default: euros only on admin-auth routes.

## Signals (inputs)

| Signal | Source (stub OK first) | Use |
|--------|------------------------|-----|
| `railwaySpendEur` | Railway metrics / invoice hook (stub) | Infra budget |
| `neonSpendEur` | Neon metrics / invoice hook (stub) | Infra budget |
| `relatedInfraSpendEur` | Other related infra (stub) | Infra budget |
| `trialUserCount` / active trial seats | DB | Capacity + gate |
| `adminFreeUserCount` | DB | Budget category |

Sum of trial + admin_free infra spend vs €200/mo → `trialGate`.

## User / org fields (DB)

Minimum on owner (or billing account — prefer **user** for solo, **account** if Team seats exist):

- `plan`: `trial | pro | team | admin_free`
- `trialStartedAt`, `trialEndsAt` (null when not trial)
- `adminFree`: boolean (implies `admin_free` plan when true and not paid)
- `seatCount` (Team; Pro = 1 seat default)
- Stripe / billing customer id placeholders OK (stub)

Migration renumbers past current main tip.

## API (v1 tip)

All authenticated unless noted. No PR; tip branch `feat/awc-cost-control-api-r1`.

### GET `/api/billing/entitlements`

Returns current user’s effective plan and gates for the app:

```json
{
  "plan": "trial",
  "trialEndsAt": "ISO-8601|null",
  "adminFree": false,
  "maxComputers": 2,
  "maxAssistantConnects": 3,
  "cloudMessageStorage": false,
  "trialGate": "open",
  "trialGateReason": null
}
```

Also returns `seats` (seat count) on the live API tip.

### GET `/api/billing/plan`

Same owner; slightly richer for Account → Billing UI (Human UI Pricing). Includes seat count and cancel-anytime flag. **No** infra euros.

### POST `/api/billing/admin/set-free` (admin only)

Body: `{ "userId": "...", "adminFree": true|false }`. Sets permanent Free admin flag. Not self-serve.

### GET `/api/billing/admin/cost-control` (admin only)

```json
{
  "month": "YYYY-MM",
  "trialPlusAdminFreeSpendEur": 0,
  "budgetEur": 200,
  "status": "under_budget",
  "trialGate": "open",
  "signals": { "railwaySpendEur": 0, "neonSpendEur": 0, "relatedInfraSpendEur": 0 }
}
```

Customer Pricing page never calls this.

### Upgrade / portal (stub)

- `POST /api/billing/checkout` → stub or Stripe session later (Human UI Pricing uses when live).
- `POST /api/billing/portal` → stub.

## Enforcement points (server)

1. Computer register / pair — reject above `maxComputers`.
2. Assistant / bot connect — reject above `maxAssistantConnects`.
3. Cloud message persist paths — reject or no-op when `cloudMessageStorage === false` (local/IndexedDB/History paths unchanged).
4. Signup / trial start — if `trialGate === "closed"`, require paid path (API 403 with plain reason code `trial_closed`).

## Tip / stack claim

- Branch: `feat/awc-cost-control-api-r1` (API tip only until stacked claim).
- Stack claim with Human UI tip knobs when both suite-green.
- Arch SHIP + full Mac suite → FF → health + smoke. Never force-push. Never hide live Marketplace/Connect/Automations/Download.

## Out of scope here

- Pricing page HTML / copy (Human UI + Product EN).
- Companies work.
- Inventing USD seat prices in API (config constant owned with Pricing build: Pro $29 / Team $49 / 3-seat min — UI).
