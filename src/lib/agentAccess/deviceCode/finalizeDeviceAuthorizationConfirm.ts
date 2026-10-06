import {
  insertDeviceIssuedAccessToken,
  stageDeviceTokenDelivery,
} from "@/lib/agentAccess/deviceCode/insertDeviceIssuedAccessToken";
import { asRowArray, getSql } from "@/lib/db";

export type FinalizeConfirmResult =
  | { readonly ok: true; readonly tokenId: string }
  | {
      readonly ok: false;
      readonly status: number;
      readonly code: string;
      readonly error: string;
    };

/** Insert token, approve request, stage one-time delivery (or roll back). */
export const finalizeDeviceAuthorizationConfirm = async (input: {
  readonly userId: string;
  readonly ownerUserId: string;
  readonly deviceRequestId: string;
  readonly termsVersion: string;
  readonly termsAcceptedAt: string;
  readonly nowMs: number;
  readonly nowIso: string;
}): Promise<FinalizeConfirmResult> => {
  const issued = await insertDeviceIssuedAccessToken({
    userId: input.userId,
    ownerUserId: input.ownerUserId,
    termsVersion: input.termsVersion,
    termsAcceptedAt: input.termsAcceptedAt,
    nowMs: input.nowMs,
  });
  if (issued === null) {
    return {
      ok: false,
      status: 500,
      code: "token_create_failed",
      error: "Could not create the account credential.",
    };
  }

  const sql = getSql();
  const updated = asRowArray(
    await sql`
      UPDATE agent_access_device_requests
      SET status = 'approved',
          owner_user_id = ${input.ownerUserId},
          token_id = ${issued.tokenId},
          decided_at = ${input.nowIso}
      WHERE id = ${input.deviceRequestId}
        AND status = 'pending'
      RETURNING id
    `,
  );

  if (updated.length === 0) {
    await sql`DELETE FROM agent_access_tokens WHERE id = ${issued.tokenId}`;
    return {
      ok: false,
      status: 409,
      code: "already_decided",
      error: "This code was already used.",
    };
  }

  await stageDeviceTokenDelivery({
    deviceRequestId: input.deviceRequestId,
    accessToken: issued.accessToken,
    refreshToken: issued.refreshToken,
    nowIso: input.nowIso,
  });

  return { ok: true, tokenId: issued.tokenId };
};
