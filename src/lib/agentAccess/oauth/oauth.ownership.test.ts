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
import { registerOauthClient } from "@/lib/agentAccess/oauth/registerOauthClient";
import {
  base64UrlEncode,
  computePkceS256Challenge,
} from "@/lib/agentAccess/oauth/verifyPkceS256";

describe("OAuth ownership + terms issuance", () => {
  const nowMs = 1_700_000_000_000;
  const redirectUri = "https://claude.ai/callback";

  it("writes terms columns and single-use code; no project grant", async () => {
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
    const code = new URL(approved.redirectUrl).searchParams.get("code");
    expect(code).toBeTruthy();
    expect(store.tokens[0]?.owner_user_id).toBe("human-owner-1");
    expect(store.tokens[0]?.terms_version).toBe(AWC_TERMS_VERSION);
    expect(store.tokens[0]?.terms_accepted_at).toBeTruthy();
    expect(
      sqlMock.mock.calls.filter((c) =>
        qText(c[0] as TemplateStringsArray).includes("project_membership"),
      ),
    ).toHaveLength(0);

    const exchanged = await exchangeAuthorizationCode({
      code: code!,
      redirectUri,
      clientId: client.client_id,
      clientSecret: client.client_secret ?? null,
      codeVerifier: verifier,
      nowMs: nowMs + 2_000,
    });
    expect(exchanged.ok).toBe(true);
    expect(
      (
        await exchangeAuthorizationCode({
          code: code!,
          redirectUri,
          clientId: client.client_id,
          clientSecret: client.client_secret ?? null,
          codeVerifier: verifier,
          nowMs: nowMs + 3_000,
        })
      ).ok,
    ).toBe(false);
  });
});
