import { beforeEach, describe, expect, it, vi } from "vitest";

import { AGENTWITCH_PROJECT_ID } from "@/features/project-pitfalls/internal/core/agentWitchProjectPitfalls.constant";
import { moveAgentWitchProjectPitfalls } from "@/features/project-pitfalls/internal/infrastructure/db/moveAgentWitchProjectPitfalls";
import { syncGlobalProjectPitfallSeeds } from "@/features/project-pitfalls/internal/infrastructure/db/syncGlobalProjectPitfallSeeds";

const mocks = vi.hoisted(() => ({ sql: vi.fn(async () => []) }));

vi.mock("@/lib/db", () => ({
  getSql: () => mocks.sql,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

const sqlCalls = (): { readonly text: string; readonly values: unknown[] }[] =>
  (mocks.sql.mock.calls as unknown as unknown[][]).map((call) => ({
    text: Array.from(call[0] as Iterable<string>)
      .join("$")
      .replace(/\s+/g, " "),
    values: call.slice(1),
  }));

describe("project pitfall seed sync", () => {
  beforeEach(() => {
    mocks.sql.mockReset();
    mocks.sql.mockResolvedValue([]);
  });

  it("upserts the generic seeds, then retires every other global seed row", async () => {
    await syncGlobalProjectPitfallSeeds();
    const [upsert, retire] = sqlCalls();
    expect(upsert.text).toContain("ON CONFLICT (pitfall_id) WHERE project_id IS NULL");
    expect(String(upsert.values[0])).toContain("secrets-in-logs");
    expect(String(upsert.values[0])).not.toContain("dirty-home-checkout");
    expect(retire.text).toContain(
      "DELETE FROM project_pitfalls WHERE project_id IS NULL AND source = 'seed' AND NOT (pitfall_id = ANY($::text[]))",
    );
    expect(retire.values).toEqual([["secrets-in-logs"]]);
  });

  it("copies former seeds onto the AgentWitch project only while the global exists", async () => {
    await moveAgentWitchProjectPitfalls();
    const [copy] = sqlCalls();
    expect(sqlCalls()).toHaveLength(1);
    expect(copy.text).toContain("'project', s.severity");
    expect(copy.text).toContain("INNER JOIN user_projects p ON p.id = $");
    expect(copy.text).toContain("WHERE g.project_id IS NULL AND g.pitfall_id = s.id");
    expect(copy.text).toContain("DO NOTHING");
    expect(copy.text).not.toMatch(/DELETE|UPDATE/);
    expect(copy.values[1]).toBe(AGENTWITCH_PROJECT_ID);
    expect(String(copy.values[0])).toContain("dirty-home-checkout");
  });
});
