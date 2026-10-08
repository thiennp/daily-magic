import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES,
  filterValidAntigravityCliPermissionAllowRules,
  isValidAntigravityCliPermissionAllowRule,
} from "./antigravityCliPermissionAllowRules";

describe("antigravityCliPermissionAllowRules", () => {
  it("accepts documented agy 1.2 permission action names", () => {
    for (const rule of [
      "read_file(*)",
      "read_file(/var/log/app)",
      "write_file(src/)",
      "command(git)",
      "command(regex:npm run (build|lint|test))",
      "command(*)",
      "read_url(google.com)",
      "execute_url(aws.amazon.com)",
      "mcp(linter/*)",
      "unsandboxed(git push)",
    ]) {
      expect(isValidAntigravityCliPermissionAllowRule(rule)).toBe(true);
    }
  });

  it("rejects legacy invalid shapes such as read(*)", () => {
    expect(isValidAntigravityCliPermissionAllowRule("read(*)")).toBe(false);
    expect(isValidAntigravityCliPermissionAllowRule("list_dir(*)")).toBe(false);
    expect(isValidAntigravityCliPermissionAllowRule("view_file(*)")).toBe(
      false,
    );
  });

  it("ships only valid headless writer allow rules", () => {
    expect(
      AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES.every((rule) =>
        isValidAntigravityCliPermissionAllowRule(rule),
      ),
    ).toBe(true);
    expect(AGENT_WITCH_ANTIGRAVITY_HEADLESS_PERMISSION_ALLOW_RULES).toContain(
      "read_file(*)",
    );
  });

  it("filterValidAntigravityCliPermissionAllowRules drops invalid entries", () => {
    expect(
      filterValidAntigravityCliPermissionAllowRules([
        "read(*)",
        "command(*)",
        "read_file(*)",
      ]),
    ).toEqual(["command(*)", "read_file(*)"]);
  });
});
