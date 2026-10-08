import { describe, expect, it } from "vitest";

import validateCompanyName from "@/features/admin/utils/validateCompanyName";
import validateInviteEmail from "@/features/admin/utils/validateInviteEmail";

describe("validateCompanyName", () => {
  it("flags empty, short and duplicate names", () => {
    expect(validateCompanyName("  ", [])).toBe("Enter a company name.");
    expect(validateCompanyName("A", [])).toBe("Use at least 2 characters.");
    expect(validateCompanyName("acme", ["Acme"])).toBe(
      "You already have a company with this name.",
    );
    expect(validateCompanyName("Acme", ["Other"])).toBe("");
  });
});

describe("validateInviteEmail", () => {
  it("flags empty, invalid and duplicate emails", () => {
    expect(validateInviteEmail("", [])).toBe("Enter an email address.");
    expect(validateInviteEmail("nope", [])).toContain("valid email");
    expect(validateInviteEmail("A@b.co", ["a@b.co"])).toContain("already");
    expect(validateInviteEmail("a@b.co", [])).toBe("");
  });
});
