import { useMemo } from "react";

import { applyProjectFolderToWorkflowFieldValues } from "@/lib/workflows/applyProjectFolderToWorkflowFieldValues";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export const useEffectiveWorkflowFieldValues = (
  workflowFields: readonly WorkflowFieldDefinition[],
  workflowFieldValues: Readonly<Record<string, string>>,
  projectFolderPath: string | null,
): Readonly<Record<string, string>> =>
  useMemo(
    () =>
      projectFolderPath === null
        ? workflowFieldValues
        : applyProjectFolderToWorkflowFieldValues(
            workflowFields,
            projectFolderPath,
            workflowFieldValues,
          ),
    [projectFolderPath, workflowFieldValues, workflowFields],
  );
