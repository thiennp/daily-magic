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

## HOME-004 — “Connect another computer” with zero devices

**Symptom:** First-time users saw “Connect another computer”.

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

**Symptom:** Home checklist still showed “Add your computer as a worker” incomplete after pairing on another browser or tab, until a hard reload.

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

**Symptom:** Home still showed “Add a computer” / install steps on a computer where Agent Witch was already running.

**Root cause:** Connect CTAs always rendered and did not consult device presence.

**Fix:** Derive install CTA from cloud devices / bridge connection (`useLocalMacBrowserContext`); never probe localhost. Show bash install only when no claimed/connected device. `shouldShowAgentWitchAppDownloadCta.test.ts` (HOME-019).

**Regression test:** `shouldShowAgentWitchAppDownloadCta.test.ts`, `buildConnectComputerGuideSteps.test.ts`.

---

## HOME-020 — Home dashboard spammed link-session and devices APIs

**Symptom:** With a computer already connected, Home fired repeated `/api/agent-witch/link-session` and `/api/agent-witch/devices` requests.

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

**Symptom:** After running the install command, Home advanced or showed success while the computer was only claimed in the database (or recently seen) without a live agent WebSocket, so the device did not appear as connected on agentwitch.com.

**Root cause:** `waitForLinkedMacDevice` polled `/api/agent-witch/devices` for any claimed row (`devices.length > 0`) instead of requiring `isConnected` from the hub.

**Fix:** Add `GET /api/agent-witch/install-connection` (`finished` when a live Mac WebSocket exists). Poll that endpoint from the connect guide, paste modal, and `waitForLinkedMacDevice`.

**Regression test:** `resolveAgentWitchInstallConnectionStatus.test.ts`, `waitForLinkedMacDevice.test.ts`, `buildConnectInstallConnectionStatus.test.ts` (HOME-025).

---

## HOME-026 — Connect this computer row skipped install modal

**Symptom:** Clicking **Connect this computer** in Your Devices tried to link immediately instead of opening the install modal with the bash command and Terminal paste flow. On mobile, the row was hidden or offered no MacBook guidance.

**Fix:** Open `ConnectThisMacModal` from the row (bash + paste modal on macOS; MacBook steps on mobile/non-Mac). Show the row on non-Mac browsers when devices already exist.

**Regression tests:** `resolveShouldShowConnectThisMac.test.ts` (HOME-026).

---

## HOME-027 — Connect this computer monitor icon blew up on mobile

**Symptom:** On the Home **Connect this computer** row, the monitor SVG rendered at full flex width on narrow viewports, pushing copy off-screen and breaking the card layout.

**Cause:** `MacDeviceIcon` is a dimensionless SVG; `ConnectThisMacRow` passed color classes but no `h-*` / `w-*` size utilities (other call sites use `resolveMacDeviceIconClassName`).

**Fix:** Size the row icon via `resolveMacDeviceIconClassName`; default `MacDeviceIcon` to `h-4 w-4 shrink-0` when no `className` is passed.

**Regression test:** `MacDeviceIcon.test.tsx` (HOME-027).

---

## HOME-028 — Connect this computer shown on phone Home

**Symptom:** Mobile browsers saw a **Connect this computer** row in Your Devices even though the phone is not the computer being linked.

**Fix:** Detect mobile user agents (`isMobileBrowser`) and hide the Connect this computer row via `resolveShouldShowConnectThisMac`.

**Regression tests:** `isMobileBrowser.test.ts`, `resolveShouldShowConnectThisMac.test.ts` (HOME-028).

---

## HOME-029 — “this Mac” badge used hostname instead of install token

**Symptom:** A device row from another account/user on the same physical Mac showed the **this Mac** badge, even when the browser was not signed into that install’s identity.

**Root cause:** `isThisMac` matched `deviceLabel` to the machine hostname from wake `/identity`, so any cloud row sharing that hostname looked local.

**Fix:** Match **this Mac** on pairing-token identity: wake `/identity` returns `tokenHash` (sha256 of local `pairingToken`), devices API includes `tokenHash`, and UI compares those hashes. Hostname is no longer used for the badge or Connect-this-Mac gating.

**Regression tests:** `deviceMatchesLocalTokenHash.test.ts`, `resolveShouldShowConnectThisMac.test.ts` (HOME-029).

---

## HOME-030 — Connect this computer missing after uninstall with other devices listed

**Symptom:** After Agent Witch was uninstalled (no local token identity), Your Devices no longer showed **this Mac**, but also hid **Connect this computer** whenever other cloud devices already existed.

**Root cause:** `resolveShouldShowConnectThisMac` treated `localTokenHash === null` like “identity unknown → hide Connect when `devices.length > 0`”, which was carried over from hostname matching.

**Fix:** On macOS, a missing local token hash means this machine is not linked yet, so always show **Connect this computer**. Hide it only when a listed device matches the local token hash.

**Regression tests:** `resolveShouldShowConnectThisMac.test.ts`, `resolveShouldShowConnectThisMac.tokenIdentity.test.ts` (HOME-030).

---

## HOME-031 — this computer badge missing after Connect without wake identity

**Symptom:** After linking a computer, Your Devices showed the connected device (e.g. Mac Light C) but never the **this Mac** badge. Connect this computer could still appear.

**Root cause:** `localTokenHash` was only set from wake `/identity` (localhost). The install-token response returned `pairingToken` but the browser discarded it, so when wake was down or incomplete there was no token identity to match `device.tokenHash`.

**Fix:** Install-token API returns `tokenHash`; Connect this computer / install command hooks persist it via `localMacTokenHashStore` (cookie + live subscribers). Install finish opens Home with `?awLocalTokenHash=…` so the badge works even when wake `/identity` is unreachable. Wake still refreshes the hash when available.

**Regression tests:** `localMacTokenHashStore.test.ts`, `buildAgentWitchInstallScriptFinish.test.ts` (HOME-031).

---

## HOME-032 — Connect this computer replaced another account on the same computer

**Symptom:** On a shared Mac, Your Devices correctly hid **this Mac** for a different Agent Witch account, but **Connect this computer** looked like it would take over the other account’s local install. Wake `/identity` could also overwrite the browser’s token hash with the active profile’s hash.

**Root cause:** Install/profile helpers could inherit another account’s pairing token or flip `active-profile.json`, and the browser always adopted wake’s single `tokenHash`.

**Fix:** Profile-scoped install never overwrites another email’s token or steals `active-profile`; wake returns all local `tokenHashes`; browser keeps an existing account hash when multiple profiles exist. Install bundle **48**.

**Regression tests:** `resolveLocalMacTokenHashFromWakeIdentity.test.ts`, `buildConnectComputerGuideSteps.test.ts`, `ensureAgentWitchProfile.test.ts`, `buildAgentWitchInstallScriptConfigBlock.test.ts` (HOME-032 / AGENT-047).

---

## HOME-033 — Connect Cursor Cloud form always visible in Your Devices

**Symptom:** The full Connect Cursor Cloud API-key form (instructions, input, submit) rendered inline under Your Devices by default, crowding the rail.

**Root cause:** `ConnectCursorCloudCard` always rendered the nested form when disconnected instead of a compact entry point.

**Fix:** Show a **Connect Cursor Cloud** button by default; open `ConnectCursorCloudModal` with numbered steps and the API-key form. Connected state stays inline with disconnect.

**Regression tests:** Manual — open Home → Your Devices → button only when disconnected; modal shows steps + form (`ConnectCursorCloudCard.tsx`, `ConnectCursorCloudModal.tsx`).

---

## HOME-034 — No Home list of in-flight New task runs

**Symptom:** Users could dock **New task** and start another job, but Home did not show running processes or let them expand a chosen run.

**Root cause:** Live terminal localStorage was a single slot; Home only linked to full job history.

**Fix:** Archive live sessions by `runId` when starting fresh; Home **Running on your computer** lists `RUNNING` / `PENDING_APPROVAL` from the agent-runs cache; click expands **New task** with `sourceRunId` + `resumeLive`.

**Regression tests:** `listRunningAgentRunsLocalCache.test.ts`, `formatHomeRunningJobTitle.test.ts`, `restoreAgentLiveTerminalFromSourceRun.test.ts` (AGENT-053 / HOME-034).

---

## HOME-035 — Running list did not show Mac still alive

**Symptom:** Home **Running on your computer** only said “Click to expand”, so quiet jobs looked possibly crashed even when `run.heartbeat` was arriving.

**Root cause:** Heartbeats did not patch `lastRunHeartbeatAt` in the local agent-runs cache, and the list never rendered that field.

**Fix:** Dashboard inbound handler patches cache on `run.heartbeat`; Home shows “Last seen alive …” (or waiting for first heartbeat).

**Regression tests:** `formatHomeRunningJobAliveLabel.test.ts`, `syncAgentRunHeartbeatLocalCacheFromSocket.test.ts` (AGENT-058 / HOME-035).

---

## HOME-036 — Device row did not show “This Mac” or connect action

**Symptom:** Home listed a connected computer by hostname only (`L92KQX615Q`); no indication that the browser was on that machine, and no way to link the current Mac from the device panel when it was not listed.

**Fix:** On macOS, read wake-server `/identity` once, cache hostname in `agent_witch_local_host` cookie, show a **This Mac** badge on the matching row, and render **Connect this computer** when the current computer is not in the device list.

**Regression tests:** `resolveShouldShowConnectThisMac.test.ts` (HOME-036).

---

## HOME-037 — Homepage preset lost on sign-in (BUG-005)

**Symptom:** Choosing a popular preset on `/` then **Sign in** sent users to `/login?callbackUrl=%2Fmarketplace` with no preset/workflow context (e.g. “Add vibe coding app feature”).

**Root cause:** `HomeMarketingPopularPresetSignInDialog` hard-coded `callbackUrl=/marketplace` instead of the selected template’s marketplace listing.

**Fix:** `buildHomePopularPresetSignInHref` / `buildHomePopularPresetMarketplaceCallbackPath` encode `capabilityId=preset:<templateId>`; `useMarketplaceInstallFromCapabilityIdQuery` opens the install modal after auth.

**Regression test:** `buildHomePopularPresetSignInHref.test.ts`, `findMarketplaceListingByCapabilityId.test.ts`.

---

## HOME-038 — Guest preset pick dropped capabilityId on dismiss (#94)

**Symptom:** On `/`, guest clicks a popular preset then dismisses the sign-in dialog; address bar has no `capabilityId` query param.

**Root cause:** `HomeMarketingPopularPresetsGrid.closeDialog` called `removePresetCapabilityIdFromSearchParams` and `router.replace`, clearing the param Magi intended to keep for callbackUrl/deep-link flow.

**Fix:** Close dialog only clears local modal state; `capabilityId` stays in the URL after dismiss (still set on preset pick).

**Regression test:** `HomeMarketingPopularPresetsGrid.test.tsx` (HOME-038).

---

## HOME-039 — Your setup chevron misaligned when expanded

**Symptom:** Expanding **Your setup** on Home made the disclosure arrow sit too low relative to the title (especially above the logged-in **New to AI agents?** showcases block).

**Root cause:** Native `<summary>` marker alignment inside padded `details`, plus scroll anchoring when lazy content mounted pushed the viewport too far down.

**Fix:** Flex summary with `ChevronDownIcon` (rotate when open), hide WebKit marker, `scroll-mt-24` + `/#your-setup` opens with `scrollIntoView({ block: "nearest" })`, and `[overflow-anchor:none]` on expanded content.

**Regression tests:** `HomeSetupSectionShell.test.ts`, `openHomeSetupFromLocationHash.test.ts` (HOME-039).

---

## HOME-040 — Update local showed tokenless repair curl

**Symptom:** **Update local Agent Witch** copied `agent-witch-update.sh` without a pairing token; install failed when the computer had no local identity in config.

**Root cause:** `useThisMacLocalInstallActions` used `buildAgentWitchUpdateInstallCommand` only; update scripts require a preset or on-disk pairing token.

**Fix:** When the update modal opens, fetch the same personalized Connect install command (`/api/agent-witch/install-token`) via `usePersonalizedAgentWitchInstallCommand`.

**Regression test:** `UpdateLocalMacModal.test.ts` (HOME-040).

---

## HOME-049 — Home projects row showed folder path and delete

**Symptom:** Home **Your projects** listed folder paths, delete controls, and inline create form noise.

**Root cause:** Reused `SendTaskComposerProjectPickerStep` meant for the task composer wizard.

**Fix:** Home reuses `AwcProjectsPanel` for the top 4 recent projects (cards link to `/projects/[id]`; **View all** → `/projects`). No Edit on home cards; create/manage on `/projects`.

**Regression test:** `HomeProjectsPanel.test.ts`, `HomeProjectsPanel.render.test.ts` (HOME-048 / HOME-049).

---

## HOME-050 — this computer identity probe did not retry after AWB came back

**Symptom:** On this computer, AWC never sent `GET http://127.0.0.1:{wakePort}/identity` after Agent Witch Bridge came back, so the **this Mac** badge stayed missing even though AWB `/identity` worked from curl.

**Root cause:** The browser probed each wake port once per tab session and then suppressed retries. If AWB was down on first load (or only the page-origin port was tried), later focus on Home did not send identity again. Localhost AWC also skipped production port `47892`.

**Fix:** Retry the wake identity probe on tab focus/`visibilitychange` when identity is still missing; always include both `47892` and `47893`.

**Regression tests:** `shouldRetryUnreachableWakeIdentityProbe.test.ts`, `buildAllWakePortsForPage.test.ts`, `useProbeLocalMacWakeIdentity.test.ts` (HOME-050).

---

## HOME-051 — Console ERR_CONNECTION_REFUSED for wake `/identity` when AWB is down

**Symptom:** On macOS (especially `http://localhost:3000`), DevTools showed red `GET http://127.0.0.1:47892/identity` and `:47893/identity` `net::ERR_CONNECTION_REFUSED` even though AWC handled the failure and continued.

**Root cause:** The browser called AWB loopback URLs directly. Chromium logs connection refused for failed loopback fetches. Probes also ran before sign-in on pages that mounted `useLocalMacBrowserContext`.

**Fix:** On loopback AWC, batch wake identity probes through `GET /api/agent-witch/local-identity` (Node fetches AWB). Gate macOS wake probes on authenticated sessions only. Production `www.agentwitch.com` still uses direct loopback fetch when AWB is required.

**Regression tests:** `shouldFetchWakeIdentityViaAppServer.test.ts`, `probeLocalAgentWitchWakePorts.test.ts`, `parseWakePortsQuery.test.ts`, `useProbeLocalMacWakeIdentity.test.ts` (HOME-051).

---

## HOME-052 — Wake `/identity` still logged on production or when token already known

**Symptom:** After HOME-051, DevTools still showed `GET http://127.0.0.1:47892/identity` and `:47893/identity` `net::ERR_CONNECTION_REFUSED` (often on `https://www.agentwitch.com`, or when install already seeded `localTokenHash`).

**Root cause:** App-server proxy only applied to strict loopback hostnames; production AWC must use browser loopback when AWB is required. Probes still ran when `localTokenHash` was already set or when the account had zero claimed devices (no this-Mac match needed).

**Fix:** Use app-server batch probes for all non-production origins (including LAN `http://` dev). On production, skip wake probes when `localTokenHash` is present or `claimedDeviceCount === 0`. Direct loopback remains only for signed-in production Mac users with devices and no local token yet.

**Regression tests:** `resolveShouldProbeWakeIdentityInBrowser.test.ts`, `isProductionAgentWitchWebOrigin.test.ts`, `shouldFetchWakeIdentityViaAppServer.test.ts`, `useProbeLocalMacWakeIdentity.test.ts` (HOME-052).

---

## HOME-053 — Linux browser told to install on a Mac

**Symptom:** A desktop Linux browser on Home saw “Agent Witch installs on macOS” and, with no devices yet, hid Connect entirely.

**Root cause:** OS detection folded Linux into `other`, and Connect was hidden for every non-Mac browser until a device already existed.

**Fix:** `detectBrowserOperatingSystem` returns `linux`. Connect stays visible, and the guide plus Connect modal show the terminal install command.

**Regression tests:** `detectBrowserOperatingSystem.test.ts`, `buildConnectComputerGuideSteps.test.ts`, `resolveShouldShowConnectThisMac.test.ts` (HOME-053).

---

## HOME-054 — Linux connect guide showed macOS paste modal

**Symptom:** On desktop Linux, copying the install command on the Home connect guide opened “Paste into Terminal” with Command (⌘) + V instructions.

**Root cause:** `useHomeConnectComputerGuideFlow` always opened `ConnectInstallPasteModal` on copy; only `useConnectThisMacRowFlow` skipped it for non-Mac browsers.

**Fix:** `shouldOpenConnectInstallPasteModal` — paste modal only when `operatingSystem === "mac"`. Guide flow passes OS into the hook.

**Regression test:** `shouldOpenConnectInstallPasteModal.test.ts` (HOME-054).

---

## HOME-055 — Windows browser told to install on a Mac

**Symptom:** A Windows browser on Home saw “Agent Witch installs on macOS” and hid Connect until a device already existed.

**Root cause:** Connect steps treated Windows as a phone, and Connect stayed hidden for every non-Mac, non-Linux browser with an empty device list.

**Fix:** Windows Home shows WSL install steps and the same bash command, pasted inside Ubuntu. The host is the Linux runner inside WSL and appears as a Linux device. Native Windows without WSL is not a host.

**Regression tests:** `buildConnectComputerGuideSteps.test.ts`, `resolveShouldShowConnectThisMac.windows.test.ts` (HOME-055).

---

## HOME-056 — Connect another computer opened macOS paste modal on Windows

**Symptom:** On a Windows or Linux browser, copying the install command from **Connect another computer** (empty device list or device panel footer) opened “Paste into Terminal” with Command (⌘) + V instructions.

**Root cause:** HOME-054 gated the paste modal in the connect guide and **Connect this computer** row only; `ConnectAnotherMacButton` always called `setIsPasteModalOpen(true)` on copy.

**Fix:** `ConnectAnotherMacButton` uses `shouldOpenConnectInstallPasteModal(operatingSystem)` like the other connect flows.

**Regression test:** `ConnectAnotherMacButton.test.ts` (HOME-056).

---

## HOME-057 — No Connect button when this computer is not in the list

**Symptom:** Home listed other computers as offline, none marked **this Mac**, and there was no **Connect this computer** button. **Mac settings & connect** only opened Your setup.

**Root cause:** After a skipped wake-identity probe (token already stored, or a previous failed probe suppressed in sessionStorage), identity status stayed `idle`. `isCheckingLocalHostname` treated every `idle` state as still checking, so `resolveShouldShowConnectThisMac` hid the button even though no device matched this browser.

**Fix:** `resolveIsCheckingLocalMacIdentity` is pending only while a probe will run or is loading. When this computer is not linked, Home shows **Connect this computer** in the hero and under Your Devices, and the banner says **This computer is not linked**.

**Regression tests:** `resolveIsCheckingLocalMacIdentity.test.ts`, `resolveHomeMacStatusForBrowser.test.ts` (HOME-057).

---

## HOME-058 — Reconnecting banner when this computer is not linked

**Symptom:** Home showed **Mac reconnecting** in the hero while **Connect this computer** was visible because another account Mac was only `recent`, even though this browser was not linked yet.

**Root cause:** `resolveHomeMacStatusForBrowser` rewrote the banner only when aggregate tone was `offline`, not `sleeping` (`recent` / `live_other_instance`).

**Fix:** When `shouldShowConnectThisMac` is true, use **This computer is not linked** for every non-`online` tone except `none` (empty device list).

**Regression test:** `resolveHomeMacStatusForBrowser.test.ts` (HOME-058).

---

## HOME-059 — Connect this computer cloned a device on every click

**Symptom:** Clicking **Connect this computer** more than once listed **Your Mac**, **Mac 2**, **Mac 3**, each **seen recently**, **Version unknown**, latest bundle. Only the newest row showed **this Mac**. Named computers that had already checked in stayed in the list.

**Root cause:** `createAgentWitchInstallTokenForUser` inserted a new `agent_witch_devices` row on every click and `insertAgentWitchDeviceClaim` set `last_seen_at` to now. `revokePendingInstallDevicesForUser` only revoked rows with `last_seen_at IS NULL`, so the cleanup never matched. Failed `127.0.0.1` `/identity` calls are AWB being down; they do not insert rows.

**Fix:** Install-token claims leave `last_seen_at` null until a real check-in. Placeholder cleanup keeps the newest unlabeled row (no hostname, display name, bundle version, handshake, or device key), revokes the rest, and clears a false `last_seen_at` on the kept row. `GET /api/agent-witch/devices` runs that cleanup so a Home reload drops extras that were already created. `updateExistingClaimForUser` must honor `recordLastSeen: false` on the update path, not only on insert.

**Regression tests:** `createAgentWitchInstallTokenForUser.test.ts`, `insertAgentWitchDeviceClaim.test.ts`, `revokePendingInstallDevicesForUser.test.ts`, `updateExistingClaimForUser.test.ts` (HOME-059).

---

## HOME-060 — Deleting a computer left the local install running

**Symptom:** Removing a computer in the Console set `revoked_at` and closed the socket. The Mac app kept the pairing token, retried, and stayed installed. Projects were not the only thing left behind; the helper and bridge kept their identity too.

**Root cause:** Delete never removed the `agent_witch_devices` row, and the computer client treated every `system.error` as ignorable. A revoked row is still a known identity, so the client had no signal to forget the connection.

**Fix:** Delete removes the row after cancelling in-flight runs and queued dispatch. Register and the live disconnect send `errorCode` `unknown_identity` only when the token hash is absent. Bundle 148 stops reconnecting and deletes connection files plus shipped app code. Projects, harness, reports, runs, rag, memory, and Ollama stay. Generic errors and revoked-but-present rows do not wipe.

**Regression tests:** `deleteAgentWitchDevice.test.ts`, `resolveAgentRegisterIdentityRejection.test.ts`, `disconnectAgentClientsForDevice.test.ts`, `forgetAgentWitchLocalConnection.test.ts`, `isUnknownAgentWitchIdentityError.test.ts` (HOME-060).

---

## HOME-065 — Ghost “Your Mac” while a real Mac is live

**Symptom:** **Grey - Check** (or another named Mac) was online and **this Mac** worked, but an offline **Your Mac** placeholder still appeared after repeated **Connect this computer** clicks.

**Root cause:** `revokePendingInstallDevicesForUser` (HOME-059) always kept the newest unlabeled placeholder so in-flight Connect flows had a claim row. That row stayed visible after the account already had a live agent connection.

**Fix:** On `GET /api/agent-witch/devices`, when the user has at least one **live** Mac (local hub socket or fresh registry on another instance), revoke **all** placeholders. Install-token still uses the HOME-059 path (keep newest) so a new claim is not deleted before pairing.

**Regression tests:** `revokePendingInstallDevicesForUser.test.ts`, devices route wiring (HOME-065).

---

## HOME-064 — Orphan install-token cookie vs live Grey - Check row

**Symptom:** **Grey - Check** was online but **Connect this computer** stayed visible; **Your Mac** was an offline placeholder. Cookie `agent_witch_local_token_hash` held an install-token claim hash not present under `~/.agent-witch/profiles`, while the live row used another local profile token. Wake `tokenHash` followed `active-profile.json` but the hub heartbeat used the connected profile.

**Root cause:** HOME-063 only remapped cookies across **on-disk** profile hashes and preferred **active** wake `tokenHash` when reachable. Orphan claims and active-vs-connected profile drift were unchanged.

**Fix:** `resolveSoleReachableLocalTokenHash` + wake identity resolution adopt the **only** reachable device hash that matches a local install token. AWB primary `tokenHash` prefers the profile with freshest non-stale `connection-health.json`. Install bundle **250**.

**Regression tests:** `resolveSoleReachableLocalTokenHash.test.ts`, `resolveLocalMacTokenHashFromWakeIdentity.test.ts`, `resolveConnectedProfileWakeIdentityPrimaryTokenHash.test.ts` (HOME-064).

---

## HOME-063 — Multi-profile Mac: wake `/identity` primary hash ≠ live agent

**Symptom:** Your Devices showed a live named Mac (e.g. **Grey - Check**, online, current bundle) plus offline **Your Mac** and **Connect this computer**, while AWL Status proved the WebSocket used the **active** profile (`active-profile.json`). AWB `/identity` still advertised another profile’s `tokenHash` when a legacy profile folder remained on disk.

**Root cause:** Wake `tokenHash` came from `readAgentWitchRunConfig()` without pinning `active-profile.json`. With two local pairing tokens, the browser cookie could match only the offline placeholder (HOME-062) even though the LaunchAgent heartbeated with the active profile hash.

**Fix:** `resolveAgentWitchWakeIdentityPrimaryTokenHash` sets wake `tokenHash` from `active-profile.json`. `listAgentWitchLaunchTargets` reports that email. AWC adopts the active wake hash when the cookie is another local profile and only the active hash matches a reachable device. Install bundle **249**.

**Regression tests:** `resolveAgentWitchWakeIdentityPrimaryTokenHash.test.ts`, `listAgentWitchLaunchTargets.test.ts`, `resolveLocalMacTokenHashFromWakeIdentity.test.ts`, `applyWakeIdentityToLocalMacTokenHash` via `useApplyWakeIdentityLocalTokenHash` (HOME-063).

---

## HOME-062 — Duplicate this computer: offline “Your Mac” badge + Connect this computer

**Symptom:** Your Devices showed a grey offline row and a separate **Your Mac** row with the **this Mac** badge, or **Connect this computer** / **This computer** alongside a badged offline placeholder, while the live install on the same machine was running.

**Root cause:** The **this Mac** badge and Connect-this-Mac hide logic used token-hash match only. A stale `agent_witch_local_token_hash` cookie could still match an old offline cloud row (generic **Your Mac**, no bundle version) while the live AWB install used a different hash (HOME-061 wake refresh not applied yet to badge gating).

**Fix:** Badge and “already linked” gating require a **reachable** device row (`live` / `recent` / bridge connected). Offline hash-only matches no longer get the badge; Connect this computer stays visible until a reachable row matches the browser hash (wake probe can then refresh the cookie).

**Regression tests:** `resolveHomeMacDeviceIsThisMac.test.ts`, `deviceMatchesReachableLocalTokenHash.test.ts`, `resolveShouldShowConnectThisMac.tokenIdentity.test.ts` (HOME-062).

---

## HOME-061 — this computer badge stuck on an offline “Your Mac” while another computer is Online

**Symptom:** Your Devices showed **MKX52CMWN7 Online · Version 157** and a separate **Your computer this computer Offline · Version unknown · latest 157**. The browser was on the live Mac; AWL reported `wsConnected: true` and AWB `/identity` on the runtime wake port returned the live install’s `tokenHash`.

**Root cause:**

1. Cookie `agent_witch_local_token_hash` still held an older claim hash that matched only a never-seen / offline placeholder row (generic **Your Mac**, `installBundleVersion` null). HOME-052 skipped wake probes whenever any local hash was set, so the cookie never refreshed.
2. `resolveLocalMacTokenHashFromWakeIdentity` kept that stale cookie even after wake identity listed a different sole hash.
3. `listAgentWitchDevicesForUser` omitted `wake_port`, so AWC never learned the runtime AWB port (e.g. `50199` when defaults `47892`/`47893` were free/unused) and could not re-probe identity on the live bridge.

**Fix:** Re-probe when the cookie hash does not match any live/recent device; adopt the sole wake `tokenHashes` entry when the cookie is absent from this computer; select and map `wake_port` on the devices API.

**Regression tests:** `resolveShouldProbeWakeIdentityInBrowser.test.ts`, `resolveLocalMacTokenHashFromWakeIdentity.test.ts`, `resolveLocalTokenHashMatchesReachableDevice.test.ts`, `listAgentWitchDevicesForUser.test.ts`, `mapAgentWitchDeviceRow.test.ts`, `useProbeLocalMacWakeIdentity.test.ts`, `useLocalMacHostname.test.ts` (HOME-061).

---

## HOME-064 — Empty onboarding column still reserved on Home

**Symptom:** After onboarding hints were hidden, Home still reserved a ~320px left column. The main welcome and projects panels sat in a narrow track beside a blank rail.

**Root cause:** `HomeOnboardingChecklist` and `HomeOnboardingAutomateNudge` return null when hidden (HOME-017), but the dashboard grid always used `xl:grid-cols-[minmax(17.5rem,20rem)_…]` and `xl:col-start-2` on the main column. An empty `<aside>` still occupied the first track.

**Fix:** Reserve the left rail only while the checklist or automate nudge should show, and only in dashboard mode. Otherwise the grid starts the main column in track 1. The prompt optimizer and showcases use the same layout so they stay aligned with that column.

**Regression tests:** `shouldShowHomeLeftRail.test.ts`, `resolveHomeDashboardLayoutClasses.test.ts`, `HomeAuthenticatedView.test.ts` (HOME-064).

---

## Adding issues

Use the next ID (`HOME-065`, …). Include symptom, root cause, fix paths, and test file.
