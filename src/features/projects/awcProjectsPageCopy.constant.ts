export const AWC_PROJECTS_PAGE_COPY = {
  pageDescription:
    "The cloud keeps membership and activity. Repos and composition are edited in AgentWitch Local on this computer.",
  emptyTitle: "No projects yet.",
  emptyBody: "A project lives on a computer.",
  emptyHomeLink: "Connect a computer on Home",
  loadFailedTitle: "Could not load projects",
  loadFailedBody: "Check your connection and try again.",
  loadFailedRetry: "Try again",
  loading: "Loading projects…",
  newProject: "New project",
  newProjectClose: "Close the form",
  noFolder: "No folder yet",
  noMatchTitle: (query: string) => `No projects match \u201c${query}\u201d`,
  clearSearch: "Clear search",
  clearShort: "Clear",
  intentDismiss: "Dismiss this notice",
} as const;
