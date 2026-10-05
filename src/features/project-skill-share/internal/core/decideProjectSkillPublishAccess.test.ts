import { describe, expect, it } from "vitest";

import { canViewProjectSkill } from "@/features/project-skill-share/internal/core/canViewProjectSkill";
import { decideProjectSkillPublishAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillPublishAccess";
import { decideProjectSkillRevokeAccess } from "@/features/project-skill-share/internal/core/decideProjectSkillRevokeAccess";

describe("project skill access rules", () => {
  it("publish: owner or active member for a new skill", () => {
    const base = { actorUserId: "u1", existingPublisherUserId: null };
    expect(decideProjectSkillPublishAccess({ ...base, role: "owner" })).toBe(
      true,
    );
    expect(decideProjectSkillPublishAccess({ ...base, role: "member" })).toBe(
      true,
    );
    expect(decideProjectSkillPublishAccess({ ...base, role: "none" })).toBe(
      false,
    );
  });

  it("publish: existing skill only publisher or owner", () => {
    const base = { actorUserId: "u1", existingPublisherUserId: "u2" };
    expect(decideProjectSkillPublishAccess({ ...base, role: "member" })).toBe(
      false,
    );
    expect(decideProjectSkillPublishAccess({ ...base, role: "owner" })).toBe(
      true,
    );
    expect(
      decideProjectSkillPublishAccess({
        ...base,
        role: "member",
        existingPublisherUserId: "u1",
      }),
    ).toBe(true);
  });

  it("revoke: publisher (active) or owner", () => {
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
    ).toBe(true);
    expect(
      decideProjectSkillRevokeAccess({
        role: "member",
        actorUserId: "x",
        publisherUserId: "p",
      }),
    ).toBe(false);
    expect(
      decideProjectSkillRevokeAccess({
        role: "none",
        actorUserId: "p",
        publisherUserId: "p",
      }),
    ).toBe(false);
  });

  it("view: published for members, drafts/revoked for publisher or owner", () => {
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
    ).toBe(true);
    expect(
      canViewProjectSkill({ ...member, role: "owner", state: "draft" }),
    ).toBe(true);
    expect(
      canViewProjectSkill({ ...member, role: "none", state: "published" }),
    ).toBe(false);
  });

  it("viewer: list/get published only; never publish or revoke", () => {
    const viewer = {
      role: "viewer" as const,
      actorUserId: "v",
      publisherUserId: "p",
    };
    expect(canViewProjectSkill({ ...viewer, state: "published" })).toBe(true);
    expect(canViewProjectSkill({ ...viewer, state: "draft" })).toBe(false);
    expect(
      decideProjectSkillPublishAccess({
        role: "viewer",
        actorUserId: "v",
        existingPublisherUserId: null,
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
});
