import { beforeEach, describe, expect, it, vi } from "vitest";

import { projectTaskDependsOnReaches } from "@/lib/projects/tasks/projectTaskDependsOnReaches";

const h = vi.hoisted(() => ({
  calls: [] as { text: string; values: unknown[] }[],
  rows: [] as Record<string, unknown>[],
}));

vi.mock("@/lib/db", () => ({
  getSql:
    () =>
    (strings: TemplateStringsArray, ...values: unknown[]) => {
      h.calls.push({ text: strings.join("?"), values });
      return Promise.resolve(h.rows);
    },
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

const input = { projectId: "p1", fromIds: ["a", "b"], targetId: "t1" };

describe("projectTaskDependsOnReaches (DF-024 S2 cycle check)", () => {
  beforeEach(() => {
    h.calls.length = 0;
    h.rows = [];
  });

  it("walks depends_on recursively within the project (UNION dedupes)", async () => {
    expect(await projectTaskDependsOnReaches(input)).toBe(false);
    const [{ text, values }] = h.calls;
    expect(text).toContain("WITH RECURSIVE walk");
    expect(text).toContain("UNION\n");
    expect(text).not.toContain("UNION ALL");
    expect(values).toEqual([["a", "b"], "p1", "t1"]);
  });

  it("true when the target is reachable; empty dependsOn skips the query", async () => {
    h.rows = [{ hit: 1 }];
    expect(await projectTaskDependsOnReaches(input)).toBe(true);
    h.calls.length = 0;
    expect(await projectTaskDependsOnReaches({ ...input, fromIds: [] })).toBe(
      false,
    );
    expect(h.calls).toHaveLength(0);
  });
});
