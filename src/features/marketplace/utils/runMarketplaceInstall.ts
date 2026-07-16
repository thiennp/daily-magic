import { postMarketplaceInstall } from "@/features/marketplace/utils/postMarketplaceInstall";
import { requestLocalHarnessInstall } from "@/lib/agentWitch/requestLocalHarnessInstall";

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

  if (result.localHarnessBundle !== null) {
    const localInstall = await requestLocalHarnessInstall({
      bundle: result.localHarnessBundle,
      appOrigin: window.location.origin,
    });

    if (localInstall.ok) {
      return {
        status: "done",
        message: "Saved to your library and installed rules on this Mac.",
        libraryCapabilityId: result.libraryCapabilityId,
      };
    }

    if (result.savedToLibrary) {
      return {
        status: "done",
        message:
          localInstall.errorMessage ??
          "Saved to your library, but rules could not be installed on this Mac.",
        libraryCapabilityId: result.libraryCapabilityId,
      };
    }

    return {
      status: "error",
      message: localInstall.errorMessage ?? "Harness install failed.",
      libraryCapabilityId: null,
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
