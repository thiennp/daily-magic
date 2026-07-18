export const shouldShowAgentWitchAppDownloadCta = (input: {
  readonly isCheckingLocalApp: boolean;
  readonly isLocalAppInstalled: boolean;
}): boolean => !input.isCheckingLocalApp && !input.isLocalAppInstalled;
