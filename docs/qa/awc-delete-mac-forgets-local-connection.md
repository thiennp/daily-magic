# What happens on the computer when I delete it in the Console?

## Query aliases

- delete Mac from Agent Witch Cloud
- remove device forgets local connection
- unknown identity wipes AWI AWB
- xoa may mac tren agentwitch
- AWC dong y xoa computer thi local xoa ket noi
- does deleting a computer uninstall Ollama
- deleted Mac still running Agent Witch Local

## Short answer

Deleting a computer in the Console removes that device row. The cloud does not keep the pairing identity. The next time this computer connects, or immediately if the socket is still open, Agent Witch replies with `unknown_identity`. Install bundle 148 and later then stop the helper and the bridge, and delete the connection files and the shipped app code. Projects, Playbooks, reports, runs, local memory, and Ollama stay on disk.

## Details

| Step                                   | What happens                                                                                                                                                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| You delete the computer in the Console | `DELETE /api/agent-witch/devices/:id` removes in-flight runs and queued dispatch, then `DELETE`s the `agent_witch_devices` row. Identity lookup is by token hash across the whole table, not only this user. |
| The computer is online                 | The open socket gets `system.error` with `errorCode: unknown_identity`, then closes. The computer client stops reconnecting, boots out its LaunchAgents, and runs the local forget.                          |
| The computer is offline                | The next `agent.register` finds no row and returns the same `unknown_identity` code. A network error, a timeout, or “not linked” without that code does not wipe.                                            |
| An older install (before bundle 148)   | It disconnects and keeps retrying. It does not delete local files until it is running a bundle that understands `unknown_identity`.                                                                          |
| A row that was only revoked earlier    | The row still exists, so the cloud still knows the token. That Mac does not wipe. Only a missing row is unknown.                                                                                             |

Local forget deletes `~/.agent-witch/app/` (or `~/.local-agent-witch/app/` for a localhost install), the LaunchAgents, and connection files: `config.json`, `device-keypair.json`, `connection-health.json`, `pending-run-inputs.json`, `run-completion-outbox.json`, `active-profile.json`, `install-version.json`, `wake-port.json`, `link-code.txt`, and `watchdog-reinstall-state.json`.

It keeps `profiles/<email>/projects`, `harness`, `reports`, `runs`, `logs`, `automations.json`, `writer-api-secrets.json`, `rag/`, and project memory. It does not uninstall Ollama and it does not delete `~/.agent-witch/ollama`. There is no local Redis in this product.

The shared `app/` folder is one per install home, so removing it stops every profile on that home. Other profiles’ project data and config files stay. **Connect this computer** still inserts a known row before the computer connects, so a fresh install token is not unknown. **Update local** keeps the token already on disk and does not create a new identity.

## Related

- [Connect while Agent Witch is already running](awc-connect-when-awl-already-running.md)
- [How AWC knows this computer](awc-how-browser-knows-this-computer.md)
- Code: `deleteAgentWitchDevice`, `resolveAgentRegisterIdentityRejection`, `forgetAgentWitchLocalConnection`, `isUnknownAgentWitchIdentityError`

## Last reviewed

2026-09-28
