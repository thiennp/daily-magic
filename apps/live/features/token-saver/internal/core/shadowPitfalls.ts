import type { Pitfall } from "../../public-api/types";

/**
 * Project overrides shadow seed rows with the same id.
 * Pure: no I/O.
 */
export const shadowPitfalls = (input: {
  readonly seeds: readonly Pitfall[];
  readonly projectRows: readonly Pitfall[];
  readonly includeRetired?: boolean;
}): readonly Pitfall[] => {
  const byId = new Map<string, Pitfall>();

  input.seeds.forEach((seed) => {
    byId.set(seed.id, seed);
  });

  input.projectRows.forEach((row) => {
    byId.set(row.id, row);
  });

  const merged = [...byId.values()];
  if (input.includeRetired === true) {
    return merged;
  }

  return merged.filter((row) => row.source !== "retired");
};

export const countActivePitfalls = (shadowed: readonly Pitfall[]): number =>
  shadowed.filter((row) => row.source !== "retired").length;
