import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";

export default interface HarnessDeterministicInstallPayload {
  readonly installMethod: "deterministic-bundle";
  readonly bundle?: HarnessInstallBundle;
  readonly bundleFetch?: {
    readonly artifactId: string;
    readonly contentSha256: string;
  };
}
