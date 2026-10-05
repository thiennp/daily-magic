import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("useDeleteUserProject", () => {
  it("delegates DELETE mapping through requestDeleteUserProject", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/projects/hooks/useDeleteUserProject.ts"),
      "utf8",
    );

    expect(source).toContain("requestDeleteUserProject");
    expect(source).toContain("Prefer `useDeleteProject(projectId)`");
  });
});
