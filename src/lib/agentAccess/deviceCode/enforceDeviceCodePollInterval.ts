import type { PollDeviceTokenResult } from "@/lib/agentAccess/deviceCode/PollDeviceTokenResult.type";
import {
  parseSqlTimestamptzMs,
} from "@/lib/agentAccess/deviceCode/parseSqlTimestamptz";
import { getSql } from "@/lib/db";

type PollIntervalRow = {
  readonly id: string;
  readonly interval_seconds: unknown;
  readonly last_poll_at: unknown;
  readonly slow_down_until: unknown;
};

/**
 * RFC 8628 interval / slow_down enforcement for pending polls.
 * Returns a poll result when the client must wait; null when pending continues.
 */
export const enforceDeviceCodePollInterval = async (input: {
  readonly row: PollIntervalRow;
  readonly intervalSeconds: number;
  readonly nowMs: number;
  readonly nowIso: string;
}): Promise<PollDeviceTokenResult | null> => {
  const sql = getSql();
  const lastPollAt = parseSqlTimestamptzMs(input.row.last_poll_at);
  const slowDownUntil = parseSqlTimestamptzMs(input.row.slow_down_until);

  if (slowDownUntil !== null && input.nowMs < slowDownUntil) {
    await sql`
      UPDATE agent_access_device_requests
      SET last_poll_at = ${input.nowIso}
      WHERE id = ${input.row.id}
    `;
    return {
      ok: false,
      status: 400,
      body: {
        error: "slow_down",
        interval: input.intervalSeconds * 2,
      },
    };
  }

  if (
    lastPollAt !== null &&
    input.nowMs - lastPollAt < input.intervalSeconds * 1000
  ) {
    const nextSlow = new Date(input.nowMs + input.intervalSeconds * 2 * 1000);
    await sql`
      UPDATE agent_access_device_requests
      SET last_poll_at = ${input.nowIso},
          slow_down_until = ${nextSlow.toISOString()}
      WHERE id = ${input.row.id}
    `;
    return {
      ok: false,
      status: 400,
      body: {
        error: "slow_down",
        interval: input.intervalSeconds * 2,
      },
    };
  }

  await sql`
    UPDATE agent_access_device_requests
    SET last_poll_at = ${input.nowIso},
        slow_down_until = NULL
    WHERE id = ${input.row.id}
  `;

  return null;
};
