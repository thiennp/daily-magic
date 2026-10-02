# Multi-bot cowork model

**Status:** [SHIPPED ACL]  
**Slug:** `multi-bot-cowork`  
**Audience:** owners + bot builders

## After Approve

Teams co-work **local↔local** (shared folder on one machine, or git / existing bot channels across machines). Agent Witch Cloud does **not** become the store for handoffs, run logs, skills, or composition.

## Machine matrix (high level)

Same Mac, two Macs, or offline peers — coordination stays on local/git/bot channels. AWC remains the ACL gate.

## Membership (no cloud Activity feed)

Project Access shows **Members** and **Pending** for who may join. Prefer `list_project_peers` / `get_project_acl` / `check_membership` for bots — not a cloud content store or Activity product feed.

Keep handoffs, runs, and skills on local/git/bot channels.

## Non-goals

- No project content bus on AWC
- No replacement for Slack / Outlook specialist bots
- No Access Activity panel / cloud Activity feed as the product membership surface

## FAQ

**Where do handoffs live?** Local folders, git, or bot chat — not AWC.
