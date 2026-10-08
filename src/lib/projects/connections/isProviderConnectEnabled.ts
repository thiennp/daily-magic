import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";

/** Env: comma list of providers ops re-enable, e.g. "slack,linear". */
export const PROJECT_CONNECTIONS_ENABLE_ENV = "PROJECT_CONNECTIONS_ENABLE";

/**
 * Shared-OAuth-app providers are "Coming soon" (disabled) until listed in
 * PROJECT_CONNECTIONS_ENABLE. Single switch for the UI and the start route.
 */
export const isProviderConnectEnabled = (
  provider: ProjectConnectionProvider,
  env: Readonly<Record<string, string | undefined>> = process.env,
): boolean =>
  (env[PROJECT_CONNECTIONS_ENABLE_ENV] ?? "")
    .split(",")
    .some((entry) => entry.trim().toLowerCase() === provider);
