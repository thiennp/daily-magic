# Can the user pick a local folder for the project path from AWC?

## Query aliases

- change project path from AWC click input select folder
- AWC folder picker native file dialog
- user co the thay doi duong dan project tu AWC bang cach click vao input va select folder tu local computer khong
- chọn folder project Agent Witch Console
- showDirectoryPicker project folder
- Folder path (optional, cannot be changed later)

## Short answer

**No.** In **AWC** (the cloud console in the browser), the project folder field is a **text input**. Clicking it does **not** open a native “Choose folder” dialog on the Mac. The user types or pastes an absolute path (or leaves it empty for the default under `~/.agent-witch/profiles/<email>/projects/…`). After create, that path is **immutable**. The macOS folder picker lives in **AWL**, not AWC.

## Details

### Why the browser cannot fill a real Mac path by clicking

A website cannot read the POSIX path of a folder the user selects in a file dialog. `input type="file"` / `webkitdirectory` and `showDirectoryPicker()` give a sandboxed handle, not `/Users/you/code/repo`. AWC therefore stores whatever string the user types.

### AWC (www.agentwitch.com / localhost:3000)

| Action                           | What happens                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------- |
| Create project → **Folder path** | Optional `type="text"`; placeholder is the default profile path                 |
| Click the input                  | Focus + type; **no** OS folder dialog                                           |
| Leave empty                      | Server uses `buildDefaultProjectFolderPath`                                     |
| Update later                     | API rejects `folderPath` (`folder_immutable`); UI copy: cannot be changed later |

### AWL (local.agentwitch.com:43347)

| Action                             | What happens                                                           |
| ---------------------------------- | ---------------------------------------------------------------------- |
| Add project (`POST /projects/add`) | **AWI/AWL** runs `osascript` `choose folder` and stores the POSIX path |
| Harness scan folder                | `POST /api/harness/pick-folder` uses the same Mac dialog               |

AWC does **not** call those AWL endpoints from the composer form.

## Related

- Composer: `src/features/agent/SendTaskComposerCreateProjectForm.tsx`
- Immutable path: `src/lib/projects/parseUserProjectBody.ts` (`folder_immutable`)
- Mac picker: `apps/live/features/projects/internal/core/pickMacOsFolderDialog.ts`
- Deployables: [agent-witch-deployables.md](../product/agent-witch-deployables.md)

## Last reviewed

2026-09-17
