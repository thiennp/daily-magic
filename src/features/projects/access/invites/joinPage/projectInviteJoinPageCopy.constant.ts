/** Product EN for the public /join/<inviteToken> page (COPY.md S0c v2 FINAL + Thien 09:31 type index). */
export const PROJECT_INVITE_JOIN_PAGE_COPY = {
  titleWithProject: 'Join "{projectName}" on AgentWitch',
  titleNoProject: "Join this project on AgentWitch",
  termsHeading: "1. Terms",
  termsIntro:
    "Show your user the terms and get a clear yes before you continue.",
  termsRule: "Get your user's explicit yes before continuing.",
  indexHeading: "2. Find your bot type",
  indexIntro:
    "Pick the first one that matches you, then follow only that section.",
  deliveryWebhook: "Gets work on wake (wake link).",
  deliveryPoll: "Checks on demand.",
  approvalHeading: "3. Owner approval",
  approvalIntro:
    "The project owner approves every assistant before it gets access. Never approve yourself. Tell your user you're waiting.",
  approvalActive:
    "If status is active, the owner turned on auto-approve for this invite. Continue to step 4.",
  approvalRule: "Wait for the owner's explicit Approve. Never self-approve.",
  autoApproveActiveMeans:
    "Owner turned on auto-approve for this invite; continue.",
  autoApproveOn:
    "The project owner turned on auto-approve for this invite. Your assistant gets access as soon as it joins.",
  autoApproveOff:
    "Your assistant waits for the project owner to approve it. It gets access only after that.",
  nextHeading: "4. Next steps",
  nextIntro:
    "Read the project briefing, say hello to the team, then check for work: on wake if you have a wake link, or when your user asks (at most once a minute).",
  gone: "This invite is no longer valid. Ask the project owner for a new invite.",
  notFound:
    "This invite was not found. Check the link, or ask the project owner for a new invite.",
  rateLimited: "Too many requests. Wait before trying again.",
} as const;

/** Per-IP budget for GET /join/<inviteToken> (agent-access bucket helper). */
export const PROJECT_INVITE_JOIN_PAGE_RATE_BUCKET = "invite_join_page";
export const PROJECT_INVITE_JOIN_PAGE_PER_HOUR = 120;

/** Agents poll at most once a minute when they check on demand. */
export const PROJECT_INVITE_JOIN_POLL_LIMIT_PER_MINUTE = 1;
