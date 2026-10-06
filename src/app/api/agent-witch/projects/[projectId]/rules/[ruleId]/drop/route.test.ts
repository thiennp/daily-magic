import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST as DROP } from "@/app/api/agent-witch/projects/[projectId]/rules/[ruleId]/drop/route";
import { POST as RESTORE } from "@/app/api/agent-witch/projects/[projectId]/rules/[ruleId]/restore/route";

const setProjectRuleActive = vi.hoisted(() => vi.fn());
const resolveActor = vi.hoisted(() => vi.fn());

vi.mock(
  "@/features/project-pitfalls/internal/infrastructure/orchestrators/setProjectRuleActive",
  () => ({ setProjectRuleActive }),
);
vi.mock("@/lib/agentWitch/resolveAgentWitchRequestActorUserId", () => ({
  resolveAgentWitchRequestActorUserId: resolveActor,
}));

const ctx = { params: Promise.resolve({ projectId: "p1", ruleId: "stale-next" }) };
const url = "http://test/api/agent-witch/projects/p1/rules/stale-next";
const post = (action: "drop" | "restore") =>
  new Request(`${url}/${action}`, { method: "POST" });
const rule = {
  ruleId: "stale-next",
  title: "Stale .next cache",
  source: "retired",
  active: false,
  hitCount: 2,
  lastHitAt: null,
};

describe("/api/agent-witch/projects/[projectId]/rules/[ruleId]/{drop,restore}", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resolveActor.mockResolvedValue("owner-1");
    setProjectRuleActive.mockResolvedValue({
      ok: true,
      projectId: "p1",
      rule,
      changed: true,
    });
  });

  it("passes through 401 from auth without touching the rule", async () => {
    resolveActor.mockResolvedValue(Response.json({ ok: false }, { status: 401 }));
    expect((await DROP(post("drop"), ctx)).status).toBe(401);
    expect((await RESTORE(post("restore"), ctx)).status).toBe(401);
    expect(setProjectRuleActive).not.toHaveBeenCalled();
  });

  it("drop → active:false, restore → active:true; returns { ok, rule }", async () => {
    const dropped = await DROP(post("drop"), ctx);
    expect(setProjectRuleActive).toHaveBeenLastCalledWith({
      actorUserId: "owner-1",
      projectId: "p1",
      ruleId: "stale-next",
      active: false,
    });
    expect(dropped.status).toBe(200);
    expect(await dropped.json()).toEqual({ ok: true, projectId: "p1", rule, changed: true });
    await RESTORE(post("restore"), ctx);
    expect(setProjectRuleActive).toHaveBeenLastCalledWith(
      expect.objectContaining({ active: true }),
    );
  });

  it("maps forbidden 403, not_found 404, limit_exceeded 409 (errorMessage)", async () => {
    setProjectRuleActive.mockResolvedValue({ ok: false, code: "forbidden" });
    const member = await DROP(post("drop"), ctx);
    expect(member.status).toBe(403);
    expect(await member.json()).toEqual({ ok: false, errorMessage: "forbidden" });
    setProjectRuleActive.mockResolvedValue({ ok: false, code: "not_found" });
    expect((await DROP(post("drop"), ctx)).status).toBe(404);
    setProjectRuleActive.mockResolvedValue({ ok: false, code: "limit_exceeded" });
    const full = await RESTORE(post("restore"), ctx);
    expect(full.status).toBe(409);
    expect(await full.json()).toEqual({ ok: false, errorMessage: "limit_exceeded" });
  });
});
