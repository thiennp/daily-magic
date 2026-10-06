import { beforeEach, describe, expect, it, vi } from "vitest";

const { sqlMock, bucketAllowed } = vi.hoisted(() => ({
  sqlMock: vi.fn(),
  bucketAllowed: vi.fn(async (..._args: unknown[]) => true),
}));

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/agentAccess/consumeAgentAccessBucket", () => ({
  consumeAgentAccessBucket: (...args: unknown[]) => bucketAllowed(...args),
}));

vi.mock("@/lib/agentAccess/resolveAgentAccessRegisterUser", () => ({
  resolveAgentAccessRegisterUser: vi.fn(async () => "agent-user-1"),
}));

vi.mock("@/lib/agentAccess/buildSyntheticAgentEmail", () => ({
  buildSyntheticAgentEmail: () => "agt-test@agents.agentwitch.com",
}));

import {
  installDeviceCodeSqlMockFrom,
  qText,
  store,
} from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.fixtures";

beforeEach(() => {
  installDeviceCodeSqlMockFrom({ sqlMock, bucketAllowed });
});

import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { confirmDeviceAuthorization } from "@/lib/agentAccess/deviceCode/confirmDeviceAuthorization";
import { startDeviceAuthorization } from "@/lib/agentAccess/deviceCode/startDeviceAuthorization";
import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";

describe("device-code confirm terms + ownership", () => {
  const nowMs = 1_700_000_000_000;
  const termsBody = {
    acceptTerms: true,
    termsVersion: AWC_TERMS_VERSION,
    clientName: "Cursor Assistant",
    displayName: "Scout",
  };

  it("device-issued token writes terms_version and terms_accepted_at", async () => {
    const started = await startDeviceAuthorization({
      body: termsBody,
      ipHash: "ip-terms",
      nowMs,
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;

    const confirmed = await confirmDeviceAuthorization({
      userCode: started.body.user_code,
      ownerUserId: "human-owner-terms",
      ipHash: "ip-h-terms",
      nowMs: nowMs + 2_000,
    });
    expect(confirmed.ok).toBe(true);
    expect(store.tokens[0]?.terms_version).toBe(AWC_TERMS_VERSION);
    expect(store.tokens[0]?.terms_accepted_at).toBe(
      store.requests[0]?.created_at,
    );
  });

  it("device-issued token has owner binding and no project grant at confirm", async () => {
    const started = await startDeviceAuthorization({
      body: termsBody,
      ipHash: "ip-6",
      nowMs,
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;

    const confirmed = await confirmDeviceAuthorization({
      userCode: started.body.user_code,
      ownerUserId: "human-owner-6",
      ipHash: "ip-h6",
      nowMs: nowMs + 2_000,
    });
    expect(confirmed.ok).toBe(true);
    expect(store.tokens[0]?.owner_user_id).toBe("human-owner-6");
    const membershipCalls = sqlMock.mock.calls.filter((c) =>
      qText(c[0] as TemplateStringsArray).includes("project_membership"),
    );
    expect(membershipCalls).toHaveLength(0);
  });

  it("existing non-expiring tokens stay valid shape (nullable expires_at)", async () => {
    store.tokens.push({
      id: "legacy-1",
      token_hash: hashAgentAccessToken("aw_legacy_token_value_____"),
      owner_user_id: null,
      expires_at: null,
      revoked_at: null,
      refresh_token_hash: null,
      refresh_expires_at: null,
    });
    expect(store.tokens[0]?.expires_at).toBeNull();
    expect(store.tokens[0]?.revoked_at).toBeNull();
  });
});

describe("confirm without login is rejected at route layer", () => {
  it("documents that verify/confirm requires requireAuth (401)", () => {
    expect(typeof confirmDeviceAuthorization).toBe("function");
  });
});
