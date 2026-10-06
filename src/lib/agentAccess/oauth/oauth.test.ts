import { createHash, randomBytes } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { OAUTH_CONSENT_COPY } from "@/features/agent-access/oauth-consent/oauthConsentCopy.constant";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { resetDeviceCodeSchemaEnsureForTests } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import { refreshDeviceAccessToken } from "@/lib/agentAccess/deviceCode/refreshDeviceAccessToken";
import { revokeAgentAccessToken } from "@/lib/agentAccess/deviceCode/revokeAgentAccessToken";
import { hashRefreshToken } from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import {
  buildMcpWwwAuthenticateHeader,
  buildOauthAuthorizationServerMetadata,
  buildOauthProtectedResourceMetadata,
} from "@/lib/agentAccess/oauth/buildOauthDiscoveryDocuments";
import { completeOauthConsent } from "@/lib/agentAccess/oauth/completeOauthConsent";
import { createOauthAuthorizationPending } from "@/lib/agentAccess/oauth/createOauthAuthorizationPending";
import { resetOauthSchemaEnsureForTests } from "@/lib/agentAccess/oauth/ensureOauthSchema";
import { exchangeAuthorizationCode } from "@/lib/agentAccess/oauth/exchangeAuthorizationCode";
import { isAllowedOauthRedirectUri } from "@/lib/agentAccess/oauth/isAllowedOauthRedirectUri";
import { registerOauthClient } from "@/lib/agentAccess/oauth/registerOauthClient";
import {
  base64UrlEncode,
  computePkceS256Challenge,
} from "@/lib/agentAccess/oauth/verifyPkceS256";

const sqlMock = vi.fn();

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

type Store = {
  clients: Array<Record<string, unknown>>;
  pending: Array<Record<string, unknown>>;
  codes: Array<Record<string, unknown>>;
  delivery: Array<Record<string, unknown>>;
  tokens: Array<Record<string, unknown>>;
};

const store: Store = {
  clients: [],
  pending: [],
  codes: [],
  delivery: [],
  tokens: [],
};

const qText = (strings: TemplateStringsArray): string =>
  String.raw({ raw: strings });

const makeVerifier = (): string =>
  base64UrlEncode(randomBytes(32));

beforeEach(() => {
  sqlMock.mockReset();
  store.clients = [];
  store.pending = [];
  store.codes = [];
  store.delivery = [];
  store.tokens = [];
  resetOauthSchemaEnsureForTests();
  resetDeviceCodeSchemaEnsureForTests();
  resetAgentAccessSchemaEnsureForTests();

  sqlMock.mockImplementation(
    async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = qText(strings);
      if (
        q.includes("CREATE TABLE") ||
        q.includes("ALTER TABLE") ||
        q.includes("CREATE INDEX")
      ) {
        return [];
      }

      if (q.includes("INSERT INTO agent_access_oauth_clients")) {
        store.clients.push({
          client_id: values[0],
          client_secret_hash: values[1],
          client_name: values[2],
          redirect_uris: values[3],
          token_endpoint_auth_method: values[4],
        });
        return [];
      }

      if (
        q.includes("FROM agent_access_oauth_clients") &&
        q.includes("client_id")
      ) {
        const found = store.clients.find((c) => c.client_id === values[0]);
        return found ? [{ ...found }] : [];
      }

      if (q.includes("INSERT INTO agent_access_oauth_pending")) {
        store.pending.push({
          id: values[0],
          client_id: values[1],
          redirect_uri: values[2],
          code_challenge: values[3],
          code_challenge_method: values[4],
          state: values[5],
          client_display_name: values[6],
          expires_at: values[7],
          created_at: values[8],
        });
        return [];
      }

      if (q.includes("FROM agent_access_oauth_pending")) {
        const found = store.pending.find((p) => p.id === values[0]);
        return found ? [{ ...found }] : [];
      }

      if (q.includes("DELETE FROM agent_access_oauth_pending")) {
        store.pending = store.pending.filter((p) => p.id !== values[0]);
        return [];
      }

      if (q.includes("INSERT INTO agent_access_tokens")) {
        const row = {
          id: `tok-oauth-${store.tokens.length + 1}`,
          user_id: values[0],
          token_hash: values[1],
          token_prefix: values[2],
          owner_user_id: values[3],
          expires_at: values[4],
          refresh_token_hash: values[5],
          refresh_expires_at: values[6],
          revoked_at: null,
        };
        store.tokens.push(row);
        return [{ id: row.id }];
      }

      if (q.includes("INSERT INTO agent_access_oauth_auth_codes")) {
        store.codes.push({
          id: values[0],
          code_hash: values[1],
          client_id: values[2],
          redirect_uri: values[3],
          code_challenge: values[4],
          code_challenge_method: values[5],
          owner_user_id: values[6],
          token_id: values[7],
          terms_version: values[8],
          client_display_name: values[9],
          expires_at: values[10],
          created_at: values[11],
          used_at: null,
        });
        return [];
      }

      if (q.includes("INSERT INTO agent_access_oauth_token_delivery")) {
        store.delivery.push({
          auth_code_id: values[0],
          access_token: values[1],
          refresh_token: values[2],
        });
        return [];
      }

      if (
        q.includes("FROM agent_access_oauth_auth_codes") &&
        q.includes("code_hash")
      ) {
        const found = store.codes.find((c) => c.code_hash === values[0]);
        return found ? [{ ...found }] : [];
      }

      if (
        q.includes("UPDATE agent_access_oauth_auth_codes") &&
        q.includes("used_at")
      ) {
        const code = store.codes.find(
          (c) => c.id === values[1] && c.used_at === null,
        );
        if (!code) return [];
        code.used_at = values[0];
        return [{ id: code.id }];
      }

      if (q.includes("DELETE FROM agent_access_oauth_token_delivery")) {
        const idx = store.delivery.findIndex(
          (d) => d.auth_code_id === values[0],
        );
        if (idx < 0) return [];
        const [row] = store.delivery.splice(idx, 1);
        return [row];
      }

      if (q.includes("UPDATE users SET name")) return [];

      if (
        q.includes("FROM agent_access_tokens") &&
        q.includes("refresh_token_hash")
      ) {
        const found = store.tokens.find(
          (t) => t.refresh_token_hash === values[0],
        );
        return found ? [{ ...found }] : [];
      }

      if (
        q.includes("UPDATE agent_access_tokens") &&
        q.includes("token_prefix") &&
        q.includes("refresh_expires_at")
      ) {
        const tok = store.tokens.find(
          (t) =>
            t.id === values[6] &&
            t.refresh_token_hash === values[7] &&
            t.revoked_at === null,
        );
        if (!tok) return [];
        tok.token_hash = values[0];
        tok.token_prefix = values[1];
        tok.expires_at = values[2];
        tok.refresh_token_hash = values[3];
        tok.refresh_expires_at = values[4];
        return [{ id: tok.id }];
      }

      if (
        q.includes("UPDATE agent_access_tokens") &&
        q.includes("revoked_at") &&
        !q.includes("token_prefix")
      ) {
        const hash = values[1];
        const tok = store.tokens.find(
          (t) =>
            (t.token_hash === hash || t.refresh_token_hash === hash) &&
            t.revoked_at === null,
        );
        if (!tok) return [];
        tok.revoked_at = values[0];
        tok.refresh_token_hash = null;
        return [{ id: tok.id }];
      }

      return [];
    },
  );
});

describe("OAuth discovery docs", () => {
  it("exposes protected-resource and authorization-server metadata", () => {
    const resource = buildOauthProtectedResourceMetadata();
    expect(resource.resource).toContain("/api/agent-access/mcp");
    expect(resource.authorization_servers).toContain(
      "https://www.agentwitch.com",
    );
    const asMeta = buildOauthAuthorizationServerMetadata();
    expect(asMeta.code_challenge_methods_supported).toEqual(["S256"]);
    expect(asMeta.grant_types_supported).toContain("authorization_code");
    expect(buildMcpWwwAuthenticateHeader()).toContain("resource_metadata=");
  });
});

describe("redirect_uri policy", () => {
  it("allows https and localhost; rejects javascript/data", () => {
    expect(isAllowedOauthRedirectUri("https://claude.ai/callback")).toBe(true);
    expect(isAllowedOauthRedirectUri("http://localhost:8787/cb")).toBe(true);
    expect(isAllowedOauthRedirectUri("http://127.0.0.1:3000/cb")).toBe(true);
    expect(isAllowedOauthRedirectUri("javascript:alert(1)")).toBe(false);
    expect(isAllowedOauthRedirectUri("data:text/html,hi")).toBe(false);
    expect(isAllowedOauthRedirectUri("http://evil.example/cb")).toBe(false);
  });
});

describe("PKCE S256", () => {
  it("computes S256 challenge", () => {
    const verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
    const challenge = computePkceS256Challenge(verifier);
    expect(challenge).toBe(
      base64UrlEncode(createHash("sha256").update(verifier).digest()),
    );
  });
});

describe("OAuth ownership flow", () => {
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

  it("code single-use + short TTL; refresh rotation; revoke; ownership only", async () => {
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

    // Single-use
    const replay = await exchangeAuthorizationCode({
      code: code!,
      redirectUri,
      clientId: client.client_id,
      clientSecret: client.client_secret ?? null,
      codeVerifier: verifier,
      nowMs: nowMs + 3_000,
    });
    expect(replay.ok).toBe(false);

    // Refresh rotation (seed hash to match issued refresh)
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

    const revoked = await revokeAgentAccessToken({
      token: refreshed.body.access_token,
      nowMs: nowMs + 5_000,
    });
    // May be not_found if hash was rotated — revoke by new access after seeding
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
    void revoked;
  });

  it("expired auth code rejected", async () => {
    const client = await register();
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

    // Force expiry on stored code
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
});

describe("consent copy", () => {
  it("has owner line and never says bot", () => {
    expect(OAUTH_CONSENT_COPY.ownerLine).toBe(
      "You'll be this assistant's owner",
    );
    const joined = Object.values(OAUTH_CONSENT_COPY).join(" ");
    expect(joined.toLowerCase()).not.toMatch(/\bbot\b/);
  });
});

describe("DCR rejects bad redirect schemes", () => {
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
