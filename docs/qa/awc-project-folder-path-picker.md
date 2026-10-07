# Can the user pick a local folder for the project path from AWC?

## Query aliases

- change project path from AWC click input select folder
- AWC folder picker native file dialog
- user co the thay doi duong dan project tu AWC bang cach click vao input va select folder tu local computer khong
- chọn folder project Agent Witch Cloud
- showDirectoryPicker project folder
- Folder path (optional, cannot be changed later)
- setup project path from local app
- click AWC open AWL folder picker
- AWC AWB choose folder without new tab
- co the setup tu local app duoc khong khi muon thay doi bam vao se mo local app
- AWC deep link 127.0.0.1:43347 projects choose folder
- Choose on this computer projects

## Short answer

**Not from AWC.** The browser cannot verify a real Mac POSIX path, and AWC no longer exposes a **Choose on this computer** control on Projects or Home. Set the optional folder when creating a project, or change folders in **Agent Witch Local (AWL)** on the computer that stores the repo. AWB still exposes `POST /projects/select-folder` for AWL and direct Mac flows.

## Details

### Why the browser cannot fill a real Mac path by clicking

A website cannot read the POSIX path of a folder the user selects in a file dialog. `input type="file"` / `webkitdirectory` and `showDirectoryPicker()` give a sandboxed handle, not `/Users/you/code/repo`.

### AWC (www.agentwitch.com / localhost:3000)

| Action                           | What happens                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| Open **Projects** (`/projects`)  | List, view details, create with optional typed folder path; edit composition in AWL |
| Create project → **Folder path** | Optional typed path; leaving it empty uses `buildDefaultProjectFolderPath`          |
| Browser `PATCH folderPath`       | Rejected; use AWL on the paired computer                                            |

### AWB (127.0.0.1:47892 / 47893)

| Action                         | What happens                                                                                                      |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `POST /projects/select-folder` | Runs Finder via `pickMacOsFolderDialog`, then `PATCH /api/agent-witch/projects/:projectId` on AWC                 |
| Cancel Finder                  | Returns `{ ok: false, cancelled: true }` — no cloud change                                                        |
| `POST /projects/link-folder`   | Typed path, no dialog: `{ projectId, folderPath, allowOutsideHome? }` → validate on this Mac, then the same PATCH |
| `GET /projects/folders`        | Folders linked on this Mac: `{ ok, summary, folders[] }` (plain-words `summary` per folder)                       |

### AWL (http://127.0.0.1:43347)

AWL exposes `/projects/select-folder` for choosing folders from the Mac app UI.

AWL also exposes `GET|POST /api/local/projects/folder` (same body/response as AWB `link-folder` / `folders`; POST refuses foreign browser Origins). `/api/status` includes `projectFolders`.

### Linking a folder (all three routes share `linkAgentWitchProjectFolder`)

1. Validate on the computer: path exists, is a readable directory, symlinks resolved (realpath is what gets saved), inside the user's home unless `allowOutsideHome: true` (the Finder picker always sets it), never the home folder itself. Git is reported (`isGitRepo`), not required.
2. `PATCH /api/agent-witch/projects/:projectId { folderPath }` (device auth) — sets `user_projects.folder_path` and binds the project to this computer (`device_id`), which the run-folder allowlist reads.
3. Create `<folder>/.agent-witch/` (project.json, rag, memory) and save the link in `<AWL profile dir>/linked-project-folders.json` for offline status.

Refusal codes: `project_id_invalid`, `folder_required`, `folder_not_absolute`, `folder_not_found`, `not_a_folder`, `folder_not_readable`, `folder_is_home`, `folder_outside_home` (400), `not_paired` (409), `cloud_update_failed` (502). Each comes with a plain-words `errorMessage` (AWB) / `message` (AWL).

## Related

- Composer: `src/features/agent/SendTaskComposerCreateProjectForm.tsx`
- AWB handler: `apps/bridge/features/awc-proxy/features/projects-proxy/internal/selectAgentWitchProjectFolderFromWakeServer.ts`
- Device-authenticated update: `src/app/api/agent-witch/projects/[projectId]/route.ts`
- Projects in AWL: [awc-awl-projects-source-of-truth.md](awc-awl-projects-source-of-truth.md)
- Deployables: [agent-witch-deployables.md](../product/agent-witch-deployables.md)

## Last reviewed

2026-10-08
