import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string): string =>
  readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("AwcProjectsPanel", () => {
  it("surfaces load failures and hides the create form while loading", () => {
    const source = readSource("src/features/projects/AwcProjectsPanel.tsx");

    expect(source).toContain("loadFailed");
    expect(source).toContain("!isLoading");
  });

  it("hosts Claim / owned bots on intent=bots without dropping /api/me/bots", () => {
    const source = readSource("src/features/projects/AwcProjectsPanel.tsx");
    expect(source).toContain("MyBotsPanel");
    expect(source).toContain('intent === "bots"');
    expect(
      readSource("src/app/api/me/bots/route.ts").length,
    ).toBeGreaterThan(0);
    expect(
      readSource("src/app/api/me/bots/[tokenId]/unclaim/route.ts").length,
    ).toBeGreaterThan(0);
  });
});
