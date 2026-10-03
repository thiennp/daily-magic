const GROK_ROUTINE_WAKE_TIMEOUT_MS = 3_000;

const httpStatusResult = (status: number): string =>
  Number.isInteger(status) && status >= 100 && status <= 599
    ? `http_${status}`
    : "fetch_failed";

/** One POST. Do not retry: HTTP 200 starts another bot run. */
export const postProjectGrokRoutineWebhook = async (input: {
  readonly webhookUrl: string;
  readonly bearer: string;
  readonly body: string;
}): Promise<{ readonly result: string }> => {
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
    return { result: httpStatusResult(response.status) };
  } catch {
    return { result: "fetch_failed" };
  }
};
