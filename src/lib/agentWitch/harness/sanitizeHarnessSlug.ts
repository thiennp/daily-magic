const sanitizeHarnessSlug = (value: string): string => {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized.length > 0) {
    return normalized;
  }

  return "harness-set";
};

export default sanitizeHarnessSlug;
