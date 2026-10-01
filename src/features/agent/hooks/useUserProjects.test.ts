import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("useUserProjects", () => {
  it("marks loadFailed when projects API returns ok false", () => {
    const loader = readFileSync(
      join(process.cwd(), "src/features/agent/hooks/useUserProjectsLoader.ts"),
      "utf8",
    );

    expect(loader).toContain("setLoadFailed(true)");
    expect(loader).toContain("runUserProjectsFetch");
    expect(loader).toContain("!outcome.ok");
    expect(loader).toContain("loadGenerationRef");
  });
});
