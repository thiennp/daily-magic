# Project repo URL(s) — locked contract (v1)

**Status:** LOCKED for Product bind (Lead default 2026-10-02)  
**Confirm-before-main.** Eng: API/migration/agent tools. Product: create/edit/display UI.

## Schema (API / agent JSON)

```ts
type ProjectRepoMetadata = {
  /** 0..n remote git sources. Empty = none. */
  repoUrls: string[];
  /** Optional default branch for clone/pull hints. Project-level in v1. */
  defaultBranch: string | null;
};
```

### Validation
- Each `repoUrls[i]`: trimmed non-empty; must match HTTPS git (`https://…`) or SSH (`git@host:path` / `ssh://…`).
- Reject URLs with embedded credentials (`user:pass@`, `?token=`, etc.).
- Dedupe case-sensitively after trim; preserve order.
- `defaultBranch`: `null` or non-empty trimmed string (no spaces-only); max 200 chars.
- Max `repoUrls` length: **20**.

### AuthZ
| Action | Who |
|--|--|
| Read `repoUrls` / `defaultBranch` | Project **owner** ∪ **active member** |
| Write (create/update) | **Owner** only (v1; no editor role yet) |
| Non-member / pending / revoked | omit fields or 404/403 — same as other ACL metadata |

## HTTP payloads

- Create POST (device `/api/agent-witch/projects` + web `/api/projects`): optional `repoUrls`, `defaultBranch` (omit → `[]` / `null`)
- Owner update PATCH: same fields (`[]` / `null` clears)
- GET project (authorized): include both on project object
- Agent: fold into `get_project_acl` (no separate write tool v1)

## UI (Product) — `feat/aw-project-repo-url-ui`
See `docs/agent-witch/project-repo-urls-ui.md`.
