import { describe, expect, it } from "vitest";

import { parseCreateProjectTaskArgs } from "@/lib/projects/tasks/parseProjectTaskToolArgs";

const base = { projectId: "p1", title: "Ship DF-024" };

describe("parseCreateProjectTaskArgs (DF-024)", () => {
  it("defaults status queued + priority unset; scrubs/keeps meta", () => {
    const r = parseCreateProjectTaskArgs({
      ...base,
      stage: "build",
      tipSha: "ABCDEF1",
    });
    expect(r).toEqual({
      ok: true,
      value: {
        projectId: "p1",
        status: "queued",
        fields: { title: "Ship DF-024", stage: "build", tipSha: "abcdef1" },
      },
    });
  });

  it("caps: description ≤200, title ≤120", () => {
    const ok200 = parseCreateProjectTaskArgs({
      ...base,
      description: "d".repeat(200),
    });
    expect(ok200.ok).toBe(true);
    expect(
      parseCreateProjectTaskArgs({ ...base, description: "d".repeat(201) }),
    ).toEqual({
      ok: false,
      code: "description_too_long",
    });
    expect(
      parseCreateProjectTaskArgs({ ...base, title: "t".repeat(121) }),
    ).toEqual({
      ok: false,
      code: "title_too_long",
    });
  });

  it("rejects bodies, bad enums, bad sha, non-initial status", () => {
    const code = (args: Record<string, unknown>) => {
      const r = parseCreateProjectTaskArgs({ ...base, ...args });
      return r.ok ? null : r.code;
    };
    expect(code({ prompt: "x" })).toBe("body_not_allowed");
    expect(code({ body: "x" })).toBe("body_not_allowed");
    expect(code({ priority: "urgent" })).toBe("invalid_priority");
    expect(code({ stage: "qa" })).toBe("invalid_stage");
    expect(code({ tipSha: "xyz" })).toBe("invalid_tip_sha");
    expect(code({ status: "done" })).toBe("invalid_status");
    expect(code({ title: "  " })).toBe("title_required");
    expect(parseCreateProjectTaskArgs({ projectId: "p1" })).toEqual({
      ok: false,
      code: "title_required",
    });
  });

  it("dependsOn: dedupes, rejects blanks and > 20", () => {
    const r = parseCreateProjectTaskArgs({
      ...base,
      dependsOn: ["a", "a", "b"],
    });
    expect(r.ok && r.value.fields.dependsOn).toEqual(["a", "b"]);
    const blank = parseCreateProjectTaskArgs({ ...base, dependsOn: [""] });
    expect(blank).toEqual({ ok: false, code: "invalid_depends_on" });
    const many = Array.from({ length: 21 }, (_, i) => `t${i}`);
    expect(parseCreateProjectTaskArgs({ ...base, dependsOn: many })).toEqual({
      ok: false,
      code: "too_many_depends_on",
    });
  });
});
