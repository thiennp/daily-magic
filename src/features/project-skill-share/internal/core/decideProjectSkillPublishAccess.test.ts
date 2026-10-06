import { describe, expect, it } from "vitest";

import { canViewProjectSkill } from "@/features/project-skill-share/internal/core/canViewProjectSkill";
import { decideProjectSkillPublishAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillPublishAccess";
import { decideProjectSkillRevokeAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillRevokeAccess";

describe("project skill access rules (owner-only mutate; shared published read)", () => {
  it("publish: owner only (new or existing)", () => {
    const base = { actorUserId: "u1", existingPublisherUserId: null };
    expect(decideProjectSkillPublishAccess({ ...base, role: "owner" })).toBe(
      true,
    );
    expect(decideProjectSkillPublishAccess({ ...base, role: "member" })).toBe(
      false,
    );
    expect(decideProjectSkillPublishAccess({ ...base, role: "viewer" })).toBe(
      false,
    );
    expect(decideProjectSkillPublishAccess({ ...base, role: "none" })).toBe(
      false,
    );
    expect(
      decideProjectSkillPublishAccess({
        role: "member",
        actorUserId: "u1",
        existingPublisherUserId: "u1",
      }),
    ).toBe(false);
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

  it("view: published for seats; drafts/revoked owner-only", () => {
    const member = {
      role: "member" as const,
      actorUserId: "m",
      publisherUserId: "p",
    };
    expect(canViewProjectSkill({ ...member, state: "published" })).toBe(true);
    expect(canViewProjectSkill({ ...member, state: "draft" })).toBe(false);
    expect(canViewProjectSkill({ ...member, state: "revoked" })).toBe(false);
    expect(
      canViewProjectSkill({ ...member, actorUserId: "p", state: "draft" }),
    ).toBe(false);
    expect(
      canViewProjectSkill({ ...member, role: "owner", state: "draft" }),
    ).toBe(true);
    expect(
      canViewProjectSkill({ ...member, role: "none", state: "published" }),
    ).toBe(false);
    expect(
      canViewProjectSkill({
        role: "viewer",
        actorUserId: "v",
        publisherUserId: "p",
        state: "published",
      }),
    ).toBe(true);
    expect(
      canViewProjectSkill({
        role: "viewer",
        actorUserId: "v",
        publisherUserId: "p",
        state: "draft",
      }),
    ).toBe(false);
  });
});
