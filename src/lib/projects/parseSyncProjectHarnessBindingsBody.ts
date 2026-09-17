const parseSyncProjectHarnessBindingsBody = (
  body: unknown,
): readonly string[] | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const harnessSetSlugs = (body as { harnessSetSlugs?: unknown })
    .harnessSetSlugs;

  if (!Array.isArray(harnessSetSlugs)) {
    return null;
  }

  return harnessSetSlugs
    .filter((value): value is string => typeof value === "string")
    .map((slug) => slug.trim())
    .filter((slug) => slug.length > 0);
};

export default parseSyncProjectHarnessBindingsBody;
