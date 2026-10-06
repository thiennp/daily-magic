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
import { completeOauthConsent } from "@/lib/agentAccess/oauth/completeOauthConsent";
import { createOauthAuthorizationPending } from "@/lib/agentAccess/oauth/createOauthAuthorizationPending";
import { exchangeAuthorizationCode } from "@/lib/agentAccess/oauth/exchangeAuthorizationCode";
import { formatOauthRedirectHost } from "@/lib/agentAccess/oauth/formatOauthRedirectHost";
import { registerOauthClient } from "@/lib/agentAccess/oauth/registerOauthClient";
import {
  base64UrlEncode,
  computePkceS256Challenge,
} from "@/lib/agentAccess/oauth/verifyPkceS256";

describe("OAuth expiry + DCR + host format", () => {
  const nowMs = 1_700_000_000_000;
  const redirectUri = "https://claude.ai/callback";
  const makeVerifier = (): string => base64UrlEncode(randomBytes(32));

  it("expired auth code rejected", async () => {
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
    const verifier = makeVerifier();
    const challenge = computePkceS256Challenge(verifier);
    const pending = await createOauthAuthorizationPending({
      clientId: client.client_id,
      redirectUri,
      codeChallenge: challenge,
      codeChallengeMethod: "S256",
      state: null,
      nowMs,
    });
    expect(pending.ok).toBe(true);
    if (!pending.ok) return;

    const approved = await completeOauthConsent({
      pendingId: pending.pendingId,
      ownerUserId: "human-2",
      decision: "approve",
      acceptTerms: true,
      termsVersion: AWC_TERMS_VERSION,
      nowMs: nowMs + 100,
    });
    expect(approved.ok).toBe(true);
    if (!approved.ok) return;
    const code = new URL(approved.redirectUrl).searchParams.get("code")!;

    store.codes[0]!.expires_at = new Date(nowMs).toISOString();

    const exchanged = await exchangeAuthorizationCode({
      code,
      redirectUri,
      clientId: client.client_id,
      clientSecret: client.client_secret ?? null,
      codeVerifier: verifier,
      nowMs: nowMs + 11 * 60 * 1000,
    });
    expect(exchanged.ok).toBe(false);
    if (exchanged.ok) return;
    expect(exchanged.body.error_description).toMatch(/expired/i);
  });

  it("shows registered redirect host for the human (e.g. claude.ai)", () => {
    expect(formatOauthRedirectHost("https://claude.ai/callback")).toBe(
      "claude.ai",
    );
    expect(formatOauthRedirectHost("http://localhost:8787/cb")).toBe(
      "localhost:8787",
    );
  });

  it("rejects javascript: redirect_uris at register", async () => {
    const result = await registerOauthClient({
      body: {
        client_name: "Bad",
        redirect_uris: ["javascript:alert(1)"],
      },
    });
    expect(result.ok).toBe(false);
  });
});
