/** Nav consolidation intents — top-level Library/Reports/My bots/New task → /projects. */
export const NAV_CONSOLIDATION_INTENTS = [
  "new-task",
  "bots",
  "library",
  "reports",
] as const;

export type NavConsolidationIntent =
  (typeof NAV_CONSOLIDATION_INTENTS)[number];

export const isNavConsolidationIntent = (
  value: string | null | undefined,
): value is NavConsolidationIntent =>
  typeof value === "string" &&
  (NAV_CONSOLIDATION_INTENTS as readonly string[]).includes(value);

export type NavConsolidationProjectTab =
  | "activity"
  | "team"
  | "library"
  | "reports";

export const NAV_CONSOLIDATION_INTENT_TO_TAB: Readonly<
  Record<NavConsolidationIntent, NavConsolidationProjectTab>
> = {
  "new-task": "activity",
  bots: "team",
  library: "library",
  reports: "reports",
};

export const NAV_CONSOLIDATION_INTENT_NOTICE: Readonly<
  Record<NavConsolidationIntent, string>
> = {
  "new-task": "Pick a project to give a task.",
  bots: "Assistants now live inside each project. Claim or remove an assistant here.",
  library:
    "Your library now lives inside each project. Open a project and go to Library.",
  reports:
    "Reports now live inside each project. Open a project and go to Reports.",
};

/** Extra empty-state line when intent=new-task and the user has 0 projects. */
export const NAV_CONSOLIDATION_NEW_TASK_EMPTY_EXTRA =
  "Tasks live inside a project. Create one first.";

export const NAV_CONSOLIDATION_PROJECT_QUERY_PARAM = "project";
export const NAV_CONSOLIDATION_INTENT_QUERY_PARAM = "intent";
