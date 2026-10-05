import { describe, expect, it } from "vitest";

import { collectLiveForeignKeys } from "@/lib/projects/delete/collectProjectForeignKeys.testUtils";
import {
  PROJECT_DELETE_SET_NULL_REFERENCES,
  PROJECT_DELETE_TABLES_IN_ORDER,
} from "@/lib/projects/delete/projectDeleteTables.constant";

const DELETED: readonly string[] = PROJECT_DELETE_TABLES_IN_ORDER;

describe("project delete table coverage (from migrations)", () => {
  const refs = collectLiveForeignKeys().filter((ref) =>
    DELETED.includes(ref.parent),
  );

  it("finds the known project / membership / message references", () => {
    const children = new Set(refs.map((ref) => ref.table));
    for (const table of [
      "project_memberships",
      "project_membership_grok_routine_webhooks",
      "project_grok_routine_wake_attempts",
      "project_message_deliveries",
      "project_api_keys",
    ]) {
      expect(children.has(table)).toBe(true);
    }
  });

  it("every table that references a deleted table is deleted, or only SET NULL-linked", () => {
    for (const ref of refs) {
      if (DELETED.includes(ref.table)) continue;
      expect(ref.action, `${ref.table}.${ref.column}`).toBe("SET NULL");
      expect(PROJECT_DELETE_SET_NULL_REFERENCES).toContain(
        `${ref.table}.${ref.column}`,
      );
    }
  });

  it("child rows are deleted before the parent they reference", () => {
    for (const ref of refs) {
      if (!DELETED.includes(ref.table) || ref.table === ref.parent) continue;
      expect(
        DELETED.indexOf(ref.table),
        `${ref.table} before ${ref.parent}`,
      ).toBeLessThan(DELETED.indexOf(ref.parent));
    }
  });

  it("every FK to user_projects / project_memberships also cascades at the DB level", () => {
    for (const ref of refs) {
      if (!DELETED.includes(ref.table)) continue;
      if (
        ref.parent !== "user_projects" &&
        ref.parent !== "project_memberships"
      )
        continue;
      if (ref.column === "to_membership_id") continue;
      expect(ref.action, `${ref.table}.${ref.column}`).toBe("CASCADE");
    }
  });

  it("lists every SET NULL reference that actually exists", () => {
    const setNull = refs
      .filter((ref) => !DELETED.includes(ref.table))
      .map((ref) => `${ref.table}.${ref.column}`)
      .sort();
    expect(setNull).toEqual([...PROJECT_DELETE_SET_NULL_REFERENCES].sort());
  });
});
