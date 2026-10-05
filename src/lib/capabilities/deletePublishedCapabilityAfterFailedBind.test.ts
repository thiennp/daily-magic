import { beforeEach, describe, expect, it, vi } from "vitest";

import deletePublishedCapabilityAfterFailedBind from "@/lib/capabilities/deletePublishedCapabilityAfterFailedBind";

const mocks = vi.hoisted(() => ({
  sql: vi.fn(async () => []),
}));

vi.mock("@/lib/db", () => ({
  getSql: () => mocks.sql,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

describe("deletePublishedCapabilityAfterFailedBind", () => {
  beforeEach(() => {
    mocks.sql.mockReset();
    mocks.sql.mockResolvedValue([]);
  });

  it("scopes every DELETE to exact created ids and owner_user_id", async () => {
    await deletePublishedCapabilityAfterFailedBind({
      ownerUserId: "user-1",
      capabilityId: "cap-new",
      componentId: "comp-new",
      capabilityVersionId: "cver-new",
      componentVersionId: "compver-new",
    });

    const calls = mocks.sql.mock.calls as unknown as unknown[][];
    const texts = calls.map((call) => {
      const template = call[0];
      if (
        typeof template === "object" &&
        template !== null &&
        Symbol.iterator in (template as object)
      ) {
        return Array.from(template as Iterable<string>)
          .join(" ")
          .replace(/\s+/g, " ");
      }
      return String(template ?? "");
    });

    expect(texts.some((t) => t.includes("DELETE FROM components"))).toBe(true);
    expect(texts.some((t) => t.includes("DELETE FROM published_capabilities"))).toBe(
      true,
    );

    // Bound params: never a loose OR published_capability_id predicate without id.
    const allSql = texts.join("\n");
    expect(allSql).not.toMatch(/published_capability_id\s*=/);
    expect(allSql).not.toMatch(/OR\s+published_capability_id/);

    const flatValues = mocks.sql.mock.calls.flatMap((call) => call.slice(1));
    expect(flatValues).toContain("cap-new");
    expect(flatValues).toContain("comp-new");
    expect(flatValues).toContain("user-1");
    expect(flatValues).toContain("cver-new");
    expect(flatValues).toContain("compver-new");
    // Sibling ids must not appear in the delete predicates.
    expect(flatValues).not.toContain("cap-sibling");
    expect(flatValues).not.toContain("comp-sibling");
  });
});
