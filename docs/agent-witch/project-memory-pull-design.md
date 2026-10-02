# Design: scoped project-memory pull (MCP)

**Status:** design only — **do not implement** until confirm-before-main (security-sensitive: owner Mac project store).

## Goal

Let an **active project member** agent pull a **scoped** slice of project memory from the **owner/main Mac project store** — not a full account dump — via MCP.

## What exists today

1. **Per-project folder meta** under the Mac project root: `.agent-witch/` (`AGENT_WITCH_PROJECT_META_DIR_NAME`), including `memory/` (`AGENT_WITCH_PROJECT_MEMORY_DIR_NAME`) and `runs.ndjson` (`AGENT_WITCH_PROJECT_MEMORY_RUNS_FILE_NAME`), plus `rag/` chunks.
2. **Install-scoped knowledge** (ADR 0008 direction): `~/.agent-witch/projects/<projectId>/knowledge/` keyed by `projectId` (not folder path).
3. **Harness files** at `~/.agent-witch/harness/` (playbook install surface) — instructions, not a shared memory bus.
4. **AWC ACL** stores name / folder refs / members / audit only — **no** memory bodies as a cloud bus (`PROJECT_PEER_SYNC_GUIDELINE`).

## Proposed MCP (future)

| Tool | Purpose |
|------|---------|
| `list_project_memory` | List allowlisted relative paths under the project memory root for `projectId` (names + sizes + mtimes only). |
| `get_project_memory` | Read one allowlisted path’s contents (size-capped) after ACL. |

### AuthZ / scope

- Caller must pass **active membership** (or owner) with an explicit scope e.g. `project:memory:read` (new) — default members do **not** get it until owner grants.
- Resolve Mac store via project folder ref / paired owner device only; refuse if no live Mac / no folder ref.
- **Path allowlist:** only under `<projectFolder>/.agent-witch/memory/**` and optionally `~/.agent-witch/projects/<sameProjectId>/knowledge/**`. Reject absolute paths, `..`, symlinks escaping the root, and cross-`projectId` prefixes.

### Non-goals (v1)

- No write/delete/mutate of Mac memory.
- No full `~/.agent-witch/profiles/**` dump.
- No harness, tokens, `config.json`, reports with secrets, or other projects’ stores.

## Threats

1. **Path traversal** — `../`, encoded separators, symlink escape → mandatory realpath-under-root check.
2. **Secrets in repo / memory** — API keys in `runs.ndjson` or rag chunks → size caps, content redaction hooks, owner-granted scope only.
3. **Cross-project** — forged `projectId` vs path prefix → bind resolved root to ACL `projectId` before read.
4. **Confused deputy via bridge** — Mac bridge must enforce the same allowlist; cloud must not ask for arbitrary paths.
5. **Exfil via listing** — list returns names only; no recursive dump of unrelated profile trees.

## Recommendation (5 bullets for Lead)

1. **Ship ACL briefing first** (`get_project_briefing`) without any Mac memory read.
2. **Add `project:memory:read` scope** opt-in on Approve — default off for first connect.
3. **Implement list/get with realpath allowlist** under project `.agent-witch/memory` (+ optional projectId knowledge dir) only; hard size/time caps.
4. **Confirm-before-main** on any PR that touches Mac store read or bridge path resolution.
5. **Threat-model review** (path traversal, secrets, cross-project) before merge; no “convenient” profile-wide fallbacks.

