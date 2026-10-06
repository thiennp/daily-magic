export const readOauthConsentSearchParam = (
  raw: Record<string, string | string[] | undefined>,
  key: string,
): string => {
  const value = raw[key];
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && value[0] !== undefined) {
    return value[0];
  }
  return "";
};
