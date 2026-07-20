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

---

## HOME-011 — Workflow onboarding step reset across browsers

**Symptom:** “Create your first workflow or agent” stayed incomplete after saving a workflow in another browser or tab, or when `/api/capabilities/mine` returned only seeded defaults.

**Root cause:** Step completion only parsed the live capabilities list; no DB-backed signal excluding auto-seeded sample workflow and default agent.

**Fix:** `GET /api/onboarding/workflow-created` derives completion from `published_capabilities` (non-archived, non-seeded). `loadOnboardingSteps` merges DB flag with capabilities via `hasUserCreatedFirstWorkflowOrAgent`. Local optimistic flag + `useOnboardingWorkflowStepRefresh` keep the home checklist live after creates.

**Regression test:** `onboardingWorkflowCreatedQueries.test.ts`, `onboardingWorkflowCreatedApi.test.ts`, `onboardingWorkflowCreatedStore.test.ts`, `syncOnboardingWorkflowCreatedFlag.test.ts`, `hasUserCreatedFirstWorkflowOrAgent.test.ts`.

---

## HOME-012 — Marketplace install skipped workflow onboarding mark

**Symptom:** Home checklist still showed “Create your first workflow or agent” incomplete after installing a marketplace preset that saved to Library, until a full reload.

**Root cause:** `postMarketplaceInstall` did not call `markOnboardingWorkflowCreated` when `savedToLibrary` was true (unlike template save, workflow create, and fork paths).

**Fix:** Mark workflow onboarding when marketplace install returns `savedToLibrary: true`.

**Regression test:** `postMarketplaceInstall.test.ts`.

---

## HOME-013 — Generic hero after onboarding finished

**Symptom:** After pair, workflow, and first-task steps were complete, home showed the generic “Welcome back” hero with no clear “what’s next” for new users.

**Root cause:** `HomeOnboardingMainPanel` fell through to `HomeDashboardHero` whenever no required step remained.

**Fix:** `HomeOnboardingSetupCompletePanel` renders when all required steps are done, with links to send another task, automations, showcases, library, and reports.

**Regression test:** `areRequiredOnboardingStepsComplete.test.ts`.

---

## HOME-014 — Setup-complete panel shown on every visit

**Symptom:** Returning users always saw “You’re set up” on home even after they had already moved on.

**Root cause:** `HomeOnboardingSetupCompletePanel` had no dismiss or per-user persistence.

**Fix:** Persist `users.onboarding_setup_acknowledged` via `GET`/`POST /api/onboarding/setup-acknowledged`. Client mirrors `daily-magic.onboarding.setup-acknowledged.v1`; “Continue to home” dismisses to `HomeDashboardHero`. `shouldShowOnboardingSetupCompletePanel` gates the success state.

**Regression test:** `onboardingSetupAcknowledgedQueries.test.ts`, `onboardingSetupAcknowledgedApi.test.ts`, `onboardingSetupAcknowledgedStore.test.ts`, `shouldShowOnboardingSetupCompletePanel.test.ts`.

---

## HOME-015 — Setup-complete panel returned after navigation CTA

**Symptom:** Users who clicked “Send another task”, “Schedule a workflow”, or “Browse showcases” on the setup-complete panel saw it again on the next home visit.

**Root cause:** Only the explicit “Continue to home” button called `acknowledgeSetup`; navigation links did not persist dismissal.

**Fix:** Primary and featured setup-complete links call `onDismiss` on click so action-oriented exits acknowledge setup once.

**Regression test:** Manual QA; `HomeOnboardingSetupCompletePanel` action links wire `onClick={onDismiss}` (grep guard in review).

---

## HOME-016 — Library and reports links skipped setup dismissal

**Symptom:** Users who left the setup-complete panel via “Open Library” or “View job history” still saw the success panel on the next home visit.

**Root cause:** HOME-015 only wired `onDismiss` on the primary and featured links, not the muted secondary links.

**Fix:** Library and job-history links also call `onDismiss` on click.

**Regression test:** Manual QA; all six `HomeOnboardingSetupCompletePanel` navigation targets wire `onClick={onDismiss}` (grep guard in review).

---

## HOME-017 — Onboarding sidebar hints linger after setup dismissed

**Symptom:** After users dismissed the setup-complete panel, the left rail could still show the optional automate nudge even though onboarding UX was finished.

**Root cause:** `HomeOnboardingAutomateNudge` only checked step completion, not `onboarding_setup_acknowledged`. Checklist logic was inline without a shared acknowledged gate.

**Fix:** `shouldShowOnboardingChecklist` and `shouldShowOnboardingAutomateNudge` hide sidebar onboarding hints when setup is acknowledged; components use `useOnboardingSetupAcknowledged`.

**Regression test:** `shouldShowOnboardingChecklist.test.ts`, `shouldShowOnboardingAutomateNudge.test.ts`.

---

## HOME-018 — Duplicate setup-acknowledged API fetch on home

**Symptom:** Home mounted three separate `useOnboardingSetupAcknowledged` hooks (main panel, checklist, automate nudge), each calling `GET /api/onboarding/setup-acknowledged`.

**Root cause:** Setup acknowledgment state lived in a standalone hook instead of `OnboardingStepsProvider`.

**Fix:** Fetch and store setup acknowledgment once in `OnboardingStepsContext`; `useOnboardingSetupAcknowledged` reads from context.

**Regression test:** `OnboardingStepsContext` shares one fetch (grep guard: single `fetchOnboardingSetupAcknowledged` in provider).

---

## HOME-019 — Install CTA shown when Mac already has Agent Witch

**Symptom:** Home still showed “Add a Mac” / install steps on a Mac where Agent Witch was already running.

**Root cause:** Connect CTAs always rendered and did not consult device presence.

**Fix:** Derive install CTA from cloud devices / bridge connection (`useLocalMacBrowserContext`); never probe localhost. Show bash install only when no claimed/connected device. `shouldShowAgentWitchAppDownloadCta.test.ts` (HOME-019).

**Regression test:** `shouldShowAgentWitchAppDownloadCta.test.ts`, `buildConnectComputerGuideSteps.test.ts`.

---

## HOME-020 — Home dashboard spammed link-session and devices APIs

**Symptom:** With a Mac already connected, Home fired repeated `/api/agent-witch/link-session` and `/api/agent-witch/devices` requests.

**Root cause:** After removing localhost wake probes, dashboard `autoLink` treated “has devices” as a signal to start a new link session every few seconds.

**Fix:** Do not auto-link on the dashboard gate (only on the connect guide). Short-circuit `linkLocalAgentToSignedInAccount` when a device is already claimed. Reuse the shared devices poll in `useLocalMacBrowserContext`.

**Regression test:** `linkLocalAgentAccount.test.ts` (HOME-020).

---

## HOME-021 — Home logged-in page fired too many network requests

**Symptom:** Network tab showed many duplicate `devices` / `targets` calls, separate onboarding flag GETs, and harness/policy traffic while “Your setup” stayed collapsed.

**Root cause:** Onboarding loaded five flag endpoints plus a second devices fetch; collapsed setup still mounted harness + dispatch panels; setup-acknowledged was a sixth flag fetch.

**Fix:** `GET /api/onboarding/bootstrap` returns all flags; `loadOnboardingSteps` reuses the shared devices poll; setup content mounts only after expand (`HomeSetupSectionShell`).

**Regression test:** `onboardingBootstrapApi.test.ts`, `loadOnboardingBootstrapFlags.test.ts`, `shouldLazyMountHomeSetupContent.test.ts` (HOME-021).

---

## HOME-022 — Sample weekly status workflow never appeared in Library

**Symptom:** New accounts (and test-screenshot-admin) saw “No playbooks yet” even though onboarding articles promise a seeded **Sample: Weekly status update**.

**Root cause:** `ensureSampleWorkflowCapability` existed but was never called from any API or page load path.

**Fix:** `GET /api/onboarding/bootstrap` seeds the sample playbook via `ensureSampleWorkflowCapability` before returning flags.

**Regression test:** `ensureSampleWorkflowCapability.test.ts` (HOME-022).

---

## HOME-023 — Showcases stretched full AppShell width

**Symptom:** Logged-in home “Start here” / “More examples” (and related showcase sections) spanned the full `max-w-[1600px]` shell instead of the center main column.

**Root cause:** `HomeMarketingShowcases` rendered as a sibling outside `HOME_DASHBOARD_GRID_CLASS`, so it ignored the three-column main alignment.

**Fix:** Wrap showcases in the same dashboard grid + `HOME_MAIN_COLUMN_CLASS` so they align under the center column.

**Regression test:** `HomeAuthenticatedView.test.ts` (HOME-023).

---

## HOME-024 — `first-task-sent` POST on every agent run cache write

**Symptom:** Network tab showed repeated `POST /api/onboarding/first-task-sent` while job history or live tasks updated local cache.

**Root cause:** `upsertAgentRunLocalCache` called `markOnboardingFirstTaskSent` on every upsert; `markOnboardingFirstTaskSent` always POSTed even when already marked locally.

**Fix:** Idempotent `markOnboardingFirstTaskSent`; remove milestone POST from cache upsert (keep `SYSTEM_ACK` tracker); debounce onboarding reload on cache events.

**Regression test:** `onboardingFirstTaskSentStore.test.ts` (HOME-024).

---

## HOME-025 — Install finished before Mac WebSocket connected

**Symptom:** After running the install command, Home advanced or showed success while the Mac was only claimed in the database (or recently seen) without a live agent WebSocket, so the device did not appear as connected on agentwitch.com.

**Root cause:** `waitForLinkedMacDevice` polled `/api/agent-witch/devices` for any claimed row (`devices.length > 0`) instead of requiring `isConnected` from the hub.

**Fix:** Add `GET /api/agent-witch/install-connection` (`finished` when a live Mac WebSocket exists). Poll that endpoint from the connect guide, paste modal, and `waitForLinkedMacDevice`.

**Regression test:** `resolveAgentWitchInstallConnectionStatus.test.ts`, `waitForLinkedMacDevice.test.ts`, `buildConnectInstallConnectionStatus.test.ts` (HOME-025).

---

## Adding issues

## HOME-025 — Device row did not show “This Mac” or connect action

**Symptom:** Home listed a connected Mac by hostname only (`L92KQX615Q`); no indication that the browser was on that machine, and no way to link the current Mac from the device panel when it was not listed.

**Fix:** On macOS, read wake-server `/identity` once, cache hostname in `agent_witch_local_host` cookie, show a **This Mac** badge on the matching row, and render **Connect this Mac** when the current computer is not in the device list.

**Regression tests:** `resolveShouldShowConnectThisMac.test.ts` (HOME-025).

---

## HOME-026 — Connect this Mac row skipped install modal

**Symptom:** Clicking **Connect this Mac** in Your Devices tried to link immediately instead of opening the install modal with the bash command and Terminal paste flow. On mobile, the row was hidden or offered no MacBook guidance.

**Fix:** Open `ConnectThisMacModal` from the row (bash + paste modal on macOS; MacBook steps on mobile/non-Mac). Show the row on non-Mac browsers when devices already exist.

**Regression tests:** `resolveShouldShowConnectThisMac.test.ts` (HOME-026).

---

## HOME-027 — Connect this Mac monitor icon blew up on mobile

**Symptom:** On the Home **Connect this Mac** row, the monitor SVG rendered at full flex width on narrow viewports, pushing copy off-screen and breaking the card layout.

**Cause:** `MacDeviceIcon` is a dimensionless SVG; `ConnectThisMacRow` passed color classes but no `h-*` / `w-*` size utilities (other call sites use `resolveMacDeviceIconClassName`).

**Fix:** Size the row icon via `resolveMacDeviceIconClassName`; default `MacDeviceIcon` to `h-4 w-4 shrink-0` when no `className` is passed.

**Regression test:** `MacDeviceIcon.test.tsx` (HOME-027).

---

Use the next ID (`HOME-027`, …). Include symptom, root cause, fix paths, and test file.
