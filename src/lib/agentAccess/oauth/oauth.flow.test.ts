import { beforeEach, describe, expect, it, vi } from "vitest";

const { sqlMock } = vi.hoisted(() => ({
  sqlMock: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/agentAccess/resolveAgentAccessRegisterUser", () => ({
  resolveAgentAccessRegisterUser: vi.fn(async () => "agent-user-oauth-1"),
}));

vi.mock("@/lib/agentAccess/buildSyntheticAgentEmail", () => ({
  buildSyntheticAgentEmail: () => "agt-oauth@agents.agentwitch.com",
}));

import {
  installOauthSqlMockFrom,
  qText,
  store,
} from "@/lib/agentAccess/oauth/oauthSqlMock.fixtures";

beforeEach(() => {
  installOauthSqlMockFrom({ sqlMock });
});

import { createOauthAuthorizationPending } from "@/lib/agentAccess/oauth/createOauthAuthorizationPending";
import { registerOauthClient } from "@/lib/agentAccess/oauth/registerOauthClient";

describe("OAuth authorize gates", () => {
  const nowMs = 1_700_000_000_000;
  const redirectUri = "https://claude.ai/callback";

  const register = async () => {
    const registered = await registerOauthClient({
      body: {
        client_name: "Claude",
        redirect_uris: [redirectUri],
        token_endpoint_auth_method: "client_secret_post",
      },
    });
    expect(registered.ok).toBe(true);
    if (!registered.ok) throw new Error("register failed");
    return registered.body;
  };

  it("PKCE required and plain rejected", async () => {
    const client = await register();
    const plain = await createOauthAuthorizationPending({
      clientId: client.client_id,
      redirectUri,
      codeChallenge: "x".repeat(43),
      codeChallengeMethod: "plain",
      state: "s1",
      nowMs,
    });
    expect(plain.ok).toBe(false);
    if (plain.ok) return;
    expect(plain.error_description).toMatch(/S256/);
  });

  it("redirect_uri mismatch rejected", async () => {
    const client = await register();
    const mismatch = await createOauthAuthorizationPending({
      clientId: client.client_id,
      redirectUri: "https://evil.example/cb",
      codeChallenge: "x".repeat(43),
      codeChallengeMethod: "S256",
      state: null,
      nowMs,
    });
    expect(mismatch.ok).toBe(false);
    if (mismatch.ok) return;
    expect(mismatch.error_description).toMatch(/redirect_uri/);
  });
});
