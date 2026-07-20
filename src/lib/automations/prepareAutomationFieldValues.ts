import {
  getUserProjectById,
  touchUserProjectLastUsed,
} from "@/lib/projects/userProjectQueries";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { applyProjectFolderToWorkflowFieldValues } from "@/lib/workflows/applyProjectFolderToWorkflowFieldValues";
import { workflowRequiresProjectSelection } from "@/lib/workflows/workflowProjectFields";

export interface PrepareAutomationFieldValuesInput {
  readonly ownerUserId: string;
  readonly capability: PublishedCapabilityRecord;
  readonly fieldValues: Readonly<Record<string, string>>;
  readonly projectId: string | null;
}

export type PrepareAutomationFieldValuesResult =
  | {
      readonly ok: true;
      readonly fieldValues: Record<string, string>;
      readonly projectId: string | null;
    }
  | { readonly ok: false; readonly errorMessage: string };

export const prepareAutomationFieldValues = async (
  input: PrepareAutomationFieldValuesInput,
): Promise<PrepareAutomationFieldValuesResult> => {
  const requiresProject = workflowRequiresProjectSelection(
    input.capability.workflowFields,
  );

  if (requiresProject && input.projectId === null) {
    return { ok: false, errorMessage: "Choose a project folder." };
  }

  if (input.projectId === null) {
    return {
      ok: true,
      fieldValues: { ...input.fieldValues },
      projectId: null,
    };
  }

  const project = await getUserProjectById(input.projectId);

  if (project === null || project.ownerUserId !== input.ownerUserId) {
    return { ok: false, errorMessage: "Project not found." };
  }

  await touchUserProjectLastUsed(project.id, input.ownerUserId);

  return {
    ok: true,
    fieldValues: applyProjectFolderToWorkflowFieldValues(
      input.capability.workflowFields,
      project.folderPath,
      input.fieldValues,
    ),
    projectId: project.id,
  };
};
