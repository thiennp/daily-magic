import { PREFLIGHT_RERUN_HINT } from "./preflightAction.constant";
import { PREFLIGHT_CHECK_ROWS_A } from "./preflightCheckCatalogRowsA.constant";
import { PREFLIGHT_CHECK_ROWS_B } from "./preflightCheckCatalogRowsB.constant";
import type { PreflightCheckClass } from "./preflightStatus.constant";

export type PreflightCheckDefinition = {
  readonly id: string;
  readonly name: string;
  readonly defaultClass: PreflightCheckClass;
  readonly intent: string;
  readonly fix: string;
  readonly rerunHint: string;
};

const toDefinition = (
  row: readonly [string, string, PreflightCheckClass, string, string],
): PreflightCheckDefinition => ({
  id: row[0],
  name: row[1],
  defaultClass: row[2],
  intent: row[3],
  fix: row[4],
  rerunHint: PREFLIGHT_RERUN_HINT,
});

export const PREFLIGHT_CHECK_CATALOG: readonly PreflightCheckDefinition[] = [
  ...PREFLIGHT_CHECK_ROWS_A,
  ...PREFLIGHT_CHECK_ROWS_B,
].map(toDefinition);

export const PREFLIGHT_CHECK_BY_ID: Readonly<
  Record<string, PreflightCheckDefinition>
> = Object.fromEntries(
  PREFLIGHT_CHECK_CATALOG.map((check) => [check.id, check]),
);
