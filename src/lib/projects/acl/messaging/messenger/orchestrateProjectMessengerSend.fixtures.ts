import { vi } from "vitest";

/**
 * One module standing in for every dependency of orchestrateProjectMessengerSend
 * except the real insert + silence-watch SQL, which is recorded here.
 * Sample data only (Family trip planner).
 */
export const sqlCalls: { text: string; values: unknown[] }[] = [];

export const sqlMock = vi.fn(
  async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.join("?");
    sqlCalls.push({ text, values });
    const ids =
      values.find((value): value is string[] => Array.isArray(value)) ?? [];
    return text.includes("UPDATE project_message_deliveries")
      ? ids.map((id) => ({ id }))
      : [];
  },
);
export const getSql = () => sqlMock;
export const asRowArray = (rows: unknown) => (Array.isArray(rows) ? rows : []);
export const sqlTexts = (needle: string) =>
  sqlCalls.filter((call) => call.text.includes(needle));

export const getUserProjectById = async () => ({
  id: "proj-trip",
  ownerUserId: "user-jordan",
});
export const getActiveProjectMembership = vi.fn();
export const humanSeat = (
  id: string,
  role: "member" | "viewer",
  name: string,
) =>
  ({
    id,
    role,
    memberKind: "human",
    status: "active",
    scopes: [],
    projectDisplayName: name,
  }) as never;

export const ensureProjectAclSchema = async () => undefined;
export const purgeExpiredProjectMessages = async () => 0;
export const assertProjectMessageDispatchRateLimits = async () => ({
  ok: true,
});
export const loadProjectMessengerBots = async () => [
  {
    membershipId: "mem-planner",
    userId: "user-planner",
    displayName: "Planner bot",
    deliveryMode: "webhook" as const,
  },
  {
    membershipId: "mem-research",
    userId: "user-research",
    displayName: "Research bot",
    deliveryMode: "webhook" as const,
  },
];
export const scheduleProjectMessageWebhookDelivery = () => undefined;
export const wakeProjectMessageGrokRoutines = async (input: {
  readonly recipientMembershipIds: readonly string[];
}) =>
  input.recipientMembershipIds.map((membershipId) => ({
    membershipId,
    result: "http_200",
  }));
