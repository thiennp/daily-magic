import { WorkflowFieldInputType } from "@/lib/workflows/types/WorkflowFieldDefinition.type";
import type WorkflowFieldDefinition from "@/lib/workflows/types/WorkflowFieldDefinition.type";

export const getWorkflowProjectFieldKeys = (
  fields: readonly WorkflowFieldDefinition[],
): readonly string[] =>
  fields
    .filter((field) => field.type === WorkflowFieldInputType.PROJECT)
    .map((field) => field.key);

export const workflowRequiresProjectSelection = (
  fields: readonly WorkflowFieldDefinition[],
): boolean => getWorkflowProjectFieldKeys(fields).length > 0;

export const filterNonProjectWorkflowFields = (
  fields: readonly WorkflowFieldDefinition[],
): readonly WorkflowFieldDefinition[] =>
  fields.filter((field) => field.type !== WorkflowFieldInputType.PROJECT);
