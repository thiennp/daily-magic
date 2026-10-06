import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";

/** Persist-relevant COMPOSER-LOCK events. Picker / chip UI is a later tip. */
export type MessengerKeptRecipientEvent =
  | {
      readonly type: "confirm";
      readonly recipient: MessengerKeptRecipient;
      readonly keepSending: boolean;
    }
  | { readonly type: "explicitMention" }
  | { readonly type: "uncheckChip" }
  | {
      readonly type: "assistantsChanged";
      readonly assistantMembershipIds: readonly string[];
    };

export type MessengerKeptRecipientNext = {
  /** null = EVERYONE (nothing kept). */
  readonly recipient: MessengerKeptRecipient | null;
  /** Kept assistants that left — UI shows `composer.keptGone` (later tip). */
  readonly goneMembershipIds: readonly string[];
};

const keepOrNone = (
  recipient: MessengerKeptRecipient,
  keepSending: boolean,
): MessengerKeptRecipient | null => {
  if (!keepSending) return null; // unchecked one-shot is never persisted
  if (recipient.kind === "assistants" && recipient.membershipIds.length === 0) {
    return null;
  }
  return recipient;
};

const afterAssistantsChanged = (
  current: MessengerKeptRecipient | null,
  ids: readonly string[],
): MessengerKeptRecipientNext => {
  const gone =
    current?.kind === "assistants"
      ? current.membershipIds.filter((id) => !ids.includes(id))
      : [];
  // SINGLE (≤1 assistant) has no routing: nothing is kept.
  if (ids.length <= 1 || gone.length > 0) {
    return { recipient: null, goneMembershipIds: gone };
  }
  return { recipient: current, goneMembershipIds: [] };
};

/** Pure transition for the kept recipient (per project chat per member). */
export const nextMessengerKeptRecipient = (
  current: MessengerKeptRecipient | null,
  event: MessengerKeptRecipientEvent,
): MessengerKeptRecipientNext => {
  if (event.type === "confirm") {
    return {
      recipient: keepOrNone(event.recipient, event.keepSending),
      goneMembershipIds: [],
    };
  }
  if (event.type === "uncheckChip") {
    return { recipient: null, goneMembershipIds: [] };
  }
  if (event.type === "assistantsChanged") {
    return afterAssistantsChanged(current, event.assistantMembershipIds);
  }
  // explicit @x / @all: send once, kept r unchanged.
  return { recipient: current, goneMembershipIds: [] };
};
