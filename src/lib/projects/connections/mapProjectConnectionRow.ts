import type {
  ProjectConnectionApiStatus,
  ProjectConnectionListItem,
  ProjectConnectionProvider,
} from "@/lib/projects/connections/projectConnection.types";
import { PROJECT_CONNECTION_PROVIDERS } from "@/lib/projects/connections/projectConnection.constants";

const PROVIDERS = new Set<string>(PROJECT_CONNECTION_PROVIDERS);

const asStatus = (raw: unknown): ProjectConnectionApiStatus => {
  if (raw === "connected") return "connected";
  if (raw === "expired") return "expired";
  if (raw === "error") return "error";
  if (raw === "revoked") return "revoked";
  if (raw === "connecting") return "connecting";
  return "none";
};

const asIso = (raw: unknown): string | null => {
  if (raw instanceof Date) return raw.toISOString();
  if (typeof raw === "string" && raw.length > 0) return raw;
  return null;
};

/** Map a DB row to the UI list DTO — never projects token columns. */
export const mapProjectConnectionRowToListItem = (
  row: Record<string, unknown>,
): ProjectConnectionListItem | null => {
  const provider = row.provider;
  if (typeof provider !== "string" || !PROVIDERS.has(provider)) return null;
  const label =
    typeof row.account_label === "string" && row.account_label.trim().length > 0
      ? row.account_label.trim()
      : null;
  return {
    provider: provider as ProjectConnectionProvider,
    status: asStatus(row.status),
    accountLabel: label,
    connectedAt: asIso(row.connected_at),
  };
};
