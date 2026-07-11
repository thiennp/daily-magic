import { describe, expect, it } from "vitest";

import canSignInWithProvider from "@/lib/auth/canSignInWithProvider";
import isSuperAdminEmail from "@/lib/auth/isSuperAdminEmail";
import { SUPER_ADMIN_EMAIL } from "@/lib/auth/constants";

describe("super admin auth rules", () => {
  it("identifies the super admin email", () => {
    expect(isSuperAdminEmail(SUPER_ADMIN_EMAIL)).toBe(true);
    expect(isSuperAdminEmail("other@example.com")).toBe(false);
  });

  it("allows super admin to sign in only with Google", () => {
    expect(canSignInWithProvider(SUPER_ADMIN_EMAIL, "google")).toBe(true);
    expect(canSignInWithProvider(SUPER_ADMIN_EMAIL, "nodemailer")).toBe(false);
  });

  it("allows other users to sign in with email", () => {
    expect(canSignInWithProvider("user@example.com", "nodemailer")).toBe(true);
  });
});
