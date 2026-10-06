import { vi } from "vitest";

/** Test-only: fake delivery_mode rows + wake spies for the poll fan-out tests. */
export const pollModeDb = {
  modes: new Map<string, string>(),
  failRead: false,
};

export const pollModeSql = vi.fn(
  async (strings: TemplateStringsArray, ...values: unknown[]) => {
    if (strings.join("?").includes("SELECT id, delivery_mode")) {
      if (pollModeDb.failRead) throw new Error("column missing");
      const ids = values[1] as string[];
      return ids.map((id) => ({
        id,
        delivery_mode: pollModeDb.modes.get(id) ?? "webhook",
      }));
    }
    return [];
  },
);

export const pollModeDbModule = {
  getSql: () => pollModeSql,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
};

export const pollModeScheduleMock = vi.fn();

type WakeInput = { readonly recipientMembershipIds: readonly string[] };
export const pollModeWakeMock = vi.fn(async (input: WakeInput) =>
  input.recipientMembershipIds.map((membershipId) => ({
    membershipId,
    result: "http_200",
  })),
);

export const pollModeScheduledIds = (): unknown =>
  (
    pollModeScheduleMock.mock.calls[0]?.[0] as {
      recipientMembershipIds: unknown;
    }
  ).recipientMembershipIds;

export const POLL_MODE_SEND_INPUT = {
  projectId: "proj-1",
  senderMembershipId: "mem-s",
  senderUserId: "user-s",
  toMembershipId: null,
  toUserId: null,
  toTeamLabel: "team",
  toProjectDisplayName: null,
  kind: "task.ping",
  summary: "hello",
  refsJson: "{}",
  recipients: [
    { id: "mem-poll", user_id: "user-p" },
    { id: "mem-wake", user_id: "user-w" },
  ],
} as const;

export const resetPollModeFixtures = (): void => {
  pollModeSql.mockClear();
  pollModeScheduleMock.mockClear();
  pollModeWakeMock.mockClear();
  pollModeDb.modes = new Map([["mem-poll", "poll"]]);
  pollModeDb.failRead = false;
};
