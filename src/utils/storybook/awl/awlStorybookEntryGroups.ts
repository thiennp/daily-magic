import { AWL_DIAGNOSTICS_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlDiagnosticsPages";
import { AWL_HOME_AND_TASK_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlHomeAndTaskPages";
import { AWL_PROJECTS_AND_HARNESS_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlProjectsAndHarnessPages";
import { AWL_STATUS_WRITER_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlStatusWriterPages";
import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";

export const AWL_STORYBOOK_HOME_TASK_ENTRIES: readonly AwlStorybookPageEntry[] =
  AWL_HOME_AND_TASK_PAGE_ENTRIES;

export const AWL_STORYBOOK_STATUS_WRITER_ENTRIES: readonly AwlStorybookPageEntry[] =
  AWL_STATUS_WRITER_PAGE_ENTRIES;

export const AWL_STORYBOOK_PROJECTS_HARNESS_ENTRIES: readonly AwlStorybookPageEntry[] =
  AWL_PROJECTS_AND_HARNESS_PAGE_ENTRIES;

export const AWL_STORYBOOK_DIAGNOSTICS_ENTRIES: readonly AwlStorybookPageEntry[] =
  AWL_DIAGNOSTICS_PAGE_ENTRIES;

export const AWL_STORYBOOK_CORE_PAGE_ENTRIES: readonly AwlStorybookPageEntry[] =
  [
    ...AWL_STORYBOOK_HOME_TASK_ENTRIES,
    ...AWL_STORYBOOK_STATUS_WRITER_ENTRIES,
    ...AWL_STORYBOOK_PROJECTS_HARNESS_ENTRIES,
    ...AWL_STORYBOOK_DIAGNOSTICS_ENTRIES,
  ];
