import { describe, expect, it } from "vitest";

import validateLoginEmail, {
  LOGIN_EMAIL_ASSISTANT_ACCOUNT_MESSAGE,
  LOGIN_EMAIL_INVALID_MESSAGE,
  LOGIN_EMAIL_REQUIRED_MESSAGE,
} from "@/features/auth/utils/validateLoginEmail";

describe("validateLoginEmail", () => {
  it("asks for an email and rejects malformed ones", () => {
    expect(validateLoginEmail("")).toBe(LOGIN_EMAIL_REQUIRED_MESSAGE);
    expect(validateLoginEmail("nope")).toBe(LOGIN_EMAIL_INVALID_MESSAGE);
    expect(validateLoginEmail("me@company.com")).toBeNull();
  });

  it("explains assistant accounts instead of sending a link nobody can open", () => {
    expect(validateLoginEmail("agt-1234@agents.agentwitch.com")).toBe(
      LOGIN_EMAIL_ASSISTANT_ACCOUNT_MESSAGE,
    );
    expect(validateLoginEmail("Agt-1234@Agents.AgentWitch.com")).toBe(
      LOGIN_EMAIL_ASSISTANT_ACCOUNT_MESSAGE,
    );
  });
});
