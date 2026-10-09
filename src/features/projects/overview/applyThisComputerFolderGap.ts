import { OVERVIEW_FOLDER_PROMPT_COPY as C } from "@/features/projects/overview/overviewFolderPromptCopy.constant";
import type { OverviewSetupStep } from "@/features/projects/overview/overviewSetupStep.type";

/**
 * The Add a folder step reads Done when any computer has one; if this
 * computer has none, reopen it so it agrees with the Overview prompt.
 */
export const applyThisComputerFolderGap = (
  steps: readonly OverviewSetupStep[],
  gap: boolean,
): readonly OverviewSetupStep[] =>
  gap
    ? steps.map((step) =>
        step.id === "folder"
          ? {
              ...step,
              done: false,
              hint: C.stepNotHere,
              action: { kind: "tab", tab: "resources", label: C.stepAdd },
            }
          : step,
      )
    : steps;
