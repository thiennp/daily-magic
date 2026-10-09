import { PROJECT_PAGE_LIBRARY_COPY } from "@/features/projects/library/projectPageLibraryCopy.constant";
import { PROJECT_PAGE_TAB_LABELS } from "@/features/projects/projectPageTabs.constant";
import { PROJECT_PAGE_REPORTS_COPY } from "@/features/projects/reports/projectPageReportsCopy.constant";

/**
 * L3 V5-3 — the full v5 tab track order (8). Live tabs keep this order.
 * Team lands in V5-8 (Members rail stays live until then). No placeholders.
 */
export const PROJECT_PAGE_V5_TAB_ORDER = [
  "overview",
  "tasks",
  "reports",
  "team",
  "library",
  "pitfalls",
  "resources",
  "settings",
] as const;

export type ProjectPageV5TabId = (typeof PROJECT_PAGE_V5_TAB_ORDER)[number];

export const PROJECT_PAGE_V5_TAB_LABELS: Record<ProjectPageV5TabId, string> = {
  team: "Team",
  ...PROJECT_PAGE_TAB_LABELS,
};

/** One-line panel subtitle under the tab track (panel H2 is sr-only). */
export const PROJECT_PAGE_V5_TAB_SUBTITLES: Record<ProjectPageV5TabId, string> =
  {
    overview: "What's happening in this project and what needs you.",
    tasks: "Tasks assigned in this project.",
    reports: PROJECT_PAGE_REPORTS_COPY["reports.intro"],
    team: "People, assistants, and computers in this project.",
    library: PROJECT_PAGE_LIBRARY_COPY["library.intro"],
    pitfalls: "Things your assistants must avoid.",
    resources: "Folders and code repositories for this project.",
    settings: "Name, folder, and delete.",
  };

/** Settings subtitle for people who cannot rename or delete the project. */
export const PROJECT_PAGE_V5_SETTINGS_MEMBER_SUBTITLE =
  "Project details, your folder, and leaving.";
