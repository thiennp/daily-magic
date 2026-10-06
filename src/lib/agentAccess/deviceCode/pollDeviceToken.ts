import {
  DEVICE_ACCESS_TOKEN_TTL_MS,
  DEVICE_CODE_INTERVAL_SECONDS,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import { hashDeviceCode } from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { asRowArray, getSql } from "@/lib/db";

export type PollDeviceTokenResult =
  | {
      readonly ok: true;
      readonly status: 200;
      readonly body: {
        readonly access_token: string;
        readonly token_type: "Bearer";
        readonly expires_in: number;
        readonly refresh_token: string;
      };
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly body: {
        readonly error: string;
        readonly error_description?: string;
        readonly interval?: number;
      };
    };

/**
 * RFC 8628 token poll. Enforces interval; returns slow_down when polled early.
 */
export const pollDeviceToken = async (input: {
  readonly deviceCode: string;
  readonly nowMs?: number;
}): Promise<PollDeviceTokenResult> => {
  const deviceCode = input.deviceCode.trim();
  if (deviceCode.length < 16) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "device_code is required.",
      },
    };
  }

  await ensureDeviceCodeSchema();
  const nowMs = input.nowMs ?? Date.now();
  const nowIso = new Date(nowMs).toISOString();
  const sql = getSql();
  const codeHash = hashDeviceCode(deviceCode);

  const row = asRowArray(
    await sql`
      SELECT id, status, expires_at, interval_seconds, last_poll_at,
             slow_down_until, token_id
      FROM agent_access_device_requests
      WHERE device_code_hash = ${codeHash}
      LIMIT 1
    `,
  )[0];

  if (row === undefined || typeof row.id !== "string") {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "Unknown device_code.",
      },
    };
  }

  const expiresAt =
    typeof row.expires_at === "string"
      ? row.expires_at
      : row.expires_at instanceof Date
        ? row.expires_at.toISOString()
        : "";
  const intervalSeconds =
    typeof row.interval_seconds === "number"
      ? row.interval_seconds
      : DEVICE_CODE_INTERVAL_SECONDS;

  let status = typeof row.status === "string" ? row.status : "pending";

  if (
    (status === "pending" || status === "approved") &&
    expiresAt.length > 0 &&
    Date.parse(expiresAt) <= nowMs
  ) {
    await sql`
      UPDATE agent_access_device_requests
      SET status = 'expired'
      WHERE id = ${row.id} AND status IN ('pending', 'approved')
    `;
    status = "expired";
  }

  // slow_down / interval enforcement for pending polls
  const lastPollAt =
    typeof row.last_poll_at === "string"
      ? Date.parse(row.last_poll_at)
      : row.last_poll_at instanceof Date
        ? row.last_poll_at.getTime()
        : null;
  const slowDownUntil =
    typeof row.slow_down_until === "string"
      ? Date.parse(row.slow_down_until)
      : row.slow_down_until instanceof Date
        ? row.slow_down_until.getTime()
        : null;

  if (status === "pending") {
    if (slowDownUntil !== null && nowMs < slowDownUntil) {
      await sql`
        UPDATE agent_access_device_requests
        SET last_poll_at = ${nowIso}
        WHERE id = ${row.id}
      `;
      return {
        ok: false,
        status: 400,
        body: {
          error: "slow_down",
          interval: intervalSeconds * 2,
        },
      };
    }

    if (
      lastPollAt !== null &&
      nowMs - lastPollAt < intervalSeconds * 1000
    ) {
      const nextSlow = new Date(nowMs + intervalSeconds * 2 * 1000);
      await sql`
        UPDATE agent_access_device_requests
        SET last_poll_at = ${nowIso},
            slow_down_until = ${nextSlow.toISOString()}
        WHERE id = ${row.id}
      `;
      return {
        ok: false,
        status: 400,
        body: {
          error: "slow_down",
          interval: intervalSeconds * 2,
        },
      };
    }

    await sql`
      UPDATE agent_access_device_requests
      SET last_poll_at = ${nowIso},
          slow_down_until = NULL
      WHERE id = ${row.id}
    `;

    return {
      ok: false,
      status: 400,
      body: { error: "authorization_pending" },
    };
  }

  if (status === "denied") {
    return {
      ok: false,
      status: 400,
      body: { error: "access_denied" },
    };
  }

  if (status === "expired") {
    return {
      ok: false,
      status: 400,
      body: { error: "expired_token" },
    };
  }

  if (status === "consumed") {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "device_code already used.",
      },
    };
  }

  if (status !== "approved") {
    return {
      ok: false,
      status: 400,
      body: { error: "invalid_grant" },
    };
  }

  // Deliver one-time plaintext and mark consumed.
  const delivery = asRowArray(
    await sql`
      DELETE FROM agent_access_device_token_delivery
      WHERE device_request_id = ${row.id}
      RETURNING access_token, refresh_token
    `,
  )[0];

  const accessToken =
    typeof delivery?.access_token === "string" ? delivery.access_token : null;
  const refreshToken =
    typeof delivery?.refresh_token === "string" ? delivery.refresh_token : null;

  if (accessToken === null || refreshToken === null) {
    await sql`
      UPDATE agent_access_device_requests
      SET status = 'consumed', consumed_at = ${nowIso}
      WHERE id = ${row.id}
    `;
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "Tokens already delivered.",
      },
    };
  }

  await sql`
    UPDATE agent_access_device_requests
    SET status = 'consumed',
        consumed_at = ${nowIso},
        last_poll_at = ${nowIso}
    WHERE id = ${row.id}
  `;

  return {
    ok: true,
    status: 200,
    body: {
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: Math.floor(DEVICE_ACCESS_TOKEN_TTL_MS / 1000),
      refresh_token: refreshToken,
    },
  };
};
