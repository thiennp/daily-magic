import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("HomeMarketingLoginForm (AW-ONBOARD-1)", () => {
  it("derives defaultCallbackUrl from URL search params", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/features/home/components/HomeMarketingLoginForm.tsx",
      ),
      "utf8",
    );

    expect(source).toContain("resolvePostAuthReturnFromSearchParams");
    expect(source).not.toContain('defaultCallbackUrl="/"');
  });
});
