import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("AutomationsPageClient", () => {
  it("renders load error panel when fetch fails", () => {
    const source = readFileSync(
      join(process.cwd(), "src/features/automations/AutomationsPageClient.tsx"),
      "utf8",
    );

    expect(source).toContain("AutomationsListLoadErrorPanel");
    expect(source).toContain("loadFailed");
  });
});
