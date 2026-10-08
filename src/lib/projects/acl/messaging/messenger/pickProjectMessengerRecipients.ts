import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerBotSeat } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots";

export type ProjectMessengerRecipients =
  | {
      readonly ok: true;
      readonly whole: boolean;
      readonly recipients: readonly ProjectMessengerBotSeat[];
    }
  | {
      readonly ok: false;
      readonly code:
        "thread_not_found" | "no_bots" | "single_recipient_required";
    };

/** Thread key → bot recipients: Whole project = exactly one active bot; else that one bot. */
export const pickProjectMessengerRecipients = (input: {
  readonly threadKey: string;
  readonly bots: readonly ProjectMessengerBotSeat[];
}): ProjectMessengerRecipients => {
  if (input.threadKey === PROJECT_MESSENGER_WHOLE_THREAD_KEY) {
    if (input.bots.length === 0) {
      return { ok: false, code: "no_bots" };
    }
    if (input.bots.length > 1) {
      return { ok: false, code: "single_recipient_required" };
    }
    return { ok: true, whole: true, recipients: input.bots };
  }
  const bot = input.bots.find((seat) => seat.membershipId === input.threadKey);
  return bot === undefined
    ? { ok: false, code: "thread_not_found" }
    : { ok: true, whole: false, recipients: [bot] };
};
