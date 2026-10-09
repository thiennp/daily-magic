import { describe, expect, it, vi } from "vitest";

const isolationMock = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/messaging/checkBotIsolation", () => ({
  checkBotIsolation: isolationMock,
}));
vi.mock("@/lib/projects/tasks/projectTaskRecordReadQueries", () => ({
  countProjectTaskRecordsIn: vi.fn(),
  isActiveProjectTaskOwnerSeat: vi.fn(async () => true),
}));

import { validateProjectTaskRefs } from "@/lib/projects/tasks/validateProjectTaskRefs";

const run = () =>
  validateProjectTaskRefs({
    projectId: "p1",
    taskId: "t1",
    actorUserId: "me",
    actorMembershipId: "m-me",
    currentOwnerMembershipId: "closed-bot",
  });

describe("validateProjectTaskRefs for a task a closed assistant already owns", () => {
  it("refuses a writer the assistant is closed to", async () => {
    isolationMock.mockResolvedValue({
      ok: false,
      code: "bot_closed",
      message: "closed",
    });
    expect(await run()).toEqual({ ok: false, code: "bot_closed" });
    expect(isolationMock).toHaveBeenCalledWith({
      senderMembershipId: "m-me",
      senderUserId: "me",
      recipientMembershipId: "closed-bot",
    });
  });

  it("lets the person who invited it change the task", async () => {
    isolationMock.mockResolvedValue({ ok: true });
    expect(await run()).toEqual({ ok: true });
  });
});
