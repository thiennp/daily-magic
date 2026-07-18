import { postMarketplaceInstall } from "@/features/marketplace/utils/postMarketplaceInstall";

export const runMarketplaceInstall = async (input: {
  readonly capabilityId: string;
  readonly deviceId: string;
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

  if (result.harnessInstalled) {
    return {
      status: "done",
      message: "Saved to your library and installed rules on your Mac.",
      libraryCapabilityId: result.libraryCapabilityId,
    };
  }

  return {
    status: "done",
    message:
      result.harnessInstallMessage ??
      (result.savedToLibrary ? "Saved to your library." : "Install requested."),
    libraryCapabilityId: result.libraryCapabilityId,
  };
};
