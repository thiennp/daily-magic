import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";

export const estimateHarnessInstallBundleUtf8Bytes = (
  bundle: HarnessInstallBundle,
): number => Buffer.byteLength(JSON.stringify(bundle), "utf8");
