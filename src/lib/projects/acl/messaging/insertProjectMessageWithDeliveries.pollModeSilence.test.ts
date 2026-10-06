import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock(
  "@/lib/db",
  async () =>
    (
      await import("@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries.pollMode.fixtures")
    ).pollModeDbModule,
);
vi.mock(
  "@/lib/projects/acl/webhooks/scheduleProjectMessageWebhookDelivery",
  async () => ({
    scheduleProjectMessageWebhookDelivery: (
      await import("@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries.pollMode.fixtures")
    ).pollModeScheduleMock,
  }),
);
vi.mock(
  "@/lib/projects/acl/webhooks/wakeProjectGrokRoutineWebhooks",
  async () => ({
    wakeProjectGrokRoutineWebhooks: (
      await import("@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries.pollMode.fixtures")
    ).pollModeWakeMock,
  }),
);

import { resetProjectMembershipDeliveryModeSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectMembershipDeliveryModeSchema";
import { insertProjectMessageWithDeliveries } from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries";
import {
  POLL_MODE_SEND_INPUT,
  pollModeSql,
  resetPollModeFixtures,
} from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries.pollMode.fixtures";
import { startProjectMessageSilenceWatch } from "@/lib/projects/acl/messaging/startProjectMessageSilenceWatch";

describe("delivery_mode=poll never enters the 5/10 minute silence path", () => {
  beforeEach(() => {
    resetPollModeFixtures();
    resetProjectMembershipDeliveryModeSchemaEnsureForTests();
  });

  it("only the woken webhook member gets a silence watch", async () => {
    const stored =
      await insertProjectMessageWithDeliveries(POLL_MODE_SEND_INPUT);
    pollModeSql.mockClear();
    await startProjectMessageSilenceWatch({
      messageId: stored.messageId,
      senderMembershipId: "mem-s",
      wakeResults: stored.wakeResults,
      now: new Date("2026-10-06T08:00:00.000Z"),
    });
    const update = pollModeSql.mock.calls.find((call) =>
      call[0].join("?").includes("UPDATE project_message_deliveries"),
    );
    expect(update?.slice(1)).toContainEqual(["mem-wake"]);
    expect(JSON.stringify(update?.slice(1))).not.toContain("mem-poll");
  });
});
