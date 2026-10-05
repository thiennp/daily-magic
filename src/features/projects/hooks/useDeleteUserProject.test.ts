import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("useDeleteUserProject", () => {
  it("DELETES /api/projects/[projectId] and surfaces errorMessage on failure", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/projects/hooks/useDeleteUserProject.ts"),
      "utf8",
    );

    expect(source).toContain('method: "DELETE"');
    expect(source).toContain("/api/projects/");
    expect(source).toContain("encodeURIComponent(projectId)");
    expect(source).toContain("errorMessage");
    expect(source).toContain("Could not delete project.");
  });
});
