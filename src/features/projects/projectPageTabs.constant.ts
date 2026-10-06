/**
 * Project layout v2 L1 — artifact tab order (English labels; wire ids stable).
 * Reports/Library stay visible as centre stubs until they land.
 */
export const PROJECT_PAGE_TAB_IDS = [
  "activity",
  "reports",
  "library",
  "pitfalls",
  "resources",
  "settings",
] as const;

export type ProjectPageTabId = (typeof PROJECT_PAGE_TAB_IDS)[number];

/**
 * Former tabs now living as the right Team column or dropped sections.
 * Kept for Overview setup goto targets / deep-link soft fallbacks.
 */
export const PROJECT_PAGE_SECTION_IDS = ["team", "overview"] as const;

export type ProjectPageNavTarget =
  | ProjectPageTabId
  | (typeof PROJECT_PAGE_SECTION_IDS)[number];

export const PROJECT_PAGE_TAB_LABELS: Record<ProjectPageTabId, string> = {
  activity: "Activity",
  reports: "Reports",
  library: "Library",
  pitfalls: "Safety rules",
  resources: "Resources",
  settings: "Settings",
};

export const DEFAULT_PROJECT_PAGE_TAB: ProjectPageTabId = "activity";

export const isProjectPageTabId = (value: string): value is ProjectPageTabId =>
  (PROJECT_PAGE_TAB_IDS as readonly string[]).includes(value);
