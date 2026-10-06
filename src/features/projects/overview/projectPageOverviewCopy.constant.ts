import { AWC_PROJECT_PITFALLS_COPY } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
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
    `${active} of ${max} safety rules on`,
  compositionStat: (playbooks: number, workflows: number, agents: number) =>
    `${playbooks} playbooks · ${workflows} workflows · ${agents} agents`,

  attentionTitle: "Needs your attention",
  attentionOpen: "Open conversation",
  /** Tip — Product pass */
  attentionWaiting: (name: string) =>
    `${name} finished and is waiting for you to confirm`,

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
  setupPlaybookHint: `No playbook bound yet. Edit on ${THIS_MAC_DEVICE_BADGE_LABEL.toLowerCase()}.`,
  setupPlaybookDoneHint: (count: number) =>
    count === 1 ? "1 playbook bound" : `${count} playbooks bound`,
  setupFolder: "Add a computer folder",
  setupFolderHint: "Where the project files live.",
  setupFolderDoneHint: (count: number) =>
    count === 1 ? "1 folder linked" : `${count} folders linked`,
  setupGit: "Add a git remote",
  setupGitHint: "Optional. Lets assistants clone and push.",
  setupGitDoneHint: (count: number) =>
    count === 1 ? "1 remote saved" : `${count} remotes saved`,
  setupInvitePeople: "Invite a teammate",
  setupInvitePeopleHint: "Right now it is only you.",
  setupInvitePeopleDoneHint: "People can join this project.",
  setupOpenOnComputer: `Open on ${THIS_MAC_DEVICE_BADGE_LABEL.toLowerCase()}`,
  setupAdd: "Add",
  setupInvite: "Invite",
  setupOptional: "Optional",

  assistantsTeam: "Team",
  assistantsMessage: "Message",
  assistantsEmpty: "No assistants yet.",
  assistantsInvite: "Invite an assistant",
  /** Tip — Product pass */
  assistantsLastTask: (when: string) => `Last task ${when}`,
  assistantsNoTasks: "No tasks yet",
  assistantsSilent: "Has not answered yet",

  recentTitle: "Recent activity",
  recentViewAll: "Open Activity",
  /** Tip — Product pass */
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
    `${important} ${AWC_PROJECT_PITFALLS_COPY.severity.block} · ${warning} ${AWC_PROJECT_PITFALLS_COPY.severity.warn} · ${note} ${AWC_PROJECT_PITFALLS_COPY.severity.info} · ${active} of ${max} on · ${hitsLine}`,
  safetyHitsNone: "no hits in 30 days",
  safetyHitsSome: (n: number) =>
    n === 1 ? "1 hit in the last 30 days" : `${n} hits in the last 30 days`,
  safetyLoading: AWC_PROJECT_PITFALLS_COPY.loading,
  safetyEmpty: AWC_PROJECT_PITFALLS_COPY.empty,
} as const;
