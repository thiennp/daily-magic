export interface CheckProductUpdatesArgs {
  readonly sinceCatalogVersion: number;
}

const readOptionalInt = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.trunc(value);
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value.trim());
    if (Number.isFinite(parsed)) {
      return Math.trunc(parsed);
    }
  }
  return null;
};

/**
 * Parse check_product_updates args. Missing sinceCatalogVersion → 0 (all entries).
 * Invalid shapes still default to 0 rather than erroring (bots should self-heal).
 */
export const parseCheckProductUpdatesArgs = (
  args: unknown,
): CheckProductUpdatesArgs => {
  if (typeof args !== "object" || args === null || Array.isArray(args)) {
    return { sinceCatalogVersion: 0 };
  }
  const record = args as Readonly<Record<string, unknown>>;
  const since = readOptionalInt(record.sinceCatalogVersion);
  if (since === null || since < 0) {
    return { sinceCatalogVersion: 0 };
  }
  return { sinceCatalogVersion: since };
};
