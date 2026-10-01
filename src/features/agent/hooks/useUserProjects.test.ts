import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("useUserProjects", () => {
  it("marks loadFailed when projects API returns ok false", () => {
    const loader = readFileSync(
      join(process.cwd(), "src/features/agent/hooks/useUserProjectsLoader.ts"),
      "utf8",
    );

    expect(loader).toContain("fetchUserProjectsForLoader");
    expect(loader).toContain("loadGenerationRef");
    expect(loader).toContain("showLoading");
    expect(
      readFileSync(
        join(
          process.cwd(),
          "src/features/agent/hooks/utils/fetchUserProjectsForLoader.ts",
        ),
        "utf8",
      ),
    ).toContain("runUserProjectsFetch");
  });
});
