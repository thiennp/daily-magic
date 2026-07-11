import { isGroupRole } from "@/lib/auth/roles";
import {
  DEFAULT_DISPATCH_POLICY,
  isDispatchPolicy,
} from "@/lib/dispatch/DispatchPolicy.constant";
import type GroupMembershipRecord from "@/lib/auth/types/GroupMembershipRecord.type";
import type GroupRecord from "@/lib/auth/types/GroupRecord.type";

export function mapGroupRow(row: Record<string, unknown>): GroupRecord {
  const dispatchPolicy = String(row.dispatch_policy ?? DEFAULT_DISPATCH_POLICY);

  return {
    id: String(row.id),
    name: String(row.name),
    dispatchPolicy: isDispatchPolicy(dispatchPolicy)
      ? dispatchPolicy
      : DEFAULT_DISPATCH_POLICY,
    createdAt: String(row.created_at),
  };
}

export function mapMembershipRow(
  row: Record<string, unknown>,
): GroupMembershipRecord {
  const role = String(row.role);

  return {
    id: String(row.id),
    groupId: String(row.group_id),
    userId: String(row.user_id),
    role: isGroupRole(role) ? role : "user",
    createdAt: String(row.created_at),
  };
}
