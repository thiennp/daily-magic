import type { ProjectPitfallView } from "@agent-witch/shared/pitfalls";
import { describe, expect, it } from "vitest";

import countImportantProjectPitfalls from "@/features/projects/pitfalls/countImportantProjectPitfalls";

const item = (
  severity: ProjectPitfallView["severity"],
  source: ProjectPitfallView["source"],
): ProjectPitfallView =>
  ({ severity, source }) as unknown as ProjectPitfallView;

describe("countImportantProjectPitfalls", () => {
  it("counts active Important (block) rules, skipping retired", () => {
    expect(
      countImportantProjectPitfalls([
        item("block", "project"),
        item("block", "seed"),
        item("block", "retired"),
        item("warn", "project"),
      ]),
    ).toBe(2);
  });

  it("is 0 for an empty list", () => {
    expect(countImportantProjectPitfalls([])).toBe(0);
  });
});
