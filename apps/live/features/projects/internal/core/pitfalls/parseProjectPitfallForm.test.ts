import { describe, expect, it } from "vitest";

import parseProjectPitfallForm, {
  buildNewProjectPitfallId,
  splitPitfallList,
} from "./parseProjectPitfallForm";

const form = (entries: Record<string, string>): URLSearchParams =>
  new URLSearchParams(entries);

describe("parseProjectPitfallForm", () => {
  it("builds a new project pitfall with a generated id and command check", () => {
    const result = parseProjectPitfallForm({
      form: form({
        symptom: "  Migrations   run twice ",
        avoidance: "Check the migration table first.",
        cause: "Two workers start together.",
        keywords: "migration, Migration, db\nworker",
        checkCommand: "npm run db:status",
        severity: "block",
      }),
      randomSuffix: () => "abc123",
    });
    expect(result).toEqual({
      ok: true,
      pitfall: {
        id: "project-migrations-run-twice-abc123",
        symptom: "Migrations run twice",
        cause: "Two workers start together.",
        avoidance: "Check the migration table first.",
        check: { kind: "command", value: "npm run db:status" },
        keywords: ["migration", "db", "worker"],
        tags: [],
        source: "project",
        severity: "block",
      },
    });
  });

  it("keeps a seed id on edit so the save becomes a project override", () => {
    const result = parseProjectPitfallForm({
      form: form({
        pitfallId: "seed-stale-lockfile",
        symptom: "Install fails",
        cause: "Lockfile drift.",
        avoidance: "Clean install.",
        tags: "deps",
      }),
      randomSuffix: () => "unused",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.pitfall.id).toBe("seed-stale-lockfile");
      expect(result.pitfall.source).toBe("project");
      expect(result.pitfall.check).toEqual({
        kind: "id",
        value: "seed-stale-lockfile",
      });
      expect(result.pitfall.severity).toBe("warn");
      expect(result.pitfall.tags).toEqual(["deps"]);
    }
  });

  it("rejects missing title/cause/fix and over-cap fields", () => {
    const base = {
      symptom: "Title",
      cause: "Why",
      avoidance: "Fix",
    };
    const run = (entries: Record<string, string>) =>
      parseProjectPitfallForm({
        form: form(entries),
        randomSuffix: () => "x",
      }).ok;
    expect(run({ ...base, symptom: " " })).toBe(false);
    expect(run({ ...base, cause: "" })).toBe(false);
    expect(run({ ...base, avoidance: "" })).toBe(false);
    expect(run({ ...base, symptom: "a".repeat(121) })).toBe(false);
    expect(run({ ...base, cause: "a".repeat(201) })).toBe(false);
    expect(run({ ...base, avoidance: "a".repeat(281) })).toBe(false);
    expect(
      run({
        ...base,
        symptom: "a".repeat(120),
        avoidance: "b".repeat(280),
        cause: "c".repeat(200),
      }),
    ).toBe(true);
  });
});

describe("helpers", () => {
  it("falls back to a generic slug within the id pattern", () => {
    expect(buildNewProjectPitfallId("!!!", "ff00aa")).toBe(
      "project-pitfall-ff00aa",
    );
  });

  it("dedupes, lowercases, and caps list entries", () => {
    expect(
      splitPitfallList(
        Array.from({ length: 30 }, (_, i) => `k${i}`).join(","),
        24,
        40,
      ),
    ).toHaveLength(24);
    expect(splitPitfallList(" , ,", 24, 40)).toEqual([]);
  });
});
