import { describe, expect, it } from "vitest";

import { parseProjectPitfallHitBody } from "@/features/project-pitfalls/internal/core/parseProjectPitfallHitBody";
import { validUpsertBodyFixture as body } from "@/features/project-pitfalls/internal/core/projectPitfall.fixtures";
import { validateProjectPitfallUpsert } from "@/features/project-pitfalls/internal/core/validateProjectPitfallUpsert";

describe("validateProjectPitfallUpsert", () => {
  it("accepts full content with defaults and normalized keywords", () => {
    const result = validateProjectPitfallUpsert(body({ hitCount: 99 }));
    expect(result).toEqual({
      ok: true,
      input: {
        id: "my-pitfall",
        symptom: "Something breaks",
        cause: "Because of a reason",
        avoidance: "Do the safe thing first",
        check: { kind: "command", value: "npm test" },
        keywords: ["build", "next"],
        tags: [],
        severity: "warn",
        source: "project",
      },
    });
  });

  it.each([
    [{ id: "Bad Id" }, "id"],
    [{ symptom: "x".repeat(121) }, "symptom"],
    [{ cause: "" }, "cause"],
    [{ avoidance: "x".repeat(281) }, "avoidance"],
    [{ check: undefined }, "check.kind"],
    [{ check: { kind: "script", value: "x" } }, "check.kind"],
    [{ check: { kind: "id" } }, "check.value"],
    [{ keywords: "build" }, "keywords"],
    [{ severity: "fatal" }, "severity"],
    [{ source: "seed" }, "source"],
  ])("rejects %j on field %s", (patch, field) => {
    expect(validateProjectPitfallUpsert(body(patch))).toEqual({
      ok: false,
      code: "invalid_arguments",
      field,
    });
  });

  it("accepts retiring via source=retired", () => {
    const result = validateProjectPitfallUpsert(body({ source: "retired" }));
    expect(result.ok && result.input.source).toBe("retired");
  });
});

describe("parseProjectPitfallHitBody", () => {
  const nowMs = Date.parse("2026-10-05T12:00:00.000Z");

  it("defaults to one hit now and clamps future seenAt", () => {
    expect(parseProjectPitfallHitBody(null, nowMs)).toEqual({
      ok: true,
      input: { count: 1, seenAt: "2026-10-05T12:00:00.000Z" },
    });
    const future = parseProjectPitfallHitBody(
      { count: 4, seenAt: "2030-01-01T00:00:00.000Z" },
      nowMs,
    );
    expect(future).toEqual({
      ok: true,
      input: { count: 4, seenAt: "2026-10-05T12:00:00.000Z" },
    });
  });

  it("rejects bad counts and dates", () => {
    expect(parseProjectPitfallHitBody({ count: 0 }, nowMs).ok).toBe(false);
    expect(parseProjectPitfallHitBody({ count: 1.5 }, nowMs).ok).toBe(false);
    expect(parseProjectPitfallHitBody({ seenAt: "nope" }, nowMs).ok).toBe(
      false,
    );
  });
});
