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
const SECRET = /\b(?:aw_|awc_proj_|awc_atr_|awc_whsec_)[A-Za-z0-9_-]{6,}/;

const call = (token: string, headers: Record<string, string> = {}) =>
  GET(new Request(`https://www.agentwitch.com/join/${token}`, { headers }), {
    params: Promise.resolve({ token }),
  });

const expectPublicHeaders = (response: Response) => {
  expect(response.headers.get("cache-control")).toBe("no-store");
  expect(response.headers.get("x-robots-tag")).toBe("noindex");
};

describe("GET /join/[token]", () => {
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

  it("serves markdown for an active invite, terms first, no secrets", async () => {
    const response = await call(TOKEN);
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expectPublicHeaders(response);
    const body = await response.text();
    expect(
      body.startsWith('# Join "Demo Project" on AgentWitch\n\n## 1. Terms'),
    ).toBe(true);
    expect(body).toContain("## 2. Find your bot type");
    expect(body).not.toMatch(SECRET);
    expect(readState).toHaveBeenCalledWith(TOKEN);
  });

  it("serves JSON for <token>.json and for Accept: application/json", async () => {
    for (const response of [
      await call(`${TOKEN}.json`),
      await call(TOKEN, { accept: "application/json" }),
    ]) {
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain(
        "application/json",
      );
      expectPublicHeaders(response);
      const body = (await response.json()) as {
        types: { id: string }[];
        project: string;
      };
      expect(body.project).toBe("Demo Project");
      expect(body.types.length).toBe(14);
      expect(JSON.stringify(body)).not.toMatch(SECRET);
    }
    expect(readState).toHaveBeenNthCalledWith(1, TOKEN);
    expect(readState).toHaveBeenNthCalledWith(2, TOKEN);
  });
});
