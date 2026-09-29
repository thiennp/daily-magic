/** Pulls the first JSON object from a writer reply. */
export const extractPromptSdlcJsonObject = (raw: string): unknown => {
  const trimmed = raw.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fence?.[1]?.trim() ?? trimmed;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end <= start) {
    throw new Error("No JSON object in reply.");
  }
  return JSON.parse(candidate.slice(start, end + 1)) as unknown;
};
