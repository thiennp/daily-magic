import { beforeEach, describe, expect, it, vi } from "vitest";

const readState = vi.hoisted(() => vi.fn());
const consumeBucket = vi.hoisted(() => vi.fn());
const claimToken = vi.hoisted(() => vi.fn());
const redeemInvite = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/acl/invites/readProjectInviteJoinState", () => ({
  readProjectInviteJoinState: readState,
}));
vi.mock("@/lib/agentAccess/consumeAgentAccessBucket", () => ({
  consumeAgentAccessBucket: consumeBucket,
}));
vi.mock("@/lib/projects/acl/invites/claimProjectInviteToken", () => ({
  claimProjectInviteToken: claimToken,
  restoreProjectInviteUse: vi.fn(),
}));
vi.mock("@/lib/projects/acl/invites/redeemProjectInvite", () => ({
  redeemProjectInvite: redeemInvite,
}));

import { GET } from "@/app/join/[token]/route";

const TOKEN = "tok-fake-invite-0000";
const GONE =
  "This invite is no longer valid. Ask the project owner for a new invite.";

const call = (token: string, headers: Record<string, string> = {}) =>
  GET(new Request(`https://www.agentwitch.com/join/${token}`, { headers }), {
    params: Promise.resolve({ token }),
  });

const expectPublicHeaders = (response: Response) => {
  expect(response.headers.get("cache-control")).toBe("no-store");
  expect(response.headers.get("x-robots-tag")).toBe("noindex");
};

describe("GET /join/[token] errors, limits and safety", () => {
  beforeEach(() => {
    readState.mockReset();
    consumeBucket.mockReset();
    claimToken.mockReset();
    redeemInvite.mockReset();
    consumeBucket.mockResolvedValue(true);
    readState.mockResolvedValue({
      kind: "usable",
      projectId: "proj-fake",
      projectName: "Demo Project",
      autoApprove: null,
    });
  });

  it("returns 410 with the locked line for a revoked, expired or used-up invite (md + json)", async () => {
    readState.mockResolvedValue({ kind: "gone" });
    const md = await call(TOKEN);
    expect(md.status).toBe(410);
    expectPublicHeaders(md);
    expect((await md.text()).trim()).toBe(GONE);
    const json = await call(`${TOKEN}.json`);
    expect(json.status).toBe(410);
    expect(await json.json()).toEqual({
      ok: false,
      code: "invite_gone",
      error: GONE,
    });
  });

  it("returns 404 for an unknown token (md + json)", async () => {
    readState.mockResolvedValue({ kind: "unknown" });
    const md = await call("unknown-token-0000000");
    expect(md.status).toBe(404);
    expectPublicHeaders(md);
    const json = await call("unknown-token-0000000", {
      accept: "application/json",
    });
    expect(json.status).toBe(404);
    expect(await json.json()).toMatchObject({ ok: false, code: "not_found" });
  });

  it("rate-limits by IP with the agent-access bucket helper (429, no lookup)", async () => {
    consumeBucket.mockResolvedValue(false);
    const response = await call(TOKEN, { "x-forwarded-for": "203.0.113.9" });
    expect(response.status).toBe(429);
    expectPublicHeaders(response);
    expect(readState).not.toHaveBeenCalled();
    expect(consumeBucket).toHaveBeenCalledWith(
      expect.objectContaining({ bucket: "invite_join_page", limit: 120 }),
    );
  });

  it("never claims or redeems the invite on GET (safe for link unfurlers)", async () => {
    await call(TOKEN);
    await call(`${TOKEN}.json`);
    expect(claimToken).not.toHaveBeenCalled();
    expect(redeemInvite).not.toHaveBeenCalled();
  });
});
