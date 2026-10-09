/**
 * Project sync module S1 (IDB soft-read / loadPage / adapter), now rolled out:
 * ON by default. Messenger always uses the extracted pager (behavior-identical).
 * Tasks *tab chrome* always mounts (NRG HARD / UI Box); this flag only gates
 * the sync/IDB data path, and IDB failures soft-degrade (never hide the tab).
 *
 * Kill switch: AWC_PROJECT_SYNC_MODULE=0|false|off (server routes) and
 * NEXT_PUBLIC_AWC_PROJECT_SYNC_MODULE=0|false|off (browser Tasks tab) turn the
 * data path off again, back to Reports presentation.
 */

export const AWC_PROJECT_SYNC_MODULE_ENV = "AWC_PROJECT_SYNC_MODULE";
export const AWC_PROJECT_SYNC_MODULE_PUBLIC_ENV =
  "NEXT_PUBLIC_AWC_PROJECT_SYNC_MODULE";

const OFF_VALUES = ["0", "false", "off"];

/** Literal `process.env.NEXT_PUBLIC_*` access so the browser build inlines it. */
const defaultEnv = (): NodeJS.ProcessEnv =>
  ({
    [AWC_PROJECT_SYNC_MODULE_ENV]: process.env.AWC_PROJECT_SYNC_MODULE,
    [AWC_PROJECT_SYNC_MODULE_PUBLIC_ENV]:
      process.env.NEXT_PUBLIC_AWC_PROJECT_SYNC_MODULE,
  }) as unknown as NodeJS.ProcessEnv;

export const isProjectSyncModuleEnabled = (
  env: NodeJS.ProcessEnv = defaultEnv(),
): boolean => {
  const raw =
    env[AWC_PROJECT_SYNC_MODULE_ENV] ?? env[AWC_PROJECT_SYNC_MODULE_PUBLIC_ENV];
  return !OFF_VALUES.includes((raw ?? "").trim().toLowerCase());
};
