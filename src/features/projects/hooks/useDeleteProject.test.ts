import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("useDeleteProject", () => {
  it("binds projectId, DELETEs /api/projects/[id], and maps 403 to owner-only copy", () => {
    const hook = readFileSync(
      join(process.cwd(), "src/features/projects/hooks/useDeleteProject.ts"),
      "utf8",
    );
    const request = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/utils/requestDeleteUserProject.ts",
      ),
      "utf8",
    );
    const copy = readFileSync(
      join(
        process.cwd(),
        "src/features/projects/awcProjectDeleteCopy.constant.ts",
      ),
      "utf8",
    );

    expect(hook).toContain("requestDeleteUserProject(projectId)");
    expect(hook).toContain("pending");
    expect(hook).toContain("clearError");
    expect(request).toContain('method: "DELETE"');
    expect(request).toContain("response.status === 403");
    expect(request).toContain("AWC_PROJECT_DELETE_COPY.ownerOnlyError");
    expect(copy).toContain(
      'ownerOnlyError: "Only the owner can delete this project."',
    );
    expect(copy).toContain('confirm: "Delete forever"');
  });
});
