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

## Short answer

**Yes.** Open **Projects** in AWC and click **Choose on this Mac**. AWC calls **AWB** (loopback wake server on `127.0.0.1:47892` / `47893`) in the **same browser tab**; AWB runs the native Finder picker and updates the cloud project with the device pairing token. The project list refreshes when the picker finishes. The browser still cannot write an arbitrary replacement path through its regular project API.

## Details

### Why the browser cannot fill a real Mac path by clicking

A website cannot read the POSIX path of a folder the user selects in a file dialog. `input type="file"` / `webkitdirectory` and `showDirectoryPicker()` give a sandboxed handle, not `/Users/you/code/repo`. AWC therefore calls **AWB** on the same Mac, which runs `osascript` `choose folder` and securely submits the selected path to the cloud API.

### AWC (www.agentwitch.com / localhost:3000)

| Action                           | What happens                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| Open **Projects**                | Dedicated AWC management route at `/projects`, available in desktop and mobile navigation |
| Create project → **Folder path** | Optional typed path; leaving it empty uses `buildDefaultProjectFolderPath`                |
| **Choose on this Mac**           | `POST` to AWB `/projects/select-folder` with `{ projectId }` (CORS + private network)     |
| After picker                     | AWC refreshes the project list in the same tab                                            |
| Browser `PATCH folderPath`       | Rejected; users must use the paired Mac picker                                            |

### AWB (127.0.0.1:47892 / 47893)

| Action                         | What happens                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| `POST /projects/select-folder` | Runs Finder via `pickMacOsFolderDialog`, then `PATCH /api/agent-witch/projects/:projectId` on AWC |
| Cancel Finder                  | Returns `{ ok: false, cancelled: true }` — no cloud change                                        |

### AWL (local.agentwitch.com:43347)

AWL still exposes `/projects/select-folder` for direct Mac app links; **AWC no longer opens a new tab** to AWL for the default Projects UI flow.

## Related

- Composer: `src/features/agent/SendTaskComposerCreateProjectForm.tsx`
- AWC client: `src/lib/projects/requestSelectProjectFolderOnWakeServer.ts`
- AWB handler: `apps/bridge/features/awc-proxy/features/projects-proxy/internal/selectAgentWitchProjectFolderFromWakeServer.ts`
- Device-authenticated update: `src/app/api/agent-witch/projects/[projectId]/route.ts`
- Deployables: [agent-witch-deployables.md](../product/agent-witch-deployables.md)

## Last reviewed

2026-09-17
