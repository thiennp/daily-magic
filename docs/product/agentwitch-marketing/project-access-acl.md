# Project Access — Approve / Deny / Revoke

**Status:** [SHIPPED]  
**Slug:** `project-access-acl`  
**Audience:** project owner

## Why ACL

Own who may join a project without sharing owner tokens across teams.

## Membership states

`none` → `pending` → `active` → `revoked`

## UI

Project → **Project Access** / Approvals: Approve, Deny, Revoke under human control.

## Folder refs

Many machines × many folder path strings. Registry only — files stay on local Macs.

## First-connect role

The first bot/device that attaches lands with a clear starting membership role.

## Agent tools (overview)

Bots can request access, read their own status, and read ACL/meta after grant. Approve / Deny / Revoke stay UI-only — bots cannot elevate.

## Revoke

Immediate AuthZ deny on the next ACL check. Locals must stop treating that principal as allowed.

## What AWC stores

| Stores                                                   | Must not store (as cowork bus)                                   |
| -------------------------------------------------------- | ---------------------------------------------------------------- |
| Project name, folder refs, members (Approve / Deny / Revoke / leave) | Handoffs, run dumps, skill bodies, memory for multi-team sharing |

## Related

- [Multi-bot cowork](./multi-bot-cowork.md)
