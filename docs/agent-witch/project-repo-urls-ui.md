# Project repo URL UI — bind to eng API

**Branch:** `feat/aw-project-repo-url-ui` (based on `feat/aw-project-repo-urls-api` @ 887e97b3)  
**Locked contract:** NRG AgentWitch (Lead default 2026-10-02)  
**Eng API:** draft PR #223 — create/update/GET + `get_project_acl`  
**Confirm-before-main.** Push only; no merge; no Product PR auto-create.

## Contract (v1)

```ts
repoUrls: string[]           // 0..n, max 20; HTTPS or SSH git; no embedded credentials
defaultBranch: string | null // project-level
```

| Action | Who |
|--|--|
| Read | owner ∪ active member (`get_project_acl` relation) |
| Write | owner only |
| Non-member | hide UI entirely (eng 403/omit) |

## What this branch ships

- Create form: multi URL inputs (add/remove, max 20) + optional defaultBranch → POST `/api/projects`
- Detail: owner edit via PATCH; member read-only when `isActiveMember`; non-member hidden
- Client validation: eng `src/lib/projects/validateProjectRepoUrls.ts` (`ProjectRepoMetadata`, validators)
- DTO: eng `UserProjectRecord.repoUrls` / `defaultBranch` (required on mapped rows)
- Folder refs UI unchanged (complementary)

## AuthZ display

`canViewProjectRepoUrls({ isOwner, isActiveMember })` — role gate only (eng always maps fields on authorized rows).
