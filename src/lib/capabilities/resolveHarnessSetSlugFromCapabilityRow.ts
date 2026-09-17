const resolveHarnessSetSlugFromCapabilityRow = (
  row: Record<string, unknown>,
): string | null => {
  const fromComponentVersion = row.harness_set_slug_from_component;
  if (fromComponentVersion !== null && fromComponentVersion !== undefined) {
    const text = String(fromComponentVersion).trim();
    if (text.length > 0) {
      return text;
    }
  }

  const legacy = row.harness_set_slug;
  if (legacy !== null && legacy !== undefined) {
    const text = String(legacy).trim();
    if (text.length > 0) {
      return text;
    }
  }

  return null;
};

export default resolveHarnessSetSlugFromCapabilityRow;
