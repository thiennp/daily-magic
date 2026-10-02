import { handleApproveAccessPatch } from "@/app/api/projects/[projectId]/access/handleApproveAccessPatch";
import {
  handleDenyAccessPatch,
  handleRevokeAccessPatch,
} from "@/app/api/projects/[projectId]/access/handleDenyRevokeAccessPatch";

export const handleProjectAccessPatch = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly body: Record<string, unknown>;
}): Promise<Response> => {
  if (input.body.action === "approve") {
    return handleApproveAccessPatch(input);
  }
  if (input.body.action === "deny") {
    return handleDenyAccessPatch(input);
  }
  if (input.body.action === "revoke") {
    return handleRevokeAccessPatch(input);
  }
  return Response.json(
    { ok: false, errorMessage: "action must be approve|deny|revoke" },
    { status: 400 },
  );
};
