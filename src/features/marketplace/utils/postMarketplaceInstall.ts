import { markOnboardingWorkflowCreated } from "@/features/home/utils/onboardingWorkflowCreatedStore";
import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";

export interface MarketplaceInstallApiResult {
  readonly ok: boolean;
  readonly errorMessage: string | null;
  readonly savedToLibrary: boolean;
  readonly harnessInstalled: boolean;
  readonly harnessInstallMessage: string | null;
  readonly localHarnessBundle: HarnessInstallBundle | null;
}

export const postMarketplaceInstall = async (input: {
  readonly capabilityId: string;
  readonly deviceId: string;
}): Promise<MarketplaceInstallApiResult> => {
  const response = await fetch("/api/marketplace/install", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const payload: unknown = await response.json();

  if (!response.ok) {
    const errorMessage =
      typeof payload === "object" &&
      payload !== null &&
      typeof (payload as { error?: unknown }).error === "string"
        ? (payload as { error: string }).error
        : "Install failed.";

    return {
      ok: false,
      errorMessage,
      savedToLibrary: false,
      harnessInstalled: false,
      harnessInstallMessage: null,
      localHarnessBundle: null,
    };
  }

  const record = payload as {
    savedToLibrary?: boolean;
    harnessInstalled?: boolean;
    harnessInstallMessage?: string | null;
    localHarnessBundle?: HarnessInstallBundle | null;
  };

  const savedToLibrary = record.savedToLibrary === true;

  if (savedToLibrary) {
    markOnboardingWorkflowCreated();
  }

  return {
    ok: true,
    errorMessage: null,
    savedToLibrary,
    harnessInstalled: record.harnessInstalled === true,
    harnessInstallMessage:
      typeof record.harnessInstallMessage === "string"
        ? record.harnessInstallMessage
        : null,
    localHarnessBundle:
      record.localHarnessBundle !== undefined &&
      record.localHarnessBundle !== null
        ? record.localHarnessBundle
        : null,
  };
};
