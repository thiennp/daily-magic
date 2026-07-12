interface HarnessSetSummary {
  readonly setName: string | null;
  readonly itemCount: number | null;
  readonly itemPaths: readonly string[];
}

export default function summarizeHarnessManifestSet(
  manifestJson: Readonly<Record<string, unknown>>,
  setSlug: string,
): HarnessSetSummary {
  const sets =
    typeof manifestJson.sets === "object" &&
    manifestJson.sets !== null &&
    !Array.isArray(manifestJson.sets)
      ? (manifestJson.sets as Record<string, unknown>)
      : {};
  const rawSet = sets[setSlug];

  if (typeof rawSet !== "object" || rawSet === null || Array.isArray(rawSet)) {
    return { setName: null, itemCount: null, itemPaths: [] };
  }

  const setRecord = rawSet as Record<string, unknown>;
  const setName = typeof setRecord.name === "string" ? setRecord.name : null;
  const items = Array.isArray(setRecord.items) ? setRecord.items : [];
  const itemPaths = items
    .map((item) => {
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        return null;
      }

      const path = (item as Record<string, unknown>).path;
      return typeof path === "string" ? path : null;
    })
    .filter((path): path is string => path !== null);

  return {
    setName,
    itemCount: items.length,
    itemPaths,
  };
}
