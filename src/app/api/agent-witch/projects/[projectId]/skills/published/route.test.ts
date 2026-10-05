import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAgentWitchDeviceAuth = vi.hoisted(() => vi.fn());
const resolveProjectSkillMemberRole = vi.hoisted(() => vi.fn());
const listPublishedProjectSkillsFromDb = vi.hoisted(() => vi.fn());

vi.mock("@/lib/agentWitch/requireAgentWitchDeviceAuth", () => ({
  requireAgentWitchDeviceAuth,
}));
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRole",
  () => ({ resolveProjectSkillMemberRole }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/awc/listPublishedProjectSkillsFromDb",
  () => ({ listPublishedProjectSkillsFromDb }),
);

import { GET } from "@/app/api/agent-witch/projects/[projectId]/skills/published/route";

const call = (projectId = "proj-1") =>
  GET(new Request("http://test/api/agent-witch/projects/x/skills/published"), {
    params: Promise.resolve({ projectId }),
  });

describe("GET …/skills/published (device auth)", () => {
  beforeEach(() => {
    requireAgentWitchDeviceAuth.mockReset();
    resolveProjectSkillMemberRole.mockReset();
    listPublishedProjectSkillsFromDb.mockReset();
    requireAgentWitchDeviceAuth.mockResolvedValue({
      device: { id: "dev-1", userId: "user-1" },
    });
  });

  it("owner ok", async () => {
    resolveProjectSkillMemberRole.mockResolvedValue({ ok: true, role: "owner" });
    listPublishedProjectSkillsFromDb.mockResolvedValue([
      { skillId: "s1", publishedVersion: 1, contentHash: "sha256:a" },
    ]);
    const response = await call();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      projectId: "proj-1",
      skills: [{ skillId: "s1", publishedVersion: 1, contentHash: "sha256:a" }],
    });
  });

  it("member ok", async () => {
    resolveProjectSkillMemberRole.mockResolvedValue({
      ok: true,
      role: "member",
    });
    listPublishedProjectSkillsFromDb.mockResolvedValue([]);
    const response = await call();
    expect(response.status).toBe(200);
    expect((await response.json()).skills).toEqual([]);
  });

  it("viewer ok", async () => {
    resolveProjectSkillMemberRole.mockResolvedValue({
      ok: true,
      role: "viewer",
    });
    listPublishedProjectSkillsFromDb.mockResolvedValue([]);
    expect((await call()).status).toBe(200);
  });

  it("non-member 404 Project not found", async () => {
    resolveProjectSkillMemberRole.mockResolvedValue({
      ok: false,
      code: "forbidden",
    });
    const response = await call();
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      ok: false,
      errorMessage: "Project not found.",
    });
    expect(listPublishedProjectSkillsFromDb).not.toHaveBeenCalled();
  });

  it("DB error 500", async () => {
    resolveProjectSkillMemberRole.mockResolvedValue({ ok: true, role: "owner" });
    listPublishedProjectSkillsFromDb.mockRejectedValue(new Error("db down"));
    const response = await call();
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      ok: false,
      errorMessage: "listPublished failed.",
    });
  });
});
