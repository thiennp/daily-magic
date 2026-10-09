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
`list_project_skills` takes optional `kind`, `query` and `limit`. With `query` or `limit` it returns compact rows `{skillId, name, description, tags}` (best 3, max 10) plus `total`, matched on word prefixes of name, tags, description and id (two or more query words must match two of them); without them it returns every skill as before. Tags are the `keywords:` / `tags:` front matter keys of the saved body (column `project_skills.tags`, backfilled for older rows). MCP calls to `list_project_skills` and `get_project_skill` are logged as metadata only in `project_skill_lookup_log` (migration 132); the UI does not log.
Definitions: `src/lib/agentAccess/agentAccessProjectSkillShareToolCatalog.constant.ts`. Executor: `executeProjectSkillShareTool` (public-api/infrastructure), injected by `src/app/api/agent-access/{mcp,invoke}/route.ts` through `featureToolExecutors` (src/lib may not import features). `awc_proj_` keys are allowlisted and pinned to their projectId by `guardProjectApiKeyToolUse`.

## Session APIs (Project Access panel)

- `GET /api/projects/:projectId/skills` — list
- `POST /api/projects/:projectId/skills` — publish / save draft / promote draft (no body)
- `GET /api/projects/:projectId/skills/:skillId?version=N` — get with body
- `POST /api/projects/:projectId/skills/:skillId/revoke`

## Function rows

| Layer              | Function                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Role                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| orchestrator       | `publishProjectSkill`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | resolve → store/promote → prune → mirror         |
| orchestrator       | `listProjectSkills`, `getProjectSkill`, `revokeProjectSkill`                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | MCP + REST                                       |
| orchestrator       | `pullPublishedProjectSkillsToMirror(projectId)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | AWL tick pull: list AWC + locals → skip          | fetch_write | remove via History |
| orchestrator       | `rehomeProjectSkillsToCloud(projectId)`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | History OFF toggle: verify/restore, `purgeReady` |
| orchestrator steps | `resolvePublishProjectSkillTarget`, `storeProjectSkillVersion`, `promoteLatestProjectSkillDraft`, `pruneProjectSkillVersions`, `resolveProjectSkillMemberRole`, `rehomeOneProjectSkillToCloud`                                                                                                                                                                                                                                                                                                                                     | one step each                                    |
| core (pure)        | `decideProjectSkillPublishAccess`, `decideProjectSkillRevokeAccess`, `canViewProjectSkill`, `decideProjectSkillPublishTransition`, `selectProjectSkillVersionsToPrune`, `resolveProjectSkillReadVersion`, `decideProjectSkillRehomeAction`, `validateProjectSkillBody`, `computeProjectSkillContentHash`, `measureProjectSkillBodyBytes`, `isValidProjectSkillId`, `deriveProjectSkillIdFromName`, `formatProjectSkillVersionFileName`, `buildProjectSkillAwlRelativeDir`, `toProjectSkillView`, `mapProjectSkillShareErrorStatus` | rules                                            |
| guardz             | `isPublishProjectSkillArgs`, `isProjectSkillRefArgs`, `isListProjectSkillsArgs`, `isProjectSkillViewPayload`                                                                                                                                                                                                                                                                                                                                                                                                                       | boundary payloads                                |
| db                 | `ensureProjectSkillShareSchema`, `selectProjectSkillRow(s)`, `selectProjectSkillVersionRow`, `selectProjectSkillVersionNumbers`, `insertProjectSkillVersionWithSkill` (atomic CTE + optimistic lock), `promoteProjectSkillDraftVersion`, `deleteProjectSkillVersionRows`, `updateProjectSkillRevoked`, `upsertProjectSkillVersionBody`, `resolveProjectSkillActorRole`                                                                                                                                                             | Neon                                             |
| History adapters   | `resolveProjectDataDir`, `writeProjectSkillVersion`, `readProjectSkillVersion`, `tombstoneProjectSkill`, `readProjectSkillTombstone`, `listProjectSkillIds`, `isProjectHistoryEnabled`, `mirrorProjectSkillVersionToAwl`, `pullPublishedProjectSkillsToMirror`                                                                                                                                                                                                                                                                     | call the History port; never write files         |
| mcp                | `executeProjectSkillShareTool`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | tool name → orchestrator                         |
| presentation       | `ProjectSkillsSection`, `ProjectSkillRow`, `ProjectSkillPublishForm`, `useProjectSkills`, `fetchProjectSkills`, `postProjectSkillMutation`                                                                                                                                                                                                                                                                                                                                                                                         | Project Access → Skills                          |

## ACL (DF-040)

One check, `decideProjectSkillPublishAccess` (used by `resolvePublishProjectSkillTarget`, so server fn, HTTP `POST /api/projects/:projectId/skills` and MCP `publish_project_skill` share it):

| Role   | Save draft (`asDraft: true` + body)                                                                                       | Publish / promote                                                            | Revoke          | See drafts |
| ------ | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------- | ---------- |
| owner  | yes                                                                                                                       | yes                                                                          | yes             | yes        |
| member | yes — on others' skills only a new draft version; live row (state, published version/hash, name, kind, revoked) untouched | own skills only (new, or ones they published); others' → forbidden + message | own skills only | yes        |
| viewer | no                                                                                                                        | no                                                                           | no              | no         |

The draft author is `project_skill_versions.created_by_user_id`; list views carry `latestAuthorName` and `canPublish`.

## Playbooks (kind)

A **project playbook** is a project skill with `kind: "playbook"` (migration `110-project-skill-kind.sql`, default `'skill'`). Same table, draft → published → revoked lifecycle, ACL (owner publishes/revokes; a member publishes/revokes their own; owner | member | viewer read published), 64KB body cap, contentHash and 20-version limit. `list_project_skills` / `GET /api/projects/:projectId/skills?kind=playbook` filter by kind; every view carries `kind`. Omitting `kind` on publish keeps an existing row's kind (new rows: `skill`). UI: Resources → "Skills & playbooks" (Add playbook, Skill | Playbook toggle, Playbook badge, Revoke) and Library → "Add playbook" / New → Playbook. Seed: `111-project-playbook-agentwitch-seed.sql` (AgentWitch project, "How the AgentWitch team ships").

### History skill-gen seam (Tasks / History → project skill or playbook)

Same call for both; only `kind` differs. Server (in-process):

```ts
import { publishProjectSkill } from "@/features/project-skill-share/public-api/infrastructure";
await publishProjectSkill({
  actorUserId, // project owner
  args: { projectId, name, description?, body, kind: "skill" | "playbook", asDraft?: true },
});
```

MCP: `publish_project_skill { projectId, name, body, kind, asDraft? }`. HTTP (session): `POST /api/projects/:projectId/skills` with the same JSON. Generated output should land as `asDraft: true` so the owner reviews then publishes (publish without body promotes the latest draft). AWL pull meta (`/api/agent-witch/projects/:id/skills/published`) carries `kind`; the mirror layout is unchanged (`skills/<skillId>/`).

## History port (stub until AW History ships)

**Arch note:** the port stays a stub until AW History lands real `resolveProjectDataDir`, `writeProjectSkillVersion`, `readProjectSkillVersion`. The default port reports History OFF, so there is no mirror yet. AWC MCP cannot write Mac profile dirs — the real port must come from History/AWL (see `KNOWN_ISSUES.md` SKILL-001/002).

`ProjectSkillHistoryPort` (`internal/infrastructure/history/projectSkillHistoryPort.type.ts`): `isHistoryEnabled`, `resolveProjectDataDir(projectId)`, `writeProjectSkillVersion({ projectId, skillId, version, body }) → { path, contentHash }`, `readProjectSkillVersion({ projectId, skillId, version }) → { body, contentHash } | null`, `tombstoneProjectSkill({ projectId, skillId, lastContentHash, revokedAt? }) → { removed }`, `readProjectSkillTombstone({ projectId, skillId }) → record | null`, `listProjectSkillIds({ projectId }) → { skillId, contentHash }[]`. Orchestrators take `deps.history`; the default `PROJECT_SKILL_HISTORY_STUB_PORT` reports History OFF, so AWC is the only copy and nothing is mirrored. Read adapter treats a hash mismatch as missing; write adapter rejects a History hash that differs from ours. No `removeProjectSkillVersion`.

## Dependencies

- `auth`
- `agent-access`
- projects ACL (`src/lib/projects/acl`: `getActiveProjectMembership`, `getUserProjectById`)

Query: `npm run feature-knowledge:query -- "..." --feature=project-skill-share`
