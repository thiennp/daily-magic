import type { ProjectConnectionStatus } from "@/features/projects/settings/connections/projectConnection.types";

export type ConnectionRowActionKind =
  | "connect"
  | "reconnect"
  | "disconnect"
  | null;

/** Which owner action the row shows for this status. */
export const resolveConnectionRowAction = (
  status: ProjectConnectionStatus,
): ConnectionRowActionKind => {
  if (status === "connected") return "disconnect";
  if (status === "expired" || status === "error") return "reconnect";
  return "connect";
};
