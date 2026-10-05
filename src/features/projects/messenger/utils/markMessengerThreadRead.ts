import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { readMessengerJson } from "@/features/projects/messenger/utils/readMessengerJson";

export type MarkMessengerThreadReadResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly errorMessage: string };

/**
 * Explicit unread→0 for a thread. Opening via GET already marks read;
 * Human shell / Overview deep-links can call this without loading messages.
 * Never acks bot deliveries (DOR / lifecycle untouched).
 */
export const markMessengerThreadRead = async (input: {
  readonly projectId: string;
  readonly threadKey: string;
}): Promise<MarkMessengerThreadReadResult> => {
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/messenger/threads/${encodeURIComponent(input.threadKey)}/read`;
  const response = await fetch(url, {
    method: "POST",
    cache: "no-store",
  }).catch(() => null);
  if (response === null) {
    return { ok: false, errorMessage: AWC_PROJECT_MESSENGER_COPY.unavailable };
  }
  if (!response.ok) {
    return { ok: false, errorMessage: AWC_PROJECT_MESSENGER_COPY.unavailable };
  }
  const payload = await readMessengerJson(response);
  if (
    payload !== null &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    (payload as { ok?: unknown }).ok === true
  ) {
    return { ok: true };
  }
  return { ok: false, errorMessage: AWC_PROJECT_MESSENGER_COPY.unavailable };
};
