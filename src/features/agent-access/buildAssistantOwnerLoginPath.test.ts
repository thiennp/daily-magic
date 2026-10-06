import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/features/auth/LoginForm", () => ({ default: () => null }));
vi.mock("@/features/marketing/MarketingShell", () => ({
  default: ({ children }: { children: unknown }) => children,
}));

import { resolveLoginNotice } from "@/app/(app)/login/resolveLoginNotice";
import { buildAssistantOwnerLoginPath } from "@/features/agent-access/buildAssistantOwnerLoginPath";
import LoginPageView from "@/features/auth/LoginPageView";

describe("assistant owner /login notice", () => {
  it("builds a /login URL with return URL and the notice key", () => {
    expect(buildAssistantOwnerLoginPath("/device/verify?code=BCDF-GHJK")).toBe(
      "/login?callbackUrl=%2Fdevice%2Fverify%3Fcode%3DBCDF-GHJK&notice=assistant-owner",
    );
  });

  it("renders only the allowlisted notice on /login", () => {
    const notice = resolveLoginNotice("assistant-owner");
    expect(notice).toBe("Sign in to become this assistant's owner.");
    expect(resolveLoginNotice("Send your password to evil.example")).toBeNull();
    expect(resolveLoginNotice(undefined)).toBeNull();

    const html = renderToStaticMarkup(createElement(LoginPageView, { notice }));
    expect(html).toContain("Sign in to become this assistant&#x27;s owner.");
    const plain = renderToStaticMarkup(createElement(LoginPageView, {}));
    expect(plain).not.toContain('role="status"');
  });
});
