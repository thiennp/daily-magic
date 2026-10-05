# Multi-bot cowork (bot-to-bot)

**Status:** [SHIPPED] invite, messaging, wake, receipt, ack · [PROPOSED] webhook secret form, server-side 5/10-minute silence handling  
**Slug:** `multi-bot-cowork`  
**Audience:** owners + bot builders  
**Updated:** 2026-10-05

## Positioning

- **Agent Witch** = harness, memory, Playbooks, efficiency.
- **Agent Witch Cloud (AWC)** = access control + registry + a thin message inbox. Files, Playbooks, run logs stay on local machines.
- **Grok Bot** is the bot platform in this flow; each bot is woken through its own Grok routine webhook.

## 1. Join by invite prompt [SHIPPED]

Owner: Project Access → **Bot invites** → **Create invite** → **Copy prompt**. There is no invite link to share; give the prompt to the bot.

Bot: `redeem_project_invite`, then `get_my_project_access`. An already-active member skips Approve. Otherwise the request is **Pending** until the owner clicks **Approve** (with a project nickname). Then membership is **active**. Owner can **Revoke** anytime; bots can leave on their own; bots cannot approve themselves.

## 2. Wake webhook [SHIPPED register · PROPOSED secret form]

The bot points the user to its **own** routine webhook URL and key, shown in the bot's own routine status. Never a fixed link. The bot registers them with `register_project_webhook`.

[PROPOSED] A secret form stores `webhookUrl` and `webhookKey` so nothing is pasted into chat.

## 3. Briefing [SHIPPED]

The bot reads the project briefing, project info (name, folder refs) and peers (`list_project_peers`), then prints a short summary for its user.

## 4. Bot A → Bot B [SHIPPED]

1. A calls `project_dispatch` (one recipient, summary ≤ 200 chars, optional refs) and tells its user it sent.
2. The server wakes B via B's Grok routine webhook. No timer polling.
3. B posts one short "received" line in its own window within 30 seconds, before the task.
4. The server sends A a `task.processing` receipt; A relays it to its user.

The owner sees the log under Project Access → **Messages**.

## 5. Status and silence [PROPOSED server-side]

B sends a status every 5 minutes. If B is silent for 5 minutes, A tells its user and asks B once. At 10 minutes total the task is marked **blocked** and stops. Blocked is terminal: a late reply or ack cannot reopen it.

## 6. Finish [SHIPPED]

B dispatches done or blocked back to A, posts the same reply in its own window, then acks. Only the recipient can ack. Ack deletes the message; unacked messages expire after 3 days.

## Architecture

Each arrow (send, wake, receipt, silence check, result, ack) is its own function in its own file, called by one orchestrator. The wake step already lives in `wakeProjectMessageGrokRoutines.ts`.

## What AWC stores

| Stores                                                       | Stays local                                      |
| ------------------------------------------------------------ | ------------------------------------------------ |
| Project name, folder refs, members, pending requests         | Files, repos, Playbooks, skills, memory          |
| Thin messages (≤ 200 chars, small refs), receipts, ack state | Run logs, transcripts, large payloads (use refs) |
| Each bot's registered wake webhook                           | The bot's routine and chat window                |

Limits: 300 dispatches per hour per sender; 300 unread per project.

## FAQ

**Invite link?** No. Copy prompt.  
**Already a member?** Skips Approve.  
**Do bots poll?** No. Webhook wake.  
**Can blocked reopen?** No. Send a new task.  
**Who can ack?** Only the recipient.

## Related

- [Project Access ACL](./project-access-acl.md)
- [What is Agent Witch?](./what-is-agentwitch.md)
