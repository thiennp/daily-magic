export const sendAgentRunStop = (
  agentRunId: string,
): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  const trimmedRunId = agentRunId.trim();
  if (trimmedRunId.length === 0) {
    return Promise.resolve({
      ok: false,
      errorMessage: "No active run to stop.",
    });
  }

  return fetch(`/api/agent-runs/${encodeURIComponent(trimmedRunId)}/stop`, {
    method: "POST",
  })
    .then(async (response) => {
      const data: unknown = await response.json().catch(() => null);

      if (
        response.ok &&
        typeof data === "object" &&
        data !== null &&
        "ok" in data &&
        (data as { ok: boolean }).ok === true
      ) {
        return { ok: true };
      }

      const errorMessage =
        typeof data === "object" &&
        data !== null &&
        "errorMessage" in data &&
        typeof (data as { errorMessage: unknown }).errorMessage === "string"
          ? (data as { errorMessage: string }).errorMessage
          : "Could not stop run.";

      return { ok: false, errorMessage };
    })
    .catch(() => ({ ok: false, errorMessage: "Could not stop run." }));
};
