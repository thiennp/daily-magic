/** Product tab order for the project page (Reports/Library are stubs for now). */
export const PROJECT_PAGE_TAB_IDS = [
  "overview",
  "activity",
  "reports",
  "team",
  "library",
  "pitfalls",
  "resources",
  "settings",
] as const;

export type ProjectPageTabId = (typeof PROJECT_PAGE_TAB_IDS)[number];

export const PROJECT_PAGE_TAB_LABELS: Record<ProjectPageTabId, string> = {
  overview: "Overview",
  activity: "Activity",
  reports: "Reports",
  team: "Team",
  library: "Library",
  pitfalls: "Pitfalls",
  resources: "Resources",
  settings: "Settings",
};

export const DEFAULT_PROJECT_PAGE_TAB: ProjectPageTabId = "overview";

export const isProjectPageTabId = (value: string): value is ProjectPageTabId =>
  (PROJECT_PAGE_TAB_IDS as readonly string[]).includes(value);
