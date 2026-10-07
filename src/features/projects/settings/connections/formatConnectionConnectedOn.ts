import {
  formatProjectConnectionsCopy,
  PROJECT_CONNECTIONS_COPY as C,
} from "@/features/projects/settings/connections/projectConnectionsCopy.constant";

/** COPY `Connected {date}` — short locale date when parseable. */
export const formatConnectionConnectedOn = (
  connectedAt: string,
): string => {
  const date = new Date(connectedAt);
  const label = Number.isNaN(date.getTime())
    ? connectedAt
    : date.toLocaleDateString();
  return formatProjectConnectionsCopy(C.connectedOn, { date: label });
};
