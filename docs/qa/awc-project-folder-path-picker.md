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
- co the setup tu local app duoc khong khi muon thay doi bam vao se mo local app
- AWC deep link local.agentwitch.com projects choose folder

## Short answer

**Yes.** Open **Projects** in AWC and click **Choose on this Mac** for a project. AWC opens **AWL** on the same Mac; AWL shows the native Finder folder picker, then uses that Mac’s pairing token to update and rebind the cloud project. Returning to AWC refreshes the project list. The browser still cannot write an arbitrary replacement path through its regular project API.

## Details

### Why the browser cannot fill a real Mac path by clicking

A website cannot read the POSIX path of a folder the user selects in a file dialog. `input type="file"` / `webkitdirectory` and `showDirectoryPicker()` give a sandboxed handle, not `/Users/you/code/repo`. AWC therefore opens AWL, where the installed Mac process can run the native picker and securely submit the selected path.

### AWC (www.agentwitch.com / localhost:3000)

| Action                           | What happens                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| Open **Projects**                | Dedicated AWC management route at `/projects`, available in desktop and mobile navigation |
| Create project → **Folder path** | Optional typed path; leaving it empty uses `buildDefaultProjectFolderPath`                |
| **Choose on this Mac**           | Opens `http://127.0.0.1:43347/projects/select-folder?projectId=…` in a new tab            |
| Return to AWC                    | Window focus refreshes the project list                                                   |
| Browser `PATCH folderPath`       | Rejected; users must use the paired local picker                                          |

### AWL (local.agentwitch.com:43347)

| Action                  | What happens                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Select-folder deep link | AWL runs `osascript` `choose folder` and ensures the selected project directory exists                                               |
| Save cloud path         | AWL calls device-authenticated `PATCH /api/agent-witch/projects/:projectId`                                                          |
| Bind project            | The endpoint verifies the pairing token, owns the project by the device user, updates `folderPath`, and binds `deviceId` to that Mac |
| Refresh project list    | AWL reloads projects from the AWC database and opens the updated project detail                                                      |

AGENT-021 still holds: AWC **navigates** the user to AWL but never fetches AWL from the public website.

## Related

- Composer: `src/features/agent/SendTaskComposerCreateProjectForm.tsx`
- Device-authenticated update: `src/app/api/agent-witch/projects/[projectId]/route.ts`
- Mac picker: `apps/live/features/projects/internal/core/pickMacOsFolderDialog.ts`
- Deployables: [agent-witch-deployables.md](../product/agent-witch-deployables.md)

## Last reviewed

2026-09-17
