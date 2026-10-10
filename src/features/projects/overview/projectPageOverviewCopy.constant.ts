import { AWC_PROJECT_PITFALLS_COPY } from "@/features/projects/pitfalls/public-api/types";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/public-api/types";
import { THIS_MAC_DEVICE_BADGE_LABEL } from "@/components/ui/badge/thisMacDeviceBadgeLabel.constant";

/**
 * V5-5 Overview — Product EN lock (2026-10-06). Tip constants for strings
 * beyond the locked keys are marked for Product pass on the diff.
 */
export const PROJECT_PAGE_OVERVIEW_COPY = {
  "overview.assistantsCard": "Assistants",
  "overview.importantCount": (n: number) => `${n} Important`,
  "disabled.viewerMessage": HUMAN_INVITE_UI_COPY.viewerMessagesHint,
  thisComputer: THIS_MAC_DEVICE_BADGE_LABEL,

  membersStat: (n: number, pending: number) =>
    pending > 0 ? `${n} members (${pending} pending)` : `${n} members`,
  unreadStat: (n: number) => `${n} unread`,
  safetyRulesStat: (active: number, max: number) =>
    `${active} of ${max} safety ${max === 1 ? "rule" : "rules"} on`,
  /** `agents` = Library agent definitions attached to the project (not assistants). */
  compositionStat: (playbooks: number, workflows: number, agents: number) =>
    `${playbooks} playbooks · ${workflows} workflows · ${agents} agents`,

  attentionTitle: "Needs your attention",
  attentionOpen: "Open conversation",
  attentionUnread: (name: string) => `You have unread messages from ${name}.`,
  attentionRunApprovals: (n: number) =>
    n === 1
      ? "1 task is waiting for your approval."
      : `${n} tasks are waiting for your approval.`,
  attentionJoinRequests: (n: number) =>
    n === 1
      ? "1 request to join is waiting for your approval."
      : `${n} requests to join are waiting for your approval.`,
  attentionSkillQuestions: (n: number) =>
    n === 1
      ? "1 repeated task could be saved as a skill."
      : `${n} repeated tasks could be saved as skills.`,
  attentionReview: "Review",

  setupTitle: "Set up",
  setupBarProgress: (done: number, total: number) =>
    `Set up · ${done} of ${total} done`,
  setupNext: (step: string) => `Next: ${step}`,
  setupHide: "Hide",
  setupHideAria: "Hide the setup checklist",
  setupShow: (done: number, total: number) =>
    `Show setup checklist (${done} of ${total} done)`,
  setupProgressLabel: "Setup progress",
  setupDonePill: "Done",
  /** Tip — Product pass (step titles) */
  setupCreateProject: "Create project",
  setupInviteAssistant: "Invite an assistant",
  setupInviteAssistantHint: (names: string) =>
    names.length > 0 ? `${names} joined` : "No assistants in this project yet.",
  setupPlaybook: "Attach a playbook",
  setupPlaybookHint: "No playbook attached yet. Add one on this computer.",
  setupPlaybookDoneHint: (count: number) =>
    count === 1 ? "1 playbook attached" : `${count} playbooks attached`,
  setupFolder: "Add a folder",
  setupFolderHint: "Where the project files live.",
  setupFolderDoneHint: (count: number) =>
    count === 1 ? "1 folder linked" : `${count} folders linked`,
  setupGit: "Add a code repository",
  setupGitHint: "Optional. Lets assistants get and save the code.",
  setupGitDoneHint: (count: number) =>
    count === 1 ? "1 repository saved" : `${count} repositories saved`,
  setupInvitePeople: "Invite a teammate",
  setupInvitePeopleHint: "Right now it's only you.",
  setupInvitePeopleDoneHint: "People can join this project.",
  setupOpenOnComputer: `Open on ${THIS_MAC_DEVICE_BADGE_LABEL.toLowerCase()}`,
  setupAdd: "Add",
  setupInvite: "Invite",
  setupOptional: "Optional",

  assistantsTeam: "Team",
  assistantsMessage: "Message",
  assistantsEmpty: "No assistants yet.",
  assistantsInvite: "Invite an assistant",
  /** `when` from formatOverviewWhen mid-sentence (e.g. `yesterday 15:15`). */
  assistantsLastTask: (when: string) => `Last task ${when}`,
  assistantsNoTasks: "No tasks yet",
  assistantsSilent: "Hasn't answered yet",

  recentTitle: "Recent activity",
  recentViewAll: "Open Chat",
  recentEmpty: "Nothing yet. Messages show up here.",
  recentOpen: "Open",

  safetyTitle: AWC_PROJECT_PITFALLS_COPY.title,
  safetyView: "View all",
  safetySummary: (
    important: number,
    warning: number,
    note: number,
    active: number,
    max: number,
    hitsLine: string,
  ) =>
    `${important} ${AWC_PROJECT_PITFALLS_COPY.severity.block} · ${warning} ${AWC_PROJECT_PITFALLS_COPY.severity.warn} · ${note} ${AWC_PROJECT_PITFALLS_COPY.severity.info} · ${active} of ${max} ${max === 1 ? "rule" : "rules"} on · ${hitsLine}`,
  /** All-time: summary.totalHits sums hitCount (no 30-day window). */
  safetyHitsNone: "no hits yet",
  safetyHitsSome: (n: number) =>
    n === 1 ? "1 hit logged" : `${n} hits logged`,
  safetyLoading: AWC_PROJECT_PITFALLS_COPY.loading,
  safetyEmpty: AWC_PROJECT_PITFALLS_COPY.empty,
  safetyAllOff: AWC_PROJECT_PITFALLS_COPY.allOff,
} as const;
