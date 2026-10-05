import { PROJECT_MESSENGER_WHOLE_THREAD_KEY } from "@/lib/projects/acl/messaging/messenger/projectMessenger.constant";
import type { ProjectMessengerBotSeat } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerBots";

export type ProjectMessengerRecipients =
  | {
      readonly ok: true;
      readonly whole: boolean;
      readonly recipients: readonly ProjectMessengerBotSeat[];
    }
  | { readonly ok: false; readonly code: "thread_not_found" | "no_bots" };

/** Thread key → bot recipients: Whole project = every active bot; else that one bot. */
export const pickProjectMessengerRecipients = (input: {
  readonly threadKey: string;
  readonly bots: readonly ProjectMessengerBotSeat[];
}): ProjectMessengerRecipients => {
  if (input.threadKey === PROJECT_MESSENGER_WHOLE_THREAD_KEY) {
    return input.bots.length === 0
      ? { ok: false, code: "no_bots" }
      : { ok: true, whole: true, recipients: input.bots };
  }
  const bot = input.bots.find((seat) => seat.membershipId === input.threadKey);
  return bot === undefined
    ? { ok: false, code: "thread_not_found" }
    : { ok: true, whole: false, recipients: [bot] };
};
