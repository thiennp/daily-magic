/**
 * Feature flag for project sync module S1.
 * Messenger always uses the extracted pager (behavior-identical).
 * This flag gates Tasks adapter + reconcile hook consumers.
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
