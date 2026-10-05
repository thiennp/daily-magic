import { beforeEach, describe, expect, it, vi } from "vitest";

import { orchestrateProjectMessengerSend } from "@/lib/projects/acl/messaging/messenger/orchestrateProjectMessengerSend";
import {
  getActiveProjectMembership,
  humanSeat,
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

beforeEach(() => {
  sqlCalls.length = 0;
  getActiveProjectMembership.mockReset();
});

describe("orchestrateProjectMessengerSend — Whole project", () => {
  it("one message, one delivery + silence watch per bot", async () => {
    const result = await send("user-jordan", "whole", {
      text: "Plan day 2",
      needsReply: true,
    });
    expect(result).toMatchObject({
      ok: true,
      threadKey: "whole",
      recipientCount: 2,
      watchedCount: 2,
    });
    const message = sqlTexts("INSERT INTO project_messages");
    expect(message).toHaveLength(1);
    // owner sender (no membership); no membership / user / team address
    expect(message[0].values.slice(2, 7)).toEqual([
      null,
      "user-jordan",
      null,
      null,
      null,
    ]);
    expect(message[0].values).toContain("task.assign");
    const deliveries = sqlTexts("INSERT INTO project_message_deliveries");
    expect(deliveries.map((call) => call.values[2])).toEqual([
      "mem-planner",
      "mem-research",
    ]);
    const watch = sqlTexts("UPDATE project_message_deliveries");
    expect(watch[0].values).toContain("awaiting_first_activity");
    expect(watch[0].values).toContainEqual(["mem-planner", "mem-research"]);
  });

  it("unknown thread key is thread_not_found and stores nothing", async () => {
    expect(await send("user-jordan", "mem-gone", { text: "hello" })).toEqual({
      ok: false,
      code: "thread_not_found",
    });
    expect(sqlTexts("INSERT")).toHaveLength(0);
  });
});
