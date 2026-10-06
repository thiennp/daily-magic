import type { AwcMessengerBotThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { PROJECT_ASK_BOX_COPY } from "@/features/projects/askBox/projectAskBoxCopy.constant";

export const ASK_BOX_ALL_KEY = "whole";

export type AskBoxSendTarget = {
  readonly key: string;
  readonly label: string;
};

/** "All assistants" (whole-project thread) + one row per named assistant. */
export const askBoxSendTargets = (
  bots: readonly AwcMessengerBotThread[],
): readonly AskBoxSendTarget[] => [
  { key: ASK_BOX_ALL_KEY, label: PROJECT_ASK_BOX_COPY.allAssistants },
  ...bots
    .map((bot) => ({
      key: bot.membershipId,
      label: bot.displayName?.trim() ?? "",
    }))
    .filter((target) => target.label.length > 0),
];

export const askBoxTargetLabel = (
  targets: readonly AskBoxSendTarget[],
  key: string,
): string =>
  key === ASK_BOX_ALL_KEY
    ? PROJECT_ASK_BOX_COPY.allAssistantsInline
    : (targets.find((target) => target.key === key)?.label ?? key);
