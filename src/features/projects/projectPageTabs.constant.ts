/**
 * Project page live tab track. V5 order with Overview (V5-5) mounted;
 * Team stays a section until V5-8 (Members rail remains live).
 * P1-S1: no Activity tab — conversations live in the Chat dock full view.
 */
export const PROJECT_PAGE_TAB_IDS = [
  "overview",
  "tasks",
  "reports",
  "library",
  "pitfalls",
  "resources",
  "settings",
] as const;

export type ProjectPageTabId = (typeof PROJECT_PAGE_TAB_IDS)[number];

/**
 * Nav targets that are not centre tabs yet. Team → scroll Members rail.
 */
export const PROJECT_PAGE_SECTION_IDS = ["team"] as const;

export type ProjectPageNavTarget =
  | ProjectPageTabId
  | (typeof PROJECT_PAGE_SECTION_IDS)[number];

export const PROJECT_PAGE_TAB_LABELS: Record<ProjectPageTabId, string> = {
  overview: "Overview",
  tasks: "Tasks",
  reports: "Reports",
  library: "Library",
  pitfalls: "Safety rules",
  resources: "Resources",
  settings: "Settings",
};

export const DEFAULT_PROJECT_PAGE_TAB: ProjectPageTabId = "overview";

export const isProjectPageTabId = (value: string): value is ProjectPageTabId =>
  (PROJECT_PAGE_TAB_IDS as readonly string[]).includes(value);
