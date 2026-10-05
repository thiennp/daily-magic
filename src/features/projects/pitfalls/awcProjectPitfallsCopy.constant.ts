export const AWC_PROJECT_PITFALLS_COPY = {
  title: "Pitfalls",
  hint: (deviceDisplayName: string) =>
    `Known traps in this project and how to avoid them. Edit them on ${deviceDisplayName}.`,
  loading: "Loading…",
  empty: "No pitfalls for this project.",
  fixLabel: "Fix",
  triggersLabel: "Triggers",
  neverHit: "Never hit",
  lastHit: (relative: string) => `Last hit ${relative}`,
  notUpdatedYet: "Not updated yet",
  updated: (date: string) => `Updated ${date}`,
  activeCount: (active: number, max: number) => `${active} of ${max} active`,
  severity: {
    block: "Must fix",
    warn: "Warning",
    info: "Note",
  },
  source: {
    seed: "Built-in",
    project: "This project",
    retired: "Retired",
  },
} as const;
