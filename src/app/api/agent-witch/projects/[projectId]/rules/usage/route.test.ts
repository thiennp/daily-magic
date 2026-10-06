import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/agent-witch/projects/[projectId]/rules/usage/route";

const getProjectRuleUsage = vi.hoisted(() => vi.fn());
const resolveActor = vi.hoisted(() => vi.fn());

vi.mock(
  "@/features/project-pitfalls/internal/infrastructure/orchestrators/getProjectRuleUsage",
  () => ({ getProjectRuleUsage }),
);
vi.mock("@/lib/agentWitch/resolveAgentWitchRequestActorUserId", () => ({
  resolveAgentWitchRequestActorUserId: resolveActor,
}));

const ctx = { params: Promise.resolve({ projectId: "p1" }) };
const url = "http://test/api/agent-witch/projects/p1/rules/usage";

describe("/api/agent-witch/projects/[projectId]/rules/usage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resolveActor.mockResolvedValue("u1");
    getProjectRuleUsage.mockResolvedValue({
      ok: true,
      projectId: "p1",
      windowDays: null,
      rules: [
        {
          ruleId: "arch-max-lines",
          title: "Seed symptom",
          source: "seed",
          active: true,
          hitCount: 0,
          lastHitAt: null,
        },
      ],
      overlaps: [],
    });
  });

  it("passes through 401 from auth", async () => {
    resolveActor.mockResolvedValue(
      Response.json({ ok: false }, { status: 401 }),
    );
    expect((await GET(new Request(url), ctx)).status).toBe(401);
    expect(getProjectRuleUsage).not.toHaveBeenCalled();
  });

  it("forwards days query and returns usage payload", async () => {
    const response = await GET(new Request(`${url}?days=14`), ctx);
    expect(getProjectRuleUsage).toHaveBeenCalledWith({
      actorUserId: "u1",
      projectId: "p1",
      daysRaw: "14",
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      ok: true,
      projectId: "p1",
      windowDays: null,
      rules: [{ ruleId: "arch-max-lines", hitCount: 0 }],
      overlaps: [],
    });
  });

  it("maps invalid_arguments to 400 and forbidden to 403", async () => {
    getProjectRuleUsage.mockResolvedValue({
      ok: false,
      code: "invalid_arguments",
      field: "days",
    });
    const bad = await GET(new Request(`${url}?days=0`), ctx);
    expect(bad.status).toBe(400);
    expect(await bad.json()).toEqual({
      ok: false,
      errorMessage: "invalid_arguments",
      field: "days",
    });
    getProjectRuleUsage.mockResolvedValue({ ok: false, code: "forbidden" });
    expect((await GET(new Request(url), ctx)).status).toBe(403);
  });
});
