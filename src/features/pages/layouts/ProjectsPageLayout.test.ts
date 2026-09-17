import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("ProjectsPageLayout", () => {
  it("PROJ-B1: uses AWC projects panel without home folder picker", () => {
    const source = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "ProjectsPageLayout.tsx"),
      "utf8",
    );

    expect(source).toContain("AwcProjectsPanel");
    expect(source).not.toContain("HomeProjectsPanel");
  });
});
