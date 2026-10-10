import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  ALL_MEMBER_PERMISSIONS_ALLOWED,
  type ProjectMemberPermissions,
} from "@/lib/projects/acl/memberPermissions/projectMemberPermission.constant";

const mocks = vi.hoisted(() => ({ role: vi.fn(), permissions: vi.fn() }));

vi.mock("@/features/project-skill-share/public-api/infrastructure", () => ({
  resolveProjectSkillMemberRole: mocks.role,
}));
vi.mock(
  "@/lib/projects/acl/memberPermissions/readProjectMemberPermissions",
  () => ({ readProjectMemberPermissions: mocks.permissions }),
);

import { canManageAutoSkills } from "@/features/project-auto-skills/internal/infrastructure/canManageAutoSkills";

const input = { projectId: "p", actorUserId: "u" };
const off: ProjectMemberPermissions = {
  ...ALL_MEMBER_PERMISSIONS_ALLOWED,
  "autoSkill.manage": false,
};

describe("canManageAutoSkills", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.permissions.mockResolvedValue(ALL_MEMBER_PERMISSIONS_ALLOWED);
  });

  it("the owner always can, without reading the setting", async () => {
    mocks.role.mockResolvedValue({ ok: true, role: "owner" });
    expect(await canManageAutoSkills(input)).toBe(true);
    expect(mocks.permissions).not.toHaveBeenCalled();
  });

  it("a member can by default and cannot once the owner turns it off", async () => {
    mocks.role.mockResolvedValue({ ok: true, role: "member" });
    expect(await canManageAutoSkills(input)).toBe(true);
    mocks.permissions.mockResolvedValue(off);
    expect(await canManageAutoSkills(input)).toBe(false);
  });

  it("viewers and strangers never can", async () => {
    mocks.role.mockResolvedValue({ ok: true, role: "viewer" });
    expect(await canManageAutoSkills(input)).toBe(false);
    mocks.role.mockResolvedValue({ ok: false, code: "forbidden" });
    expect(await canManageAutoSkills(input)).toBe(false);
  });
});
