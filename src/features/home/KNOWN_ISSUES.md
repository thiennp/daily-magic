# Home — known issues

Document every production bug or UX regression here. Each entry must link to a test.

## HOME-001 — OAuth callback on apex domain

**Symptom:** Google OAuth `redirect_uri_mismatch` or callback host unreachable on `agentwitch.com` (no DNS).

**Root cause:** Production must use `https://www.agentwitch.com` (`AGENT_WITCH_DEFAULT_ORIGIN`).

**Fix:** `src/lib/app/resolveAppBaseUrl.ts`, `src/lib/agentWitch/constants.ts`.

**Regression test:** `src/lib/app/resolveAppBaseUrl.test.ts` — production resolves to `AGENT_WITCH_DEFAULT_ORIGIN` (www).

---

## HOME-002 — “Connected” without a paired device

**Symptom:** UI showed Mac connected when the device list was empty.

**Root cause:** Optimistic `markPaired()` set local state without re-fetching devices.

**Fix:** `useHasPairedDevice.markPaired` calls `refresh()`; state derives from `resolveHasPairedDeviceAfterFetch`.

**Regression test:** `resolveHasPairedDeviceAfterFetch.test.ts`.

---

## HOME-003 — Full dashboard before Mac paired

**Symptom:** Task composer and marketplace visible before any Mac in the device list.

**Root cause:** Gate checked session/onboarding flags instead of device count.

**Fix:** `HomeLinkAccountGate` + `resolveHomeDashboardMode` — `connect` mode until `deviceCount > 0`.

**Regression test:** `resolveHomeDashboardMode.test.ts`.

---

## HOME-004 — “Connect another Mac” with zero devices

**Symptom:** First-time users saw “Connect another Mac”.

**Root cause:** Copy did not branch on `hasExistingDevices`.

**Fix:** `resolveConnectAnotherMacLabel` in `ConnectAnotherMacButton`.

**Regression test:** `resolveConnectAnotherMacLabel.test.ts`.

---

## HOME-005 — Paste modal on Cmd+C

**Symptom:** Install paste modal opened on any clipboard copy.

**Root cause:** Global clipboard listeners on the connect flow.

**Fix:** `CopyableBashCommand` calls `onEngaged` only from the copy button click; listeners removed.

**Regression test:** Manual QA; component has no `onCopy` / `clipboard` listeners (grep guard in review).

---

## Adding issues

Use the next ID (`HOME-008`, …). Include symptom, root cause, fix paths, and test file.

---

## HOME-006 — “Send your first task” reset after refresh

**Symptom:** Onboarding step 3 stayed incomplete or reverted after reload even after dispatching a task.

**Root cause:** Step completion only inferred from ephemeral `/api/agent-runs?scope=mine` results and non-empty job-history cache; both could be empty after server restart or before cache sync. localStorage alone also did not follow the user across browsers/devices.

**Fix:** Persist per-user `users.onboarding_first_task_sent` (boolean) via `GET`/`POST /api/onboarding/first-task-sent`. Client still mirrors `daily-magic.onboarding.first-task-sent.v1` in localStorage; `loadOnboardingSteps` reads the DB flag and one-time-migrates a local-only true flag to the API. Marking still fires on dispatch ack / run cache upsert.

**Regression test:** `onboardingFirstTaskSentStore.test.ts`, `onboardingFirstTaskSentApi.test.ts`, `onboardingFirstTaskSentQueries.test.ts`, `syncOnboardingFirstTaskSentFlag.test.ts`, `trackOnboardingFromAgentWitchSocketMessage.test.ts`, `hasUserSentFirstTask.test.ts`.

---

## HOME-007 — Onboarding migration missed on deploy

**Symptom:** `GET /api/onboarding/first-task-sent` fails or step 3 never persists in production after shipping HOME-006.

**Root cause:** SQL in `db/migrations/013-onboarding-first-task-sent.sql` was not applied automatically on Vercel deploy; only documented as a manual `psql` step.

**Fix:** `vercel-build` runs `npm run db:migrate` (Neon `Pool`, pending files tracked in `schema_migrations`) before `next build`. README documents the flow. Existing DBs: `npm run db:migrate:bootstrap` records already-applied files without re-running SQL.

**Regression test:** `scripts/db-migrate.util.test.ts`.
