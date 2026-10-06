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
  pollModeDb,
  pollModeScheduledIds,
  pollModeScheduleMock,
  pollModeSql,
  pollModeWakeMock,
  resetPollModeFixtures,
} from "@/lib/projects/acl/messaging/insertProjectMessageWithDeliveries.pollMode.fixtures";

const send = () => insertProjectMessageWithDeliveries(POLL_MODE_SEND_INPUT);

describe("insertProjectMessageWithDeliveries delivery_mode fan-out", () => {
  beforeEach(() => {
    resetPollModeFixtures();
    resetProjectMembershipDeliveryModeSchemaEnsureForTests();
  });

  it("stores a pending row for the poll member but skips its Grok + HMAC wake", async () => {
    const stored = await send();
    const inserts = pollModeSql.mock.calls.filter((call) =>
      call[0].join("?").includes("'pending'"),
    );
    expect(inserts).toHaveLength(2);
    expect(pollModeScheduledIds()).toEqual(["mem-wake"]);
    expect(pollModeWakeMock.mock.calls[0]?.[0].recipientMembershipIds).toEqual([
      "mem-wake",
    ]);
    expect(stored.wakeResults).toEqual([
      { membershipId: "mem-wake", result: "http_200" },
    ]);
  });

  it("webhook members still fan out", async () => {
    pollModeDb.modes = new Map();
    await send();
    expect(pollModeScheduledIds()).toEqual(["mem-poll", "mem-wake"]);
  });

  it("fails open to webhook when delivery_mode cannot be read", async () => {
    pollModeDb.failRead = true;
    await send();
    expect(pollModeScheduleMock).toHaveBeenCalledTimes(1);
    expect(pollModeScheduledIds()).toEqual(["mem-poll", "mem-wake"]);
  });
});
