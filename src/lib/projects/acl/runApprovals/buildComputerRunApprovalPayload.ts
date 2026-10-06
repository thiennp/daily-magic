import { ComputerRunApprovalState } from "@/lib/projects/acl/runApprovals/computerRunApprovalState.constant";
import type { ComputerRunApprovalPayload } from "@/lib/projects/acl/runApprovals/computerRunApprovalPayload.type";
import type { ComputerRunApprovalCardFields } from "@/lib/projects/acl/runApprovals/resolveComputerRunApprovalCardFields";

export const buildComputerRunApprovalPayload = (input: {
  readonly runId: string;
  readonly projectId: string;
  readonly requesterUserId: string;
  readonly requesterLabel: string | null;
  readonly prompt: string;
  readonly approvalExpiresAt: string | null;
  readonly fields: ComputerRunApprovalCardFields;
  readonly state?: ComputerRunApprovalPayload["state"];
}): ComputerRunApprovalPayload => ({
  runId: input.runId,
  projectId: input.projectId,
  requesterUserId: input.requesterUserId,
  requesterLabel: input.requesterLabel,
  prompt: input.prompt,
  tool: input.fields.tool,
  computerName: input.fields.computerName,
  projectFolder: input.fields.projectFolder,
  approvalExpiresAt: input.approvalExpiresAt,
  state: input.state ?? ComputerRunApprovalState.PENDING,
});
