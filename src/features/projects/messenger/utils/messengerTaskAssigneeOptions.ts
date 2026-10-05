import type { AwcMessengerBotThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";

export type MessengerTaskAssigneeKind = "bot" | "computer";

export type MessengerTaskAssigneeOption = {
  readonly membershipId: string;
  readonly displayName: string;
  readonly kind: MessengerTaskAssigneeKind;
};

/**
 * Activity task-mode assignees. Today: messenger bot threads only.
 * Owner-computer / This Mac seats land when Mac/Connect exposes a project
 * membership (synthetic agent userId — not the owner human userId, because
 * resolveDispatchRecipients rejects actor===recipient). Until then computer[]
 * stays empty; Human UI can still render kind=computer when Mac fills it.
 */
export const messengerTaskAssigneeOptions = (input: {
  readonly bots: readonly AwcMessengerBotThread[];
  readonly computers?: readonly {
    readonly membershipId: string;
    readonly displayName: string | null;
  }[];
}): readonly MessengerTaskAssigneeOption[] => {
  const options: MessengerTaskAssigneeOption[] = [];
  for (const bot of input.bots) {
    const name = bot.displayName?.trim() ?? "";
    if (name.length === 0) continue;
    options.push({
      membershipId: bot.membershipId,
      displayName: name,
      kind: "bot",
    });
  }
  for (const computer of input.computers ?? []) {
    const name = computer.displayName?.trim() ?? "";
    if (name.length === 0) continue;
    options.push({
      membershipId: computer.membershipId,
      displayName: name,
      kind: "computer",
    });
  }
  return options;
};
