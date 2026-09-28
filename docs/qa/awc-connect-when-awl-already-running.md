# What happens if I Connect this Mac while Agent Witch is already running?

## Query aliases

- Add your Mac when AWL is already running
- Connect this Mac after deleting the Mac on the Console
- outdated Agent Witch Live reconnect
- deleted device still running on the Mac
- identity is not linked but local app is open
- AWL outdated or disconnected then Connect this Mac
- bam da cai Agent Witch roi bam Add your Mac

## Short answer

**Add your Mac** / **Connect this Mac** does not talk to the app already running on the Mac. The click only reserves a new cloud link and shows a Terminal command. The local app keeps the pairing token already in `~/.agent-witch` until you paste that command. Pasting it, for the same account, writes the new token, replaces the local install with the current bundle, restarts the helper, and registers this Mac’s hostname on the new link.

## Details

| Situation                                        | Click only                                                                                                                                                                                                         | After you paste the Connect command                                                                                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mac still listed, install outdated               | The running app keeps checking in on its old link. Files are not updated.                                                                                                                                          | Installer replaces local files with the current bundle, saves the new token for this account, restarts the helper, and the previous active row for that same hostname is revoked. |
| You removed that Mac in the Console              | Cloud already revoked that device, closed its socket, and will not dispatch to it. The app can still be open at `http://127.0.0.1:43347`, but the cloud rejects the old token (“This Mac identity is not linked”). | The deleted row stays deleted. The new link gets this Mac’s hostname and the restarted helper connects with the new token.                                                        |
| Config on the Mac belongs to a different account | Nothing on the Mac changes.                                                                                                                                                                                        | Installer refuses to overwrite that account’s pairing token. This account is a separate profile.                                                                                  |

**Update local** is the version update for a Mac that is still linked. It keeps the token already on disk. After a delete, that token is revoked, so Update local does not restore dispatch. Use **Connect this Mac** so a new link is written.

Deleting a Mac in the Console sets `revoked_at`, disconnects the live socket, cancels queued work for that device, and does not uninstall the Mac app.

## Related

- [How AWC knows this computer](awc-how-browser-knows-this-computer.md)
- [Repeated Connect clicks](awc-connect-click-creates-duplicate-macs.md)
- Code: `revokeAgentWitchDevice`, `processAgentWitchAgentRegisterRole`, `buildAgentWitchInstallScriptConfigUpdateExisting`, `registerAgentWitchInstallFromMac`

## Last reviewed

2026-09-28
