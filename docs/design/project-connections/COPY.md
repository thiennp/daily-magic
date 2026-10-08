# AgentWitch Project Connections — user-facing copy

**Product:** AgentWitch (one word)  
**Drafted:** 2026-10-07 ~06:35 CEST  
**Lock:** [LOCK.md](./LOCK.md) · [DESIGN.md](./DESIGN.md)  
**Rules:** Prefer **assistant** over bot. Prefer **computer** / **This computer**. **Connect** = computer pairing (global). **Connections** = project services. Plain English. No Soft shorthand. Never hide Marketplace, Connect, Automations, Download.

---

## Nav / placement labels

| Key                           | EN                                                                       | Note                                          |
| ----------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| `connections.nav`             | Connections                                                              | Settings subsection or centre tab (Q1)        |
| `connections.settingsSection` | Connections                                                              | Under project **Settings**                    |
| `connect.computer`            | Connect                                                                  | **Do not rename** — global pair this computer |
| `connections.vsConnect.hint`  | Connect pairs this computer. Connections link services for this project. | Optional (i) tip — only if users conflate     |

---

## Panel chrome

| Key                       | EN                                                                                |
| ------------------------- | --------------------------------------------------------------------------------- |
| `connections.heading`     | Connections                                                                       |
| `connections.intro`       | Link Slack, Linear, Gmail, and GitHub so assistants in this project can use them. |
| `connections.intro.short` | Services assistants in this project can use.                                      |

---

## Empty / loading / error

| Key                           | EN                                                                            |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `connections.empty`           | Connect a service so assistants in this project can use it.                   |
| `connections.empty.secondary` | Pasted links in Resources stay bookmarks. Connections are signed-in services. |
| `connections.loading`         | Loading connections…                                                          |
| `connections.error`           | Could not load connections. Try again.                                        |
| `connections.error.retry`     | Try again                                                                     |

---

## Service names (v1)

| Key                           | EN     |
| ----------------------------- | ------ |
| `connections.provider.slack`  | Slack  |
| `connections.provider.linear` | Linear |
| `connections.provider.gmail`  | Gmail  |
| `connections.provider.github` | GitHub |

Later providers use the same row pattern (Notion, Discord, …).

---

## Row / card actions & status

| Key                             | EN                  |
| ------------------------------- | ------------------- |
| `connections.status.connected`  | Connected           |
| `connections.status.expired`    | Expired             |
| `connections.status.error`      | Needs attention     |
| `connections.status.none`       | Not connected       |
| `connections.action.connect`    | Connect             |
| `connections.action.reconnect`  | Reconnect           |
| `connections.action.disconnect` | Disconnect          |
| `connections.card.connectedOn`  | Connected {date}    |
| `connections.card.account`      | {accountLabel}      |
| `connections.card.connectedBy`  | Connected by {name} | Optional |

---

## Connect / OAuth flow

| Key                          | EN                                                                | Note                                |
| ---------------------------- | ----------------------------------------------------------------- | ----------------------------------- |
| `connections.oauth.opening`  | Continue in the sign-in window to connect {service}.              | Reuse Connect/Invite consent family |
| `connections.oauth.success`  | {service} connected for this project.                             | Toast                               |
| `connections.oauth.denied`   | {service} was not connected. You can try again when you’re ready. |                                     |
| `connections.oauth.failed`   | Could not connect {service}. Try again.                           |                                     |
| `connections.oauth.tryAgain` | Try again                                                         |                                     |
| `connections.forbidden`      | Only the project owner can connect or disconnect services.        | Until Q4 opens members              |

---

## Disconnect confirm

| Key                              | EN                                                                     |
| -------------------------------- | ---------------------------------------------------------------------- |
| `connections.disconnect.title`   | Disconnect {service}?                                                  |
| `connections.disconnect.body`    | Assistants in this project will stop using {service} ({accountLabel}). |
| `connections.disconnect.confirm` | Disconnect                                                             |
| `connections.disconnect.cancel`  | Cancel                                                                 |
| `connections.disconnect.toast`   | {service} disconnected.                                                |

---

## Reconnect

| Key                             | EN                                                                 |
| ------------------------------- | ------------------------------------------------------------------ |
| `connections.reconnect.hint`    | Sign-in expired. Reconnect so assistants can keep using {service}. |
| `connections.reconnect.success` | {service} reconnected.                                             |

---

## Distinction from Resources (optional strip)

| Key                             | EN                                                                                                                            |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `connections.vsResources.title` | Connections vs Resources                                                                                                      |
| `connections.vsResources.body`  | Resources holds folder paths and git URLs you paste. Connections sign in to Slack, Linear, Gmail, or GitHub for this project. |

---

## Access log / Activity audit lines (plain English)

| Key                              | EN                                              |
| -------------------------------- | ----------------------------------------------- |
| `connections.audit.connected`    | {actor} connected {service} ({accountLabel}).   |
| `connections.audit.disconnected` | {actor} disconnected {service}.                 |
| `connections.audit.reconnected`  | {actor} reconnected {service} ({accountLabel}). |

Reuse Invite / access-log presentation; do not invent a second audit vocabulary.

---

## Do not ship in this copy

- Renaming global **Connect** to “Connections” or “Link computer”.
- “Bot” as the generic noun (except product name **Grok Bot** if mentioned elsewhere).
- Soft shorthand, ACL jargon, raw provider error codes as the only message.
- Claims that connecting Slack makes a Slack bot the project assistant (wake out of v1).
- Hiding Marketplace, Connect, Automations, or Download labels anywhere in shells that show Connections.

---

## Glossary check

| Say                            | Don’t say (generic)                                          |
| ------------------------------ | ------------------------------------------------------------ |
| AgentWitch                     | Agent Witch                                                  |
| assistant                      | bot (generic)                                                |
| This computer / computer       | Mac / machine (generic)                                      |
| Connections (project services) | Connect (unless meaning computer pair)                       |
| Disconnect                     | Unlink / revoke (unless provider docs need revoke in helper) |

---

## Coming soon (shared OAuth app not ready)

All six providers are disabled until enabled per provider via env `PROJECT_CONNECTIONS_ENABLE` (e.g. `slack,linear`). Disconnect stays available for connected rows. The start route returns 403 `{ "error": "coming_soon" }` while disabled.

| Key                          | EN                                                                    |
| ---------------------------- | --------------------------------------------------------------------- |
| `connections.comingSoon`     | Coming soon (chip next to name + disabled dashed button label)        |
| `connections.comingSoonNote` | Connections are coming soon. Assistants can't use these services yet. |
