const GROK_ROUTINE_WAKE_TIMEOUT_MS = 3_000;

/** One POST. Do not retry: HTTP 200 starts another bot run. */
export const postProjectGrokRoutineWebhook = async (input: {
  readonly webhookUrl: string;
  readonly bearer: string;
  readonly body: string;
}): Promise<
  { readonly ok: true } | { readonly ok: false; readonly error: string }
> => {
  try {
    const response = await fetch(input.webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${input.bearer}`,
      },
      body: input.body,
      signal: AbortSignal.timeout(GROK_ROUTINE_WAKE_TIMEOUT_MS),
    });
    if (!response.ok) {
      return { ok: false, error: `http_${response.status}` };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "fetch_failed" };
  }
};
