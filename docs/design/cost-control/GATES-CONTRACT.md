# AgentWitch cost-control — server gates contract (r1)

**Owner:** NRG AgentWitch (API / DB / gates)  
**Base:** `origin/main` (cost-control API tip `d425b641` + UI knobs `3f7956b5` / admin set-plan LIVE)  
**Branch:** `feat/awc-cost-control-gates-r1`  
**Product lock:** `docs/design/pricing/COST-CONTROL-API.md` + `docs/design/pricing/LOCK.md`  
**Never hide** Marketplace, Connect, Automations, or Download. Plain English only.  
**Admin set-plan / mig expiry fields:** owned by AW UI Box — reuse `users.plan` fields; no mig 105 from this tip (105 = history default ON; 102/103 reserved).

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
| Helper (unwired before r1) | `assertCloudMessageStorage`; denial code `trial_closed` typed but unused |
| UI | Account BillingPlanSummary, entitlement notes, `/admin/cost-control`, set-free / set-plan controls |

## Plan → limits

| Gate | Trial | Pro | Team | Admin free |
|------|-------|-----|------|------------|
| Max computers | 2 | 2 | 2 | 2 |
| Max assistant connects | 3 | 3 | 10 | 3 |
| Cloud message storage (Neon long-tail / History ON retention) | Off | On | On | Off |
| AI credits in package | None | None | None | None |

Constants: `src/lib/billing/billingPlan.constant.ts` (`MAX_COMPUTERS_ALL_PLANS`, `MAX_ASSISTANT_CONNECTS`, `FREE_TRIAL_INFRA_BUDGET_EUR` = 200).

`cloudMessageStorage === (plan === "pro" \|\| plan === "team")`.

## Where gates run (per-route / lib — not global middleware)

No billing middleware. Auth stays `requireAuth` / device auth. Gates are **lib asserts** called from mutation paths:

| Gate | Assert | Wired at | HTTP |
|------|--------|----------|------|
| Computer limit | `assertComputerEntitlement` | `insertAgentWitchDeviceClaim` (+ install-token / pairing) | 403 `computer_limit` |
| Trial closed (new trial usage) | same assert when `plan === "trial"` && `trialGate === "closed"` | computer claim | 403 `trial_closed` |
| Assistant connect limit | `assertAssistantConnectEntitlement` | `redeemClaimBotCode` | 403 `assistant_connect_limit` |
| Cloud message storage | `assertCloudMessageStorage` | History `owner_toggle` **enable only** (`orchestrateProjectComputerHistory`) | 403 `cloud_message_storage_off` |
| Trial signup | `assertTrialGateOpen` | human `createUser` (skip synthetic agent emails + super-admin) | 403 `trial_closed` |

Messenger `insertProjectMessageWithDeliveries` is **not** gated (short-term Neon + local/IDB/History paths stay up). Cloud storage gate is **History ON / long-tail retention**, not chat send.

## Error shape (over limit)

```json
{ "error": "<plain English>", "code": "<denial_code>" }
```

Denial codes (`BillingGateDenial`): `computer_limit` | `assistant_connect_limit` | `cloud_message_storage_off` | `trial_closed`.

Helper: `toBillingGateResponse(denial)` → `Response` status 403. `BillingGateError` for throw sites (install-token / createUser).

History toggle failure also returns orchestrator shape `{ ok: false, code: "cloud_message_storage_off" }` with HTTP 403.

## AuthZ

| Surface | Who |
|---------|-----|
| Customer entitlements / plan / checkout stubs | Signed-in user (`requireAuth`) |
| Admin cost-control / set-free / set-plan | `canManageAllUsers(actor)` else 403 |
| Computer / assistant / history gates | Acting user must own the resource (existing project/device auth) |

## This tip adds (finalize)

1. Contract under `docs/design/cost-control/` (this file).  
2. `assertTrialGateOpen` + human signup wire + trial dates on `createUser`.  
3. Wire `assertCloudMessageStorage` on History enable.  
4. `trial_closed` on computer claim for trial when infra gate closed.  
5. `toBillingGateResponse` + pairing surfaces `code` on billing deny.  

**No new migration.** Soft ensure + mig 101 remain.

## Light Arch

**Not required** for this tip: pure extension of existing asserts / routes; no new tables; billing precedence unchanged (`users.plan` → entitlements).  

**Follow-up (Arch if pursued):** mig 105 defaults History ON, but unpaid plans have `cloudMessageStorage: false`. Purge still excludes History-ON projects regardless of plan — unpaid Neon long-tail may linger until toggle-off or a plan-aware purge. Product may want default History OFF for unpaid or purge join on owner plan.

## Out of scope

- Stripe live checkout / webhooks / plan_override expiry (admin-plan-override brief; AW UI Box).  
- Pricing HTML / Product EN.  
- Companies.  
- Hiding Marketplace / Connect / Automations / Download.
