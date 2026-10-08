/** Name shown for a computer; blank or generic labels become "Unnamed computer abcd". */
export const resolveComputerLabel = (
  raw: unknown,
  deviceId: string,
): string => {
  const text = typeof raw === "string" ? raw.trim() : "";
  if (text !== "" && text.toLowerCase() !== "computer") {
    return text;
  }
  const shortId = deviceId.replace(/[^a-z0-9]/gi, "").slice(0, 4);
  return `Unnamed computer ${shortId}`.trim();
};
