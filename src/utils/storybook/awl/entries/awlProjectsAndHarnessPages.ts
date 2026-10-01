import { buildAgentWitchLocalHarnessPageBody } from "@agent-witch/live-harness/presentation";
import {
  buildAgentWitchLocalProjectEditorPageBody,
  buildAgentWitchLocalProjectsPageBody,
} from "@agent-witch/live-projects/presentation";

import {
  AWL_STORYBOOK_CLOUD_ORIGIN,
  AWL_STORYBOOK_EMPTY_INSTALLED,
  AWL_STORYBOOK_SAMPLE_PROJECT,
} from "@/utils/storybook/awl/awlStorybookShared.constant";
import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";
import { withAwlStorybookShell } from "@/utils/storybook/awl/withAwlStorybookShell";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

const buildHarnessBody = (status: StorybookPageStatus): string =>
  buildAgentWitchLocalHarnessPageBody({
    cloudAppOrigin: AWL_STORYBOOK_CLOUD_ORIGIN,
    reveal: null,
    scanFolder: "/Users/storybook",
    installed: AWL_STORYBOOK_EMPTY_INSTALLED,
    flashError: status === "error" ? "Reveal failed in fixture." : null,
    flashMessage: null,
    importSectionExpanded: status !== "empty",
  });

export const AWL_PROJECTS_AND_HARNESS_PAGE_ENTRIES: readonly AwlStorybookPageEntry[] =
  [
    withAwlStorybookShell({
      id: "projects",
      title: "Projects",
      path: "/projects",
      activePath: "/projects",
      statuses: ["ready", "empty", "error"],
      buildBody: (status) =>
        buildAgentWitchLocalProjectsPageBody({
          cloudAppOrigin: AWL_STORYBOOK_CLOUD_ORIGIN,
          projects: status === "empty" ? [] : [AWL_STORYBOOK_SAMPLE_PROJECT],
          flashError: status === "error" ? "Could not sync projects." : null,
        }),
    }),
    withAwlStorybookShell({
      id: "project",
      title: "Project editor",
      path: "/project",
      activePath: "/project",
      statuses: ["ready", "empty", "error"],
      buildBody: (status) =>
        buildAgentWitchLocalProjectEditorPageBody({
          project: AWL_STORYBOOK_SAMPLE_PROJECT,
          installed: AWL_STORYBOOK_EMPTY_INSTALLED,
          linkedSetSlugs: [],
          composition: null,
          knowledgeCandidateCount: 0,
          activeTab: "harness",
          flashError: status === "error" ? "Harness pull failed." : null,
        }),
    }),
    withAwlStorybookShell({
      id: "harness",
      title: "Harness",
      path: "/harness",
      activePath: "/harness",
      statuses: ["ready", "empty", "error"],
      buildBody: buildHarnessBody,
    }),
  ];
