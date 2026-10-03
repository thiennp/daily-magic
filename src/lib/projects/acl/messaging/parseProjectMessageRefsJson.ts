export const parseProjectMessageRefsJson = (
  refsJson: string,
): Readonly<Record<string, string>> => {
  try {
    const parsed: unknown = JSON.parse(refsJson);
    if (
      parsed !== null &&
      typeof parsed === "object" &&
      !Array.isArray(parsed)
    ) {
      return parsed as Readonly<Record<string, string>>;
    }
  } catch {
    return {};
  }
  return {};
};
