import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { AwcMessengerMessageState } from "@/features/projects/messenger/types/awcProjectMessenger.type";

export const formatMessengerStateLabel = (
  state: AwcMessengerMessageState,
  displayName: string | null,
): string => {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  if (state === "waiting") {
    const name = displayName?.trim() || "the bot";
    return copy.stateWaiting.replace("{name}", name);
  }
  const map: Record<Exclude<AwcMessengerMessageState, "waiting">, string> = {
    received: copy.stateReceived,
    got_it: copy.stateGotIt,
    working: copy.stateWorking,
    done: copy.stateDone,
    blocked: copy.stateBlocked,
    no_answer: copy.stateNoAnswer,
  };
  return map[state];
};
