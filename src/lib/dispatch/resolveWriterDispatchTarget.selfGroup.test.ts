import { beforeEach, describe, expect, it, vi } from "vitest";

const memberMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/auth/groupMembershipQueries", () => ({
  getMembershipForUserInGroup: memberMock,
}));
vi.mock("@/lib/dispatch/usersShareGroup", () => ({
  usersShareGroup: async () => ({ shared: true, groupId: null }),
}));
vi.mock("@/lib/dispatch/guardAgentRunDispatchBody", () => ({
  guardAgentRunDispatchBody: async () => ({ ok: true }),
}));

import { resolveClaudeDispatchTarget } from "@/lib/dispatch/resolveWriterDispatchTarget";

const dispatch = () =>
  resolveClaudeDispatchTarget({ userId: "me" } as never, {
    prompt: "p",
    groupId: "g-victim",
  });

describe("resolveClaudeDispatchTarget own-computer dispatch", () => {
  beforeEach(() => memberMock.mockReset());

  it("stamps a company on the run only when you belong to it", async () => {
    memberMock.mockResolvedValue(null);
    expect(await dispatch()).toMatchObject({ ok: true, groupId: null });
    memberMock.mockResolvedValue({ id: "m1" });
    expect(await dispatch()).toMatchObject({ ok: true, groupId: "g-victim" });
  });
});
