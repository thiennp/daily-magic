import { describe, expect, it } from "vitest";

import type { ProjectPitfallView } from "../pitfalls/ProjectPitfall.type";
import { resolvePreflightChecks } from "./resolvePreflightChecks";

const pitfall = (
  overrides: Partial<ProjectPitfallView> & Pick<ProjectPitfallView, "id">,
): ProjectPitfallView => ({
  id: overrides.id,
  projectId: null,
  symptom: overrides.symptom ?? "Something broke",
  cause: overrides.cause ?? "A known pitfall",
  avoidance: overrides.avoidance ?? "Do the safe step first",
  check: overrides.check ?? { kind: "command", value: "npm test" },
  keywords: [],
  tags: [],
  source: overrides.source ?? "seed",
  overridesSeed: false,
  hitCount: 0,
  lastSeenAt: null,
  updatedAt: null,
  severity: overrides.severity ?? "block",
});

describe("resolvePreflightChecks", () => {
  it("returns required catalog checks for the action", () => {
    const resolved = resolvePreflightChecks("act.deploy", []);
    expect(resolved.map((item) => item.checkId).sort()).toEqual([
      "pf.health-matches-main",
      "pf.install-bundle-intact",
      "pf.smoke",
    ]);
    expect(resolved.every((item) => item.pitfallId === null)).toBe(true);
  });

  it("unions active block pitfalls as pit.<id> and skips warn/retired", () => {
    const resolved = resolvePreflightChecks("act.push-ff", [
      pitfall({ id: "arch-max-lines", severity: "block" }),
      pitfall({ id: "soft-one", severity: "warn" }),
      pitfall({ id: "old-one", severity: "block", source: "retired" }),
      pitfall({
        id: "empty-check",
        severity: "block",
        check: { kind: "id", value: "  " },
      }),
    ]);
    const ids = resolved.map((item) => item.checkId);
    expect(ids).toContain("pit.arch-max-lines");
    expect(ids).not.toContain("pit.soft-one");
    expect(ids).not.toContain("pit.old-one");
    expect(ids).not.toContain("pit.empty-check");
    expect(
      resolved.find((item) => item.checkId === "pit.arch-max-lines")?.pitfallId,
    ).toBe("arch-max-lines");
  });
});
