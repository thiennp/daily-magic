import { isRecord } from "../../../../server/internal/isRecord";

const PROJECT_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

export interface UpdateProjectKnowledgeWakeBody {
  readonly projectId: string;
  readonly lesson: string;
  readonly sourceRunId?: string;
}

export const parseUpdateProjectKnowledgeWakeBody = (
  body: unknown,
): UpdateProjectKnowledgeWakeBody | null => {
  if (!isRecord(body)) {
    return null;
  }

  const projectId =
    typeof body.projectId === "string" ? body.projectId.trim() : "";
  const lesson = typeof body.lesson === "string" ? body.lesson.trim() : "";
  const sourceRunId =
    typeof body.sourceRunId === "string" ? body.sourceRunId.trim() : "";

  if (!PROJECT_ID_PATTERN.test(projectId) || lesson.length === 0) {
    return null;
  }

  return {
    projectId,
    lesson,
    ...(sourceRunId.length > 0 ? { sourceRunId } : {}),
  };
};
