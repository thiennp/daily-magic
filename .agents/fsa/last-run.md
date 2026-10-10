# FSA loop last run

- Units committed: 83
- Units blocked: 9
- Dependency-cruiser baseline: 183 known violations before, 183 after (no new violations; baseline not regenerated)
- Stop reason: needs-human (fsa:next)
- Next unit: `src/features/admin#root` has 6 loose files / 32 importers; group them into a sub-folder first. 18 units still pending.
- Build: `npm run build` was failing on main (hook module reached server route via reports/utils public-api presentation barrel); fixed by exposing purgeLocalAgentTasksForRevokedDevice from reports/utils/public-api/infrastructure.ts (re-export only). Build and tsc now pass.

## Blocked units

- `src/features/home/constants`: importer HomeNotLinkedConnectBlock.tsx exceeds 100 effective lines (pre-existing), pre-commit architecture gate fails when it is edited
- `src/features/projects/access/approvalCard`: outside test AwcProjectAccessPendingList.df036.render.test.ts imports test helper AwcPendingApprovalCard.fixtures
- `src/features/projects/access/humanInvites/types`: 45 outside importers exceeds the 25 limit
- `src/features/projects/messenger/hooks`: importer AwcProjectMessengerSection.tsx exceeds 100 effective lines once prettier-formatted (pre-existing)
- `src/features/projects/access/inbox`: outside importer AwcProjectAccessMemberTaskPulse.tsx exceeds 100-line architecture limit (pre-existing); pre-commit rejects touching it
- `src/features/projects/access/invites#root`: importer useCreatedInviteBanner.ts over architecture line limit
- `src/features/projects/tasks/utils`: 29 outside importers exceeds limit of 25
- `src/features/projects/hooks`: repointing AwcProjectNameEditor.tsx makes prettier wrap a line, pushing it over the 100 effective-line architecture limit
- `src/features/projects/messenger/utils`: touched importers exceed 100-line architecture limit after prettier (useAwcProjectMessengerThread, AwcProjectMessengerSection, AwcMessengerAiSessionRow, oneWindow tests)
