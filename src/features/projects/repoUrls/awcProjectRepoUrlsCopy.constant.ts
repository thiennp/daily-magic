import { PROJECT_REPO_URLS_MAX } from "@/lib/projects/validateProjectRepoUrls";

export const AWC_PROJECT_REPO_URLS_COPY = {
  heading: "Git remotes",
  hint: `Optional HTTPS or SSH git URLs (max ${PROJECT_REPO_URLS_MAX}). No embedded credentials. Complementary to folder refs — paths stay on local machines.`,
  empty: "No git remotes yet.",
  urlLabel: "Repo URL",
  urlPlaceholder: "https://github.com/org/repo.git or git@host:path",
  defaultBranchLabel: "Default branch (optional)",
  defaultBranchPlaceholder: "main",
  addUrl: "Add URL",
  removeUrl: "Remove",
  save: "Save remotes",
  saving: "Saving…",
  saved: "Remotes saved.",
  clearHint: "Clear all URLs and leave default branch empty to clear on save.",
  validationCredentials:
    "Remove credentials from the URL (user:pass@ or token query params).",
  validationScheme: "Use https://… or SSH (git@host:path / ssh://…).",
  validationMax: `At most ${PROJECT_REPO_URLS_MAX} repo URLs.`,
  readOnlyNote: "Read-only — only the project owner can edit remotes.",
} as const;
