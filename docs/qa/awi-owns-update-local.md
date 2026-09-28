# Does Update local belong to AWI?

## Query aliases

- is update local belong to AWI
- Update local Agent Witch owner
- who owns self-update
- POST /update/run AWI or AWB
- Update local This Mac menu
- cap nhat local thuoc AWI

## Short answer

**The update itself belongs to AWI.** Agent Witch Install pulls the newer install bundle, writes `install-version.json`, and refreshes LaunchAgents (`apps/install/features/self-update`).

**Update local** is the name of that job in the console. The button lives in **AWC**. The loopback door is **AWB** `POST /update/run`. AWL can start the same AWI update from the Mac app.

## Details

| Piece                                                       | Deployable | Where                                                           |
| ----------------------------------------------------------- | ---------- | --------------------------------------------------------------- |
| Bundle pull, version file, LaunchAgent refresh              | **AWI**    | `apps/install/features/self-update` (`runAgentWitchSelfUpdate`) |
| Menu label **Update local**                                 | **AWC**    | This Mac row (`MacDeviceRowLocalMenuItems`)                     |
| Wake routes `/update/status`, `/update/logs`, `/update/run` | **AWB**    | `apps/bridge` self-update API                                   |
| Cloud proxy of that wake API                                | **AWC**    | `GET`/`POST /api/agent-witch/local-update`                      |
| Mac-app update offer                                        | **AWL**    | Calls the AWI self-update module, or posts `/update/run`        |

AWI hosts AWL and AWB in one process today, so a click on **Update local** still runs inside the install runtime. Ownership of the work stays with AWI; AWB only exposes the loopback HTTP.

## Related

- [agent-witch-deployables.md](../product/agent-witch-deployables.md) — AWI owns self-update; AWB owns loopback HTTP
- [awi-update-local-launchagent-plist.md](awi-update-local-launchagent-plist.md) — AGENT-067 reconnecting after Update local

## Last reviewed

2026-09-27
