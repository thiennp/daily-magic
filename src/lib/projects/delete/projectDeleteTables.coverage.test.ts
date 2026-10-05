import { describe, expect, it } from "vitest";

import { collectLiveForeignKeys } from "@/lib/projects/delete/collectProjectForeignKeys.testUtils";
import {
  PROJECT_DELETE_CASCADE_CHILD_TABLES,
  PROJECT_DELETE_SET_NULL_REFERENCES,
} from "@/lib/projects/delete/projectDeleteTables.constant";

const CASCADE_CHILDREN: readonly string[] = PROJECT_DELETE_CASCADE_CHILD_TABLES;

/** Tables whose rows go away (or whose links are cleared) when user_projects is deleted. */
const DELETE_GRAPH_PARENTS = ["user_projects", ...CASCADE_CHILDREN] as const;

describe("project delete CASCADE coverage (from migrations)", () => {
  const refs = collectLiveForeignKeys().filter((ref) =>
    (DELETE_GRAPH_PARENTS as readonly string[]).includes(ref.parent),
  );

  it("finds the known project / membership / message child tables", () => {
    const children = new Set(refs.map((ref) => ref.table));
    for (const table of [
      "project_memberships",
      "project_invites",
      "project_membership_webhooks",
      "project_membership_grok_routine_webhooks",
      "project_messages",
      "project_message_deliveries",
      "project_grok_routine_wake_attempts",
      "project_access_requests",
      "project_api_keys",
    ]) {
      expect(children.has(table)).toBe(true);
    }
  });

  it("every child of user_projects is CASCADE (or intentional SET NULL)", () => {
    for (const ref of refs.filter((r) => r.parent === "user_projects")) {
      if (ref.action === "SET NULL") {
        expect(PROJECT_DELETE_SET_NULL_REFERENCES).toContain(
          `${ref.table}.${ref.column}`,
        );
        continue;
      }
      expect(ref.action, `${ref.table}.${ref.column}`).toBe("CASCADE");
      expect(CASCADE_CHILDREN).toContain(ref.table);
    }
  });

  it("every child of a cascade-deleted table is CASCADE (or SET NULL among cascade children)", () => {
    for (const ref of refs) {
      if (ref.parent === "user_projects") continue;
      if (ref.action === "SET NULL") {
        // Internal (e.g. messages.to_membership_id) or external survivors
        // (e.g. agent_runs.composition_snapshot_id → SET NULL).
        if (CASCADE_CHILDREN.includes(ref.table)) {
          continue;
        }
        expect(PROJECT_DELETE_SET_NULL_REFERENCES).toContain(
          `${ref.table}.${ref.column}`,
        );
        continue;
      }
      expect(ref.action, `${ref.table}.${ref.column}`).toBe("CASCADE");
      expect(CASCADE_CHILDREN).toContain(ref.table);
    }
  });

  it("lists every cascade child that actually references the delete graph", () => {
    const cascadeChildren = new Set(
      refs
        .filter((ref) => ref.action === "CASCADE")
        .map((ref) => ref.table)
        .filter((table) => table !== "user_projects"),
    );
    expect([...cascadeChildren].sort()).toEqual([...CASCADE_CHILDREN].sort());
  });

  it("lists every external SET NULL reference that survives project delete", () => {
    // Include SET NULL FKs onto user_projects even when the child table is also
    // cascade-reachable through another parent (e.g. agent_automations via
    // capability after 069). Other SET NULL refs only count when the child
    // table is outside the cascade set.
    const setNull = refs
      .filter(
        (ref) =>
          ref.action === "SET NULL" &&
          (ref.parent === "user_projects" ||
            !CASCADE_CHILDREN.includes(ref.table)),
      )
      .map((ref) => `${ref.table}.${ref.column}`)
      .sort();
    expect(setNull).toEqual([...PROJECT_DELETE_SET_NULL_REFERENCES].sort());
  });
});
