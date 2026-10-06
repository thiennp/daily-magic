import { describe, expect, it, vi } from "vitest";

import { checkFolderRefDeviceAcl } from "@/lib/projects/acl/checkFolderRefDeviceAcl";
import {
  LEGACY_OWNER_MAC,
  MEMBER_MAC,
  NOT_MEMBER,
  OTHER_USER_MAC,
  REVOKED_OWNER_MAC,
  check,
  fakeLookup,
  fakeOwnerDevice,
} from "@/lib/projects/acl/checkFolderRefDeviceAcl.fixtures";

describe("checkFolderRefDeviceAcl owner device (pre-068 projects)", () => {
  it("accepts the project's owner device when it has no membership row", async () => {
    expect(await check("", LEGACY_OWNER_MAC)).toEqual({
      ok: true,
      ref: LEGACY_OWNER_MAC,
    });
    expect(await check(LEGACY_OWNER_MAC)).toEqual({ ok: true, ref: LEGACY_OWNER_MAC });
  });

  it("rejects the project's owner device once it is revoked", async () => {
    expect(await check("", REVOKED_OWNER_MAC, "p3")).toEqual(NOT_MEMBER);
  });

  it("rejects another user's non-member device, and owner devices of other projects", async () => {
    expect(await check("", OTHER_USER_MAC)).toEqual(NOT_MEMBER);
    expect(await check("", LEGACY_OWNER_MAC, "p2")).toEqual(NOT_MEMBER);
  });

  it("skips the owner-device lookup when the computer seat already matches", async () => {
    const isOwnerDevice = vi.fn(fakeOwnerDevice);
    const result = await checkFolderRefDeviceAcl({
      projectId: "p1",
      machineOrDeviceRef: MEMBER_MAC,
      isComputerMember: fakeLookup,
      isOwnerDevice,
    });
    expect(result).toEqual({ ok: true, ref: MEMBER_MAC });
    expect(isOwnerDevice).not.toHaveBeenCalled();
  });
});
