import { describe, expect, it } from "vitest";

import { AUTH_PAGES } from "@/lib/auth/authPages.constant";

describe("AUTH_PAGES", () => {
  it("routes NextAuth errors to the branded login page", () => {
    expect(AUTH_PAGES.signIn).toBe("/login");
    expect(AUTH_PAGES.error).toBe("/login");
  });
});
