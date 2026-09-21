import type LibraryPlaybookTemplate from "@/lib/library/types/LibraryPlaybookTemplate.type";
import type WorkflowCreateDraftRecord from "@/features/workflows/types/WorkflowCreateDraftRecord.type";
import {
  WORKFLOW_CREATE_DRAFT_LIBRARY_ID,
  WORKFLOW_CREATE_DRAFT_SESSION_KEY,
} from "@/features/workflows/workflowCreateDraft.constants";

const isWorkflowCreateDraftRecord = (
  value: unknown,
): value is WorkflowCreateDraftRecord => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    record.version === 1 &&
    typeof record.name === "string" &&
    typeof record.type === "string" &&
    typeof record.exampleRequest === "string" &&
    Array.isArray(record.workflowFields) &&
    Array.isArray(record.operatorSteps) &&
    typeof record.trialFieldValues === "object" &&
    record.trialFieldValues !== null
  );
};

export const readWorkflowCreateDraftRecord =
  (): WorkflowCreateDraftRecord | null => {
    if (typeof sessionStorage === "undefined") {
      return null;
    }

    const raw = sessionStorage.getItem(WORKFLOW_CREATE_DRAFT_SESSION_KEY);
    if (raw === null || raw.length === 0) {
      return null;
    }

    try {
      const parsed: unknown = JSON.parse(raw);
      return isWorkflowCreateDraftRecord(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };

export const mapWorkflowCreateDraftToPlaybook = (
  record: WorkflowCreateDraftRecord,
): LibraryPlaybookTemplate => ({
  id: WORKFLOW_CREATE_DRAFT_LIBRARY_ID,
  name: record.name,
  type: record.type,
  exampleRequest: record.exampleRequest,
  workflowFields: record.workflowFields,
  operatorSteps: record.operatorSteps,
  harnessSetSlug: null,
  initialWorkflowFieldValues: record.trialFieldValues,
});

export const readWorkflowCreateDraftPlaybook =
  (): LibraryPlaybookTemplate | null => {
    const record = readWorkflowCreateDraftRecord();
    return record === null ? null : mapWorkflowCreateDraftToPlaybook(record);
  };
