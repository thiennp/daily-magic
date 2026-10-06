import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectActivityEventsSchemaForTests } from "@/lib/projects/acl/activity/ensureProjectActivityEventsSchema";
import { writeProjectActivityEvent } from "@/lib/projects/acl/activity/writeProjectActivityEvent";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => Object.assign(sqlMock, { unsafe: (s: string) => s }),
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

const calls = (needle: string) =>
  sqlMock.mock.calls.filter((call) => String(call[0]).includes(needle));

const event = {
  projectId: "proj-1",
  type: "member.removed",
  actor: { kind: "owner", userId: "owner-1" },
  target: { membershipId: "mem-1", userId: "bot-1", label: "buni@example.com" },
  detail: {
    membershipId: "mem-1",
    memberKind: "bot",
    activity: "You removed Buni",
    email: "x@example.com",
    token: "aw_secret",
    role: "a@b.c",
  },
  sourceRef: "073:e1",
} as const;

describe("writeProjectActivityEvent", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectActivityEventsSchemaForTests();
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  it("inserts sanitized detail (no English, emails or tokens) then trims", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) =>
      String(strings).includes("INSERT INTO project_activity_events") ? [{ id: "evt-1" }] : [],
    );
    await writeProjectActivityEvent(event);
    const insert = calls("INSERT INTO project_activity_events")[0] ?? [];
    expect(JSON.parse(String(insert[11]))).toEqual({ membershipId: "mem-1", memberKind: "bot" });
    expect(insert[9]).toBeNull(); // email-looking label snapshot dropped
    expect(insert[12]).toBe("073:e1");
    expect(insert[13]).toBe("proj-1");
    const trim = calls("DELETE FROM project_activity_events")[0] ?? [];
    expect(trim.slice(1)).toEqual(["proj-1", 180, "proj-1", 500]);
  });

  it("skips the trim when nothing was inserted (missing project / duplicate source_ref)", async () => {
    sqlMock.mockImplementation(async () => []);
    await writeProjectActivityEvent(event);
    expect(calls("INSERT INTO project_activity_events")).toHaveLength(1);
    expect(calls("DELETE FROM project_activity_events")).toHaveLength(0);
  });

  it("never throws and logs no detail when the INSERT fails", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      if (String(strings).includes("INSERT")) {
        throw Object.assign(new Error("check violation"), { code: "23514" });
      }
      return [];
    });
    await expect(writeProjectActivityEvent(event)).resolves.toBeUndefined();
    expect(console.warn).toHaveBeenCalledWith("[project-activity] write skipped", {
      code: "23514",
      type: "member.removed",
      projectId: "proj-1",
    });
  });

  it("never throws when the schema ensure fails", async () => {
    sqlMock.mockRejectedValue(new Error("db down"));
    await expect(writeProjectActivityEvent(event)).resolves.toBeUndefined();
  });
});
