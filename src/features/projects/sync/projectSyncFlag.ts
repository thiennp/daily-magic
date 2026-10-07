/**
 * Feature flag for project sync module S1 (IDB soft-read / loadPage / adapter).
 * Messenger always uses the extracted pager (behavior-identical).
 * Tasks *tab chrome* always mounts (NRG HARD / UI Box). This flag only gates
 * the sync/IDB data path — default OFF. When off, chrome uses Reports
 * presentation; when on, softRead IDB → loadPage (soft-degrade never hides tab).
 *
 * Env: AWC_PROJECT_SYNC_MODULE=1 enables; unset/other = off.
 */

export const AWC_PROJECT_SYNC_MODULE_ENV = "AWC_PROJECT_SYNC_MODULE";

export const isProjectSyncModuleEnabled = (
  env: NodeJS.ProcessEnv = process.env,
): boolean => {
  const raw = env[AWC_PROJECT_SYNC_MODULE_ENV];
  return raw === "1" || raw === "true" || raw === "on";
};
