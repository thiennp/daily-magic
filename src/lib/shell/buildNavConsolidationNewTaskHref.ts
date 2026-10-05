import {
  buildIntentProjectTabRedirectPath,
  buildProjectsIntentRedirectPath,
} from "@/lib/shell/buildNavConsolidationRedirect";

/** Project New task / retired top-level New task → Activity Task mode or picker. */
export const buildNavConsolidationNewTaskHref = (input?: {
  readonly projectId?: string | null;
}): string => {
  const projectId = input?.projectId?.trim();
  if (projectId !== undefined && projectId.length > 0) {
    return buildIntentProjectTabRedirectPath(projectId, "new-task");
  }
  return buildProjectsIntentRedirectPath("new-task");
};
