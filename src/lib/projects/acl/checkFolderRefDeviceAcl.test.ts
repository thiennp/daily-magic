import { describe, expect, it, vi } from "vitest";

import { checkFolderRefDeviceAcl } from "@/lib/projects/acl/checkFolderRefDeviceAcl";
import {
  HUMAN_MEMBERSHIP_ID,
  MEMBER_MAC,
  NOT_MEMBER,
  OTHER_PROJECT_MAC,
  OWNER_AGENT_MAC,
  REVOKED_MAC,
  check,
  fakeLookup,
} from "@/lib/projects/acl/checkFolderRefDeviceAcl.fixtures";

describe("checkFolderRefDeviceAcl", () => {
  it("accepts an active computer member deviceId", async () => {
    expect(await check(MEMBER_MAC)).toEqual({ ok: true, ref: MEMBER_MAC });
    expect(await check("", MEMBER_MAC)).toEqual({ ok: true, ref: MEMBER_MAC });
  });

  it("accepts the owner's computer-as-agent seat", async () => {
    expect(await check(OWNER_AGENT_MAC, OWNER_AGENT_MAC)).toEqual({
      ok: true,
      ref: OWNER_AGENT_MAC,
    });
  });

  it("rejects a revoked computer member", async () => {
    expect(await check(REVOKED_MAC)).toEqual(NOT_MEMBER);
    expect(await check("", REVOKED_MAC)).toEqual(NOT_MEMBER);
  });

  it("rejects a non-computer member id", async () => {
    expect(await check(HUMAN_MEMBERSHIP_ID)).toEqual(NOT_MEMBER);
    expect(await check("m1", "m1")).toEqual(NOT_MEMBER);
  });

  it("rejects a deviceId that is a computer member of another project", async () => {
    expect(await check(OTHER_PROJECT_MAC)).toEqual(NOT_MEMBER);
  });

  it("keeps legacy free-text labels without a membership lookup", async () => {
    const lookup = vi.fn(fakeLookup);
    const result = await checkFolderRefDeviceAcl({
      projectId: "p1",
      machineOrDeviceRef: "  MacBook Pro ",
      isComputerMember: lookup,
      isOwnerDevice: lookup,
    });
    expect(result).toEqual({ ok: true, ref: "MacBook Pro" });
    expect(lookup).not.toHaveBeenCalled();
  });

  it("rejects empty refs and a deviceId that disagrees with the ref", async () => {
    expect(await check("  ")).toEqual({ ok: false, code: "folder_ref_invalid_device" });
    expect(await check("MacBook Pro", MEMBER_MAC)).toEqual({
      ok: false,
      code: "folder_ref_invalid_device",
    });
  });
});
