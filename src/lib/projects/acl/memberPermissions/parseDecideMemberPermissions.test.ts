import { describe, expect, it } from "vitest";

import { decideProjectMemberPermission } from "@/lib/projects/acl/memberPermissions/decideProjectMemberPermission";
import {
  parseProjectMemberPermissions,
  parseProjectMemberPermissionsPatch,
  serializeProjectMemberPermissions,
} from "@/lib/projects/acl/memberPermissions/parseProjectMemberPermissions";
import {
  ALL_MEMBER_PERMISSIONS_ALLOWED,
  NO_MEMBER_PERMISSIONS,
} from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

describe("member permissions (pure)", () => {
  it("missing or malformed storage allows everything; only false denies", () => {
    expect(parseProjectMemberPermissions({})).toEqual(
      ALL_MEMBER_PERMISSIONS_ALLOWED,
    );
    expect(parseProjectMemberPermissions(null)).toEqual(
      ALL_MEMBER_PERMISSIONS_ALLOWED,
    );
    expect(parseProjectMemberPermissions(["skill.delete"])).toEqual(
      ALL_MEMBER_PERMISSIONS_ALLOWED,
    );
    expect(
      parseProjectMemberPermissions({ "skill.delete": false, bogus: false }),
    ).toEqual({ ...ALL_MEMBER_PERMISSIONS_ALLOWED, "skill.delete": false });
    expect(parseProjectMemberPermissions({ "skill.delete": "no" })).toEqual(
      ALL_MEMBER_PERMISSIONS_ALLOWED,
    );
  });

  it("stores only the denied keys", () => {
    expect(
      serializeProjectMemberPermissions(ALL_MEMBER_PERMISSIONS_ALLOWED),
    ).toEqual({});
    expect(
      serializeProjectMemberPermissions({
        ...ALL_MEMBER_PERMISSIONS_ALLOWED,
        "skill.delete": false,
      }),
    ).toEqual({ "skill.delete": false });
  });

  it("a patch needs known keys with boolean values", () => {
    expect(
      parseProjectMemberPermissionsPatch({ "skill.delete": false }),
    ).toEqual({ "skill.delete": false });
    expect(parseProjectMemberPermissionsPatch({})).toBeNull();
    expect(parseProjectMemberPermissionsPatch({ nope: true })).toBeNull();
    expect(
      parseProjectMemberPermissionsPatch({ "skill.delete": 0 }),
    ).toBeNull();
    expect(parseProjectMemberPermissionsPatch([true])).toBeNull();
    expect(parseProjectMemberPermissionsPatch("x")).toBeNull();
  });

  it("owner always can; member follows the setting; viewer and none never", () => {
    const denied = { ...ALL_MEMBER_PERMISSIONS_ALLOWED, "skill.delete": false };
    const can = (
      role: "owner" | "member" | "viewer" | "none",
      permissions = denied,
    ) =>
      decideProjectMemberPermission({ role, permissions, key: "skill.delete" });
    expect(can("owner", NO_MEMBER_PERMISSIONS)).toBe(true);
    expect(can("member", denied)).toBe(false);
    expect(can("member", ALL_MEMBER_PERMISSIONS_ALLOWED)).toBe(true);
    expect(can("viewer", ALL_MEMBER_PERMISSIONS_ALLOWED)).toBe(false);
    expect(can("none", ALL_MEMBER_PERMISSIONS_ALLOWED)).toBe(false);
  });
});
