# Project skill share

Project owners and active members share playbooks/skills inside one project (**AWC**). States: **draft → published → revoked**. Members list and get **published** skills; drafts are visible only to their publisher and the project owner.

## Registry

- **Slug:** `project-skill-share`
- **Feature path:** `src/features/project-skill-share` (FSA, ADR 0007)
- **Lib path:** none (catalog + allowlist entries live in `src/lib/agentAccess` and `src/lib/projects/acl/projectApiKeys` because `src/lib` lists every MCP tool)
- **Migration:** `db/migrations/058-project-skill-share.sql` (055–057 reserved for claim / delete-on-read / knowledge-change) (runtime `ensureProjectSkillShareSchema` mirrors it)

## Rules (locked by Lead + History)

| Rule     | Value                                                                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Publish  | New skill: owner or active member. Existing skill: its publisher or owner.                                                                                   |
| Revoke   | Publisher (while active) or owner. Idempotent.                                                                                                               |
| List/get | Owner or active member. Published for everyone; drafts for publisher/owner; revoked hidden.                                                                  |
| Body cap | ≤ 64KB UTF-8 per version, stored verbatim                                                                                                                    |
| Versions | ≤ 20 per skill; oldest dropped on publish overflow, never the live published version                                                                         |
| Hash     | `sha256:` + lowercase hex of the exact UTF-8 body bytes                                                                                                      |
| skillId  | Lowercase slug `[a-z0-9][a-z0-9_-]{0,63}` — never `_`-prefixed                                                                                               |
| Storage  | AWC always stores body + meta + contentHash (History ON or OFF)                                                                                              |
| History  | ON: also mirror published versions to AWL `project-data/<projectId>/skills/<skillId>/vNNNN.md` + `meta.json` via History helpers; mirror hash must equal AWC |

## MCP tools (agent-access Bearer or `awc_proj_`)

`publish_project_skill`, `list_project_skills`, `get_project_skill`, `revoke_project_skill`.
Definitions: `src/lib/agentAccess/agentAccessProjectSkillShareToolCatalog.constant.ts`. Executor: `executeProjectSkillShareTool` (public-api/infrastructure), injected by `src/app/api/agent-access/{mcp,invoke}/route.ts` through `featureToolExecutors` (src/lib may not import features). `awc_proj_` keys are allowlisted and pinned to their projectId by `guardProjectApiKeyToolUse`.

## Session APIs (Project Access panel)

- `GET /api/projects/:projectId/skills` — list
- `POST /api/projects/:projectId/skills` — publish / save draft / promote draft (no body)
- `GET /api/projects/:projectId/skills/:skillId?version=N` — get with body
- `POST /api/projects/:projectId/skills/:skillId/revoke`

## Function rows

| Layer              | Function                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Role                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| orchestrator       | `publishProjectSkill`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | resolve → store/promote → prune → mirror                   |
| orchestrator       | `listProjectSkills`, `getProjectSkill`, `revokeProjectSkill`                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | MCP + REST                                                 |
| orchestrator       | `pullPublishedProjectSkillsToMirror(projectId)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | AWL tick pull: list AWC + locals → skip|fetch_write|remove via History |
| orchestrator       | `rehomeProjectSkillsToCloud(projectId)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | History OFF toggle: verify/restore, `purgeReady`           |
| orchestrator steps | `resolvePublishProjectSkillTarget`, `storeProjectSkillVersion`, `promoteLatestProjectSkillDraft`, `pruneProjectSkillVersions`, `resolveProjectSkillMemberRole`, `rehomeOneProjectSkillToCloud`                                                                                                                                                                                                                                                                                                                                     | one step each                                              |
| core (pure)        | `decideProjectSkillPublishAccess`, `decideProjectSkillRevokeAccess`, `canViewProjectSkill`, `decideProjectSkillPublishTransition`, `selectProjectSkillVersionsToPrune`, `resolveProjectSkillReadVersion`, `decideProjectSkillRehomeAction`, `validateProjectSkillBody`, `computeProjectSkillContentHash`, `measureProjectSkillBodyBytes`, `isValidProjectSkillId`, `deriveProjectSkillIdFromName`, `formatProjectSkillVersionFileName`, `buildProjectSkillAwlRelativeDir`, `toProjectSkillView`, `mapProjectSkillShareErrorStatus` | rules                                                      |
| guardz             | `isPublishProjectSkillArgs`, `isProjectSkillRefArgs`, `isListProjectSkillsArgs`, `isProjectSkillViewPayload`                                                                                                                                                                                                                                                                                                                                                                                                                       | boundary payloads                                          |
| db                 | `ensureProjectSkillShareSchema`, `selectProjectSkillRow(s)`, `selectProjectSkillVersionRow`, `selectProjectSkillVersionNumbers`, `insertProjectSkillVersionWithSkill` (atomic CTE + optimistic lock), `promoteProjectSkillDraftVersion`, `deleteProjectSkillVersionRows`, `updateProjectSkillRevoked`, `upsertProjectSkillVersionBody`, `resolveProjectSkillActorRole`                                                                                                                                                             | Neon                                                       |
| History adapters   | `resolveProjectDataDir`, `writeProjectSkillVersion`, `readProjectSkillVersion`, `tombstoneProjectSkill`, `readProjectSkillTombstone`, `listProjectSkillIds`, `isProjectHistoryEnabled`, `mirrorProjectSkillVersionToAwl`, `pullPublishedProjectSkillsToMirror`                                                                                                                                                                                                                                                                                                                                                  | call the History port; never write files                   |
| mcp                | `executeProjectSkillShareTool`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | tool name → orchestrator                                   |
| presentation       | `ProjectSkillsSection`, `ProjectSkillRow`, `ProjectSkillPublishForm`, `useProjectSkills`, `fetchProjectSkills`, `postProjectSkillMutation`                                                                                                                                                                                                                                                                                                                                                                                         | Project Access → Skills                                    |

## History port (stub until AW History ships)

**Arch note:** the port stays a stub until AW History lands real `resolveProjectDataDir`, `writeProjectSkillVersion`, `readProjectSkillVersion`. The default port reports History OFF, so there is no mirror yet. AWC MCP cannot write Mac profile dirs — the real port must come from History/AWL (see `KNOWN_ISSUES.md` SKILL-001/002).

`ProjectSkillHistoryPort` (`internal/infrastructure/history/projectSkillHistoryPort.type.ts`): `isHistoryEnabled`, `resolveProjectDataDir(projectId)`, `writeProjectSkillVersion({ projectId, skillId, version, body }) → { path, contentHash }`, `readProjectSkillVersion({ projectId, skillId, version }) → { body, contentHash } | null`, `tombstoneProjectSkill({ projectId, skillId, lastContentHash, revokedAt? }) → { removed }`, `readProjectSkillTombstone({ projectId, skillId }) → record | null`, `listProjectSkillIds({ projectId }) → { skillId, contentHash }[]`. Orchestrators take `deps.history`; the default `PROJECT_SKILL_HISTORY_STUB_PORT` reports History OFF, so AWC is the only copy and nothing is mirrored. Read adapter treats a hash mismatch as missing; write adapter rejects a History hash that differs from ours. No `removeProjectSkillVersion`.

## Dependencies

- `auth`
- `agent-access`
- projects ACL (`src/lib/projects/acl`: `getActiveProjectMembership`, `getUserProjectById`)

Query: `npm run feature-knowledge:query -- "..." --feature=project-skill-share`
