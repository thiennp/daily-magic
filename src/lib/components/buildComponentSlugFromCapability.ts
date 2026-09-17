const buildComponentSlugFromCapability = (input: {
  readonly name: string;
  readonly harnessSetSlug: string | null;
}): string => {
  const harnessSlug = input.harnessSetSlug?.trim() ?? "";
  if (harnessSlug.length > 0) {
    return harnessSlug.toLowerCase();
  }

  const fromName = input.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return fromName.length > 0 ? fromName : "component";
};

export default buildComponentSlugFromCapability;
