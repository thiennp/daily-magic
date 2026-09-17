export type BridgeHttpMethod = "GET" | "POST";

export interface BridgeRouteCatalogRow {
  readonly method: BridgeHttpMethod;
  readonly pathname: string;
  readonly featureSlug: string;
  readonly parentSlug: string;
}

/** Authoritative AWB loopback route table (contract tests must match). */
export const BRIDGE_ROUTE_CATALOG: readonly BridgeRouteCatalogRow[] = [
  {
    method: "GET",
    pathname: "/health",
    featureSlug: "health-identity",
    parentSlug: "discovery",
  },
  {
    method: "GET",
    pathname: "/identity",
    featureSlug: "health-identity",
    parentSlug: "discovery",
  },
  {
    method: "GET",
    pathname: "/local",
    featureSlug: "local-debug-page",
    parentSlug: "diagnostics",
  },
  {
    method: "GET",
    pathname: "/watchdog/status",
    featureSlug: "watchdog-api",
    parentSlug: "operations",
  },
  {
    method: "GET",
    pathname: "/watchdog/logs",
    featureSlug: "watchdog-api",
    parentSlug: "operations",
  },
  {
    method: "POST",
    pathname: "/watchdog/revive",
    featureSlug: "process-control",
    parentSlug: "operations",
  },
  {
    method: "POST",
    pathname: "/restart",
    featureSlug: "process-control",
    parentSlug: "operations",
  },
  {
    method: "GET",
    pathname: "/update/status",
    featureSlug: "self-update-api",
    parentSlug: "operations",
  },
  {
    method: "GET",
    pathname: "/update/logs",
    featureSlug: "self-update-api",
    parentSlug: "operations",
  },
  {
    method: "POST",
    pathname: "/update/run",
    featureSlug: "self-update-api",
    parentSlug: "operations",
  },
  {
    method: "POST",
    pathname: "/install/delete",
    featureSlug: "install-delete-api",
    parentSlug: "operations",
  },
  {
    method: "POST",
    pathname: "/wake",
    featureSlug: "process-control",
    parentSlug: "operations",
  },
  {
    method: "POST",
    pathname: "/harness/install",
    featureSlug: "harness-proxy",
    parentSlug: "awc-proxy",
  },
  {
    method: "POST",
    pathname: "/projects/ensure",
    featureSlug: "projects-proxy",
    parentSlug: "awc-proxy",
  },
  {
    method: "POST",
    pathname: "/projects/select-folder",
    featureSlug: "projects-proxy",
    parentSlug: "awc-proxy",
  },
  {
    method: "POST",
    pathname: "/harness/borrow",
    featureSlug: "harness-proxy",
    parentSlug: "awc-proxy",
  },
  {
    method: "GET",
    pathname: "/automations/status",
    featureSlug: "automations-proxy",
    parentSlug: "awc-proxy",
  },
  {
    method: "POST",
    pathname: "/automations/sync",
    featureSlug: "automations-proxy",
    parentSlug: "awc-proxy",
  },
  {
    method: "POST",
    pathname: "/automations/run",
    featureSlug: "automations-proxy",
    parentSlug: "awc-proxy",
  },
];
