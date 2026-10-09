import { beforeEach, describe, expect, it, vi } from "vitest";

const project = vi.hoisted(() => vi.fn());
const membership = vi.hoisted(() => vi.fn());
const isolation = vi.hoisted(() => vi.fn());
const insert = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: project,
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: membership,
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: async () => undefined,
}));
vi.mock("@/lib/projects/acl/messaging/purgeExpiredProjectMessages", () => ({
  purgeExpiredProjectMessages: async () => undefined,
}));
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots",
  () => ({
    loadProjectMessengerBots: async () => [
      { membershipId: "bot-1", userId: "bu", displayName: "Closed bot" },
    ],
  }),
);
vi.mock("@/lib/projects/acl/messaging/checkBotIsolation", () => ({
  checkBotIsolation: isolation,
}));
vi.mock(
  "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries",
  () => ({
    insertProjectMessageWithDeliveries: insert,
  }),
);

import { orchestrateProjectMessengerSend } from "@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend";

describe("orchestrateProjectMessengerSend closed assistants", () => {
  beforeEach(() => {
    for (const m of [project, membership, isolation, insert]) m.mockReset();
    project.mockResolvedValue({ ownerUserId: "owner" });
  });

  it("refuses to message an assistant that is closed to the sender, even for the owner", async () => {
    isolation.mockResolvedValue({
      ok: false,
      code: "bot_closed",
      message: "closed",
    });
    const result = await orchestrateProjectMessengerSend({
      projectId: "p1",
      actorUserId: "owner",
      threadKey: "bot-1",
      body: { text: "hi" },
    });
    expect(result).toMatchObject({ ok: false, code: "bot_closed" });
    expect(insert).not.toHaveBeenCalled();
  });
});
