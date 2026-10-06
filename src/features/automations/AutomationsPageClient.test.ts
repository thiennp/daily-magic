import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("AutomationsPageClient", () => {
  const source = readFileSync(
    join(process.cwd(), "src/features/automations/AutomationsPageClient.tsx"),
    "utf8",
  );

  it("renders load error panel when fetch fails", () => {
    expect(source).toContain("AutomationsListLoadErrorPanel");
    expect(source).toContain("loadFailed");
  });

  it("shows empty title and assistant empty copy", () => {
    expect(source).toContain("emptyTitle");
    expect(source).toContain("AUTOMATIONS_PAGE_COPY.empty");
  });

  it("surfaces sync failure as amber status", () => {
    expect(source).toContain("role=\"status\"");
    expect(source).toContain("amber-");
  });
});
