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

import { randomBytes } from "node:crypto";

import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { hashRefreshToken } from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { refreshDeviceAccessToken } from "@/lib/agentAccess/deviceCode/refreshDeviceAccessToken";
import { revokeAgentAccessToken } from "@/lib/agentAccess/deviceCode/revokeAgentAccessToken";
import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import { completeOauthConsent } from "@/lib/agentAccess/oauth/completeOauthConsent";
import { createOauthAuthorizationPending } from "@/lib/agentAccess/oauth/createOauthAuthorizationPending";
import { exchangeAuthorizationCode } from "@/lib/agentAccess/oauth/exchangeAuthorizationCode";
import { registerOauthClient } from "@/lib/agentAccess/oauth/registerOauthClient";
import {
  base64UrlEncode,
  computePkceS256Challenge,
} from "@/lib/agentAccess/oauth/verifyPkceS256";

describe("OAuth ownership flow", () => {
  const nowMs = 1_700_000_000_000;
  const redirectUri = "https://claude.ai/callback";
  const makeVerifier = (): string => base64UrlEncode(randomBytes(32));

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

  it("code single-use + refresh rotation; revoke; ownership + terms", async () => {
    const client = await register();
    const verifier = makeVerifier();
    const challenge = computePkceS256Challenge(verifier);

    const pending = await createOauthAuthorizationPending({
      clientId: client.client_id,
      redirectUri,
      codeChallenge: challenge,
      codeChallengeMethod: "S256",
      state: "xyz",
      nowMs,
    });
    expect(pending.ok).toBe(true);
    if (!pending.ok) return;

    const approved = await completeOauthConsent({
      pendingId: pending.pendingId,
      ownerUserId: "human-owner-1",
      decision: "approve",
      acceptTerms: true,
      termsVersion: AWC_TERMS_VERSION,
      nowMs: nowMs + 1_000,
    });
    expect(approved.ok).toBe(true);
    if (!approved.ok) return;
    const codeUrl = new URL(approved.redirectUrl);
    const code = codeUrl.searchParams.get("code");
    expect(code).toBeTruthy();
    expect(store.tokens[0]?.owner_user_id).toBe("human-owner-1");
    expect(store.tokens[0]?.terms_version).toBe(AWC_TERMS_VERSION);
    expect(store.tokens[0]?.terms_accepted_at).toBeTruthy();
    const projectInserts = sqlMock.mock.calls.filter((c) =>
      qText(c[0] as TemplateStringsArray).includes("project_membership"),
    );
    expect(projectInserts).toHaveLength(0);

    const exchanged = await exchangeAuthorizationCode({
      code: code!,
      redirectUri,
      clientId: client.client_id,
      clientSecret: client.client_secret ?? null,
      codeVerifier: verifier,
      nowMs: nowMs + 2_000,
    });
    expect(exchanged.ok).toBe(true);
    if (!exchanged.ok) return;
    expect(exchanged.body.access_token.startsWith("aw_")).toBe(true);
    expect(exchanged.body.refresh_token.startsWith("awc_atr_")).toBe(true);

    const replay = await exchangeAuthorizationCode({
      code: code!,
      redirectUri,
      clientId: client.client_id,
      clientSecret: client.client_secret ?? null,
      codeVerifier: verifier,
      nowMs: nowMs + 3_000,
    });
    expect(replay.ok).toBe(false);

    const oldRefresh = exchanged.body.refresh_token;
    store.tokens[0]!.refresh_token_hash = hashRefreshToken(oldRefresh);
    store.tokens[0]!.refresh_expires_at = new Date(
      nowMs + 90 * 24 * 60 * 60 * 1000,
    ).toISOString();
    store.tokens[0]!.revoked_at = null;

    const refreshed = await refreshDeviceAccessToken({
      refreshToken: oldRefresh,
      nowMs: nowMs + 4_000,
    });
    expect(refreshed.ok).toBe(true);
    if (!refreshed.ok) return;
    expect(refreshed.body.refresh_token).not.toBe(oldRefresh);

    store.tokens[0]!.token_hash = hashAgentAccessToken(
      refreshed.body.access_token,
    );
    store.tokens[0]!.revoked_at = null;
    const revoked2 = await revokeAgentAccessToken({
      token: refreshed.body.access_token,
      nowMs: nowMs + 5_000,
    });
    expect(revoked2.ok).toBe(true);
    expect(store.tokens[0]?.revoked_at).toBeTruthy();
  });
});
