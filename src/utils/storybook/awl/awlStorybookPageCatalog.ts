import { AWL_DIAGNOSTICS_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlDiagnosticsPages";
import { AWL_HOME_AND_TASK_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlHomeAndTaskPages";
import { AWL_PROJECTS_AND_HARNESS_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlProjectsAndHarnessPages";
import { AWL_PROMPT_OPTIMIZER_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlPromptOptimizerPages";
import { AWL_STATUS_WRITER_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlStatusWriterPages";
import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";

export const AWL_STORYBOOK_PAGE_ENTRIES: readonly AwlStorybookPageEntry[] = [
  ...AWL_HOME_AND_TASK_PAGE_ENTRIES,
  ...AWL_PROMPT_OPTIMIZER_PAGE_ENTRIES,
  ...AWL_STATUS_WRITER_PAGE_ENTRIES,
  ...AWL_PROJECTS_AND_HARNESS_PAGE_ENTRIES,
  ...AWL_DIAGNOSTICS_PAGE_ENTRIES,
];
