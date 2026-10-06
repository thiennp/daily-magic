/** Safety rules tab — Product EN (artifact ARTIFACT-STRINGS Center · Safety rules). */
export const AWC_PROJECT_PITFALLS_COPY = {
  title: "Safety rules",
  hint: (deviceDisplayName: string) =>
    `The assistant avoids these traps while working. Turn them on, off, or edit them on ${deviceDisplayName}.`,
  panelHint: (active: number, max: number) =>
    `${active} of ${max} rules are on. The assistant avoids these traps while working.`,
  panelHintNoHits: "No rule has been hit yet.",
  panelHintHasHits: "Some rules have been hit.",
  manageOnThisComputer: "Turn on, off, or edit on this computer",
  /** @deprecated use manageOnThisComputer */
  manageOnMac: "Turn on, off, or edit on this computer",
  loading: "Loading…",
  empty: "No rules for this project.",
  unavailable: "Safety rules are unavailable for this project right now.",
  noMatch: "No rules match.",
  filterGroupLabel: "Filter rules",
  filterAll: "All",
  searchLabel: "Search rules",
  searchPlaceholder: "Search, for example push or build",
  avoidSituationPrefix: "Avoid this situation:",
  howToLabel: "How to do it:",
  triggersWhenLabel: "Triggers when these appear:",
  /** Kept for older section chrome; prefer avoidSituationPrefix / howToLabel. */
  fixLabel: "How to do it",
  avoidLabel: "How to do it:",
  triggersLabel: "Triggers",
  triggersOnLabel: "Triggers when these appear:",
  neverHit: "not hit yet",
  lastHit: (relative: string) => `last hit ${relative}`,
  notUpdatedYet: "not updated yet",
  updated: (date: string) => `updated ${date}`,
  availableMeta: "Available",
  activeCount: (active: number, max: number) => `${active} of ${max} on`,
  severity: {
    block: "Important",
    warn: "Warning",
    info: "Note",
  },
  source: {
    seed: "Built-in",
    project: "This project",
    retired: "Retired",
  },
} as const;
