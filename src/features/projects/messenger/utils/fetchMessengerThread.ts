import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { AWC_PROJECT_MESSENGER_PAGE_LIMIT } from "@/features/projects/messenger/awcProjectMessengerPage.constant";
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

const buildThreadUrl = (input: {
  readonly projectId: string;
  readonly threadKey: string;
  readonly before?: string | null;
  readonly limit?: number;
}): string => {
  const base = `/api/projects/${encodeURIComponent(input.projectId)}/messenger/threads/${encodeURIComponent(input.threadKey)}`;
  const params = new URLSearchParams();
  if (typeof input.before === "string" && input.before.length > 0) {
    params.set("before", input.before);
  }
  if (input.before !== undefined && input.before !== null) {
    params.set(
      "limit",
      String(input.limit ?? AWC_PROJECT_MESSENGER_PAGE_LIMIT),
    );
  } else if (input.limit !== undefined) {
    params.set("limit", String(input.limit));
  }
  const query = params.toString();
  return query.length > 0 ? `${base}?${query}` : base;
};

export const fetchMessengerThread = async (input: {
  readonly projectId: string;
  readonly threadKey: string;
  readonly before?: string | null;
  readonly limit?: number;
}): Promise<FetchMessengerThreadResult> => {
  const url = buildThreadUrl(input);
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
