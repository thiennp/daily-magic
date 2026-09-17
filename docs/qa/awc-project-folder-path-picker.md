# Can the user pick a local folder for the project path from AWC?

## Query aliases

- change project path from AWC click input select folder
- AWC folder picker native file dialog
- user co the thay doi duong dan project tu AWC bang cach click vao input va select folder tu local computer khong
- chọn folder project Agent Witch Console
- showDirectoryPicker project folder
- Folder path (optional, cannot be changed later)
- setup project path from local app
- click AWC open AWL folder picker
- AWC AWB choose folder without new tab
- co the setup tu local app duoc khong khi muon thay doi bam vao se mo local app
- AWC deep link local.agentwitch.com projects choose folder
- Choose on this Mac projects

## Short answer

**Not from AWC.** The browser cannot verify a real Mac POSIX path, and AWC no longer exposes a **Choose on this Mac** control on Projects or Home. Set the optional folder when creating a project, or change folders in **Agent Witch Live (AWL)** on the Mac that stores the repo. AWB still exposes `POST /projects/select-folder` for AWL and direct Mac flows.

## Details

### Why the browser cannot fill a real Mac path by clicking

A website cannot read the POSIX path of a folder the user selects in a file dialog. `input type="file"` / `webkitdirectory` and `showDirectoryPicker()` give a sandboxed handle, not `/Users/you/code/repo`.

### AWC (www.agentwitch.com / localhost:3000)

| Action                           | What happens                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| Open **Projects** (`/projects`)  | List, view details, create with optional typed folder path; edit composition in AWL |
| Create project → **Folder path** | Optional typed path; leaving it empty uses `buildDefaultProjectFolderPath`          |
| Browser `PATCH folderPath`       | Rejected; use AWL on the paired Mac                                                 |

### AWB (127.0.0.1:47892 / 47893)

| Action                         | What happens                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| `POST /projects/select-folder` | Runs Finder via `pickMacOsFolderDialog`, then `PATCH /api/agent-witch/projects/:projectId` on AWC |
| Cancel Finder                  | Returns `{ ok: false, cancelled: true }` — no cloud change                                        |

### AWL (local.agentwitch.com:43347)

AWL exposes `/projects/select-folder` for choosing folders from the Mac app UI.

## Related

- Composer: `src/features/agent/SendTaskComposerCreateProjectForm.tsx`
- AWB handler: `apps/bridge/features/awc-proxy/features/projects-proxy/internal/selectAgentWitchProjectFolderFromWakeServer.ts`
- Device-authenticated update: `src/app/api/agent-witch/projects/[projectId]/route.ts`
- Projects in AWL: [awc-awl-projects-source-of-truth.md](awc-awl-projects-source-of-truth.md)
- Deployables: [agent-witch-deployables.md](../product/agent-witch-deployables.md)

## Last reviewed

2026-09-17
