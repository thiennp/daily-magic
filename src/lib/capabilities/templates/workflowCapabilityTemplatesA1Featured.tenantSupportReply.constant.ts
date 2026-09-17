import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { TENANT_SUPPORT_REPLY_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.tenantSupportReply.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const TENANT_SUPPORT_REPLY_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "tenant-support-reply",
    "Property",
    "Tenant support reply",
    "Draft calm, policy-grounded replies to tenant maintenance and lease questions using your lease notes — send only after you approve.",
    TENANT_SUPPORT_REPLY_EXAMPLE_REQUEST,
    [
      ["propertyName", "Property or building name", "text"],
      ["tenantMessage", "Tenant message or situation summary", "textarea"],
      ["leaseNotesPath", "Lease and policy notes folder on your Mac", "text"],
      [
        "issueType",
        "Issue type (maintenance, rent, noise, lease, other)",
        "text",
      ],
      ["replyTone", "Reply tone (optional)", "text", false],
      [
        "tenantLogPath",
        "Tenant thread log file on your Mac (optional)",
        "text",
        false,
      ],
    ],
  );
