import { describe, expect, it } from "vitest";

import { clampBotInviteGrant } from "@/lib/projects/acl/invites/botInvites/clampBotInviteGrant";
import { BOT_INVITER_MEMBERSHIP } from "@/lib/projects/acl/invites/botInvites/botProjectInvite.fixtures";

const inviter = {
  inviterRole: BOT_INVITER_MEMBERSHIP.role,
  inviterScopes: BOT_INVITER_MEMBERSHIP.scopes,
};

describe("clampBotInviteGrant (DF-038 role/scope guardrail)", () => {
  it("defaults to the inviter's member scopes", () => {
    expect(clampBotInviteGrant(inviter)).toEqual({
      ok: true,
      scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
    });
  });

  it("accepts explicit member role and a narrower subset", () => {
    const grant = clampBotInviteGrant({
      ...inviter,
      requestedRole: "member",
      requestedScopes: ["msg:dispatch", "acl:self"],
    });
    expect(grant).toEqual({ ok: true, scopes: ["acl:self", "msg:dispatch"] });
  });

  it.each(["owner", "admin", "viewer", "OWNER", 1, {}])(
    "rejects requested role %s",
    (role) => {
      expect(clampBotInviteGrant({ ...inviter, requestedRole: role })).toEqual({
        ok: false,
        code: "role_not_allowed",
      });
    },
  );

  it("rejects when the inviter itself is not a member-role seat", () => {
    expect(
      clampBotInviteGrant({ ...inviter, inviterRole: "viewer" }).ok,
    ).toBe(false);
  });

  it("rejects scopes the inviter does not hold or that are not member scopes", () => {
    const narrow = clampBotInviteGrant({
      requestedScopes: ["peer_sync"],
      inviterRole: "member",
      inviterScopes: ["acl:self", "msg:dispatch"],
    });
    expect(narrow).toEqual({ ok: false, code: "scope_exceeds_inviter" });
    const elevated = clampBotInviteGrant({
      ...inviter,
      requestedScopes: ["msg:dispatch", "folder_ref:propose"],
    });
    expect(elevated).toEqual({ ok: false, code: "scope_exceeds_inviter" });
    const junk = clampBotInviteGrant({ ...inviter, requestedScopes: ["owner"] });
    expect(junk.ok).toBe(false);
  });

  it("rejects a non-array scopes value instead of widening", () => {
    expect(
      clampBotInviteGrant({ ...inviter, requestedScopes: "msg:dispatch" }).ok,
    ).toBe(false);
  });

  it("rejects when msg:dispatch (always added on bot approve) exceeds the inviter", () => {
    const grant = clampBotInviteGrant({
      inviterRole: "member",
      inviterScopes: ["acl:self", "project:meta"],
    });
    expect(grant).toEqual({ ok: false, code: "scope_exceeds_inviter" });
  });
});
