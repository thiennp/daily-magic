import { describe, expect, it } from "vitest";

import isTestAgentWitchEmail from "@/lib/auth/isTestAgentWitchEmail";

describe("isTestAgentWitchEmail", () => {
  it("accepts test*@agentwitch.com addresses", () => {
    expect(isTestAgentWitchEmail("test-admin-1@agentwitch.com")).toBe(true);
    expect(isTestAgentWitchEmail("test-member-a-100@agentwitch.com")).toBe(
      true,
    );
    expect(isTestAgentWitchEmail("test@agentwitch.com")).toBe(true);
  });

  it("rejects non-test agentwitch emails", () => {
    expect(isTestAgentWitchEmail("admin@agentwitch.com")).toBe(false);
    expect(isTestAgentWitchEmail("test@example.com")).toBe(false);
    expect(isTestAgentWitchEmail("")).toBe(false);
  });
});
