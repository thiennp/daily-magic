import type { AwcStorybookPageManifestEntry } from "@/utils/storybook/awc/awcStorybookPageManifest.type";

export const AWC_STORYBOOK_PAGE_MANIFEST_PART2: readonly AwcStorybookPageManifestEntry[] =
  [
    {
      id: "marketplace",
      title: "Marketplace",
      path: "/marketplace",
      statuses: ["loading", "guest", "empty", "error", "ready"],
    },
    {
      id: "reports",
      title: "Reports",
      path: "/reports",
      statuses: ["loading", "guest", "empty", "error", "ready"],
    },
    {
      id: "report-detail",
      title: "Report detail",
      path: "/reports/:runId",
      statuses: ["loading", "empty", "error", "ready"],
    },
    {
      id: "automations",
      title: "Automations",
      path: "/automations",
      statuses: ["loading", "empty", "error", "ready"],
    },
    {
      id: "prompt-optimizer",
      title: "Prompt optimizer",
      path: "/prompt-optimizer",
      statuses: ["ready"],
    },
    {
      id: "prompt-optimizer-guide",
      title: "Prompt optimizer guide",
      path: "/prompt-optimizer/guide",
      statuses: ["ready"],
    },
    {
      id: "connection-lab",
      title: "Connection lab",
      path: "/connection-lab",
      statuses: ["ready", "error"],
    },
    {
      id: "showcases",
      title: "Showcases",
      path: "/showcases",
      statuses: ["ready"],
    },
    {
      id: "admin-users",
      title: "Admin users",
      path: "/admin/users",
      statuses: ["ready", "empty"],
    },
    {
      id: "admin-groups",
      title: "Admin groups",
      path: "/admin/groups",
      statuses: ["ready", "empty", "error"],
    },
  ];
