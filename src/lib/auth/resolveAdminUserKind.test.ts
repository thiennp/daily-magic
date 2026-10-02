import { describe, expect, it } from "vitest";

import resolveAdminUserKind from "@/lib/auth/resolveAdminUserKind";

describe("resolveAdminUserKind", () => {
  it("maps agent synthetic emails to bot", () => {
    expect(resolveAdminUserKind("scout@agents.agentwitch.com")).toBe("bot");
    expect(resolveAdminUserKind("agt-1@agents.agentwitch.com")).toBe("bot");
  });

  it("maps test*@agentwitch.com to test", () => {
    expect(resolveAdminUserKind("test-admin-1@agentwitch.com")).toBe("test");
    expect(resolveAdminUserKind("test@agentwitch.com")).toBe("test");
  });

  it("maps everyone else to real", () => {
    expect(resolveAdminUserKind("thien@example.com")).toBe("real");
    expect(resolveAdminUserKind("admin@agentwitch.com")).toBe("real");
  });
});
