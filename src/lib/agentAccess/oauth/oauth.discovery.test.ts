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

import { createHash } from "node:crypto";

import {
  base64UrlEncode,
  computePkceS256Challenge,
} from "@/lib/agentAccess/oauth/verifyPkceS256";
import {
  buildMcpWwwAuthenticateHeader,
  buildOauthAuthorizationServerMetadata,
  buildOauthProtectedResourceMetadata,
} from "@/lib/agentAccess/oauth/buildOauthDiscoveryDocuments";
import { isAllowedOauthRedirectUri } from "@/lib/agentAccess/oauth/isAllowedOauthRedirectUri";

describe("OAuth discovery docs", () => {
  it("exposes protected-resource and authorization-server metadata", () => {
    const resource = buildOauthProtectedResourceMetadata();
    expect(resource.resource).toContain("/api/agent-access/mcp/connect");
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
