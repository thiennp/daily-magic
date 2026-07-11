import type { AgentPairingStatus } from "@/features/harness/hooks/types/HarnessRequestResult.type";
import type HarnessRequestResult from "@/features/harness/hooks/types/HarnessRequestResult.type";
import { isAgentWitchRecord } from "@/features/harness/hooks/utils/agentWitchSocketUtils";
import type HarnessManifest from "@/lib/agentWitch/harness/types/HarnessManifest.type";

interface AgentWitchSocketMessageHandlers {
  readonly setLastMessage: (message: string) => void;
  readonly setPairingStatus: (status: AgentPairingStatus) => void;
  readonly setLocalManifest: (manifest: HarnessManifest | null) => void;
  readonly setManifestHostname: (hostname: string | null) => void;
  readonly setLastRequestResult: (result: HarnessRequestResult | null) => void;
}

export const handleAgentWitchSocketMessage = (
  raw: string,
  handlers: AgentWitchSocketMessageHandlers,
): void => {
  handlers.setLastMessage(raw);

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isAgentWitchRecord(parsed) || typeof parsed.type !== "string") {
      return;
    }

    if (
      parsed.type === "system.ack" &&
      isAgentWitchRecord(parsed.payload) &&
      parsed.payload.paired === true
    ) {
      handlers.setPairingStatus("paired");
    }

    if (parsed.type === "system.error") {
      if (isAgentWitchRecord(parsed.payload)) {
        const errorMessage =
          typeof parsed.payload.errorMessage === "string"
            ? parsed.payload.errorMessage
            : "";
        if (errorMessage.includes("pair")) {
          handlers.setPairingStatus("pairing_failed");
        }
      }
    }

    if (
      parsed.type === "harness.manifest.report" &&
      isAgentWitchRecord(parsed.payload) &&
      isAgentWitchRecord(parsed.payload.manifest)
    ) {
      handlers.setLocalManifest(
        parsed.payload.manifest as unknown as HarnessManifest,
      );
      handlers.setManifestHostname(
        typeof parsed.payload.hostname === "string"
          ? parsed.payload.hostname
          : null,
      );
      handlers.setPairingStatus("paired");
    }

    if (
      parsed.type === "harness.request.result" &&
      isAgentWitchRecord(parsed.payload)
    ) {
      handlers.setLastRequestResult({
        success: parsed.payload.success === true,
        writerAgent:
          typeof parsed.payload.writerAgent === "string"
            ? parsed.payload.writerAgent
            : "unknown",
        exitCode:
          typeof parsed.payload.exitCode === "number"
            ? parsed.payload.exitCode
            : undefined,
        output:
          typeof parsed.payload.output === "string"
            ? parsed.payload.output
            : undefined,
        errorMessage:
          typeof parsed.payload.errorMessage === "string"
            ? parsed.payload.errorMessage
            : undefined,
      });
    }
  } catch {
    // Keep raw message visible in lastMessage.
  }
};
