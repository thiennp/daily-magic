# Where is project metadata stored (AWC vs AWL)?

## Query aliases

- AWC AWL share projects database
- projects-registry.json
- local project registry Mac only
- reconcile project info AWC db

## Short answer

**Project name, folder path, and Mac binding** live in the **AWC database** (`user_projects` in Neon). **AWL** loads that list over the device API when you open `/projects` — it no longer mirrors rows into `~/.agent-witch/harness/projects-registry.json`.

On disk under each repo, **`.agent-witch/`** (and linked `.cursor` harness files) holds **code-local** artifacts: harness links, RAG chunks, memory runs, reports — not the account project catalog.

## Details

| Concern                         | Location                                                                            |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| Create / rename project         | AWC `/projects` (session auth → `/api/projects`)                                    |
| Rename UI                       | AWC project detail or card menu → `/projects/:id?rename=1` (autofocus)              |
| Delete project (Neon only)      | AWC card menu or detail danger zone → `DELETE /api/projects/:id`                    |
| Delete from AWL                 | AWL list or project page → `DELETE /api/agent-witch/projects/:id` (Mac folder kept) |
| Choose folder on Mac            | AWL folder picker → `PATCH /api/agent-witch/projects/:id`                           |
| AWL project list                | `GET /api/agent-witch/projects` (pairing token), in memory per request              |
| Harness / RAG / memory per repo | `<repo>/.agent-witch/` on the Mac                                                   |

Create projects in the browser first; AWL only maps cloud projects to folders and manages repo-local harness. **Deleting** removes the `user_projects` row (and related cloud bindings) only — it does not delete the repo directory on disk. The **Default** project cannot be deleted.

### One-time migration

If `~/.agent-witch/harness/projects-registry.json` still exists from older installs, AWL migrates **Mac-only** rows into `user_projects` the first time projects load (device `POST /api/agent-witch/projects`), then renames the file to `projects-registry.json.migrated`.

## Related

- [awc-project-folder-path-picker.md](awc-project-folder-path-picker.md)
- `apps/live/features/projects/internal/core/fetchAgentWitchProjectsForLocalApp.ts`

## Last reviewed

2026-10-01
