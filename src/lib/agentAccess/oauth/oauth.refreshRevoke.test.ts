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

describe("OAuth refresh rotation + revoke", () => {
  const nowMs = 1_700_000_000_000;
  const redirectUri = "https://claude.ai/callback";

  it("rotates refresh and revokes access", async () => {
    const registered = await registerOauthClient({
      body: {
        client_name: "Claude",
        redirect_uris: [redirectUri],
        token_endpoint_auth_method: "client_secret_post",
      },
    });
    expect(registered.ok).toBe(true);
    if (!registered.ok) return;
    const client = registered.body;
    const verifier = base64UrlEncode(randomBytes(32));
    const pending = await createOauthAuthorizationPending({
      clientId: client.client_id,
      redirectUri,
      codeChallenge: computePkceS256Challenge(verifier),
      codeChallengeMethod: "S256",
      state: null,
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
    const code = new URL(approved.redirectUrl).searchParams.get("code")!;
    const exchanged = await exchangeAuthorizationCode({
      code,
      redirectUri,
      clientId: client.client_id,
      clientSecret: client.client_secret ?? null,
      codeVerifier: verifier,
      nowMs: nowMs + 2_000,
    });
    expect(exchanged.ok).toBe(true);
    if (!exchanged.ok) return;

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
    const revoked = await revokeAgentAccessToken({
      token: refreshed.body.access_token,
      nowMs: nowMs + 5_000,
    });
    expect(revoked.ok).toBe(true);
    expect(store.tokens[0]?.revoked_at).toBeTruthy();
  });
});
