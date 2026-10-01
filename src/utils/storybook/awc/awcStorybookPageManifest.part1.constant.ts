import type { AwcStorybookPageManifestEntry } from "@/utils/storybook/awc/awcStorybookPageManifest.type";

export const AWC_STORYBOOK_PAGE_MANIFEST_PART1: readonly AwcStorybookPageManifestEntry[] =
  [
    {
      id: "home-marketing",
      title: "Home (marketing)",
      path: "/",
      statuses: ["ready"],
    },
    { id: "login", title: "Login", path: "/login", statuses: ["ready"] },
    {
      id: "for-agents",
      title: "For agents",
      path: "/for-agents",
      statuses: ["ready"],
    },
    {
      id: "setup-writer",
      title: "Setup writer",
      path: "/setup/writer",
      statuses: ["ready"],
    },
    { id: "privacy", title: "Privacy", path: "/privacy", statuses: ["ready"] },
    { id: "terms", title: "Terms", path: "/terms", statuses: ["ready"] },
    {
      id: "home-signed-in",
      title: "Home (signed in)",
      path: "/",
      statuses: ["loading", "empty", "error", "ready"],
    },
    {
      id: "projects",
      title: "Projects",
      path: "/projects",
      statuses: ["loading", "empty", "error", "ready"],
    },
    {
      id: "project-detail",
      title: "Project detail",
      path: "/projects/:projectId",
      statuses: ["loading", "empty", "error", "ready"],
    },
    {
      id: "library",
      title: "Library",
      path: "/library",
      statuses: ["loading", "guest", "empty", "error", "ready"],
    },
  ];
