import type { AwcMessengerBotThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import {
  messengerTaskAssigneeOptions,
  type MessengerTaskAssigneeOption,
} from "@/features/projects/messenger/utils/messengerTaskAssigneeOptions";

export type MessengerBotAssigneeOption = Omit<
  MessengerTaskAssigneeOption,
  "kind"
> & { readonly kind?: never };

/** @deprecated Prefer messengerTaskAssigneeOptions (supports computer seats). */
export const messengerBotAssigneeOptions = (
  bots: readonly AwcMessengerBotThread[],
): readonly { readonly membershipId: string; readonly displayName: string }[] =>
  messengerTaskAssigneeOptions({ bots }).map(({ membershipId, displayName }) => ({
    membershipId,
    displayName,
  }));
