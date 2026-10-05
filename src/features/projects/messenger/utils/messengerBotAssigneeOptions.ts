import type { AwcMessengerBotThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";

export type MessengerBotAssigneeOption = {
  readonly membershipId: string;
  readonly displayName: string;
};

/** Assignee select for Activity task mode — bots from messenger thread list. */
export const messengerBotAssigneeOptions = (
  bots: readonly AwcMessengerBotThread[],
): readonly MessengerBotAssigneeOption[] => {
  const options: MessengerBotAssigneeOption[] = [];
  for (const bot of bots) {
    const name = bot.displayName?.trim() ?? "";
    if (name.length === 0) continue;
    options.push({ membershipId: bot.membershipId, displayName: name });
  }
  return options;
};
