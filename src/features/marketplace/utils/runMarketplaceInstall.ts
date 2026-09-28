import { postMarketplaceInstall } from "@/features/marketplace/utils/postMarketplaceInstall";

export const runMarketplaceInstall = async (input: {
  readonly capabilityId: string;
  readonly deviceId: string;
  readonly projectId: string;
}): Promise<{
  readonly status: "done" | "error";
  readonly message: string;
  readonly libraryCapabilityId: string | null;
}> => {
  const result = await postMarketplaceInstall(input);

  if (!result.ok) {
    return {
      status: "error",
      message: result.errorMessage ?? "Install failed.",
      libraryCapabilityId: null,
    };
  }

  return {
    status: "done",
    message:
      result.harnessInstallMessage ??
      (result.savedToLibrary
        ? "Saved to your library and linked to your project."
        : "Install requested."),
    libraryCapabilityId: result.libraryCapabilityId,
  };
};
