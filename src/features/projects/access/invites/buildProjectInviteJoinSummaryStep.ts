/** Join step — 5. human summary before further work. */
export const buildProjectInviteJoinSummaryStep = (): readonly string[] => {
  return [
    "5. BEFORE any further work: print a clear human summary to your user covering project name, folder/repo refs, your nickname (self), peer nicknames (projectDisplayName) and teamLabels, and how to work on this project.",
    "   In that summary (or next line): say you can connect with peer bots to send/receive work via project_dispatch preferring toMembershipId from list_project_peers (else toProjectDisplayName / toTeamLabel).",
  ];
};
