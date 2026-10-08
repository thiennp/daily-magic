import { beforeEach, describe, expect, it, vi } from "vitest";

import { orchestrateProjectMessengerSend } from "@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend";
import {
  getActiveProjectMembership,
  loadProjectMessengerBots,
  sqlCalls,
  sqlTexts,
} from "@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend.fixtures";

vi.mock(
  "@/lib/db",
  () =>
    import("@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend.fixtures"),
);
vi.mock(
  "@/lib/projects/userProjectQueries",
  () =>
    import("@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend.fixtures"),
);
vi.mock(
  "@/lib/projects/acl/getActiveProjectMembership",
  () =>
    import("@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend.fixtures"),
);
vi.mock(
  "@/lib/projects/acl/ensureProjectAclSchema",
  () =>
    import("@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend.fixtures"),
);
vi.mock(
  "@/lib/projects/acl/messaging/purgeExpiredProjectMessages",
  () =>
    import("@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend.fixtures"),
);
vi.mock(
  "@/lib/projects/acl/messaging/assertProjectMessageDispatchRateLimits",
  () =>
    import("@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend.fixtures"),
);
vi.mock(
  "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots",
  () =>
    import("@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend.fixtures"),
);
vi.mock(
  "@/lib/projects/acl/webhooks/scheduleProjectMessageWebhookDelivery",
  () =>
    import("@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend.fixtures"),
);
vi.mock(
  "@/lib/projects/acl/messaging/wakeProjectMessageGrokRoutines",
  () =>
    import("@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend.fixtures"),
);

const send = (actorUserId: string, threadKey: string, body: unknown) =>
  orchestrateProjectMessengerSend({
    projectId: "proj-trip",
    actorUserId,
    threadKey,
    body,
  });

const bot = (membershipId: string, displayName: string) => ({
  membershipId,
  userId: `u-${membershipId}`,
  displayName,
  deliveryMode: "webhook" as const,
});

beforeEach(() => {
  sqlCalls.length = 0;
  getActiveProjectMembership.mockReset();
});

describe("orchestrateProjectMessengerSend — Whole project", () => {
  it("rejects whole thread when there is more than 1 bot", async () => {
    loadProjectMessengerBots.mockResolvedValueOnce([
      bot("b1", "Scout"),
      bot("b2", "Forge"),
    ]);
    const result = await send("user-jordan", "whole", {
      text: "Plan day 2",
      needsReply: true,
    });
    expect(result).toMatchObject({
      ok: false,
      code: "single_recipient_required",
    });
  });

  it("maps whole thread to the single bot if there is exactly 1 bot", async () => {
    loadProjectMessengerBots.mockResolvedValueOnce([
      bot("mem-planner", "Planner"),
    ]);
    const result = await send("user-jordan", "whole", {
      text: "Plan day 2",
      needsReply: true,
    });
    expect(result).toMatchObject({
      ok: true,
      threadKey: "whole",
      recipientCount: 1,
      watchedCount: 1,
    });
    const message = sqlTexts("INSERT INTO project_messages");
    expect(message).toHaveLength(1);
    expect(message[0].values.slice(2, 7)).toEqual([
      null,
      "user-jordan",
      null,
      null,
      null,
    ]);
    const deliveries = sqlTexts("INSERT INTO project_message_deliveries");
    expect(deliveries.map((call) => call.values[2])).toEqual(["mem-planner"]);
    const watch = sqlTexts("UPDATE project_message_deliveries");
    expect(watch[0].values).toContain("awaiting_first_activity");
  });

  it("unknown thread key is thread_not_found and stores nothing", async () => {
    expect(await send("user-jordan", "mem-gone", { text: "hello" })).toEqual({
      ok: false,
      code: "thread_not_found",
    });
    expect(sqlTexts("INSERT")).toHaveLength(0);
  });
});
