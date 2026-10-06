import type {
  AwcMessengerBotStatus,
  AwcMessengerBotThread,
  AwcMessengerThreadList,
  AwcMessengerThreadSummary,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";

const asRecord = (value: unknown): Record<string, unknown> | null => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
};

const parseSummary = (value: unknown): AwcMessengerThreadSummary | null => {
  const row = asRecord(value);
  if (row === null) return null;
  return {
    lastMessageAt:
      typeof row.lastMessageAt === "string" ? row.lastMessageAt : null,
    lastPreview: typeof row.lastPreview === "string" ? row.lastPreview : null,
    unreadCount:
      typeof row.unreadCount === "number" && Number.isFinite(row.unreadCount)
        ? row.unreadCount
        : 0,
  };
};

const parseStatus = (value: unknown): AwcMessengerBotStatus => {
  if (
    value === "working" ||
    value === "silent" ||
    value === "idle" ||
    value === "checks_on_demand"
  ) {
    return value;
  }
  return "idle";
};

const parseBot = (value: unknown): AwcMessengerBotThread | null => {
  const row = asRecord(value);
  if (row === null || typeof row.membershipId !== "string") return null;
  const summary = parseSummary(row);
  if (summary === null) return null;
  return {
    ...summary,
    membershipId: row.membershipId,
    displayName: typeof row.displayName === "string" ? row.displayName : null,
    status: parseStatus(row.status),
  };
};

export const parseMessengerThreadList = (
  payload: unknown,
): AwcMessengerThreadList | null => {
  const body = asRecord(payload);
  if (body === null || body.ok !== true) return null;
  const whole = parseSummary(body.wholeProject);
  if (whole === null) return null;
  const botsRaw = Array.isArray(body.bots) ? body.bots : [];
  const bots = botsRaw
    .map(parseBot)
    .filter((bot): bot is AwcMessengerBotThread => bot !== null);
  return {
    wholeProject: whole,
    bots,
    canSend: body.canSend === true,
  };
};
