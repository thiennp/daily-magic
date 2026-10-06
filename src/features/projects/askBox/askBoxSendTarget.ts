import type { AwcMessengerBotThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { PROJECT_ASK_BOX_COPY } from "@/features/projects/askBox/projectAskBoxCopy.constant";

export const ASK_BOX_ALL_KEY = "whole";

export type AskBoxSendTargetKind = "all" | "assistant" | "computer";

export type AskBoxSendTarget = {
  readonly key: string;
  readonly label: string;
  readonly kind?: AskBoxSendTargetKind;
};

type ComputerTarget = {
  readonly key: string;
  readonly label: string;
};

/**
 * Send-to rows for message / task mode.
 * Message: All assistants + assistants (no people, no computer threads).
 * Task: assistants + optional This computer chips (no All assistants).
 */
export const askBoxSendTargets = (
  bots: readonly AwcMessengerBotThread[],
  options?: {
    readonly assignAsTask?: boolean;
    readonly computers?: readonly ComputerTarget[];
  },
): readonly AskBoxSendTarget[] => {
  const task = options?.assignAsTask === true;
  const assistants: AskBoxSendTarget[] = bots
    .map((bot) => ({
      key: bot.membershipId,
      label: bot.displayName?.trim() ?? "",
      kind: "assistant" as const,
    }))
    .filter((target) => target.label.length > 0);
  if (task) {
    const computers = (options?.computers ?? []).map((computer) => ({
      key: computer.key,
      label: computer.label,
      kind: "computer" as const,
    }));
    return [...assistants, ...computers];
  }
  return [
    {
      key: ASK_BOX_ALL_KEY,
      label: PROJECT_ASK_BOX_COPY.allAssistants,
      kind: "all",
    },
    ...assistants,
  ];
};

export const askBoxTargetLabel = (
  targets: readonly AskBoxSendTarget[],
  key: string,
): string =>
  key === ASK_BOX_ALL_KEY
    ? PROJECT_ASK_BOX_COPY.allAssistantsInline
    : (targets.find((target) => target.key === key)?.label ?? key);
