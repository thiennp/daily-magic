import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

describe("HomeAuthenticatedView showcases", () => {
  it("includes marketing showcase articles like the guest landing", () => {
    const source = readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        "HomeAuthenticatedView.tsx",
      ),
      "utf8",
    );

    expect(source).toContain('from "@/features/home/HomeMarketingShowcases"');
    expect(source).toContain("<HomeMarketingShowcases");
  });
});
