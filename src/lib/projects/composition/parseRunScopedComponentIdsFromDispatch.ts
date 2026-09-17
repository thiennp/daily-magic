const parseRunScopedComponentIdsFromDispatch = (
  payload: Readonly<Record<string, unknown>>,
): readonly string[] => {
  const raw = payload.runScopedComponentIds;

  if (!Array.isArray(raw)) {
    return [];
  }

  return [
    ...new Set(
      raw
        .filter((value): value is string => typeof value === "string")
        .map((id) => id.trim())
        .filter((id) => id.length > 0),
    ),
  ];
};

export default parseRunScopedComponentIdsFromDispatch;
