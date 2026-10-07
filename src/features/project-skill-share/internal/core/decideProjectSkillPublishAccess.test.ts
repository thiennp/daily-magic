import { describe, expect, it } from "vitest";

import { canViewProjectSkill } from "@/features/project-skill-share/internal/core/canViewProjectSkill";
import { decideProjectSkillPublishAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillPublishAccess";
import { decideProjectSkillRevokeAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillRevokeAccess";

describe("project skill access rules (owner publishes/revokes; members draft; shared published read)", () => {
  it("publish: owner always; member drafts only (asDraft + body); viewer never", () => {
    const d = (
      role: "owner" | "member" | "viewer" | "none",
      asDraft: boolean,
      hasBody = true,
    ) => decideProjectSkillPublishAccess({ role, asDraft, hasBody });
    expect(d("owner", false)).toEqual({ allowed: true, draftOnly: false });
    expect(d("owner", false, false)).toEqual({
      allowed: true,
      draftOnly: false,
    });
    expect(d("member", true)).toEqual({ allowed: true, draftOnly: true });
    expect(d("member", false)).toMatchObject({ allowed: false });
    expect(d("member", true, false)).toMatchObject({ allowed: false });
    expect(d("member", false)).toMatchObject({
      message: expect.stringContaining("asDraft: true"),
    });
    expect(d("viewer", true)).toMatchObject({ allowed: false });
    expect(d("none", true)).toMatchObject({ allowed: false });
  });

  it("revoke: owner only", () => {
    expect(
      decideProjectSkillRevokeAccess({
        role: "owner",
        actorUserId: "o",
        publisherUserId: "p",
      }),
    ).toBe(true);
    expect(
      decideProjectSkillRevokeAccess({
        role: "member",
        actorUserId: "p",
        publisherUserId: "p",
      }),
    ).toBe(false);
    expect(
      decideProjectSkillRevokeAccess({
        role: "viewer",
        actorUserId: "p",
        publisherUserId: "p",
      }),
    ).toBe(false);
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
