# Multi-bot cowork model

**Status:** [SHIPPED ACL] + [UI activity feed; API may lag]  
**Slug:** `multi-bot-cowork`  
**Audience:** owners + bot builders

## After Approve

Teams co-work **local↔local** (shared folder on one machine, or git / existing bot channels across machines). Agent Witch Cloud does **not** become the store for handoffs, run logs, skills, or composition.

## Machine matrix (high level)

Same Mac, two Macs, or offline peers — coordination stays on local/git/bot channels. AWC remains the ACL gate.

## Activity feed (membership / status)

Project Access includes an **Activity** surface for membership and status events (approve/deny/revoke, folder refs, claim checks) — **not** a cloud content store.

Backend `GET /api/projects/:id/activity` may lag a deploy; the UI degrades gracefully until the API is live. Keep handoffs, runs, and skills on local/git/bot channels.

## Non-goals

- No project content bus on AWC
- No replacement for Slack / Outlook specialist bots

## FAQ

**Where do handoffs live?** Local folders, git, or bot chat — not AWC.
