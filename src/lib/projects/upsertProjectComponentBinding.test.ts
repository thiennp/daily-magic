import { beforeEach, describe, expect, it, vi } from "vitest";

import upsertProjectComponentBinding from "@/lib/projects/upsertProjectComponentBinding";

const mocks = vi.hoisted(() => ({
  sql: vi.fn(async () => []),
}));

vi.mock("@/lib/db", () => ({
  getSql: () => mocks.sql,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("upsertProjectComponentBinding", () => {
  beforeEach(() => {
    mocks.sql.mockReset();
    mocks.sql.mockResolvedValue([]);
  });

  it("uses one ON CONFLICT upsert; insert and update both force enabled=true", async () => {
    await upsertProjectComponentBinding({
      projectId: "proj-1",
      componentId: "comp-1",
      kind: "agent",
      pinnedVersionId: null,
    });

    expect(mocks.sql).toHaveBeenCalledTimes(1);
    const calls = mocks.sql.mock.calls as unknown as unknown[][];
    const template = calls[0]?.[0];
    const sqlText =
      typeof template === "object" &&
      template !== null &&
      Symbol.iterator in (template as object)
        ? Array.from(template as Iterable<string>)
            .join(" ")
            .replace(/\s+/g, " ")
        : String(template ?? "");
    expect(sqlText).toContain("ON CONFLICT");
    expect(sqlText).toContain("DO UPDATE SET");
    // INSERT VALUES embeds true; DO UPDATE sets enabled = true (same rule).
    expect(sqlText).toMatch(/,\s*true\s*,/);
    expect(sqlText).toMatch(/enabled = true/);
  });
});
