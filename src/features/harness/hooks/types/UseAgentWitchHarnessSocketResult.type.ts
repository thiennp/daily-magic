import type { AgentPairingStatus } from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type HarnessRequestResult from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type HarnessManifest from "@/lib/agentWitch/harness/types/HarnessManifest.type";
import type HarnessItemSpec from "@/lib/agentWitch/harness/types/HarnessItemSpec.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { WsTestConnectionStatus } from "@/features/wsTest/types/WsTestConnectionStatus.type";
import type { BorrowImportStatus } from "@/features/harness/hooks/types/BorrowImportStatus.type";

export interface UseAgentWitchHarnessSocketResult {
  readonly connectionStatus: WsTestConnectionStatus;
  readonly pairingStatus: AgentPairingStatus;
  readonly localManifest: HarnessManifest | null;
  readonly manifestHostname: string | null;
  readonly lastRequestResult: HarnessRequestResult | null;
  readonly lastMessage: string;
  readonly borrowImportStatus: BorrowImportStatus;
  readonly borrowImportMessage: string | null;
  readonly pairLocalAgent: (pairingToken: string) => void;
  readonly sendHarnessRequest: (input: {
    readonly setName: string;
    readonly writerAgent: HarnessWriterAgent;
    readonly items: readonly HarnessItemSpec[];
  }) => void;
  readonly requestBorrowedHarnessExport: (
    ownerUserId: string,
    setSlugs: readonly string[],
  ) => void;
}

export type { AgentPairingStatus, HarnessRequestResult };
