import { DEVICE_CODE_INTERVAL_SECONDS } from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import { deliverApprovedDeviceTokens } from "@/lib/agentAccess/deviceCode/deliverApprovedDeviceTokens";
import {
  devicePollConsumedResponse,
  devicePollDeniedResponse,
  devicePollExpiredResponse,
  devicePollInvalidGrantResponse,
  devicePollPendingResponse,
} from "@/lib/agentAccess/deviceCode/devicePollStatusResponse";
import { enforceDeviceCodePollInterval } from "@/lib/agentAccess/deviceCode/enforceDeviceCodePollInterval";
import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import { hashDeviceCode } from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import type { PollDeviceTokenResult } from "@/lib/agentAccess/deviceCode/PollDeviceTokenResult.type";
import { parseSqlTimestamptz } from "@/lib/agentAccess/deviceCode/parseSqlTimestamptz";
import { asRowArray, getSql } from "@/lib/db";

export type { PollDeviceTokenResult };

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

  const expiresAt = parseSqlTimestamptz(row.expires_at);
  const intervalSeconds =
    typeof row.interval_seconds === "number"
      ? row.interval_seconds
      : DEVICE_CODE_INTERVAL_SECONDS;

  const rawStatus = typeof row.status === "string" ? row.status : "pending";
  const expiredOpen =
    (rawStatus === "pending" || rawStatus === "approved") &&
    expiresAt.length > 0 &&
    Date.parse(expiresAt) <= nowMs;

  if (expiredOpen) {
    await sql`
      UPDATE agent_access_device_requests
      SET status = 'expired'
      WHERE id = ${row.id} AND status IN ('pending', 'approved')
    `;
  }

  const status = expiredOpen ? "expired" : rawStatus;

  if (status === "pending") {
    const early = await enforceDeviceCodePollInterval({
      row: {
        id: row.id,
        interval_seconds: row.interval_seconds,
        last_poll_at: row.last_poll_at,
        slow_down_until: row.slow_down_until,
      },
      intervalSeconds,
      nowMs,
      nowIso,
    });
    return early ?? devicePollPendingResponse();
  }

  if (status === "denied") {
    return devicePollDeniedResponse();
  }
  if (status === "expired") {
    return devicePollExpiredResponse();
  }
  if (status === "consumed") {
    return devicePollConsumedResponse();
  }
  if (status !== "approved") {
    return devicePollInvalidGrantResponse();
  }

  return deliverApprovedDeviceTokens({
    deviceRequestId: row.id,
    nowIso,
  });
};
