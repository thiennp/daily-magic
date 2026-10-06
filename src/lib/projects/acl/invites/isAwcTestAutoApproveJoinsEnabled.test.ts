import { afterEach, describe, expect, it } from "vitest";

import { isAwcTestAutoApproveJoinsEnabled } from "@/lib/projects/acl/invites/isAwcTestAutoApproveJoinsEnabled";

describe("isAwcTestAutoApproveJoinsEnabled", () => {
  const prevNodeEnv = process.env.NODE_ENV;
  const prevFlag = process.env.AWC_TEST_AUTO_APPROVE_JOINS;

  afterEach(() => {
    process.env.NODE_ENV = prevNodeEnv;
    if (prevFlag === undefined) {
      delete process.env.AWC_TEST_AUTO_APPROVE_JOINS;
    } else {
      process.env.AWC_TEST_AUTO_APPROVE_JOINS = prevFlag;
    }
  });

  it("is ignored in production even when AWC_TEST_AUTO_APPROVE_JOINS=1", () => {
    process.env.NODE_ENV = "production";
    process.env.AWC_TEST_AUTO_APPROVE_JOINS = "1";
    expect(isAwcTestAutoApproveJoinsEnabled()).toBe(false);
  });

  it("is true in non-production when AWC_TEST_AUTO_APPROVE_JOINS=1", () => {
    process.env.NODE_ENV = "test";
    process.env.AWC_TEST_AUTO_APPROVE_JOINS = "1";
    expect(isAwcTestAutoApproveJoinsEnabled()).toBe(true);
  });

  it("is false in non-production when the flag is unset", () => {
    process.env.NODE_ENV = "test";
    delete process.env.AWC_TEST_AUTO_APPROVE_JOINS;
    expect(isAwcTestAutoApproveJoinsEnabled()).toBe(false);
  });
});
