import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";
import { resolveComputerMembershipDisplayName } from "@/lib/projects/acl/resolveComputerMembershipDisplayName";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type ComputerRunApprovalCardFields = {
  readonly tool: string;
  readonly computerName: string;
  readonly projectFolder: string;
};

/**
 * Card fields from part1 data already on the run: writer_agent, device row,
 * project folder. No new columns. project_id is required (never relax).
 */
export const resolveComputerRunApprovalCardFields = async (input: {
  readonly writerAgent: string;
  readonly deviceId: string | null;
  readonly projectId: string;
}): Promise<ComputerRunApprovalCardFields> => {
  const tool =
    input.writerAgent.trim().length > 0 ? input.writerAgent.trim() : "claude-cli";
  const project = await getUserProjectById(input.projectId);
  const projectFolder = project?.folderPath?.trim() ?? "";
  if (input.deviceId === null || input.deviceId.length === 0) {
    return { tool, computerName: "Computer", projectFolder };
  }
  const device = await findAgentWitchDeviceById(input.deviceId);
  const computerName = resolveComputerMembershipDisplayName({
    displayName: device?.displayName ?? null,
    deviceLabel: device?.deviceLabel ?? null,
    deviceId: input.deviceId,
  });
  return { tool, computerName, projectFolder };
};
