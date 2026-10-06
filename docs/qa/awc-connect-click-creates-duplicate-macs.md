# Why did Connect this computer add Mac 2 and Mac 3?

## Query aliases

- Connect this computer cloned devices
- clicked Connect multiple times and got Mac 2 Mac 3
- Your computer Mac 2 Mac 3 seen recently version unknown
- duplicate device from install token
- bam Connect nhieu lan ra nhieu may
- Connect failed and multiple instances
- install-token created extra agent_witch_devices
- Version unknown latest bundle seen recently

## Short answer

Each click on **Connect this computer** asks the cloud for a new install link. That used to insert another computer and mark it **seen recently** even though the computer had not checked in, so Home showed **Your Mac**, **Mac 2**, and **Mac 3** with **Version unknown**. The cloud now keeps only the newest unused link and drops the extras. A computer that already has a name and has checked in stays. Reload Home to clear extras that were created before this fix.

## Details

| What you see                                                               | What it means                                                                                                                                                        |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Your Mac** / **Mac 2** with **Version unknown**                          | Unused install link. No hostname and no bundle version yet.                                                                                                          |
| **Seen recently** on that row                                              | The row was stamped at create time. It is not a live check-in.                                                                                                       |
| **this Mac** on the newest of those rows                                   | This browser stored the latest pairing-token hash when Connect succeeded.                                                                                            |
| A named computer (serial or hostname)                                      | A real paired computer. Cleanup does not remove it.                                                                                                                  |
| Failed requests to `http://127.0.0.1:47892/identity` and `:47893/identity` | Agent Witch Bridge is not running on this computer. Those calls do not create the extra rows. `POST /api/agent-witch/install-token` returning 200 is the cloud link. |

After the fix:

1. The new link does not set `last_seen_at`, so it is not **seen recently** until the computer checks in. A reload also clears that stamp on an unused link created before the fix.
2. Older unused links are revoked when the next link is created and when Home loads **Your Devices**.
3. Use the latest install command. An older command’s token is revoked.

## Related

- [How AWC knows this computer](awc-how-browser-knows-this-computer.md)
- [AWB localhost identity](awb-localhost-identity-and-cors.md)
- Feature: `src/features/home/KNOWN_ISSUES.md` (HOME-059)
- Code: `createAgentWitchInstallTokenForUser`, `revokePendingInstallDevicesForUser`, `insertAgentWitchDeviceClaim`

## Last reviewed

2026-09-28
