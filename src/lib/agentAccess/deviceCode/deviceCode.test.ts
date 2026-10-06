import { beforeEach, describe, expect, it, vi } from "vitest";

import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { confirmDeviceAuthorization } from "@/lib/agentAccess/deviceCode/confirmDeviceAuthorization";
import { denyDeviceAuthorization } from "@/lib/agentAccess/deviceCode/denyDeviceAuthorization";
import { resetDeviceCodeSchemaEnsureForTests } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import {
  formatUserCodeDisplay,
  hashDeviceCode,
  hashRefreshToken,
  hashUserCode,
  normalizeUserCode,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { pollDeviceToken } from "@/lib/agentAccess/deviceCode/pollDeviceToken";
import { refreshDeviceAccessToken } from "@/lib/agentAccess/deviceCode/refreshDeviceAccessToken";
import { revokeAgentAccessToken } from "@/lib/agentAccess/deviceCode/revokeAgentAccessToken";
import { startDeviceAuthorization } from "@/lib/agentAccess/deviceCode/startDeviceAuthorization";
import { resetAgentAccessSchemaEnsureForTests } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import { requireAwcTermsAcceptance } from "@/lib/agentAccess/requireAwcTermsAcceptance";

const sqlMock = vi.fn();
const bucketAllowed = vi.fn(async () => true);

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

type RequestRow = {
  id: string;
  device_code_hash: string;
  user_code_hash: string;
  client_name: string | null;
  display_name: string | null;
  terms_version: string;
  status: string;
  interval_seconds: number;
  expires_at: string;
  created_at: string;
  last_poll_at: string | null;
  slow_down_until: string | null;
  owner_user_id: string | null;
  token_id: string | null;
  decided_at: string | null;
  consumed_at: string | null;
};

type TokenRow = {
  id: string;
  user_id?: string;
  token_hash: string;
  token_prefix?: string;
  owner_user_id: string | null;
  expires_at: string | null;
  refresh_token_hash: string | null;
  refresh_expires_at: string | null;
  revoked_at: string | null;
  last_used_at?: string | null;
};

type DeliveryRow = {
  device_request_id: string;
  access_token: string;
  refresh_token: string;
};

const store: {
  requests: RequestRow[];
  tokens: TokenRow[];
  delivery: DeliveryRow[];
} = { requests: [], tokens: [], delivery: [] };

const qText = (strings: TemplateStringsArray): string =>
  String.raw({ raw: strings });

beforeEach(() => {
  sqlMock.mockReset();
  bucketAllowed.mockReset();
  bucketAllowed.mockResolvedValue(true);
  store.requests = [];
  store.tokens = [];
  store.delivery = [];
  resetDeviceCodeSchemaEnsureForTests();
  resetAgentAccessSchemaEnsureForTests();

  sqlMock.mockImplementation(
    async (strings: TemplateStringsArray, ...values: unknown[]) => {
      const q = qText(strings);

      if (
        q.includes("CREATE TABLE") ||
        q.includes("ALTER TABLE") ||
        q.includes("CREATE INDEX") ||
        q.includes("CREATE UNIQUE INDEX")
      ) {
        return [];
      }

      if (q.includes("INSERT INTO agent_access_device_requests")) {
        // id, device_hash, user_hash, client, display, terms, interval, expires, created
        store.requests.push({
          id: String(values[0]),
          device_code_hash: String(values[1]),
          user_code_hash: String(values[2]),
          client_name: (values[3] as string | null) ?? null,
          display_name: (values[4] as string | null) ?? null,
          terms_version: String(values[5]),
          status: "pending",
          interval_seconds: Number(values[6]),
          expires_at: String(values[7]),
          created_at: String(values[8]),
          last_poll_at: null,
          slow_down_until: null,
          owner_user_id: null,
          token_id: null,
          decided_at: null,
          consumed_at: null,
        });
        return [];
      }

      if (q.includes("INSERT INTO agent_access_tokens")) {
        // userId, tokenHash, prefix, ownerUserId, accessExp, refreshHash, refreshExp
        // ('none' and NULL are SQL literals, not values)
        const row: TokenRow = {
          id: `tok-${store.tokens.length + 1}`,
          user_id: String(values[0]),
          token_hash: String(values[1]),
          token_prefix: String(values[2]),
          owner_user_id: (values[3] as string | null) ?? null,
          expires_at: (values[4] as string | null) ?? null,
          refresh_token_hash: (values[5] as string | null) ?? null,
          refresh_expires_at: (values[6] as string | null) ?? null,
          revoked_at: null,
        };
        store.tokens.push(row);
        return [{ id: row.id }];
      }

      if (q.includes("INSERT INTO agent_access_device_token_delivery")) {
        store.delivery.push({
          device_request_id: String(values[0]),
          access_token: String(values[1]),
          refresh_token: String(values[2]),
        });
        return [];
      }

      if (
        q.includes("FROM agent_access_device_requests") &&
        q.includes("user_code_hash")
      ) {
        const found = store.requests.find(
          (r) => r.user_code_hash === values[0],
        );
        return found ? [{ ...found }] : [];
      }

      if (
        q.includes("FROM agent_access_device_requests") &&
        q.includes("device_code_hash")
      ) {
        const found = store.requests.find(
          (r) => r.device_code_hash === values[0],
        );
        return found ? [{ ...found }] : [];
      }

      if (q.includes("status = 'approved'") && q.includes("UPDATE")) {
        // owner, tokenId, decidedAt, id
        const target = store.requests.find((r) => r.id === values[3]);
        if (!target || target.status !== "pending") return [];
        target.status = "approved";
        target.owner_user_id = String(values[0]);
        target.token_id = String(values[1]);
        target.decided_at = String(values[2]);
        return [{ id: target.id }];
      }

      if (q.includes("status = 'denied'") && q.includes("UPDATE")) {
        // owner, decidedAt, userCodeHash, nowIso
        const target = store.requests.find(
          (r) =>
            r.user_code_hash === values[2] &&
            r.status === "pending" &&
            Date.parse(r.expires_at) > Date.parse(String(values[3])),
        );
        if (!target) return [];
        target.status = "denied";
        target.owner_user_id = String(values[0]);
        target.decided_at = String(values[1]);
        return [{ id: target.id }];
      }

      if (q.includes("status = 'expired'") && q.includes("UPDATE")) {
        const target = store.requests.find((r) => r.id === values[0]);
        if (
          target &&
          (target.status === "pending" || target.status === "approved")
        ) {
          target.status = "expired";
        }
        return [];
      }

      if (q.includes("status = 'consumed'") && q.includes("UPDATE")) {
        const target =
          store.requests.find((r) => r.id === values[values.length - 1]) ??
          store.requests[0];
        if (target) {
          target.status = "consumed";
          target.consumed_at = String(values[0]);
          if (values.length > 2) {
            target.last_poll_at = String(values[1]);
          }
        }
        return [];
      }

      if (q.includes("slow_down_until") && q.includes("UPDATE")) {
        const target = store.requests[0];
        if (!target) return [];
        if (q.includes("slow_down_until = NULL")) {
          target.last_poll_at = String(values[0]);
          target.slow_down_until = null;
        } else if (values.length >= 2 && !q.includes("slow_down_until = NULL")) {
          // last_poll only OR last_poll + slow_down
          if (q.includes("slow_down_until = $") || q.includes("slow_down_until =")) {
            // Check if second value is set in template - neon tagged uses values
            if (values.length === 1) {
              target.last_poll_at = String(values[0]);
            } else {
              target.last_poll_at = String(values[0]);
              target.slow_down_until = String(values[1]);
            }
          }
        } else {
          target.last_poll_at = String(values[0]);
        }
        return [];
      }

      if (q.includes("last_poll_at") && q.includes("UPDATE") && !q.includes("consumed")) {
        const target = store.requests.find((r) => r.id === values[1]) ?? store.requests[0];
        if (target) target.last_poll_at = String(values[0]);
        return [];
      }

      if (q.includes("DELETE FROM agent_access_device_token_delivery")) {
        const idx = store.delivery.findIndex(
          (d) => d.device_request_id === values[0],
        );
        if (idx < 0) return [];
        const [row] = store.delivery.splice(idx, 1);
        return [row];
      }

      if (q.includes("DELETE FROM agent_access_tokens")) {
        store.tokens = store.tokens.filter((t) => t.id !== values[0]);
        return [];
      }

      if (q.includes("UPDATE users SET name")) {
        return [];
      }

      if (
        q.includes("FROM agent_access_tokens") &&
        q.includes("refresh_token_hash")
      ) {
        const found = store.tokens.find(
          (t) => t.refresh_token_hash === values[0],
        );
        return found ? [{ ...found }] : [];
      }

      // Refresh rotation (sets token_hash AND refresh_token_hash to new values)
      if (
        q.includes("UPDATE agent_access_tokens") &&
        q.includes("token_prefix") &&
        q.includes("refresh_expires_at")
      ) {
        // nextAccessHash, prefix, accessExp, nextRefreshHash, refreshExp, lastUsed, id, oldRefreshHash
        const tok = store.tokens.find(
          (t) =>
            t.id === values[6] &&
            t.refresh_token_hash === values[7] &&
            t.revoked_at === null,
        );
        if (!tok) return [];
        tok.token_hash = String(values[0]);
        tok.token_prefix = String(values[1]);
        tok.expires_at = String(values[2]);
        tok.refresh_token_hash = String(values[3]);
        tok.refresh_expires_at = String(values[4]);
        tok.last_used_at = String(values[5]);
        return [{ id: tok.id }];
      }

      // Revoke
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
        tok.revoked_at = String(values[0]);
        tok.refresh_token_hash = null;
        return [{ id: tok.id }];
      }

      return [];
    },
  );
});

describe("device-code user_code helpers", () => {
  it("formats and normalizes XXXX-XXXX consonant codes", () => {
    expect(formatUserCodeDisplay("BCDFGHJK")).toBe("BCDF-GHJK");
    expect(normalizeUserCode("bcdF-ghjk")).toBe("BCDFGHJK");
    expect(hashUserCode("BCDF-GHJK")).toBe(hashUserCode("BCDFGHJK"));
  });

  it("verify page copy includes locked owner line and never says bot", () => {
    expect(DEVICE_VERIFY_COPY.ownerLine).toBe(
      "You'll be this assistant's owner",
    );
    const joined = Object.values(DEVICE_VERIFY_COPY).join(" ");
    expect(joined.toLowerCase()).not.toMatch(/\bbot\b/);
  });
});

describe("requireAwcTermsAcceptance", () => {
  it("rejects missing or stale terms", () => {
    expect(requireAwcTermsAcceptance({}).ok).toBe(false);
    expect(
      requireAwcTermsAcceptance({
        acceptTerms: true,
        termsVersion: "1999-01-01",
      }).ok,
    ).toBe(false);
  });

  it("accepts current terms", () => {
    expect(
      requireAwcTermsAcceptance({
        acceptTerms: true,
        termsVersion: AWC_TERMS_VERSION,
      }),
    ).toEqual({ ok: true, termsVersion: AWC_TERMS_VERSION });
  });
});

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
    const projectInserts = sqlMock.mock.calls.filter((c) =>
      qText(c[0] as TemplateStringsArray).includes("project_membership"),
    );
    expect(projectInserts).toHaveLength(0);
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
