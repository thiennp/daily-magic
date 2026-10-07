import { PROJECT_CONNECTION_PROVIDERS } from "@/lib/projects/connections/projectConnection.constants";
import type { ProjectConnectionProvider } from "@/lib/projects/connections/projectConnection.types";

const SET = new Set<string>(PROJECT_CONNECTION_PROVIDERS);

export const parseProjectConnectionProvider = (
  value: string,
): ProjectConnectionProvider | null => {
  const trimmed = value.trim().toLowerCase();
  return SET.has(trimmed) ? (trimmed as ProjectConnectionProvider) : null;
};
