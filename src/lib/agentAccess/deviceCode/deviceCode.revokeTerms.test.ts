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
import { hashRefreshToken } from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { revokeAgentAccessToken } from "@/lib/agentAccess/deviceCode/revokeAgentAccessToken";
import { startDeviceAuthorization } from "@/lib/agentAccess/deviceCode/startDeviceAuthorization";
import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";

describe("device-code revoke + start terms gate", () => {
  const nowMs = 1_700_000_000_000;

  it("revoked token is rejected by revoke helper", async () => {
    const access = "aw_revoked_token_value_xxxxxx";
    store.tokens.push({
      id: "tok-rev",
      token_hash: hashAgentAccessToken(access),
      refresh_token_hash: hashRefreshToken("awc_atr_revoked_refresh_xx"),
      owner_user_id: "h",
      expires_at: new Date(nowMs + 86_400_000).toISOString(),
      refresh_expires_at: new Date(nowMs + 86_400_000).toISOString(),
      revoked_at: null,
    });

    const revoked = await revokeAgentAccessToken({
      token: access,
      nowMs,
    });
    expect(revoked.ok).toBe(true);
    expect(store.tokens[0]?.revoked_at).toBeTruthy();
  });

  it("start without terms returns 400 terms_acceptance_required", async () => {
    const started = await startDeviceAuthorization({
      body: { clientName: "X" },
      ipHash: "ip-5",
      nowMs,
    });
    expect(started.ok).toBe(false);
    if (started.ok) return;
    expect(started.status).toBe(400);
    expect(started.code).toBe("terms_acceptance_required");
  });
});
