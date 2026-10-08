import { isNonNullObject, isString } from "guardz";

import type {
  ProjectConnectionItem,
  ProjectConnectionProvider,
  ProjectConnectionStatus,
  ProjectConnectionsFetchResult,
} from "@/features/projects/settings/connections/projectConnection.types";
import { PROJECT_CONNECTION_PROVIDERS } from "@/features/projects/settings/connections/projectConnectionProviders.constant";

const PROVIDERS = new Set<string>(PROJECT_CONNECTION_PROVIDERS);

const mapStatus = (raw: string): ProjectConnectionStatus => {
  if (raw === "connected") return "connected";
  if (raw === "expired") return "expired";
  if (raw === "error") return "error";
  return "none";
};

const readLabel = (row: Record<string, unknown>): string | null => {
  const camel = row.accountLabel;
  const snake = row.account_label;
  if (isString(camel) && camel.trim().length > 0) return camel.trim();
  if (isString(snake) && snake.trim().length > 0) return snake.trim();
  return null;
};

const readConnectedAt = (row: Record<string, unknown>): string | null => {
  const camel = row.connectedAt;
  const snake = row.connected_at;
  if (isString(camel) && camel.length > 0) return camel;
  if (isString(snake) && snake.length > 0) return snake;
  return null;
};

const parseItem = (value: unknown): ProjectConnectionItem | null => {
  if (!isNonNullObject(value) || !isString(value.provider)) return null;
  if (!PROVIDERS.has(value.provider)) return null;
  if (!isString(value.status)) return null;
  return {
    provider: value.provider as ProjectConnectionProvider,
    status: mapStatus(value.status),
    accountLabel: readLabel(value),
    connectedAt: readConnectedAt(value),
    connectEnabled: value.connectEnabled === true,
  };
};

const parseList = (list: unknown): ProjectConnectionItem[] | null => {
  if (!Array.isArray(list)) return null;
  const items: ProjectConnectionItem[] = [];
  for (const row of list) {
    const item = parseItem(row);
    if (item === null) return null;
    items.push(item);
  }
  return items;
};

/**
 * Map GET …/connections. 404 / 501 → unavailable; other failures → error.
 * Success: `{ ok: true, connections: [...] }` or a bare array.
 */
export const parseProjectConnectionsResponse = (
  status: number,
  httpOk: boolean,
  data: unknown,
): ProjectConnectionsFetchResult => {
  if (status === 404 || status === 501) {
    return { ok: false, reason: "unavailable" };
  }
  if (!httpOk) return { ok: false, reason: "error" };
  if (Array.isArray(data)) {
    const items = parseList(data);
    return items === null
      ? { ok: false, reason: "error" }
      : { ok: true, items };
  }
  if (!isNonNullObject(data) || data.ok !== true) {
    return { ok: false, reason: "error" };
  }
  const items = parseList(data.connections);
  return items === null ? { ok: false, reason: "error" } : { ok: true, items };
};
