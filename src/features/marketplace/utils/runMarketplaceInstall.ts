import { postMarketplaceInstall } from "@/features/marketplace/utils/postMarketplaceInstall";

export const runMarketplaceInstall = async (input: {
  readonly capabilityId: string;
  readonly deviceId: string;
}): Promise<{
  readonly status: "done" | "error";
  readonly message: string;
}> => {
  const result = await postMarketplaceInstall(input);

  if (!result.ok) {
    return {
      status: "error",
      message: result.errorMessage ?? "Install failed.",
    };
  }

  return {
    status: "done",
    message:
      result.harnessInstallMessage ??
      (result.savedToLibrary ? "Saved to your library." : "Install requested."),
  };
};
