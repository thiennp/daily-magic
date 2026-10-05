import { beforeEach, describe, expect, it, vi } from "vitest";

const requireAgentWitchDeviceAuth = vi.hoisted(() => vi.fn());
const resolveProjectSkillMemberRole = vi.hoisted(() => vi.fn());
const getPublishedProjectSkillBodyFromDb = vi.hoisted(() => vi.fn());

vi.mock("@/lib/agentWitch/requireAgentWitchDeviceAuth", () => ({
  requireAgentWitchDeviceAuth,
}));
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/orchestrators/resolveProjectSkillMemberRole",
  () => ({ resolveProjectSkillMemberRole }),
);
vi.mock(
  "@/features/project-skill-share/internal/infrastructure/awc/getPublishedProjectSkillBodyFromDb",
  () => ({ getPublishedProjectSkillBodyFromDb }),
);

import { GET } from "@/app/api/agent-witch/projects/[projectId]/skills/published/[skillId]/route";

const call = (input?: {
  readonly projectId?: string;
  readonly skillId?: string;
  readonly version?: string;
}) => {
  const projectId = input?.projectId ?? "proj-1";
  const skillId = input?.skillId ?? "greet";
  const version = input?.version ?? "1";
  return GET(
    new Request(
      `http://test/api/agent-witch/projects/${projectId}/skills/published/${skillId}?version=${version}`,
    ),
    { params: Promise.resolve({ projectId, skillId }) },
  );
};

describe("GET …/skills/published/[skillId] (device auth)", () => {
  beforeEach(() => {
    requireAgentWitchDeviceAuth.mockReset();
    resolveProjectSkillMemberRole.mockReset();
    getPublishedProjectSkillBodyFromDb.mockReset();
    requireAgentWitchDeviceAuth.mockResolvedValue({
      device: { id: "dev-1", userId: "user-1" },
    });
  });

  it("owner ok", async () => {
    resolveProjectSkillMemberRole.mockResolvedValue({ ok: true, role: "owner" });
    getPublishedProjectSkillBodyFromDb.mockResolvedValue({
      body: "# hi",
      contentHash: "sha256:x",
    });
    const response = await call();
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      ok: true,
      projectId: "proj-1",
      skillId: "greet",
      version: 1,
      body: "# hi",
      contentHash: "sha256:x",
    });
  });

  it("member ok", async () => {
    resolveProjectSkillMemberRole.mockResolvedValue({
      ok: true,
      role: "member",
    });
    getPublishedProjectSkillBodyFromDb.mockResolvedValue({
      body: "b",
      contentHash: "sha256:y",
    });
    expect((await call()).status).toBe(200);
  });

  it("viewer ok", async () => {
    resolveProjectSkillMemberRole.mockResolvedValue({
      ok: true,
      role: "viewer",
    });
    getPublishedProjectSkillBodyFromDb.mockResolvedValue({
      body: "b",
      contentHash: "sha256:y",
    });
    expect((await call()).status).toBe(200);
  });

  it("non-member 404 Project not found", async () => {
    resolveProjectSkillMemberRole.mockResolvedValue({
      ok: false,
      code: "not_found",
    });
    const response = await call();
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      ok: false,
      errorMessage: "Project not found.",
    });
    expect(getPublishedProjectSkillBodyFromDb).not.toHaveBeenCalled();
  });

  it("DB error 500", async () => {
    resolveProjectSkillMemberRole.mockResolvedValue({ ok: true, role: "owner" });
    getPublishedProjectSkillBodyFromDb.mockRejectedValue(new Error("db down"));
    const response = await call();
    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      ok: false,
      errorMessage: "getPublishedBody failed.",
    });
  });
});
