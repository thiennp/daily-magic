import type {
  ProjectMessengerBot,
  ProjectMessengerRow,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/** Sample data only (spec.md): Family trip planner, Planner bot, Research bot. */
export const MESSENGER_OWNER = "user-jordan";
export const MESSENGER_PLANNER = "11111111-1111-4111-8111-111111111111";
export const MESSENGER_RESEARCH = "22222222-2222-4222-8222-222222222222";
export const MESSENGER_BOTS: readonly ProjectMessengerBot[] = [
  { membershipId: MESSENGER_PLANNER, displayName: "Planner bot" },
  { membershipId: MESSENGER_RESEARCH, displayName: "Research bot" },
];
export const MESSENGER_BOT_IDS = new Set([
  MESSENGER_PLANNER,
  MESSENGER_RESEARCH,
]);

export const ownerRow = (
  messageId: string,
  overrides: Partial<ProjectMessengerRow> = {},
): ProjectMessengerRow => ({
  messageId,
  kind: "task.assign",
  summary: "Find three campsites near the lake",
  createdAt: "2026-10-05T08:00:00.000Z",
  senderKind: "owner",
  senderMembershipId: null,
  senderUserId: MESSENGER_OWNER,
  senderDisplayName: "Owner",
  recipientKind: "bot",
  toMembershipId: MESSENGER_PLANNER,
  toUserId: "user-planner",
  toTeamLabel: null,
  ...overrides,
});

export const botReplyRow = (
  messageId: string,
  botId: string,
  summary: string,
  overrides: Partial<ProjectMessengerRow> = {},
): ProjectMessengerRow => ({
  messageId,
  kind: "task.status",
  summary,
  createdAt: "2026-10-05T08:05:00.000Z",
  senderKind: "bot",
  senderMembershipId: botId,
  senderUserId: `user-${botId}`,
  senderDisplayName:
    botId === MESSENGER_PLANNER ? "Planner bot" : "Research bot",
  recipientKind: "owner",
  toMembershipId: null,
  toUserId: MESSENGER_OWNER,
  toTeamLabel: null,
  ...overrides,
});

export const WHOLE_ADDRESS = {
  recipientKind: "none",
  toMembershipId: null,
  toUserId: null,
  toTeamLabel: null,
} as const;
