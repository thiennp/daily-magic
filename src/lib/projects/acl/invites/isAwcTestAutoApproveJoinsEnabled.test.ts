import { afterEach, describe, expect, it, vi } from "vitest";

import { isAwcTestAutoApproveJoinsEnabled } from "@/lib/projects/acl/invites/isAwcTestAutoApproveJoinsEnabled";

describe("isAwcTestAutoApproveJoinsEnabled", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is ignored in production even when AWC_TEST_AUTO_APPROVE_JOINS=1", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("AWC_TEST_AUTO_APPROVE_JOINS", "1");
    expect(isAwcTestAutoApproveJoinsEnabled()).toBe(false);
  });

  it("is true in non-production when AWC_TEST_AUTO_APPROVE_JOINS=1", () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("AWC_TEST_AUTO_APPROVE_JOINS", "1");
    expect(isAwcTestAutoApproveJoinsEnabled()).toBe(true);
  });

  it("is false in non-production when the flag is unset", () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("AWC_TEST_AUTO_APPROVE_JOINS", "");
    delete process.env.AWC_TEST_AUTO_APPROVE_JOINS;
    expect(isAwcTestAutoApproveJoinsEnabled()).toBe(false);
  });
});
