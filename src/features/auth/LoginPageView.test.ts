import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const loginPageViewSource = readFileSync(
  path.join(process.cwd(), "src/features/auth/LoginPageView.tsx"),
  "utf8",
);

describe("LoginPageView layout (login-ready / tablet)", () => {
  it("stacks welcome copy above the sign-in card until lg two-column", () => {
    expect(loginPageViewSource).toMatch(/lg:grid-cols-2/);
    expect(loginPageViewSource).not.toMatch(/\border-\d/);
    expect(loginPageViewSource).toMatch(
      /LOGIN_PAGE_COPY\.title[\s\S]*<MarketingCard/,
    );
  });
});
