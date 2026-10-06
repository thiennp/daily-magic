import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/agentAccess/oauth/createOauthAuthorizationPending", () => ({
  createOauthAuthorizationPending: vi.fn(async () => ({
    ok: true,
    consentPath: "/oauth/consent?pending=p-1",
  })),
}));

vi.mock("@/lib/auth/auth", () => ({ auth: vi.fn() }));

import { GET } from "@/app/api/agent-access/oauth/authorize/route";
import { auth } from "@/lib/auth/auth";

const INTERNAL_AUTHORIZE_URL =
  "https://e6bc35ac51a2:8080/api/agent-access/oauth/authorize?response_type=code&client_id=c-1&redirect_uri=https%3A%2F%2Fchatgpt.com%2Fcb&code_challenge=x&code_challenge_method=S256";

const authMock = auth as unknown as ReturnType<typeof vi.fn>;

describe("GET /api/agent-access/oauth/authorize public origin", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    authMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("redirects signed-out humans to the public /login, not the internal host", async () => {
    authMock.mockResolvedValue(null);

    const response = await GET(new Request(INTERNAL_AUTHORIZE_URL));

    expect(response.status).toBe(302);
    const location = new URL(response.headers.get("location") ?? "");
    expect(location.origin).toBe("https://www.agentwitch.com");
    expect(location.pathname).toBe("/login");
    expect(location.searchParams.get("callbackUrl")).toBe(
      "/oauth/consent?pending=p-1",
    );
  });

  it("redirects signed-in humans to the public consent page", async () => {
    authMock.mockResolvedValue({ user: { id: "u-1" } });

    const response = await GET(new Request(INTERNAL_AUTHORIZE_URL));

    expect(response.headers.get("location")).toBe(
      "https://www.agentwitch.com/oauth/consent?pending=p-1",
    );
  });
});
