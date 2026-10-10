# FSA loop last run

- Units committed this run: 12 (95 completed in total)
- Units blocked this run: 11 (18 blocked in total)
- Dependency-cruiser baseline: 183 known violations before, 183 after (no new violations; baseline not regenerated)
- Stop reason: needs-human (fsa:next). The only pending unit is `src/features/agent/utils` (225 files, 117 importers, no sub-folders to split). No commit was made for it.
- Next unit: `src/features/agent/utils`. Group its files into sub-folders first, then run a round on each.
- Build: `npm run build` FAILS on main. Turbopack reports 2 errors: `src/features/dispatch/agentRunInputStore.ts` (imports `useEffect`/`useState`, no "use client") is reached from Server Components. Chains: `reports/utils/public-api/presentation.ts` -> `reports/AgentRunStatusBadge.tsx` -> `admin/groups/page.tsx`, and `dispatch/public-api/presentation.ts` -> `HomeLinkAccountGate` -> `(app)/page.tsx`. It is also pulled into the server route `local-self-dispatch` via `scripts/dispatch/probeLocalRunClis.ts`. Not fixed in this run; the likely fix is a `"use client"` directive or moving the store out of the server-reachable barrels. `tsc` and `fsa:deps` pass.

## Blocked units

- `src/features/home/constants`: importer HomeNotLinkedConnectBlock.tsx exceeds 100 effective lines (pre-existing), pre-commit architecture gate fails when it is edited
- `src/features/home/hooks`: same importer, HomeNotLinkedConnectBlock.tsx, over 100 lines
- `src/features/home/utils`: same importer, HomeNotLinkedConnectBlock.tsx, over 100 lines
- `src/features/home#root`: importer projects/AwcProjectsPanel.defaultRender.test.ts needs test helper homeProjectsPanelRenderTestSetup (not exportable); importers over 100-line limit
- `src/features/projects#root`: importers access/AwcProjectAccessMemberRow.tsx, AwcProjectAccessMemberTaskPulse.tsx over 100-line limit
- `src/features/projects/access/approvalCard`: outside test AwcProjectAccessPendingList.df036.render.test.ts imports test helper AwcPendingApprovalCard.fixtures
- `src/features/projects/access/inbox`: importer AwcProjectAccessMemberTaskPulse.tsx exceeds 100-line limit (pre-existing)
- `src/features/projects/access/invites#root`: importer useCreatedInviteBanner.ts over line limit
- `src/features/projects/access/invites`: importer useCreatedInviteBanner.ts over max-effective-lines (140)
- `src/features/projects/access/utils`: 5 importers not prettier-clean; the pre-commit reformat pushes them over 100 lines
- `src/features/projects/access/hooks`: outside importers need test helpers and vi.mock/source-read of private hook files
- `src/features/projects/hooks`: repointing AwcProjectNameEditor.tsx makes prettier wrap a line, pushing it over 100 lines
- `src/features/projects/messenger/hooks`: importer AwcProjectMessengerSection.tsx over 100 lines once formatted (pre-existing)
- `src/features/projects/messenger/utils`: touched importers exceed 100 lines after prettier
- `src/features/projects/messenger/types`: importers AwcMessengerAiSessionRow.tsx, useAwcProjectMessengerThread.ts, messengerChatStore.fixtures.ts over the line limit
- `src/features/projects/messenger/oneWindow`: importer AwcProjectMessengerSection.tsx over 100 lines
- `src/features/projects/tasks`: importers AwcMessengerAiSessionRow.tsx, AwcProjectMessengerSection.tsx over the line limit
- `src/features/agent/hooks`: 81 outside importer files (limit 80), incl. test files and test helper homeProjectsPanelRenderTestSetup
