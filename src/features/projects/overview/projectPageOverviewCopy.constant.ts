/** English production copy for project-page Overview (S2). */
export const PROJECT_PAGE_OVERVIEW_COPY = {
  membersStat: "Members",
  unreadStat: "Unread",
  pitfallsStat: "Pitfalls on",
  compositionStat: "Playbooks · Workflows · Agents",
  attentionOpen: "Open conversation",
  attentionWaitingSuffix:
    "finished work and is waiting for your confirmation.",
  setupTitle: "Finish setup",
  setupSubtitle: (done: number, total: number, device: string) =>
    `${done} of ${total} steps done. Remaining steps open here or on ${device}.`,
  setupProgressLabel: "Setup progress",
  setupDonePill: "Done",
  setupCreateProject: "Create project",
  setupInviteBot: "Invite a bot",
  setupInviteBotHint: (names: string) =>
    names.length > 0 ? `${names} joined` : "No bots in this project yet.",
  setupPlaybook: "Attach a playbook",
  setupPlaybookHint: (device: string) =>
    `No playbook bound yet. Edit on ${device}.`,
  setupPlaybookDoneHint: (count: number) =>
    count === 1 ? "1 playbook bound" : `${count} playbooks bound`,
  setupFolder: "Add a machine folder",
  setupFolderHint: "Tell Cloud which folders this project uses on a Mac.",
  setupFolderDoneHint: (count: number) =>
    count === 1 ? "1 folder linked" : `${count} folders linked`,
  setupGit: "Add a git remote",
  setupGitHint: "Optional. Lets bots clone and push.",
  setupGitDoneHint: (count: number) =>
    count === 1 ? "1 remote saved" : `${count} remotes saved`,
  setupInvitePeople: "Invite a teammate",
  setupInvitePeopleHint: "Right now it is only you.",
  setupInvitePeopleDoneHint: "People can join this project.",
  setupOpenOnMac: "Open on Mac",
  setupAdd: "Add",
  setupInvite: "Invite",
  recentTitle: "Recent activity",
  recentViewAll: "View all",
  recentEmpty: "No messages yet. Activity will show up here.",
  recentKindFallback: "message",
  pitfallsTitle: "Pitfalls on",
  pitfallsView: "View",
  pitfallsMust: (n: number) => `${n} Must fix`,
  pitfallsWarn: (n: number) => `${n} Warning`,
  pitfallsNeverHit: "Never hit",
  pitfallsHit: (n: number) => (n === 1 ? "1 hit logged" : `${n} hits logged`),
  pitfallsBlurb:
    "Known traps bots should avoid while working in this project.",
  pitfallsEmpty: "No active pitfalls yet.",
  pitfallsLoading: "Loading…",
} as const;
