import { describe, expect, it } from "vitest";

import { canViewProjectSkill } from "@/features/project-skill-share/internal/core/canViewProjectSkill";
import { decideProjectSkillPublishAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillPublishAccess";
import { decideProjectSkillRevokeAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillRevokeAccess";

describe("project skill access rules (owner full; members publish/revoke their own; shared published read)", () => {
  it("publish: owner always; member publishes own skills, drafts on others'; viewer never", () => {
    const d = (
      role: "owner" | "member" | "viewer" | "none",
      asDraft: boolean,
      hasBody = true,
      isOwnSkill = true,
    ) =>
      decideProjectSkillPublishAccess({ role, asDraft, hasBody, isOwnSkill });
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

  it("revoke: owner, or the member who published it", () => {
    const r = (
      role: "owner" | "member" | "viewer" | "none",
      actorUserId: string,
    ) =>
      decideProjectSkillRevokeAccess({
        role,
        actorUserId,
        publisherUserId: "p",
      });
    expect(r("owner", "o")).toBe(true);
    expect(r("member", "p")).toBe(true);
    expect(r("member", "m")).toBe(false);
    expect(r("viewer", "p")).toBe(false);
    expect(r("none", "p")).toBe(false);
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
