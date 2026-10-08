import { describe, expect, it } from "vitest";

import { encodeProjectActivityCursor } from "@/lib/projects/acl/activity/projectActivityCursor";
import { parseListProjectTasksArgs } from "@/lib/projects/tasks/parseListProjectTasksArgs";

const limitOf = (limit: unknown): number | null => {
  const parsed = parseListProjectTasksArgs({ projectId: "p1", limit });
  return parsed.ok ? parsed.value.limit : null;
};

describe("parseListProjectTasksArgs", () => {
  it("defaults: no status, limit 50, no cursor", () => {
    expect(parseListProjectTasksArgs({ projectId: " p1 " })).toEqual({
      ok: true,
      value: {
        projectId: "p1",
        status: null,
        limit: 50,
        sort: "updated",
        mine: false,
        ownerMembershipId: null,
        cursor: null,
        priorityCursor: null,
      },
    });
  });

  it("clamps limit to 1–100 and floors it", () => {
    expect(limitOf(500)).toBe(100);
    expect(limitOf(0)).toBe(1);
    expect(limitOf(7.9)).toBe(7);
    expect(limitOf("20")).toBe(50);
    expect(limitOf(Number.NaN)).toBe(50);
  });

  it("accepts a valid cursor and every task status", () => {
    const cursor = encodeProjectActivityCursor({
      at: "2026-10-07T10:05:00.123456Z",
      id: "task-2",
    });
    const parsed = parseListProjectTasksArgs({
      projectId: "p1",
      status: "done",
      cursor,
    });
    expect(parsed).toMatchObject({
      ok: true,
      value: { status: "done", cursor: { id: "task-2" } },
    });
  });

  it("rejects missing projectId, arrays, unknown status, bad cursor", () => {
    expect(parseListProjectTasksArgs([])).toMatchObject({ ok: false });
    expect(parseListProjectTasksArgs({})).toEqual({
      ok: false,
      code: "invalid_arguments",
    });
    expect(
      parseListProjectTasksArgs({ projectId: "p1", status: "doing" }),
    ).toEqual({ ok: false, code: "invalid_status" });
    expect(
      parseListProjectTasksArgs({ projectId: "p1", cursor: "bad" }),
    ).toEqual({ ok: false, code: "invalid_cursor" });
  });
});
