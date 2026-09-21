import type WorkflowCreateDraftRecord from "@/features/workflows/types/WorkflowCreateDraftRecord.type";
import { WORKFLOW_CREATE_DRAFT_SESSION_KEY } from "@/features/workflows/workflowCreateDraft.constants";

export const persistWorkflowCreateDraft = (
  record: WorkflowCreateDraftRecord,
): void => {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  sessionStorage.setItem(
    WORKFLOW_CREATE_DRAFT_SESSION_KEY,
    JSON.stringify(record),
  );
};

export const clearWorkflowCreateDraft = (): void => {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  sessionStorage.removeItem(WORKFLOW_CREATE_DRAFT_SESSION_KEY);
};
