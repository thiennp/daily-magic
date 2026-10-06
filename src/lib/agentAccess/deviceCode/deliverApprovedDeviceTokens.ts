import { DEVICE_ACCESS_TOKEN_TTL_MS } from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import type { PollDeviceTokenResult } from "@/lib/agentAccess/deviceCode/PollDeviceTokenResult.type";
import { asRowArray, getSql } from "@/lib/db";

/** One-time plaintext delivery for an approved device request. */
export const deliverApprovedDeviceTokens = async (input: {
  readonly deviceRequestId: string;
  readonly nowIso: string;
}): Promise<PollDeviceTokenResult> => {
  const sql = getSql();
  const delivery = asRowArray(
    await sql`
      DELETE FROM agent_access_device_token_delivery
      WHERE device_request_id = ${input.deviceRequestId}
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
      SET status = 'consumed', consumed_at = ${input.nowIso}
      WHERE id = ${input.deviceRequestId}
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
        consumed_at = ${input.nowIso},
        last_poll_at = ${input.nowIso}
    WHERE id = ${input.deviceRequestId}
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
