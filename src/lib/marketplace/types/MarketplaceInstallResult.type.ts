import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";

export interface MarketplaceInstallResult {
  readonly ok: boolean;
  readonly errorMessage: string | null;
  readonly savedToLibrary: boolean;
  readonly harnessInstalled: boolean;
  readonly harnessInstallMessage: string | null;
  readonly localHarnessBundle: HarnessInstallBundle | null;
}
