export interface MarketplaceInstallResult {
  readonly ok: boolean;
  readonly errorMessage: string | null;
  readonly savedToLibrary: boolean;
  readonly harnessInstalled: boolean;
  readonly harnessInstallMessage: string | null;
}
