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

describe("orchestrateProjectMessengerSend — roles", () => {
  it("member → one bot, Needs a reply off: chat.note, no watch", async () => {
    getActiveProjectMembership.mockResolvedValue(
      humanSeat("mem-alex", "member", "Alex"),
    );
    const result = await send("user-alex", "mem-planner", {
      text: "Any update?",
    });
    expect(result).toMatchObject({
      ok: true,
      recipientCount: 1,
      watchedCount: 0,
    });
    const message = sqlTexts("INSERT INTO project_messages")[0];
    expect(message.values.slice(2, 5)).toEqual([
      "mem-alex",
      "user-alex",
      "mem-planner",
    ]);
    expect(message.values).toContain("chat.note");
    expect(sqlTexts("UPDATE project_message_deliveries")).toHaveLength(0);
  });

  it("viewer is denied before anything is stored", async () => {
    getActiveProjectMembership.mockResolvedValue(
      humanSeat("mem-sam", "viewer", "Sam"),
    );
    expect(await send("user-sam", "whole", { text: "hello" })).toEqual({
      ok: false,
      code: "viewer_read_only",
    });
    expect(sqlCalls).toHaveLength(0);
  });
});
