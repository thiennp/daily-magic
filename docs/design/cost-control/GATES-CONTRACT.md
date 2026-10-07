# AgentWitch cost-control — server gates contract (r1)

**Owner:** NRG AgentWitch (API / DB / gates)  
**Base:** `origin/main` (cost-control API tip + UI knobs / admin set-plan LIVE)  
**Branch:** `feat/awc-cost-control-gates-r1`  
**Product lock:** `docs/design/pricing/COST-CONTROL-API.md` + `docs/design/pricing/LOCK.md`  
**Never hide** Marketplace, Connect, Automations, or Download. Plain English only.  
**Admin set-plan / mig expiry fields:** owned by AW UI Box — reuse `users.plan` fields; no mig 105 from this tip (105 = history default ON; 102/103 reserved).

## Product decisions (NRG Lead / Product — amend)

### (2) History ≠ cloudMessageStorage

- **Uncouple** local project-computer History from `cloudMessageStorage`.
- History `owner_enable` / History default ON must **not** call `assertCloudMessageStorage` and must **not** require the `cloudMessageStorage` entitlement.
- Unpaid plans (`trial` + `admin_free`) keep **local History ON**.
- `cloudMessageStorage` gates **only** Neon/server long-tail storage (where the server persists messages long-term) — **not** local project-computer History.
- **No purge** of existing data. Do **not** flip existing ON projects to OFF.
- `assertCloudMessageStorage` remains as a helper for future Neon long-tail persist paths; it is **not** wired on History toggle.

### (3) OAuth `trial_closed`

- **No usable trial session** when trial signup is blocked / trialGate is closed.
- After blocked signup / closed trial: land the user on **signed-out Pricing** with the blocking banner (`BILLING_COPY.trialGateClosed`; query `?trial_closed=1`).
- If OAuth minted a user row while the gate was closed: that row gets **no trial dates** → **no trial entitlements** until checkout (`resolveBillingEntitlements` zeros computers/assistants). Auth `callbacks.signIn` redirects to Pricing (no session).
- `createUser` / OAuth adapter + `findOrCreateUserByEmail` surface `BillingGateError` / `trial_closed` cleanly for non-OAuth callers.

### Keep

- (1) Mac-push note for coordinator (`/workspace/awc-cost-control-gates-r1-push-on-mac.sh`).
- Admin plan-override with AW UI Box (not this tip).

## LIVE on main (do not rebuild)

| Piece | Where |
|-------|--------|
| DB | mig `101-billing-cost-control.sql`: `users.plan` (`trial\|pro\|team\|admin_free`), trial dates, `admin_free`, `seat_count`, Stripe stubs, `billing_infra_spend_months` |
| Resolve | `loadBillingPlanForUser` → `resolveBillingEntitlements` → `loadEntitlementsForUser` (+ `trialGate` from infra meter) |
| Customer APIs | `GET /api/billing/entitlements`, `GET /api/billing/plan` (no euros) |
| Admin APIs | `GET /api/billing/admin/cost-control`, `POST …/set-free`, `POST …/set-plan` (`canManageAllUsers`) |
| Stubs | `POST /api/billing/checkout`, `POST /api/billing/portal` → 501 |
| Computer gate | `assertComputerEntitlement` in `insertAgentWitchDeviceClaim`; install-token maps `BillingGateError` → 403 |
| Assistant gate | `assertAssistantConnectEntitlement` in `redeemClaimBotCode` / `POST /api/me/bots` |
| Helper (Neon long-tail only) | `assertCloudMessageStorage` — **not** on History |
| UI | Account BillingPlanSummary, entitlement notes, `/admin/cost-control`, set-free / set-plan controls |

## Plan → limits

| Gate | Trial (granted) | Pro | Team | Admin free | Closed-gate mint (no trial dates) |
|------|-----------------|-----|------|------------|-----------------------------------|
| Max computers | 2 | 2 | 2 | 2 | 0 until checkout |
| Max assistant connects | 3 | 3 | 10 | 3 | 0 until checkout |
| Cloud message storage (Neon long-tail) | Off | On | On | Off | Off |
| Local project-computer History | On (allowed) | On | On | On | On (local; not gated by cloudMessageStorage) |
| AI credits in package | None | None | None | None | None |

Constants: `src/lib/billing/billingPlan.constant.ts` (`MAX_COMPUTERS_ALL_PLANS`, `MAX_ASSISTANT_CONNECTS`, `FREE_TRIAL_INFRA_BUDGET_EUR` = 200).

`cloudMessageStorage === (plan === "pro" \|\| plan === "team")`.

## Where gates run (per-route / lib — not global middleware)

No billing middleware. Auth stays `requireAuth` / device auth. Gates are **lib asserts** called from mutation paths:

| Gate | Assert | Wired at | HTTP |
|------|--------|----------|------|
| Computer limit | `assertComputerEntitlement` | `insertAgentWitchDeviceClaim` (+ install-token / pairing) | 403 `computer_limit` |
| Trial closed (new trial usage) | same assert when `plan === "trial"` && (`trialGate === "closed"` \|\| no trial dates) | computer claim | 403 `trial_closed` |
| Assistant connect limit | `assertAssistantConnectEntitlement` | `redeemClaimBotCode` | 403 `assistant_connect_limit` |
| Cloud message storage (Neon long-tail) | `assertCloudMessageStorage` | **Not wired on History**; reserve for server long-tail persist | 403 `cloud_message_storage_off` |
| Trial signup | `assertTrialGateOpen` → createUser mint without dates when closed; Auth `signIn` → Pricing | human `createUser` (skip synthetic agent emails + super-admin) | redirect `/pricing?trial_closed=1` / `BillingGateError` `trial_closed` |

Messenger `insertProjectMessageWithDeliveries` is **not** gated (short-term Neon + local/IDB/History paths stay up). Local History toggle is **not** gated by `cloudMessageStorage`.

## Error shape (over limit)

```json
{ "error": "<plain English>", "code": "<denial_code>" }
```

Denial codes (`BillingGateDenial`): `computer_limit` | `assistant_connect_limit` | `cloud_message_storage_off` | `trial_closed`.

Helper: `toBillingGateResponse(denial)` → `Response` status 403. `BillingGateError` for throw sites (install-token / findOrCreateUserByEmail).

## AuthZ

| Surface | Who |
|---------|-----|
| Customer entitlements / plan / checkout stubs | Signed-in user (`requireAuth`) |
| Admin cost-control / set-free / set-plan | `canManageAllUsers(actor)` else 403 |
| Computer / assistant gates | Acting user must own the resource (existing project/device auth) |

## This tip adds (finalize + Product amend)

1. Contract under `docs/design/cost-control/` (this file).  
2. `assertTrialGateOpen` + human signup wire + trial dates on `createUser` when gate open; **closed-gate mint without trial dates** + Auth redirect to signed-out Pricing.  
3. **Do not** wire `assertCloudMessageStorage` on History enable (Product uncouple).  
4. `trial_closed` on computer claim for trial when infra gate closed (or closed-gate mint).  
5. `toBillingGateResponse` + pairing surfaces `code` on billing deny.  

**No new migration.** Soft ensure + mig 101 remain. No History ON→OFF flip. No purge of existing data.

## Light Arch

**Light Arch review 5** on this tip delta (Product ask). Pure extension of existing asserts / routes; no new tables; billing precedence unchanged (`users.plan` → entitlements). History uncouple + OAuth trial_closed Pricing redirect are the review focus.

**Note for coordinator:** Soft LOCK Soft-claim Soft enqueue after Messenger Load older (separate stack).

## Out of scope

- Stripe live checkout / webhooks / plan_override expiry (admin-plan-override brief; AW UI Box).  
- Pricing HTML / Product EN beyond trial_closed banner reuse of `BILLING_COPY.trialGateClosed`.  
- Companies.  
- Hiding Marketplace / Connect / Automations / Download.
