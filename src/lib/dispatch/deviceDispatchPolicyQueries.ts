import {
  isDispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";
import { asRowArray, getSql } from "@/lib/db";

export async function getDeviceDispatchPolicy(
  deviceId: string,
): Promise<DispatchPolicyValue | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT dispatch_policy
      FROM agent_witch_devices
      WHERE id = ${deviceId}
        AND revoked_at IS NULL
    `,
  );

  const policy = result[0]?.dispatch_policy;
  if (typeof policy === "string" && isDispatchPolicy(policy)) {
    return policy;
  }

  return null;
}

export async function updateDeviceDispatchPolicy(
  deviceId: string,
  userId: string,
  policy: DispatchPolicyValue | null,
): Promise<boolean> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET dispatch_policy = ${policy}
      WHERE id = ${deviceId}
        AND user_id = ${userId}
        AND revoked_at IS NULL
      RETURNING id
    `,
  );

  return result.length > 0;
}

export async function getActiveDeviceIdForUser(
  userId: string,
): Promise<string | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id
      FROM agent_witch_devices
      WHERE user_id = ${userId}
        AND revoked_at IS NULL
      ORDER BY COALESCE(last_seen_at, claimed_at) DESC
      LIMIT 1
    `,
  );

  if (!result[0]) {
    return null;
  }

  return String(result[0].id);
}
