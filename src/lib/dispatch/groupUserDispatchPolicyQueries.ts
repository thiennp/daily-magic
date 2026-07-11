import {
  DEFAULT_DISPATCH_POLICY,
  isDispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";
import { asRowArray, getSql } from "@/lib/db";

export async function getGroupDispatchPolicy(
  groupId: string,
): Promise<DispatchPolicyValue> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT dispatch_policy
      FROM groups
      WHERE id = ${groupId}
    `,
  );

  const policy = result[0]?.dispatch_policy;
  if (typeof policy === "string" && isDispatchPolicy(policy)) {
    return policy;
  }

  return DEFAULT_DISPATCH_POLICY;
}

export async function updateGroupDispatchPolicy(
  groupId: string,
  policy: DispatchPolicyValue,
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE groups
    SET dispatch_policy = ${policy}
    WHERE id = ${groupId}
  `;
}

export async function getUserAgentDispatchPolicy(
  userId: string,
): Promise<DispatchPolicyValue | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT agent_dispatch_policy
      FROM users
      WHERE id = ${userId}
    `,
  );

  const policy = result[0]?.agent_dispatch_policy;
  if (typeof policy === "string" && isDispatchPolicy(policy)) {
    return policy;
  }

  return null;
}

export async function updateUserAgentDispatchPolicy(
  userId: string,
  policy: DispatchPolicyValue | null,
): Promise<void> {
  const sql = getSql();
  await sql`
    UPDATE users
    SET agent_dispatch_policy = ${policy}
    WHERE id = ${userId}
  `;
}
