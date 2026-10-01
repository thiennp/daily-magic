import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

export interface AwlStorybookPageManifestEntry {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly statuses: readonly StorybookPageStatus[];
}

export const AWL_STORYBOOK_PAGE_MANIFEST: readonly AwlStorybookPageManifestEntry[] =
  [
    {
      id: "home",
      title: "Home",
      path: "/",
      statuses: ["ready", "empty", "error"],
    },
    {
      id: "task",
      title: "Task",
      path: "/task",
      statuses: ["ready", "empty", "error"],
    },
    {
      id: "prompt-optimizer",
      title: "Prompt optimizer",
      path: "/prompt-optimizer",
      statuses: ["ready", "empty", "error", "loading"],
    },
    {
      id: "prompt-optimizer-guide",
      title: "Prompt optimizer guide",
      path: "/prompt-optimizer/guide",
      statuses: ["ready"],
    },
    {
      id: "status",
      title: "Status",
      path: "/status",
      statuses: ["ready", "empty", "error"],
    },
    {
      id: "projects",
      title: "Projects",
      path: "/projects",
      statuses: ["ready", "empty", "error"],
    },
    {
      id: "project",
      title: "Project editor",
      path: "/project",
      statuses: ["ready", "empty", "error"],
    },
    {
      id: "harness",
      title: "Harness",
      path: "/harness",
      statuses: ["ready", "empty", "error"],
    },
    {
      id: "writer-api",
      title: "Writer API",
      path: "/writer-api",
      statuses: ["ready", "error"],
    },
    {
      id: "knowledge",
      title: "Knowledge",
      path: "/knowledge",
      statuses: ["ready", "empty"],
    },
    {
      id: "history",
      title: "History",
      path: "/history",
      statuses: ["ready", "empty"],
    },
    {
      id: "writer-sessions",
      title: "Transcripts",
      path: "/writer-sessions",
      statuses: ["ready", "empty"],
    },
    {
      id: "errors",
      title: "Errors",
      path: "/errors",
      statuses: ["ready", "empty", "error"],
    },
    {
      id: "traffic",
      title: "Traffic",
      path: "/traffic",
      statuses: ["ready", "empty"],
    },
  ];
