/** Parse a JSON object response; null on network / JSON / shape failure. */
export const readProjectSkillsJson = async (
  response: Response | null,
): Promise<Record<string, unknown> | null> => {
  if (response === null) {
    return null;
  }
  try {
    const payload: unknown = await response.json();
    return payload !== null &&
      typeof payload === "object" &&
      !Array.isArray(payload)
      ? (payload as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
};
