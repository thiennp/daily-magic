import { beforeEach, describe, expect, it, vi } from "vitest";

import { gateProjectMessageDelete } from "@/lib/projects/acl/messaging/gateProjectMessageDelete";
import { createProjectComputerHistoryFakeSql } from "@/lib/projects/acl/messaging/projectComputerHistoryFakeSql.fixtures";

const fake = vi.hoisted(() => ({
  current: null as ReturnType<
    typeof createProjectComputerHistoryFakeSql
  > | null,
}));

vi.mock("@/lib/db", () => ({
  getSql: () => fake.current?.sql,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

const NOW = new Date("2026-10-20T12:00:00.000Z");
const OLD = "2026-10-10T12:00:00.000Z"; // 10 days
const RECENT = "2026-10-18T12:00:00.000Z"; // 2 days

describe("gateProjectMessageDelete", () => {
  beforeEach(() => {
    fake.current = createProjectComputerHistoryFakeSql();
  });

  it("off: returns the existing rule, no ack lookup", async () => {
    fake.current?.states.set("p1", "off");
    const decision = await gateProjectMessageDelete({
      projectId: "p1",
      messageId: "m1",
      createdAt: OLD,
      existingRuleAllows: true,
      now: NOW,
    });
    expect(decision).toBe("allow");
  });

  it("existing rule fails: deny without touching the database", async () => {
    const sqlSpy = vi.spyOn(fake.current!, "sql");
    const decision = await gateProjectMessageDelete({
      projectId: "p1",
      messageId: "m1",
      createdAt: OLD,
      existingRuleAllows: false,
    });
    expect(decision).toBe("deny");
    expect(sqlSpy).not.toHaveBeenCalled();
  });

  it.each(["on_configuring", "on_ready", "degraded"])(
    "%s: allows with a computerAck",
    async (state) => {
      fake.current?.states.set("p1", state);
      fake.current?.acks.set("p1:m1", "dev-1");
      const decision = await gateProjectMessageDelete({
        projectId: "p1",
        messageId: "m1",
        createdAt: RECENT,
        existingRuleAllows: true,
        now: NOW,
      });
      expect(decision).toBe("allow");
    },
  );

  it.each(["on_configuring", "on_ready", "degraded"])(
    "%s: denies without a computerAck even when overdue",
    async (state) => {
      fake.current?.states.set("p1", state);
      const decision = await gateProjectMessageDelete({
        projectId: "p1",
        messageId: "m1",
        createdAt: OLD,
        existingRuleAllows: true,
        now: NOW,
      });
      expect(decision).toBe("deny");
    },
  );
});
