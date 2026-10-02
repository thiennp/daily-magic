import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const dir = dirname(fileURLToPath(import.meta.url));

const LEAVE_SOURCES = [
  "leaveProjectMembership.ts",
  "applyLeaveProjectMembershipSideEffects.ts",
  "purgeProjectMembershipData.ts",
] as const;

describe("leave_project must not use dispatch daily rate limit", () => {
  it("leave path sources never import dispatch rate-limit modules", () => {
    for (const file of LEAVE_SOURCES) {
      const src = readFileSync(join(dir, file), "utf8");
      expect(src).not.toMatch(
        /from ["']@\/lib\/projects\/acl\/messaging\/assertProjectMessageDispatchRateLimits["']/,
      );
      expect(src).not.toMatch(
        /from ["']@\/lib\/projects\/acl\/messaging\/dispatchProjectMessage["']/,
      );
      expect(src).not.toMatch(
        /from ["']@\/lib\/projects\/acl\/messaging\/dispatchProjectMessageFromOwner["']/,
      );
    }
  });
});
