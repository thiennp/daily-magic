import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-auth/react", () => ({
  useSession: () => ({
    status: "authenticated",
    data: {
      user: {
        name: "Thien Nguyen",
        email: "thien@example.com",
      },
    },
  }),
}));

vi.mock("@/features/billing/hooks/useBillingPlan", () => ({
  default: () => ({
    plan: null,
    isLoading: false,
    error: null,
    refresh: () => undefined,
  }),
}));

import AccountPageClient from "@/features/account/AccountPageClient";
import { ACCOUNT_COPY } from "@/features/account/accountCopy.constant";

describe("AccountPageClient render", () => {
  it("renders Account chrome and Profile tab copy", () => {
    const html = renderToStaticMarkup(createElement(AccountPageClient));
    expect(html).toContain(ACCOUNT_COPY.h1);
    expect(html).toContain(ACCOUNT_COPY.tip);
    expect(html).toContain("Profile");
    expect(html).toContain("Sign-in and security");
    expect(html).toContain("Notifications");
    expect(html).toContain("Privacy and data");
    expect(html).toContain(ACCOUNT_COPY.profile.displayNameTip);
    expect(html).toContain("thien@example.com");
    expect(html).not.toMatch(/\bLane A\b|\bMCP\b|\bOAuth\b/);
  });
});
