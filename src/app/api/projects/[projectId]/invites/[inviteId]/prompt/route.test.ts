import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { encryptProjectInviteToken } from "@/lib/projects/acl/invites/projectInviteTokenCipher";

const sqlMock = vi.hoisted(() => vi.fn());
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async (projectId: string) =>
    projectId === "proj-1" ? { id: "proj-1", ownerUserId: "owner-1" } : null,
  ),
}));

import { GET } from "@/app/api/projects/[projectId]/invites/[inviteId]/prompt/route";

const TOKEN = "tok-reveal-0123456789";
const SECRET = "test-auth-secret";

type InviteRow = {
  readonly token_ciphertext: string | null;
  readonly token_iv: string | null;
  readonly usable: boolean;
};

const stored = encryptProjectInviteToken(TOKEN, SECRET);
const usableRow: InviteRow = {
  token_ciphertext: stored.ciphertext,
  token_iv: stored.iv,
  usable: true,
};

const state: { row: InviteRow | null; sweeps: number; selects: string[] } = {
  row: null,
  sweeps: 0,
  selects: [],
};

const call = (projectId = "proj-1", inviteId = "inv-1") =>
  GET(new Request("http://local/prompt"), {
    params: Promise.resolve({ projectId, inviteId }),
  });

describe("GET /api/projects/[projectId]/invites/[inviteId]/prompt (107)", () => {
  beforeEach(() => {
    vi.stubEnv("AUTH_SECRET", SECRET);
    state.row = usableRow;
    state.sweeps = 0;
    state.selects = [];
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({ actor: { id: "owner-1" }, error: null });
    sqlMock.mockReset();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("SET token_ciphertext = NULL")) {
        state.sweeps += 1;
        return [];
      }
      if (q.includes("FROM project_invites")) {
        state.selects.push(q);
        return state.row === null ? [] : [state.row];
      }
      return [];
    });
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("owner gets the invite URL for a usable invite, no-store", async () => {
    const response = await call();
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    const body = (await response.json()) as { url: string };
    expect(body.url.endsWith(`/invite/p/${TOKEN}`)).toBe(true);
    // Same usable rule as the owner list: never redeemed, unexpired, unrevoked.
    expect(state.selects[0]).toContain("revoked_at IS NULL");
    expect(state.selects[0]).toContain("expires_at > NOW()");
    expect(state.selects[0]).toContain("uses_remaining = max_uses");
    expect(state.sweeps).toBe(0);
  });

  it("non-owner gets 403 and no DB read", async () => {
    requireAuth.mockResolvedValue({ actor: { id: "intruder" }, error: null });
    const response = await call();
    expect(response.status).toBe(403);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(JSON.stringify(await response.json())).not.toContain(TOKEN);
    expect(state.selects).toHaveLength(0);
  });

  it("signed-out gets 401", async () => {
    requireAuth.mockResolvedValue({
      actor: null,
      error: Response.json({ error: "Unauthorized" }, { status: 401 }),
    });
    expect((await call()).status).toBe(401);
  });

  it.each([["used (redeemed)"], ["revoked"], ["expired"]])(
    "%s invite → 410 and its stored copy is cleared",
    async () => {
      state.row = { ...usableRow, usable: false };
      const response = await call();
      expect(response.status).toBe(410);
      expect(response.headers.get("Cache-Control")).toBe("no-store");
      const body = JSON.stringify(await response.json());
      expect(body).not.toContain(TOKEN);
      expect(body).toContain("Make a new invite");
      expect(state.sweeps).toBe(1);
    },
  );

  it("unknown invite → 404", async () => {
    state.row = null;
    expect((await call()).status).toBe(404);
    expect((await call("proj-missing")).status).toBe(404);
  });

  it("old invite without ciphertext → 409 make a new invite", async () => {
    state.row = { token_ciphertext: null, token_iv: null, usable: true };
    const response = await call();
    expect(response.status).toBe(409);
    const body = (await response.json()) as {
      code: string;
      errorMessage: string;
    };
    expect(body.code).toBe("invite_prompt_unavailable");
    expect(body.errorMessage).toMatch(/make a new invite/i);
  });

  it("wrong AUTH_SECRET (rotated) or missing secret → 409, no token", async () => {
    vi.stubEnv("AUTH_SECRET", "rotated-secret");
    const rotated = await call();
    expect(rotated.status).toBe(409);
    expect(JSON.stringify(await rotated.json())).not.toContain(TOKEN);
    vi.stubEnv("AUTH_SECRET", "");
    expect((await call()).status).toBe(409);
  });
});
