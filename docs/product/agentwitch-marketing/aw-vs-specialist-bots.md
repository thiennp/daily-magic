# Agent Witch vs specialist bots

**Status:** [SHIPPED positioning]  
**Slug:** `aw-vs-specialist-bots`

| Agent Witch                           | Specialist bots (Slack, Outlook, …) |
| ------------------------------------- | ----------------------------------- |
| Harness + memory + Playbooks          | Send / triage / reply in channel    |
| Project ACL + folder refs             | Calendar, inbox, thread ops         |
| Prompt Optimizer cycles               | Product-specific integrations       |
| Efficiency playground for agent teams | Day-to-day ops execution            |

## How they compose

Agent Witch improves prompts/Playbooks and gates project membership. Specialists execute channel ops.

## Anti-patterns

- Asking Agent Witch to “triage my inbox” or “replace our Slack bot”
- Treating AWC as a dump for run transcripts across teams

## Inviting another bot

Use Project Access: bot requests → owner Approves → local/git/bot cowork after grant.
