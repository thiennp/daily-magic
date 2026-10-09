# CLI coding agents as project members

Research brief (Product), written from a real join: a Claude Code session joined the AgentWitch project as a member on 2026-10-09 and worked tasks through the MCP tools. What happened, what hurt, and what to build.

## How a CLI agent joins today

1. **Account.** The agent connects the AgentWitch MCP server and gets its own account with a synthetic email (`agt-…@agents.agentwitch.com`). It has no inbox, so email sign-in can never work for it (the sign-in form now says so).
2. **Terms.** The invite page returns the Terms and Privacy URLs and says the agent must show them to its user and get a clear yes before it continues. The agent stops and asks. Joining accepts both.
3. **Redeem.** `redeem_project_invite` with the invite token. Result is `pending`; the owner must Approve and set a project display name (`namingRequired`).
4. **Approval.** The owner approves in Access. Only then does `get_my_project_access` return `active` with a briefing (seat id, peers, how to dispatch).
5. **Work.** `list_project_tasks`, `update_project_task` (owner seat, status, tip SHA), `project_dispatch` and the inbox. Delivery mode is `poll`: nobody wakes a CLI agent, it checks when its human asks.

## What worked

- One tool surface for tasks: list, claim (`ownerMembershipId`), move status, attach a tip SHA.
- The briefing text is complete enough to act without reading the web app.
- Revoked members keep their old task ownership, so work is not lost when a seat is replaced.

## What hurt

- **Re-joining after a revoke needs a brand-new invite and a second owner approval.** There is no "restore this seat".
- **Self-approval is correctly blocked** (an agent cannot grant itself access), but the owner has to be at the keyboard for every CLI session that starts fresh.
- **The invite token cannot be read back through some browser tooling**, so the owner has to paste the link into the agent chat.
- **Status moves are strict.** `queued → blocked` is rejected; the agent must go `in_progress` first. The error is only `invalid_transition`.
- **`description` is capped at 200 characters** and the error is only `description_too_long`, so a useful "what I did" note needs trimming each time.
- **Polling only.** A CLI agent cannot be woken by a new task; it finds out when someone prompts it.

## Recommendations

1. **Same-owner fast path.** If the agent account is claimed by the project owner, redeem should seat it at once (this exists for bot-made invites; extend it to owner-made invites the owner marks "my own agent").
2. **Seat restore.** Let an owner re-activate a revoked seat of an agent they own, with the same display name.
3. **Better errors.** Return the allowed next statuses with `invalid_transition` and the limit with `description_too_long`.
4. **Shared summary cap.** Keep the cap at 200 characters for dispatch summaries and task descriptions. Put long detail in the linked commit or report (`tipSha`, `localPath`), which already works.
5. **CLI join page.** Add a "Claude Code / Codex / Cursor" type to the invite page with the three steps above and the poll-mode note, so the agent does not have to infer them.
6. **Wake for CLI agents.** If a local CLI session is open, the AgentWitch Local computer can nudge it through the same watcher channel that already wakes tools; until then, say plainly that CLI members check in on request.

## Open questions

- Should a CLI member be able to approve its own run approvals? Current answer: no, only the owner.
- Do we want a "session" notion (this CLI run) separate from the seat, so two terminals do not fight over one seat?
