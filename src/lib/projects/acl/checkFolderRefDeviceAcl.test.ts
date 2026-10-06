import { describe, expect, it, vi } from "vitest";

import { checkFolderRefDeviceAcl } from "@/lib/projects/acl/checkFolderRefDeviceAcl";
import type { ProjectComputerMemberLookup } from "@/lib/projects/acl/types/ProjectComputerMemberLookup.type";

const MEMBER_MAC = "11111111-1111-4111-8111-111111111111";
const OWNER_AGENT_MAC = "22222222-2222-4222-8222-222222222222";
const REVOKED_MAC = "33333333-3333-4333-8333-333333333333";
const HUMAN_MEMBERSHIP_ID = "44444444-4444-4444-8444-444444444444";
const OTHER_PROJECT_MAC = "55555555-5555-4555-8555-555555555555";

type Seat = {
  readonly projectId: string;
  readonly memberKind: "human" | "bot" | "computer";
  readonly status: "active" | "revoked";
  readonly id: string;
  readonly deviceId: string | null;
};

/** In-memory project_memberships; mirrors the DB adapter's WHERE clause. */
const seats: readonly Seat[] = [
  { projectId: "p1", memberKind: "computer", status: "active", id: "m1", deviceId: MEMBER_MAC },
  // Owner computer-as-agent: user_projects.device_id synced into a seat.
  { projectId: "p1", memberKind: "computer", status: "active", id: "m2", deviceId: OWNER_AGENT_MAC },
  { projectId: "p1", memberKind: "computer", status: "revoked", id: "m3", deviceId: REVOKED_MAC },
  { projectId: "p1", memberKind: "human", status: "active", id: HUMAN_MEMBERSHIP_ID, deviceId: null },
  { projectId: "p2", memberKind: "computer", status: "active", id: "m5", deviceId: OTHER_PROJECT_MAC },
];

const fakeLookup: ProjectComputerMemberLookup = async ({ projectId, deviceId }) =>
  seats.some(
    (s) =>
      s.projectId === projectId &&
      s.deviceId === deviceId &&
      s.memberKind === "computer" &&
      s.status === "active",
  );

const check = (machineOrDeviceRef: string, deviceId?: string) =>
  checkFolderRefDeviceAcl({
    projectId: "p1",
    machineOrDeviceRef,
    deviceId,
    isComputerMember: fakeLookup,
  });

const NOT_MEMBER = { ok: false, code: "folder_ref_device_not_member" };

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
    });
    expect(result).toEqual({ ok: true, ref: "MacBook Pro" });
    expect(lookup).not.toHaveBeenCalled();
  });

  it("rejects empty refs and a deviceId that disagrees with the ref", async () => {
    expect(await check("  ")).toEqual({ ok: false, code: "invalid" });
    expect(await check("MacBook Pro", MEMBER_MAC)).toEqual({
      ok: false,
      code: "invalid",
    });
  });
});
