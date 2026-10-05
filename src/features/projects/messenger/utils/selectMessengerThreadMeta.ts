import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type {
  AwcMessengerBotStatus,
  AwcMessengerThreadList,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";

const WHOLE_KEY = "whole";

export type MessengerThreadMeta = {
  readonly title: string;
  readonly kindLabel: string;
  readonly status: AwcMessengerBotStatus | undefined;
};

export const selectMessengerThreadMeta = (input: {
  readonly selectedKey: string | null;
  readonly threads: AwcMessengerThreadList | null | undefined;
}): MessengerThreadMeta => {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  if (input.selectedKey === WHOLE_KEY || input.selectedKey === null) {
    return {
      title: copy.wholeName,
      kindLabel: copy.wholeSub,
      status: undefined,
    };
  }
  const bot = input.threads?.bots.find(
    (row) => row.membershipId === input.selectedKey,
  );
  return {
    title: bot?.displayName?.trim() || copy.kindBot,
    kindLabel: copy.kindBot,
    status: bot?.status,
  };
};
