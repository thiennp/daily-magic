import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import type { AwcMessengerThreadList } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { parseMessengerThreadList } from "@/features/projects/messenger/utils/parseMessengerThreadList";
import { readMessengerJson } from "@/features/projects/messenger/utils/readMessengerJson";

export type FetchMessengerThreadsResult =
  | { readonly ok: true; readonly threads: AwcMessengerThreadList }
  | {
      readonly ok: false;
      readonly unavailable: boolean;
      readonly forbidden: boolean;
      readonly errorMessage: string;
    };

export const fetchMessengerThreads = async (input: {
  readonly projectId: string;
}): Promise<FetchMessengerThreadsResult> => {
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/messenger/threads`;
  const response = await fetch(url, { cache: "no-store" }).catch(() => null);
  if (response === null) {
    return {
      ok: false,
      unavailable: true,
      forbidden: false,
      errorMessage: AWC_PROJECT_MESSENGER_COPY.unavailable,
    };
  }
  if (response.status === 404) {
    return {
      ok: false,
      unavailable: true,
      forbidden: false,
      errorMessage: AWC_PROJECT_MESSENGER_COPY.unavailable,
    };
  }
  if (response.status === 403) {
    return {
      ok: false,
      unavailable: false,
      forbidden: true,
      errorMessage: AWC_PROJECT_MESSENGER_COPY.viewerBanner,
    };
  }
  const payload = await readMessengerJson(response);
  const threads = parseMessengerThreadList(payload);
  if (threads === null) {
    return {
      ok: false,
      unavailable: true,
      forbidden: false,
      errorMessage: AWC_PROJECT_MESSENGER_COPY.unavailable,
    };
  }
  return { ok: true, threads };
};
