import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { readMessengerJson } from "@/features/projects/messenger/utils/readMessengerJson";

export type SendMessengerMessageResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly errorMessage: string };

export const sendMessengerMessage = async (input: {
  readonly projectId: string;
  readonly threadKey: string;
  readonly text: string;
  readonly needsReply: boolean;
}): Promise<SendMessengerMessageResult> => {
  const url = `/api/projects/${encodeURIComponent(input.projectId)}/messenger/threads/${encodeURIComponent(input.threadKey)}/messages`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: input.text,
      needsReply: input.needsReply,
    }),
    cache: "no-store",
  }).catch(() => null);
  if (response === null) {
    return { ok: false, errorMessage: AWC_PROJECT_MESSENGER_COPY.sendFailed };
  }
  if (response.status === 403) {
    return {
      ok: false,
      errorMessage: AWC_PROJECT_MESSENGER_COPY.viewerBanner,
    };
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
  return { ok: false, errorMessage: AWC_PROJECT_MESSENGER_COPY.sendFailed };
};
