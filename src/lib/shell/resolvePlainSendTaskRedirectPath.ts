import {
  SEND_TASK_CONTINUE_SESSION_QUERY_PARAM,
  SEND_TASK_MODAL_QUERY_PARAM,
  SEND_TASK_MODAL_QUERY_VALUE,
  SEND_TASK_OPEN_SHELL_QUERY_PARAM,
  SEND_TASK_RESUME_LIVE_SESSION_QUERY_PARAM,
  SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM,
  SEND_TASK_WORKFLOW_DRAFT_QUERY_PARAM,
  SEND_TASK_WRITER_AGENT_QUERY_PARAM,
} from "@/features/agent/constants/sendTaskModalQuery.constant";
import { buildNavConsolidationNewTaskHref } from "@/lib/shell/buildNavConsolidationNewTaskHref";
import { NAV_CONSOLIDATION_PROJECT_QUERY_PARAM } from "@/lib/shell/navConsolidationIntent.constant";

/** Composer/Mac flags — keep legacy Send Task modal when any are present. */
const LEGACY_COMPOSER_QUERY_KEYS = [
  "deviceId",
  SEND_TASK_OPEN_SHELL_QUERY_PARAM,
  SEND_TASK_RESUME_LIVE_SESSION_QUERY_PARAM,
  SEND_TASK_CONTINUE_SESSION_QUERY_PARAM,
  SEND_TASK_SOURCE_RUN_ID_QUERY_PARAM,
  SEND_TASK_WRITER_AGENT_QUERY_PARAM,
  SEND_TASK_WORKFLOW_DRAFT_QUERY_PARAM,
  "libraryCapabilityId",
  "prompt",
] as const;

const readProjectId = (params: URLSearchParams): string | null => {
  const fromComposer = params.get("projectId")?.trim();
  if (fromComposer !== undefined && fromComposer.length > 0) {
    return fromComposer;
  }
  const fromIntent = params
    .get(NAV_CONSOLIDATION_PROJECT_QUERY_PARAM)
    ?.trim();
  if (fromIntent !== undefined && fromIntent.length > 0) {
    return fromIntent;
  }
  return null;
};

/**
 * True for retired top-level New task URLs (`?sendTask=1` / `&customTask=1`)
 * that are not Mac/composer deep links.
 */
export const isPlainSendTaskNewTaskQuery = (
  params: URLSearchParams,
): boolean => {
  if (params.get(SEND_TASK_MODAL_QUERY_PARAM) !== SEND_TASK_MODAL_QUERY_VALUE) {
    return false;
  }
  for (const key of LEGACY_COMPOSER_QUERY_KEYS) {
    const value = params.get(key);
    if (value !== null && value.length > 0) {
      return false;
    }
  }
  return true;
};

/** Map plain sendTask bookmarks to /projects?intent=new-task or project Task mode. */
export const resolvePlainSendTaskRedirectPath = (
  params: URLSearchParams,
): string | null => {
  if (!isPlainSendTaskNewTaskQuery(params)) {
    return null;
  }
  return buildNavConsolidationNewTaskHref({
    projectId: readProjectId(params),
  });
};
