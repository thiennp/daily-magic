/** Page-level UI states used across AWC and AWL Storybook entries. */
export const STORYBOOK_PAGE_STATUSES = [
  "loading",
  "guest",
  "empty",
  "error",
  "ready",
] as const;

export type StorybookPageStatus = (typeof STORYBOOK_PAGE_STATUSES)[number];

export const formatStorybookPageStatusLabel = (
  status: StorybookPageStatus,
): string => {
  switch (status) {
    case "loading":
      return "Loading";
    case "guest":
      return "Guest / signed out";
    case "empty":
      return "Empty";
    case "error":
      return "Error";
    case "ready":
      return "Ready";
  }
};
