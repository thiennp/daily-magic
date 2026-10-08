import { beforeEach, describe, expect, it, vi } from "vitest";

import { canActorEditProjectTask } from "@/lib/projects/tasks/canActorEditProjectTask";
import { projectTaskSeat } from "@/lib/projects/tasks/projectTask.fixtures";

const linked = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser", () => ({
  isBotLinkedToOwnerUser: linked,
}));

const foreignTask = { createdByUserId: "u9", ownerMembershipId: "s9" };
const run = (membership = projectTaskSeat(), actorUserId = "bot-user") =>
  canActorEditProjectTask({
    task: foreignTask,
    actorUserId,
    ownerUserId: "owner-1",
    membership,
  });

describe("canActorEditProjectTask", () => {
  beforeEach(() => {
    linked.mockReset();
  });

  it("owner-claimed bot edits a task it neither created nor owns", async () => {
    linked.mockResolvedValue(true);
    expect(await run()).toBe(true);
    expect(linked).toHaveBeenCalledWith({
      botUserId: "bot-user",
      ownerUserId: "owner-1",
    });
  });

  it("bot claimed by someone else (or unclaimed) is denied", async () => {
    linked.mockResolvedValue(false);
    expect(await run()).toBe(false);
  });

  it("human members never get the owner bypass", async () => {
    linked.mockResolvedValue(true);
    expect(
      await run(projectTaskSeat({ memberKind: "human", userId: "h1" }), "h1"),
    ).toBe(false);
    expect(linked).not.toHaveBeenCalled();
  });

  it("owner and own/created tasks pass without the link lookup", async () => {
    expect(await run(null as never, "owner-1")).toBe(true);
    expect(
      await canActorEditProjectTask({
        task: { createdByUserId: "bot-user", ownerMembershipId: null },
        actorUserId: "bot-user",
        ownerUserId: "owner-1",
        membership: projectTaskSeat(),
      }),
    ).toBe(true);
    expect(linked).not.toHaveBeenCalled();
  });
});
