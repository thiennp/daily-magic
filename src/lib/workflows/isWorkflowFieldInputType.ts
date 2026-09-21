import { isOneOf } from "guardz";

import {
  AUTHORABLE_WORKFLOW_FIELD_INPUT_TYPES,
  WORKFLOW_FIELD_INPUT_TYPE_VALUES,
  type AuthorableWorkflowFieldInputType,
  type WorkflowFieldInputTypeValue,
} from "@/lib/workflows/types/WorkflowFieldInputType.constant";

export const isWorkflowFieldInputType = (
  value: unknown,
): value is WorkflowFieldInputTypeValue =>
  isOneOf(...WORKFLOW_FIELD_INPUT_TYPE_VALUES)(value);

export const isAuthorableWorkflowFieldInputType = (
  value: unknown,
): value is AuthorableWorkflowFieldInputType =>
  isOneOf(...AUTHORABLE_WORKFLOW_FIELD_INPUT_TYPES)(value);
