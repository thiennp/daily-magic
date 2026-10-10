import { describe, expect, it } from "vitest";

import { canViewProjectSkill } from "@/features/project-skill-share/internal/core/canViewProjectSkill";
import { decideProjectSkillPublishAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillPublishAccess";
import { decideProjectSkillRevokeAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillRevokeAccess";

describe("project skill access rules (owner full; members follow the owner's setting; shared published read)", () => {
  const publish = (
    role: "owner" | "member" | "viewer" | "none",
    asDraft: boolean,
    hasBody = true,
    isOwnSkill = true,
    memberMayPublish = false,
  ) =>
    decideProjectSkillPublishAccess({
      role,
      asDraft,
      hasBody,
      isOwnSkill,
      memberMayPublish,
    });

  it("publish (setting off): owner always; member publishes own skills, drafts on others'; viewer never", () => {
    const d = publish;
    expect(d("owner", false)).toEqual({ allowed: true, draftOnly: false });
    expect(d("owner", false, false, false)).toEqual({
      allowed: true,
      draftOnly: false,
    });
    expect(d("member", false)).toEqual({ allowed: true, draftOnly: false });
    expect(d("member", false, false)).toEqual({
      allowed: true,
      draftOnly: false,
    });
    expect(d("member", true, true, false)).toEqual({
      allowed: true,
      draftOnly: true,
    });
    expect(d("member", false, true, false)).toMatchObject({
      allowed: false,
      message: expect.stringContaining("asDraft: true"),
    });
    expect(d("member", true, false, false)).toMatchObject({ allowed: false });
    expect(d("viewer", true)).toMatchObject({ allowed: false });
    expect(d("none", true)).toMatchObject({ allowed: false });
  });

  it("publish (setting on, the default): a member publishes over someone else's skill; viewers still never", () => {
    expect(publish("member", false, true, false, true)).toEqual({
      allowed: true,
      draftOnly: false,
    });
    expect(publish("member", false, false, false, true)).toEqual({
      allowed: true,
      draftOnly: false,
    });
    expect(publish("viewer", false, true, true, true)).toMatchObject({
      allowed: false,
    });
    expect(publish("none", false, true, true, true)).toMatchObject({
      allowed: false,
    });
  });

  it("revoke: owner always; member only while the owner left delete on; viewers never", () => {
    const r = (
      role: "owner" | "member" | "viewer" | "none",
      memberMayDelete: boolean,
    ) => decideProjectSkillRevokeAccess({ role, memberMayDelete });
    expect(r("owner", false)).toBe(true);
    expect(r("member", true)).toBe(true);
    expect(r("member", false)).toBe(false);
    expect(r("viewer", true)).toBe(false);
    expect(r("none", true)).toBe(false);
  });

  it("view: published for seats; drafts owner + member; revoked owner-only", () => {
    const member = {
      role: "member" as const,
      actorUserId: "m",
      publisherUserId: "p",
    };
    expect(canViewProjectSkill({ ...member, state: "published" })).toBe(true);
    expect(canViewProjectSkill({ ...member, state: "draft" })).toBe(true);
    expect(canViewProjectSkill({ ...member, state: "revoked" })).toBe(false);
    expect(
      canViewProjectSkill({ ...member, role: "owner", state: "draft" }),
    ).toBe(true);
    expect(
      canViewProjectSkill({ ...member, role: "owner", state: "revoked" }),
    ).toBe(true);
    expect(
      canViewProjectSkill({ ...member, role: "none", state: "published" }),
    ).toBe(false);
    expect(
      canViewProjectSkill({ ...member, role: "viewer", state: "published" }),
    ).toBe(true);
    expect(
      canViewProjectSkill({ ...member, role: "viewer", state: "draft" }),
    ).toBe(false);
  });
});
