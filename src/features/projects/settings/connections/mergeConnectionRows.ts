import type {
  ProjectConnectionItem,
  ProjectConnectionProvider,
} from "@/features/projects/settings/connections/projectConnection.types";
import { PROJECT_CONNECTION_PROVIDERS } from "@/features/projects/settings/connections/projectConnectionProviders.constant";

const emptyRow = (
  provider: ProjectConnectionProvider,
): ProjectConnectionItem => ({
  provider,
  status: "none",
  accountLabel: null,
  connectedAt: null,
});

/** Always four v1 rows; API rows overlay by provider. */
export const mergeConnectionRows = (
  items: readonly ProjectConnectionItem[],
): readonly ProjectConnectionItem[] => {
  const byProvider = new Map(items.map((item) => [item.provider, item]));
  return PROJECT_CONNECTION_PROVIDERS.map(
    (provider) => byProvider.get(provider) ?? emptyRow(provider),
  );
};
