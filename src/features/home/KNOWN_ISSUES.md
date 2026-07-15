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

Use the next ID (`HOME-011`, …). Include symptom, root cause, fix paths, and test file.

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

---

## HOME-008 — Optional automate step reset across browsers

**Symptom:** “Schedule a workflow (optional)” stayed incomplete after creating an automation in another browser, or reverted when `/api/automations` was empty before sync.

**Root cause:** Step completion only inferred from live `GET /api/automations` results; no per-user DB flag.

**Fix:** Persist `users.onboarding_automation_created` via `GET`/`POST /api/onboarding/automation-created`. Client mirrors `daily-magic.onboarding.automation-created.v1` in localStorage; `loadOnboardingSteps` merges DB flag with automations list. Marking fires on successful automation create (client + API).

**Regression test:** `onboardingAutomationCreatedQueries.test.ts`, `onboardingAutomationCreatedApi.test.ts`, `onboardingAutomationCreatedStore.test.ts`, `syncOnboardingAutomationCreatedFlag.test.ts`, `hasUserCreatedAutomation.test.ts`.

---

## HOME-009 — Automate onboarding step stale on home tab

**Symptom:** Home checklist still showed “Schedule a workflow (optional)” incomplete after creating an automation in another tab or returning from `/automations`, until a full page reload.

**Root cause:** `OnboardingStepsProvider` only loaded steps on mount; no focus/visibility/custom-event refresh for the optional automate step (unlike first-task step).

**Fix:** `useOnboardingAutomateStepRefresh` reloads steps on window focus, tab visibility, and `ONBOARDING_AUTOMATION_CREATED_UPDATED_EVENT` (dispatched when the automation-created local flag is written).

**Regression test:** `onboardingAutomationCreatedStore.test.ts`, `isAutomateOnboardingStepDone.test.ts`.

---

## HOME-010 — Pair-Mac onboarding step stale across browsers

**Symptom:** Home checklist still showed “Add your Mac as a worker” incomplete after pairing on another browser or tab, until a hard reload.

**Root cause:** Step completion trusted only the in-memory paired-devices cache or a live `/api/agent-witch/devices` fetch with no DB-backed onboarding signal; stale empty cache could win on the home tab.

**Fix:** `GET /api/onboarding/mac-paired` derives completion from `agent_witch_devices` (`EXISTS` non-revoked row). `loadOnboardingSteps` merges that DB flag with the live device list via `hasUserPairedMac`. `useOnboardingPairStepRefresh` reloads steps on focus and tab visibility while the pair step is incomplete.

**Regression test:** `onboardingMacPairedQueries.test.ts`, `onboardingMacPairedApi.test.ts`, `hasUserPairedMac.test.ts`.
