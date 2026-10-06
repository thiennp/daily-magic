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
import {
  hashDeviceCode,
  hashRefreshToken,
  hashUserCode,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { pollDeviceToken } from "@/lib/agentAccess/deviceCode/pollDeviceToken";
import { refreshDeviceAccessToken } from "@/lib/agentAccess/deviceCode/refreshDeviceAccessToken";
import { startDeviceAuthorization } from "@/lib/agentAccess/deviceCode/startDeviceAuthorization";

describe("device-code RFC 8628 flow", () => {
  const nowMs = 1_700_000_000_000;
  const termsBody = {
    acceptTerms: true,
    termsVersion: AWC_TERMS_VERSION,
    clientName: "Cursor Assistant",
    displayName: "Scout",
  };

  it("happy path: start → pending → confirm → token → refresh rotation", async () => {
    const started = await startDeviceAuthorization({
      body: termsBody,
      ipHash: "ip-1",
      nowMs,
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;

    expect(started.body.user_code).toMatch(/^[A-Z]{4}-[A-Z]{4}$/);
    expect(started.body.interval).toBe(5);
    expect(started.body.expires_in).toBe(600);
    expect(started.body.verification_uri).toContain("/device/verify");
    expect(store.requests[0]?.device_code_hash).toBe(
      hashDeviceCode(started.body.device_code),
    );
    expect(store.requests[0]?.user_code_hash).toBe(
      hashUserCode(started.body.user_code),
    );
    expect(Date.parse(store.requests[0]!.expires_at)).toBe(
      nowMs + 10 * 60 * 1000,
    );

    const pending = await pollDeviceToken({
      deviceCode: started.body.device_code,
      nowMs: nowMs + 6_000,
    });
    expect(pending.ok).toBe(false);
    if (pending.ok) return;
    expect(pending.body.error).toBe("authorization_pending");

    const confirmed = await confirmDeviceAuthorization({
      userCode: started.body.user_code,
      ownerUserId: "human-owner-1",
      ipHash: "ip-human",
      nowMs: nowMs + 10_000,
    });
    expect(confirmed.ok).toBe(true);
    if (!confirmed.ok) return;
    expect(store.tokens[0]?.owner_user_id).toBe("human-owner-1");
    expect(store.tokens[0]?.expires_at).toBeTruthy();
    expect(store.tokens[0]?.refresh_token_hash).toBeTruthy();
    expect(store.delivery).toHaveLength(1);

    const issued = await pollDeviceToken({
      deviceCode: started.body.device_code,
      nowMs: nowMs + 16_000,
    });
    expect(issued.ok).toBe(true);
    if (!issued.ok) return;
    expect(issued.body.access_token.startsWith("aw_")).toBe(true);
    expect(issued.body.refresh_token.startsWith("awc_atr_")).toBe(true);
    expect(issued.body.expires_in).toBe(7 * 24 * 60 * 60);
    expect(store.delivery).toHaveLength(0);
    expect(store.requests[0]?.status).toBe("consumed");

    const oldRefresh = issued.body.refresh_token;
    store.tokens[0]!.refresh_token_hash = hashRefreshToken(oldRefresh);
    store.tokens[0]!.refresh_expires_at = new Date(
      nowMs + 90 * 24 * 60 * 60 * 1000,
    ).toISOString();
    store.tokens[0]!.revoked_at = null;

    const refreshed = await refreshDeviceAccessToken({
      refreshToken: oldRefresh,
      nowMs: nowMs + 20_000,
    });
    expect(refreshed.ok).toBe(true);
    if (!refreshed.ok) return;
    expect(refreshed.body.refresh_token).not.toBe(oldRefresh);
    expect(refreshed.body.access_token.startsWith("aw_")).toBe(true);

    const replay = await refreshDeviceAccessToken({
      refreshToken: oldRefresh,
      nowMs: nowMs + 21_000,
    });
    expect(replay.ok).toBe(false);
  });
});
