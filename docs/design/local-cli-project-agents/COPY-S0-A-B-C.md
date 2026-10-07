# Copy — S0, A6, B4, C7 (Product EN)

**Owner:** NRG AgentWitch Product. **Status:** Product EN for the BUILD (Lead GO 13:29). Design basis: `COMBINED-DESIGN.md` in this folder.
**Source read:** `thiennp/daily-magic` `origin/main` @ `199e1a8c`. Reused strings are quoted verbatim with their file path.
**Absorbed:** useful drafts from AW Dispatch's stray `COPY.md` (now deleted), rewritten to these rules. See §5.

## Rules applied

- Say "assistant", never "bot". Say "This computer" for the viewer's own computer; other computers use their name.
- "AgentWitch" is one word ("AgentWitch Local" for the desktop app).
- No jargon: no API, MCP, OAuth, token, CLI, Mac, writer, agent run in visible UI. Tool names (Claude Code, Codex, Cursor, Antigravity) show as-is.
- Plain short sentences, outcome first, no weak caveats.
- A button and its confirm use the same verb.
- Every disabled control shows a visible reason under it.
- `{placeholders}` are filled by code. `{computer}` renders as "This computer" when it is the viewer's own.

---

## 0. Reused as-is from main (do not reword)

| Key | EN | Where it shows | Source |
| --- | --- | --- | --- |
| `AWC_PENDING_APPROVAL_CARD_COPY.approve` | Approve | Approval card button | `src/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant.ts` |
| `AWC_PENDING_APPROVAL_CARD_COPY.deny` | Deny | Approval card button | same |
| `AGENT_LIVE_TERMINAL_STATUS_LABEL.waiting_approval` | Waiting for approval | Tool status chip, run status | `src/features/agent/utils/agentLiveTerminalStatusLabel.constant.ts` |
| `AGENT_LIVE_TERMINAL_STATUS_LABEL.stopping` | Stopping… | Run status after Stop | same |
| `AGENT_RUN_SESSION_LIMIT_HIT_TITLE` | Session limit reached | Run result when the time limit hits | `src/lib/dispatch/agentRunBudgetNoticeCopy.constant.ts` |
| `AGENT_RUN_SESSION_LIMIT_HIT_BODY` | This run stopped at the session limit. That is a hard stop — not a missed estimate. | Run result body | same |
| `AGENT_RUN_SESSION_LIMIT_APPROACHING_TITLE` | Approaching session limit | Live run notice | same |
| `AWC_PROJECT_INBOX_COPY.dispatchComputerOffline` | That computer is offline. | Send error (offline, or dropped right after send) | `src/features/projects/access/inbox/awcProjectInboxCopy.constant.ts` |
| `AWC_PROJECT_INBOX_COPY.dispatchComputerNeedsUpdate` | That computer needs an update before it can take tasks. | Send error (too old) | same |
| `AWC_PROJECT_INBOX_COPY.dispatchComputerNotAssignable` | That computer can't take tasks right now. | Send error (other) | same |
| `PROJECT_ASK_BOX_COPY.assignedTo` | You assigned a task to {label} | Toast after sending a task to a tool | `src/features/projects/askBox/projectAskBoxCopy.constant.ts` |
| `PROJECT_ASK_BOX_COPY.sendTo` | Send to | Ask box recipient label | same |
| `AWC_PROJECT_COMPUTER_MEMBER_COPY.statusOnline` / `.statusOffline` / `.statusNeedsUpdate` | Online / Offline / Needs update | Computer row status | `src/features/projects/access/awcProjectComputerMemberCopy.constant.ts` |
| `AWC_PROJECT_COMPUTER_MEMBER_COPY.updateLink` | Update | Needs-update link | same |
| `AWC_PROJECT_COMPUTER_MEMBER_COPY.fallbackName` | This computer | Computer name fallback | same |
| `THIS_MAC_DEVICE_BADGE_LABEL` | This computer | Own-computer badge | `src/components/ui/badge/thisMacDeviceBadgeLabel.constant.ts` |
| `ACCESS_LOG_COPY.actorYou` | You | Access log actor | `src/features/projects/accessLog/accessLogCopy.constant.ts` |
| `ACCESS_LOG_COPY.nameFallbackComputer` | this computer | Access log name fallback | same |
| `ACCESS_LOG_COPY.detailKindComputer` | Computer | Access log detail | same |
| `PROJECT_MEMBERSHIP_POLL_SILENCE_STATUS` / `AWC_DELIVERY_MODE_COPY.optionPoll` | Checks on demand | Delivery mode of a tool's computer seat | (cited by AW Dispatch `COPY.md`, main `199e1a8c`) |
| `ACCESS_LOG_COPY.retry` | Try again | Retry buttons below | same |

Access log lines follow the existing owner-only "You …" pattern in `accessLogCopy.constant.ts`.

---

## 1. S0 — Safety fix

### 1.1 Approval prompt (card to the computer's owner)

| Key | EN | Where it shows |
| --- | --- | --- |
| `s0.approval.title` | {requester} wants {tool} to run a task on {computer} | Approval card title (Activity task thread, project attention area) |
| `s0.approval.taskLabel` | Task | Card field label |
| `s0.approval.folderLabel` | Runs in | Card field label, above the folder name |
| `s0.approval.limitsLine` | Stops after {turns} steps, {minutes} minutes or ${perRun}, whichever comes first. | Card body |
| `s0.approval.sandboxLine` | It can change files only in this project's folder. | Card body |
| `s0.approval.expiresLine` | Nothing runs unless you approve. This request ends in {minutes} min. | Card footer |
| `s0.approval.approve` | Approve | Card button (reuses `AWC_PENDING_APPROVAL_CARD_COPY.approve`) |
| `s0.approval.deny` | Deny | Card button (reuses `AWC_PENDING_APPROVAL_CARD_COPY.deny`) |
| `s0.approval.approvedToast` | You approved the task. {tool} is starting. | Toast after Approve |
| `s0.approval.deniedToast` | You denied the task. Nothing ran. | Toast after Deny |
| `s0.approval.expiredTitle` | This request ended | Card after the time runs out |
| `s0.approval.expiredBody` | Nothing ran. {requester} can send the task again. | Card body after expiry |
| `s0.approval.offlineNote` | {computer} is offline. If you approve, the task starts when it's back. | Card note when the computer is offline |
| `s0.approval.ownerOnlyReason` | Only {owner} can approve tasks on their computer. | Visible reason under disabled Approve/Deny for anyone else |
| `s0.requester.waiting` | Waiting for {owner} to approve this task. | Requester's thread status line |
| `s0.requester.denied` | {owner} denied this task. Nothing ran. | Requester's thread line |
| `s0.requester.expired` | {owner} didn't approve in time. Send the task again. | Requester's thread line |

### 1.2 "Allow runs without approval"

| Key | EN | Where it shows |
| --- | --- | --- |
| `s0.unattended.label` | Allow runs without approval | Project Settings → Coding tools (owner only) |
| `s0.unattended.hint` | Tasks start without asking you. Folder, time and spending limits still apply. | Help line under the switch |
| `s0.unattended.confirmTitle` | Allow runs without approval? | Confirm dialog when turning on |
| `s0.unattended.confirmBody` | People and assistants in this project can start tasks on your computers without asking you. Limits still apply. | Confirm dialog body |
| `s0.unattended.confirm` | Allow runs | Confirm button |
| `s0.unattended.cancel` | Cancel | Confirm dialog |
| `s0.unattended.ownerOnlyReason` | Only the project owner can change this. | Visible reason under the disabled switch |
| `s0.unattended.onBadge` | Runs without approval | Badge next to the project's coding tools when on |
| `s0.accessLog.unattendedOn` | You allowed runs without approval | Access log row |
| `s0.accessLog.unattendedOff` | You turned approval back on | Access log row |
| `s0.accessLog.filterTools` | Coding tools | Access log "Show" filter option |

### 1.3 Limits reached

| Key | EN | Where it shows |
| --- | --- | --- |
| `s0.limit.steps` | Stopped at the step limit ({turns} steps). | Run result line (thread + Report) |
| `s0.limit.time` | Session limit reached | Run result title (reuses `AGENT_RUN_SESSION_LIMIT_HIT_TITLE`) |
| `s0.limit.perRun` | Stopped at the spending limit for one task (${perRun}). | Run result line |
| `s0.limit.perDay` | Today's spending limit is used up (${perDay}). New tasks start tomorrow. | Tool status line; ask box disabled reason |
| `s0.limit.runsPerDay` | {tool} ran {n} tasks today. That's the daily limit. New tasks start tomorrow. | Tool status line; ask box disabled reason |
| `s0.limit.busy` | {tool} is busy with another task. This one starts next. | Thread status when a second task waits |
| `s0.limit.change` | Change limits | Link under limit lines (owner only) |
| `s0.limit.changeOwnerOnlyReason` | Only the project owner can change limits. | Visible reason when the link is disabled |
| `s0.limits.turns` | Steps per task | Settings field (default 30) |
| `s0.limits.minutes` | Minutes per task | Settings field (default 30) |
| `s0.limits.perRun` | Spending per task (USD) | Settings field (default 2) |
| `s0.limits.perDay` | Spending per day (USD) | Settings field (default 10) |
| `s0.limits.runsPerDay` | Tasks per day | Settings field (default 20) |
| `s0.limits.hint` | Each coding tool stops when it reaches any of these. | Help line under the limit fields |

### 1.4 Paused and stopped

| Key | EN | Where it shows |
| --- | --- | --- |
| `s0.pause.label` | Pause all coding tools | AgentWitch Local switch |
| `s0.pause.hint` | Running tasks stop. New tasks wait until you turn this off. | Help line under the switch |
| `s0.pause.status` | Paused | Tool status chip |
| `s0.pause.reason` | Paused on {computer}. Turn it back on in AgentWitch Local. | Visible reason on disabled ask-box chip and Team row |
| `s0.stop.button` | Stop | Thread and Report action on a running task |
| `s0.stop.confirmTitle` | Stop this task? | Confirm dialog |
| `s0.stop.confirmBody` | It stops now. Changes made so far stay in the folder. | Confirm body |
| `s0.stop.confirm` | Stop | Confirm button |
| `s0.stop.done` | Stopped by {name}. | Thread result line |
| `s0.stop.pending` | {computer} isn't reachable. The task stops when it checks in. | Thread line when the stop is queued |
| `s0.stop.ownerOnlyReason` | Only the project owner or the computer's owner can stop this task. | Visible reason under disabled Stop |

### 1.5 Folder not allowed

| Key | EN | Where it shows |
| --- | --- | --- |
| `s0.folder.notAllowed` | Blocked: that folder isn't this project's folder on {computer}. Nothing ran. | Run result line (thread + Report) |
| `s0.folder.missing` | This project has no folder on {computer} yet. Set it in AgentWitch Local, then send the task again. | Run result line. Replaces the AWL string "This project has no folder on this computer yet. Open Agent Witch Local and set the project folder before running tasks." (`apps/install/entry/startAgentWitchClient.ts` ~L367 and ~L1440; two words "Agent Witch") |
| `s0.folder.missingReason` | Set this project's folder on {computer} first. | Visible reason on disabled ask-box chip and Team switch |
| `s0.secret.hidden` | Output hidden: it looked like it had a secret. Open the report on {computer}. | Thread result line when the scrubber flags a secret |

---

## 2. A6 — Coding tools (Team → Computers, ask box, threads, Reports)

### 2.1 Team → Computers

| Key | EN | Where it shows |
| --- | --- | --- |
| `a.tools.heading` | Coding tools | Sub-heading inside each computer row |
| `a.tools.hint` | Coding tools found on this computer, like Claude Code or Codex. Add one to let it take tasks in this project. | Help line under the heading |
| `a.tools.none` | No coding tools found on this computer. | Empty state |
| `a.tools.add` | Add to project | Switch label (owner only, off by default) |
| `a.tools.addConfirmTitle` | Add {tool} to this project? | Confirm dialog |
| `a.tools.addConfirmBody` | {tool} can take tasks in this project's folder on {computer}. You approve tasks from others unless you change that. | Confirm body |
| `a.tools.addConfirm` | Add to project | Confirm button |
| `a.tools.remove` | Remove from project | Switch off / menu action |
| `a.tools.removeConfirmTitle` | Remove {tool} from this project? | Confirm dialog |
| `a.tools.removeConfirmBody` | {tool} stops taking tasks here. Its past reports stay. | Confirm body |
| `a.tools.removeConfirm` | Remove from project | Confirm button |
| `a.tools.ownerOnlyReason` | Only the project owner can add coding tools. | Visible reason under disabled switch |
| `a.tools.notInstalledReason` | Not installed on this computer. | Visible reason |
| `a.tools.offlineReason` | {computer} is offline. | Visible reason |
| `a.tools.updateReason` | Update {tool} on {computer} to use it here. | Visible reason (tool version too old) |
| `a.tools.sandboxLine` | Can change files only in this project's folder. | Line under an added tool |
| `a.tools.checkAgain` | Check again | Button next to a tool status |
| `a.tools.checking` | Checking… | Status while checking |
| `a.accessLog.added` | You added {tool} on {computer} | Access log row |
| `a.accessLog.removed` | You removed {tool} on {computer} | Access log row |

### 2.2 Status chips

| Key | EN | Where it shows |
| --- | --- | --- |
| `a.status.ready` | Ready | Team row, ask-box chip, thread row |
| `a.status.working` | Working | same |
| `a.status.queued` | Queued | same |
| `a.status.waitingApproval` | Waiting for approval | same (reuses `AGENT_LIVE_TERMINAL_STATUS_LABEL.waiting_approval`) |
| `a.status.signIn` | Sign-in needed | same |
| `a.status.notInstalled` | Not installed | Team row |
| `a.status.checkFailed` | Couldn't check | Team row |
| `a.status.needsUpdate` | Needs update | same (reuses `AWC_PROJECT_COMPUTER_MEMBER_COPY.statusNeedsUpdate`) |
| `a.status.paused` | Paused | same (= `s0.pause.status`) |

### 2.3 Sign-in (i) hint

| Key | EN | Where it shows |
| --- | --- | --- |
| `a.signIn.hint` | {tool} is not signed in. Open a terminal on {computer} and run: `{command}` | (i) popover on a tool with Sign-in needed |
| `a.signIn.after` | Then press Check again. | Second line of the popover |
| `a.signIn.command.claude` | `claude auth login` | {command} for Claude Code |
| `a.signIn.command.cursor` | `agent login` | {command} for Cursor. Confirmed by AW Mac 13:34 (Cursor CLI 2026.10.01): `agent` = `cursor-agent`; detection uses `agent status`. Never `cursor agent login` (`cursor` is the editor launcher). |
| `a.signIn.cursorFallback` | {tool} is not signed in. Sign in to Cursor on {computer}, then press Check again. | Fallback only if the `agent` command is missing on that computer |
| `a.signIn.command.codex` | `codex login` | {command} for Codex |
| `a.signIn.command.antigravity` | `agy` | {command} for Antigravity; the popover adds `a.signIn.antigravityAfter` |
| `a.signIn.antigravityAfter` | Finish the Google sign-in it opens. | Extra line for Antigravity |
| `a.signIn.reason` | Sign in to {tool} on {computer} first. | Visible reason on disabled ask-box chip |
| `a.signIn.gemini` | AgentWitch can't check Gemini CLI sign-in, so it can't take tasks here. Connect Gemini CLI as an assistant instead. | (i) popover and visible reason for Gemini CLI (no status command, never treated as signed in) |

### 2.4 Ask box / chat dock

| Key | EN | Where it shows |
| --- | --- | --- |
| `a.dock.groupTools` | Coding tools | Send-to group heading (after "Assistants") |
| `a.dock.toolLabel` | {tool} on {computer} | Recipient chip / option |
| `a.dock.taskOnlyHint` | Coding tools take tasks only. Turn on "Assign as a specific task". | Visible reason when a tool is picked in message mode |
| `a.dock.oneRecipient` | A task needs one recipient. Pick one assistant or one coding tool. | Error on task to All assistants. **Ships in slice A5.** The live/in-flight `PROJECT_CHAT_DOCK_COPY["dock.task.oneRecipient"]` ("…Pick one assistant or This computer.", `feat/awc-l3-v5-4-dock` @ `5c744865`) stays unchanged until coding tools are live |
| `a.dock.queued` | This computer is reconnecting. The task starts when it's back. | Toast when the send was queued (absorbed from Dispatch draft; replaces "Mac" string `MAC_RECONNECTING_QUEUED_ERROR` in `src/lib/agentWitch/agentWitchDispatchErrorCode.constant.ts`) |
| `a.dock.queuedOther` | {computer} is reconnecting. The task starts when it's back. | Same, for another computer |
| `a.dock.repaired` | This computer was set up again. Pick it again and send. | Send error (absorbed; replaces `MAC_REPLACED_ERROR`) |
| `a.dock.unavailable` | That computer is offline. | Send error when the task could not be queued (reuses `dispatchComputerOffline`) |

### 2.5 Activity task thread and Reports

| Key | EN | Where it shows |
| --- | --- | --- |
| `a.thread.added` | Added to this project by {owner}. | First line in the tool's thread |
| `a.thread.removed` | Removed from this project by {owner}. | Thread line |
| `a.thread.received` | Got it. Starting on {computer}. | Thread line when the run starts |
| `a.thread.done` | Done. {summary} | Thread result line, with "Open report" |
| `a.thread.blocked` | Stopped: {reason} | Thread result line |
| `a.thread.openReport` | Open report | Link on result lines |
| `a.thread.empty` | No tasks yet. Send one from the ask box. | Empty thread |
| `a.reports.from` | {tool} on {computer} | Reports "From" column |

---

## 2a. Lane A vs Lane B — compare help (Thien HARD 2026-10-07 ~06:37)

**Status:** LOCK ready for Human UI. Keep both paths; visible help must show the difference. Design docs may say Lane A/B; **visible UI strings must not** use Lane A/B, API, MCP, OAuth, token, CLI, or "bot". Say "assistant". Cross-link: `DESKTOP-APP-CONNECT-EN.md`. Not Project Connections. No Lane C in v1.

| Key | EN | Where it shows |
| --- | --- | --- |
| `laneCompare.title` | Two ways to use local AI tools | Compare help heading (i) popover / help panel |
| `laneCompare.codingTools.label` | Coding tools on this computer | Lane A path label (matches Team "Coding tools") |
| `laneCompare.codingTools.when` | AgentWitch Local starts the tool for a task on this computer. You may need to approve the run. | When-to-use line for coding tools |
| `laneCompare.codingTools.where` | Team → Computers → Add to project | Path hint for coding tools |
| `laneCompare.assistant.label` | Connect as an assistant | Lane B path label |
| `laneCompare.assistant.when` | Cursor Desktop or Claude Desktop joins the project like other assistants. You Approve the join; they check on demand. | When-to-use line for Desktop assistants |
| `laneCompare.assistant.where` | Invite / Connect assistant | Path hint for assistants |
| `laneCompare.diff.results` | Tasks on a coding tool run on this computer with computer limits. An assistant works in its own seat and checks when you ask. | How results differ |
| `laneCompare.diff.approvals` | Computer runs follow Allow runs without approval or approval cards. An assistant join needs owner Approve first. | How approvals differ |
| `laneCompare.help.computers` | Prefer coding tools when AgentWitch Local should run the task on this computer. Prefer Connect as an assistant when a Desktop app should join like other assistants. | (i) help on Team → Computers Add to project |
| `laneCompare.help.invite` | Cursor Desktop and Claude Desktop join as assistants here — not as coding tools on a computer. | (i) or hint on Invite / Connect assistant for Desktop apps |

---

## 3. B4 — Task reviews (Learned knowledge, Suggested Safety rules)

**Pricing (Thien lock via AW Lead, 13:38; seat + fee LOCKED 13:42):** per seat (the member whose assistant or coding tool ran the task), fee $0.25 per 1M tokens from billing config, 50 free reviews a month or about $5 of usage, whichever runs out first. Then extra reviews cost what the model provider charges plus a disclosed {fee}, up to an owner-adjustable cap (default $10 per seat per month). Warning at 80%. At 100% only reviews pause; tasks never do. One-click raise; otherwise reviews resume next cycle. Visible copy says "usage", never "API price".

| Key | EN | Where it shows |
| --- | --- | --- |
| `b.settings.label` | Review finished tasks | Project Settings (owner only, off by default) |
| `b.settings.hint` | After a big task, the assistant looks back at its work and suggests Safety rules and skills. Nothing is added until you promote it. | Help line |
| `b.settings.historyOffReason` | Turn on History on this computer first. | Visible reason under disabled switch |
| `b.settings.ownerOnlyReason` | Only the project owner can change this. | Visible reason |
| `b.settings.minSize` | Only review tasks of at least | Field label, before the number |
| `b.settings.minSizeUnit` | k in size | Unit after the number (default 20) |
| `b.settings.minSizeHint` | Size counts the text a task read and wrote. Smaller tasks are not reviewed. | (i) hint on the field |
| `b.billing.free` | Each seat gets {freeReviews} free reviews a month, or about ${freeUsage} of usage, whichever runs out first. | Project Settings → Task reviews, under the switch; also in the turn-on confirm. Values: 50 and $5 (Thien lock 13:38) |
| `b.billing.freeUsed` | Free reviews this month: {used} of {freeReviews} used. | Line under `b.billing.free` |
| `b.billing.overage` | After that, reviews cost what the model provider charges, plus {fee}. | Under `b.billing.free`; also in the turn-on confirm. {fee} comes from billing config, never hardcoded |
| `b.billing.tokensHint` | Usage is counted in tokens, small pieces of text the model reads and writes. | (i) next to the fee in `b.billing.overage` |
| `b.billing.overageUsed` | Extra reviews this month: ${spent} of ${cap}. | Line under the limit field once extra usage starts |
| `b.billing.cap` | Monthly limit for extra reviews (USD) | Settings field (owner only; default 10) |
| `b.billing.capHint` | Reviews pause when extra usage reaches this. Your tasks keep running. | Help line under the field |
| `b.billing.capOwnerOnlyReason` | Only the owner can change this limit. | Visible reason under the disabled field |
| `b.billing.warn80` | Reviews have used 80% of this month's limit (${spent} of ${cap}). They pause at the limit. Your tasks keep running. | Owner notification + banner in Settings → Task reviews and Learned knowledge |
| `b.billing.pausedTitle` | Reviews paused | Owner notification + banner title |
| `b.billing.pausedBody` | You reached this month's review limit. Your tasks keep running. Only reviews are paused. | Notification + banner body |
| `b.billing.resumes` | Reviews start again on {date}. | Last line of the paused banner; Settings line while paused |
| `b.billing.raise` | Raise limit | One-click button on the paused banner and notification (owner only) |
| `b.billing.raiseConfirmTitle` | Raise limit to ${newCap}? | Confirm dialog |
| `b.billing.raiseConfirmBody` | Reviews start again now. Extra usage this month can go up to ${newCap}. | Confirm body |
| `b.billing.raiseConfirm` | Raise limit | Confirm button (same verb) |
| `b.billing.raiseCancel` | Cancel | Confirm dialog |
| `b.billing.raised` | Limit raised. Reviews are back on. | Toast after confirm |
| `b.billing.raiseOwnerOnlyReason` | Only the owner can raise the limit. | Visible reason under the disabled button |
| `b.accessLog.capChanged` | You changed the review limit to ${cap} | Access log row (field edit or raise) |
| `b.accessLog.on` | You turned on task reviews | Access log row |
| `b.accessLog.off` | You turned off task reviews | Access log row |
| `b.library.heading` | Learned knowledge | Library section heading |
| `b.library.intro` | Suggestions from finished tasks. Promote the ones you want to keep. | Section intro |
| `b.safety.heading` | Suggested | Safety rules section heading |
| `b.safety.intro` | Rules suggested from finished tasks. Promote the ones you want assistants to follow. | Section intro |
| `b.kind.rule` | Safety rule | Draft kind label |
| `b.kind.skill` | Skill | Draft kind label |
| `b.kind.skillUpdate` | Skill update | Draft kind label |
| `b.kind.lesson` | Lesson | Draft kind label (existing run lessons) |
| `b.draft.badge` | Draft | Badge on every unpromoted item |
| `b.draft.from` | From a task by {name} · about ${cost} to review | Meta line |
| `b.draft.looksLike` | Looks like {name}. | Near-duplicate line |
| `b.draft.promote` | Promote | Button |
| `b.draft.promoteConfirmTitle` | Promote this suggestion? | Confirm dialog |
| `b.draft.promoteConfirmBodyRule` | It becomes a Safety rule that assistants follow in this project. | Confirm body (rule) |
| `b.draft.promoteConfirmBodySkill` | It becomes a skill in this project's Library. | Confirm body (skill) |
| `b.draft.promoteConfirm` | Promote | Confirm button |
| `b.draft.reject` | Reject | Button |
| `b.draft.rejectConfirmTitle` | Reject this suggestion? | Confirm dialog |
| `b.draft.rejectConfirmBody` | It won't be suggested again. | Confirm body |
| `b.draft.rejectConfirm` | Reject | Confirm button |
| `b.draft.promoted` | Promoted. | Toast |
| `b.draft.rejected` | Rejected. | Toast |
| `b.draft.promoteFailed` | Couldn't promote. {reason} | Inline error; the draft stays |
| `b.draft.fullReason` | Safety rules are full. Retire one to make room. | Visible reason under disabled Promote (rule) |
| `b.draft.ownerOnlyReason` | Only the project owner can promote or reject. | Visible reason under disabled buttons |
| `b.draft.superseded` | Replaced by a newer suggestion. | Line on superseded items (history view) |
| `b.draft.empty` | No suggestions yet. | Empty state |

---

## 4. C7 — Local-first

### 4.1 Answer notes

| Key | EN | Where it shows |
| --- | --- | --- |
| `c.answer.fromLibrary` | Answered from Library. | Note on a reply that came from past work |
| `c.answer.fromLibraryDetail` | This matched an earlier task in this project. No new run was needed. | Expanded note |
| `c.answer.runAnyway` | Run it anyway | Button under the note |
| `c.answer.attached` | Added notes from Library. | Note on a reply that used past work as context |
| `c.reports.fromLibrary` | Answered from Library · no new run | Reports row meta |

### 4.2 Task notes on this computer

| Key | EN | Where it shows |
| --- | --- | --- |
| `c.notes.label` | Remember finished tasks on this computer | Project Settings → This computer |
| `c.notes.hint` | Short notes about finished tasks stay on this computer and help next time. They follow your History setting. | Help line |
| `c.notes.historyOffReason` | History is off on this computer, so nothing is kept. | Visible reason |
| `c.notes.delete` | Delete task notes | Button (owner only) |
| `c.notes.deleteConfirmTitle` | Delete task notes? | Confirm dialog |
| `c.notes.deleteConfirmBody` | All task notes for this project on {computer} are deleted. This can't be undone. | Confirm body |
| `c.notes.deleteConfirm` | Delete task notes | Confirm button |
| `c.notes.deleted` | Task notes deleted. | Toast |
| `c.notes.ownerOnlyReason` | Only the project owner can delete task notes. | Visible reason under disabled Delete |

### 4.3 Local summary and search index

| Key | EN | Where it shows |
| --- | --- | --- |
| `c.summary.label` | Summarize project docs on this computer | Project Settings → This computer (off by default) |
| `c.summary.hint` | Uses the free local model on this computer (Ollama) to shorten your README and docs before the assistant reads them. Skipped if it is slow. | (i) hint |
| `c.summary.missingReason` | Ollama is not installed on this computer. | Visible reason under disabled switch |
| `c.summary.timeLimit` | Time limit (seconds) | Owner-adjustable field |
| `c.index.label` | Faster search of past work | Project Settings → This computer |
| `c.index.hint` | Builds a search index of this project's docs and past answers on this computer. Uses up to {disk} of space. | (i) hint |
| `c.index.tooSmallReason` | This project is small. Search works without it. | Visible reason under disabled switch |
| `c.index.diskLimit` | Space limit | Owner-adjustable field |

### 4.4 Matching settings (owner-adjustable team defaults)

| Key | EN | Where it shows |
| --- | --- | --- |
| `c.match.heading` | Use past work first | Project Settings section heading |
| `c.match.hint` | Before asking a model, assistants check this project's past work on this computer. | Help line |
| `c.match.answerLabel` | Answer from Library when a match is | Select label |
| `c.match.answerExact` | Exact | Select option |
| `c.match.answerClose` | Very close | Select option |
| `c.match.answerNever` | Never, only add notes | Select option |
| `c.match.reset` | Use team defaults | Button |
| `c.match.resetConfirm` | Use team defaults | Confirm button (dialog title: "Use team defaults?") |

### 4.5 Join step (Lead copy GO)

| Key | EN | Where it shows |
| --- | --- | --- |
| `c.join.stepHuman` | Your assistant checks this project's past work and Safety rules first, then asks a model. | Invite page step list and Overview setup card |
| `c.join.stepAssistant` | Title "Check this project first". Body: "Before you answer from your own knowledge, check what this project already has. 1. Safety rules: if you have the AgentWitch Local connector, call check_context. 2. Library: call list_project_skills, then get_project_skill for any skill that fits the task. 3. Past work: call list_runs to see your account's earlier Reports. 4. Before you call send_task, run the Prompt Optimizer." | ONE source: AW Invite commit C constant (order = DESIGN order, 13:40). NRG AgentWitch imports it. No get_skill. |

---

## 5. Absorbed from AW Dispatch `COPY.md` (deleted)

| Dispatch draft | Outcome |
| --- | --- |
| "This computer is reconnecting. Your task will start when it's back." | Kept as `a.dock.queued`, shortened to "The task starts when it's back." |
| Race unavailable → reuse `dispatchComputerOffline` | Kept as `a.dock.unavailable` (no new string) |
| "This computer was set up again. Pick it again and resend." | Kept as `a.dock.repaired` ("…and send.") |
| "Run with" (writer picker label) | Not used: each coding tool is its own recipient, so there is no picker |
| "Waiting for {owner} to approve this task on their computer." | Kept as `s0.requester.waiting`, shortened |
| "{owner} didn't approve in time. Send the task again." | Kept as `s0.requester.expired` |
| Rule: never "Mac", "CLI", "writer agent", "agent run" in UI; tool names as-is | Kept in Rules; use the full names "Claude Code", "Codex", "Cursor", "Antigravity" (draft said "Claude") |
| Locked reuse list (inbox errors, assignedTo, oneRecipient, Checks on demand, computer row) | Kept in §0 and §2.4 |

---

## 6. Needs an owner's input

1. ~~Cursor sign-in command~~ RESOLVED 13:34 by AW Mac: `agent login`.
2. ~~Review fee amount~~ LOCKED 13:42: {fee} renders from billing config as "$0.25 per million tokens". "Tokens" is allowed only in this pricing disclosure and the pricing (i), with the (i) line `b.billing.tokensHint`.
3. ~~Which seat~~ LOCKED 13:42: the seat of the member whose assistant or coding tool ran the task (owner's runs → owner's seat). Notices go to that member. 80%/100% vs the overage cap ($10 default); cap 0 → vs the free allowance.
4. **Session limit body** reuses the locked string with an em dash and "hard stop" wording. Keep it verbatim (reuse rule) unless Product reopens that lock.

Resolved: review pricing locked by Thien (13:38) and replaces the unset monthly cap (Lead 13:33) — `b.settings.monthlyCap*`, `b.settings.spent`, `b.settings.capReached` and "No monthly limit set." removed; "20k is about 15,000 words" dropped; dock "one recipient" string moved to slice A5.
