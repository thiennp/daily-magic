import { runMarketplaceInstall } from "@/features/marketplace/utils/runMarketplaceInstall";

export type MarketplaceInstallExecutionResult = {
  readonly status: "done" | "error";
  readonly message: string;
  readonly libraryCapabilityId: string | null;
};

export const executeMarketplaceInstall = async (input: {
  readonly capabilityId: string;
  readonly deviceId: string;
  readonly projectId: string;
}): Promise<MarketplaceInstallExecutionResult> => {
  const result = await runMarketplaceInstall(input);

  return {
    status: result.status,
    message: result.message,
    libraryCapabilityId: result.libraryCapabilityId,
  };
};
