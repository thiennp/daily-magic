import {
  NAV_CONSOLIDATION_INTENT_QUERY_PARAM,
  NAV_CONSOLIDATION_INTENT_TO_TAB,
  NAV_CONSOLIDATION_PROJECT_QUERY_PARAM,
  type NavConsolidationIntent,
  type NavConsolidationProjectTab,
} from "@/lib/shell/navConsolidationIntent.constant";

const readSingleParam = (
  value: string | string[] | undefined,
): string | null => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  if (Array.isArray(value) && typeof value[0] === "string") {
    const trimmed = value[0].trim();
    return trimmed.length > 0 ? trimmed : null;
  }
  return null;
};

/** Keep incoming query except consumed project + intent (re-set intent). */
export const appendKeptQuery = (
  pathWithOptionalQuery: string,
  searchParams: Readonly<Record<string, string | string[] | undefined>>,
  intent: NavConsolidationIntent,
): string => {
  const params = new URLSearchParams();
  for (const [key, raw] of Object.entries(searchParams)) {
    if (
      key === NAV_CONSOLIDATION_PROJECT_QUERY_PARAM ||
      key === NAV_CONSOLIDATION_INTENT_QUERY_PARAM
    ) {
      continue;
    }
    if (typeof raw === "string" && raw.length > 0) {
      params.set(key, raw);
      continue;
    }
    if (Array.isArray(raw)) {
      for (const entry of raw) {
        if (typeof entry === "string" && entry.length > 0) {
          params.append(key, entry);
        }
      }
    }
  }
  params.set(NAV_CONSOLIDATION_INTENT_QUERY_PARAM, intent);
  const query = params.toString();
  const joiner = pathWithOptionalQuery.includes("?") ? "&" : "?";
  return query.length > 0
    ? `${pathWithOptionalQuery}${joiner}${query}`
    : `${pathWithOptionalQuery}${joiner}${NAV_CONSOLIDATION_INTENT_QUERY_PARAM}=${intent}`;
};

export const buildProjectsIntentRedirectPath = (
  intent: NavConsolidationIntent,
  searchParams: Readonly<Record<string, string | string[] | undefined>> = {},
): string => appendKeptQuery("/projects", searchParams, intent);

export const buildProjectTabHash = (
  tab: NavConsolidationProjectTab,
  hashQuery: Readonly<Record<string, string>> = {},
): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(hashQuery)) {
    if (value.length > 0) {
      params.set(key, value);
    }
  }
  const query = params.toString();
  return query.length > 0 ? `#${tab}?${query}` : `#${tab}`;
};

export const buildProjectTabRedirectPath = (
  projectId: string,
  tab: NavConsolidationProjectTab,
  hashQuery: Readonly<Record<string, string>> = {},
): string => {
  const base = `/projects/${encodeURIComponent(projectId.trim())}`;
  return `${base}${buildProjectTabHash(tab, hashQuery)}`;
};

export const buildIntentProjectTabRedirectPath = (
  projectId: string,
  intent: NavConsolidationIntent,
  hashQuery: Readonly<Record<string, string>> = {},
): string => {
  const tab = NAV_CONSOLIDATION_INTENT_TO_TAB[intent];
  const mergedHashQuery =
    intent === "new-task"
      ? { mode: "task", ...hashQuery }
      : hashQuery;
  return buildProjectTabRedirectPath(projectId, tab, mergedHashQuery);
};

export const readNavConsolidationProjectId = (
  searchParams: Readonly<Record<string, string | string[] | undefined>>,
): string | null =>
  readSingleParam(searchParams[NAV_CONSOLIDATION_PROJECT_QUERY_PARAM]);

export { readSingleParam };
