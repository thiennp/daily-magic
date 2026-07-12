import { isCapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { isCapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { isCapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { isDispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";

export default function mapPublishedCapabilityRow(
  row: Record<string, unknown>,
): PublishedCapabilityRecord {
  const type = String(row.type);
  const status = String(row.status);
  const visibility = String(row.visibility);
  const dispatchOverride = row.dispatch_policy_override
    ? String(row.dispatch_policy_override)
    : null;

  return {
    id: String(row.id),
    ownerUserId: String(row.owner_user_id),
    groupId: row.group_id ? String(row.group_id) : null,
    type: isCapabilityType(type) ? type : "agent",
    name: String(row.name),
    description: String(row.description ?? ""),
    exampleRequest: String(row.example_request ?? ""),
    visibility: isCapabilityVisibility(visibility) ? visibility : "group",
    status: isCapabilityStatus(status) ? status : "draft",
    dispatchPolicyOverride:
      dispatchOverride && isDispatchPolicy(dispatchOverride)
        ? dispatchOverride
        : null,
    harnessSetSlug: row.harness_set_slug ? String(row.harness_set_slug) : null,
    currentVersionId: row.current_version_id
      ? String(row.current_version_id)
      : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}
