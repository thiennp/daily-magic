# What happens if I Connect this computer while Agent Witch is already running?

## Query aliases

- Add your computer when AWL is already running
- Connect this computer after deleting the computer on the Console
- outdated Agent Witch Local reconnect
- deleted device still running on the Mac
- identity is not linked but local app is open
- AWL outdated or disconnected then Connect this computer
- bam da cai Agent Witch roi bam Add your computer

## Short answer

**Add your computer** / **Connect this computer** does not talk to the app already running on the computer. The click only reserves a new cloud link and shows a Terminal command. The local app keeps the pairing token already in `~/.agent-witch` until you paste that command. Pasting it, for the same account, writes the new token, replaces the local install with the current bundle, restarts the helper, and registers this Mac’s hostname on the new link.

## Details

| Situation                                             | Click only                                                                                                                                                                                                                    | After you paste the Connect command                                                                                                                                               |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mac still listed, install outdated                    | The running app keeps checking in on its old link. Files are not updated.                                                                                                                                                     | Installer replaces local files with the current bundle, saves the new token for this account, restarts the helper, and the previous active row for that same hostname is revoked. |
| You removed that Mac in the Console                   | The cloud deletes that identity. A current install (bundle 148+) stops and removes the connection and app code when it hears `unknown_identity`. Projects, reports, runs, and Ollama stay. An older install only disconnects. | **Connect this computer** reserves a new known link first. Paste the command to write that token and install the app again.                                                       |
| Config on the computer belongs to a different account | Nothing on the computer changes.                                                                                                                                                                                              | Installer refuses to overwrite that account’s pairing token. This account is a separate profile.                                                                                  |

**Update local** is the version update for a computer that is still linked. It keeps the token already on disk. After a delete, that token is gone, so Update local does not restore dispatch. Use **Connect this computer** so a new link is written.

Deleting a computer removes the `agent_witch_devices` row. It does not leave a deleted flag. A row that was only marked revoked in an earlier release is still known, so that Mac does not wipe until the row itself is gone. See [Deleting a Mac](awc-delete-mac-forgets-local-connection.md).

## Related

- [How AWC knows this computer](awc-how-browser-knows-this-computer.md)
- [Repeated Connect clicks](awc-connect-click-creates-duplicate-macs.md)
- Code: `deleteAgentWitchDevice`, `processAgentWitchAgentRegisterRole`, `forgetAgentWitchLocalConnection`, `buildAgentWitchInstallScriptConfigUpdateExisting`, `registerAgentWitchInstallFromMac`

## Last reviewed

2026-09-28
