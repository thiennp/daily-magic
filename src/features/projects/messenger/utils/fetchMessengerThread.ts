import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { AwcMessengerOpenThread } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { parseMessengerOpenThread } from "@/features/projects/messenger/utils/parseMessengerTimeline";
import { readMessengerJson } from "@/features/projects/messenger/utils/readMessengerJson";

export type FetchMessengerThreadResult =
  | { readonly ok: true; readonly thread: AwcMessengerOpenThread }
  | {
      readonly ok: false;
      readonly unavailable: boolean;
      readonly errorMessage: string;
    };

export const fetchMessengerThread = async (input: {
  readonly projectId: string;
  readonly threadKey: string;
}): Promise<FetchMessengerThreadResult> => {
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/messenger/threads/${encodeURIComponent(input.threadKey)}`;
  const response = await fetch(url, { cache: "no-store" }).catch(() => null);
  if (response === null || response.status === 404) {
    return {
      ok: false,
      unavailable: true,
      errorMessage: AWC_PROJECT_MESSENGER_COPY.unavailable,
    };
  }
  const payload = await readMessengerJson(response);
  const thread = parseMessengerOpenThread(payload);
  if (thread === null) {
    return {
      ok: false,
      unavailable: true,
      errorMessage: AWC_PROJECT_MESSENGER_COPY.unavailable,
    };
  }
  return { ok: true, thread };
};
