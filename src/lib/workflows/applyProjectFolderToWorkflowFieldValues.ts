import { getWorkflowProjectFieldKeys } from "@/lib/workflows/workflowProjectFields";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export const applyProjectFolderToWorkflowFieldValues = (
  fields: readonly WorkflowFieldDefinition[],
  folderPath: string,
  currentValues: Readonly<Record<string, string>>,
): Record<string, string> => {
  const projectFieldKeys = getWorkflowProjectFieldKeys(fields);

  if (projectFieldKeys.length === 0) {
    return { ...currentValues };
  }

  return projectFieldKeys.reduce<Record<string, string>>(
    (nextValues, key) => ({
      ...nextValues,
      [key]: folderPath,
    }),
    { ...currentValues },
  );
};
