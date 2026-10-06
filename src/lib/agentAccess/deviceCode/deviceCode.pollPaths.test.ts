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
import { denyDeviceAuthorization } from "@/lib/agentAccess/deviceCode/denyDeviceAuthorization";
import { pollDeviceToken } from "@/lib/agentAccess/deviceCode/pollDeviceToken";
import { startDeviceAuthorization } from "@/lib/agentAccess/deviceCode/startDeviceAuthorization";

describe("device-code poll edge paths", () => {
  const nowMs = 1_700_000_000_000;
  const termsBody = {
    acceptTerms: true,
    termsVersion: AWC_TERMS_VERSION,
    clientName: "Cursor Assistant",
    displayName: "Scout",
  };

  it("deny path returns access_denied on poll", async () => {
    const started = await startDeviceAuthorization({
      body: termsBody,
      ipHash: "ip-2",
      nowMs,
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;

    const denied = await denyDeviceAuthorization({
      userCode: started.body.user_code,
      ownerUserId: "human-2",
      ipHash: "ip-h2",
      nowMs: nowMs + 1_000,
    });
    expect(denied.ok).toBe(true);

    const polled = await pollDeviceToken({
      deviceCode: started.body.device_code,
      nowMs: nowMs + 7_000,
    });
    expect(polled.ok).toBe(false);
    if (polled.ok) return;
    expect(polled.body.error).toBe("access_denied");
  });

  it("expiry returns expired_token", async () => {
    const started = await startDeviceAuthorization({
      body: termsBody,
      ipHash: "ip-3",
      nowMs,
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;

    const polled = await pollDeviceToken({
      deviceCode: started.body.device_code,
      nowMs: nowMs + 11 * 60 * 1000,
    });
    expect(polled.ok).toBe(false);
    if (polled.ok) return;
    expect(polled.body.error).toBe("expired_token");
  });

  it("slow_down when client polls faster than interval", async () => {
    const started = await startDeviceAuthorization({
      body: termsBody,
      ipHash: "ip-4",
      nowMs,
    });
    expect(started.ok).toBe(true);
    if (!started.ok) return;

    const first = await pollDeviceToken({
      deviceCode: started.body.device_code,
      nowMs: nowMs + 1_000,
    });
    expect(first.ok).toBe(false);
    if (first.ok) return;
    expect(first.body.error).toBe("authorization_pending");

    const second = await pollDeviceToken({
      deviceCode: started.body.device_code,
      nowMs: nowMs + 2_000,
    });
    expect(second.ok).toBe(false);
    if (second.ok) return;
    expect(second.body.error).toBe("slow_down");
  });
});
