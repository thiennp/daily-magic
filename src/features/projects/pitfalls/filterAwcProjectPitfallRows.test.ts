import { describe, expect, it } from "vitest";

import type { AwcProjectPitfallRow } from "@/features/projects/pitfalls/buildAwcProjectPitfallRows";
import filterAwcProjectPitfallRows, {
  countAwcPitfallRowsBySeverity,
} from "@/features/projects/pitfalls/filterAwcProjectPitfallRows";

const row = (
  overrides: Partial<AwcProjectPitfallRow> & Pick<AwcProjectPitfallRow, "id">,
): AwcProjectPitfallRow => ({
  title: "Title",
  fix: "Fix it.",
  triggers: [],
  severity: "warn",
  severityLabel: "Warning",
  sourceLabel: "Built-in",
  lastHitLabel: "Never hit",
  updatedLabel: "Updated 2026-10-05",
  ...overrides,
});

const rows = [
  row({ id: "secret", title: "Secrets leak into logs", severity: "block", triggers: ["token", "env"] }),
  row({ id: "push", title: "Push rejected", fix: "Rebase on main first." }),
  row({ id: "build", title: "Build breaks", severity: "info", triggers: ["Deps"] }),
];

describe("filterAwcProjectPitfallRows", () => {
  it("returns every row for all + empty query", () => {
    expect(filterAwcProjectPitfallRows(rows, "all", "  ")).toHaveLength(3);
  });

  it("filters by severity chip", () => {
    expect(
      filterAwcProjectPitfallRows(rows, "block", "").map((r) => r.id),
    ).toEqual(["secret"]);
    expect(
      filterAwcProjectPitfallRows(rows, "warn", "").map((r) => r.id),
    ).toEqual(["push"]);
  });

  it("searches title, fix and triggers case-insensitively", () => {
    expect(filterAwcProjectPitfallRows(rows, "all", "LOGS")[0]?.id).toBe("secret");
    expect(filterAwcProjectPitfallRows(rows, "all", "rebase")[0]?.id).toBe("push");
    expect(filterAwcProjectPitfallRows(rows, "all", "deps")[0]?.id).toBe("build");
    expect(filterAwcProjectPitfallRows(rows, "all", "env")[0]?.id).toBe("secret");
  });

  it("combines chip and query, empty when nothing matches", () => {
    expect(filterAwcProjectPitfallRows(rows, "warn", "token")).toEqual([]);
    expect(filterAwcProjectPitfallRows(rows, "all", "nothing-here")).toEqual([]);
  });
});

describe("countAwcPitfallRowsBySeverity", () => {
  it("counts per severity", () => {
    expect(countAwcPitfallRowsBySeverity(rows)).toEqual({
      all: 3,
      block: 1,
      warn: 1,
      info: 1,
    });
  });
});
