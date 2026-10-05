import { buildIntentProjectTabRedirectPath } from "@/lib/shell/buildNavConsolidationRedirect";
import buildAwcProjectDetailHref from "@/lib/projects/buildAwcProjectDetailHref";
import type { NavConsolidationIntent } from "@/lib/shell/navConsolidationIntent.constant";

export const buildProjectCardHrefForIntent = (
  projectId: string,
  intent: NavConsolidationIntent | null,
): string => {
  if (intent === null) {
    return buildAwcProjectDetailHref(projectId);
  }
  return buildIntentProjectTabRedirectPath(projectId, intent);
};
