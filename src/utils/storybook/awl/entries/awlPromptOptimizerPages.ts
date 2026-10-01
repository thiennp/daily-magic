import {
  buildPromptSdlcLocalGuidePageBody,
  buildPromptSdlcLocalPageBody,
} from "../../../../../apps/live/features/prompt-optimizer/public-api/presentation";

import type { AwlStorybookPageEntry } from "@/utils/storybook/awl/awlStorybookPageEntry.type";
import { withAwlStorybookShell } from "@/utils/storybook/awl/withAwlStorybookShell";

export const AWL_PROMPT_OPTIMIZER_PAGE_ENTRIES: readonly AwlStorybookPageEntry[] =
  [
    withAwlStorybookShell({
      id: "prompt-optimizer",
      title: "Prompt optimizer",
      path: "/prompt-optimizer",
      activePath: "/prompt-optimizer",
      statuses: ["ready", "empty", "error", "loading"],
      buildBody: (status) =>
        buildPromptSdlcLocalPageBody({
          goal: status === "empty" ? "" : "Ship Storybook coverage",
          prompt:
            status === "empty"
              ? ""
              : "You are improving AWC/AWL page previews.",
          modelNote: "",
          writers: [{ id: "cursor", label: "Cursor" }],
          judge: "cursor",
          improver: "cursor",
          folder: "/Users/storybook",
          passScore: "70",
          canRun: status === "ready",
          errorMessage:
            status === "error" ? "Writer check failed in story fixture." : null,
          cycle: null,
          history: [],
        }),
    }),
    withAwlStorybookShell({
      id: "prompt-optimizer-guide",
      title: "Prompt optimizer guide",
      path: "/prompt-optimizer/guide",
      activePath: "/prompt-optimizer",
      statuses: ["ready"],
      buildBody: () => buildPromptSdlcLocalGuidePageBody(),
    }),
  ];
