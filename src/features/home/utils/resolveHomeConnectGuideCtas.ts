import { shouldShowAgentWitchAppDownloadCta } from "@/features/home/utils/shouldShowAgentWitchAppDownloadCta";

/** Desktop Connect guide: install command stays visible; download CTA is separate. */
export const resolveHomeConnectGuideCtas = (input: {
  readonly isMobileClient: boolean;
  readonly isCheckingLocalApp: boolean;
  readonly isLocalAppInstalled: boolean;
}): {
  readonly showConnectInstallCommand: boolean;
  readonly showAppDownloadCta: boolean;
} => {
  const showConnectInstallCommand = !input.isMobileClient;
  return {
    showConnectInstallCommand,
    showAppDownloadCta:
      showConnectInstallCommand &&
      shouldShowAgentWitchAppDownloadCta({
        isCheckingLocalApp: input.isCheckingLocalApp,
        isLocalAppInstalled: input.isLocalAppInstalled,
      }),
  };
};
