import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";
import { AGENT_WITCH_LOCAL_DOWNLOAD_URL } from "@/lib/agentWitch/agentWitchLocalTooOld.constant";
import type { AgentWitchLocalConnectVersionStatus } from "@/lib/agentWitch/types/AgentWitchLocalConnectVersionStatus.type";
import type { AgentWitchLocalTooOldRefusal } from "@/lib/agentWitch/types/AgentWitchLocalTooOldRefusal.type";
import type { ConnectThisMacModalNotice } from "@/features/home/utils/ConnectThisMacModalNotice.type";

/**
 * Connect modal state. `null` → plain download / install body.
 * - version_too_old: server refused (409 `agent_witch_local_too_old`) or the
 *   this-Mac device row reports `connectVersionStatus: "too_old"`.
 * - not_running: this Mac has a paired row but AWL's wake server is unreachable.
 * - retry: AWL answers locally but the row is not live — retry the connection.
 */
export const resolveConnectThisMacModalNotice = (input: {
  readonly tooOldRefusal: AgentWitchLocalTooOldRefusal | null;
  readonly thisMacDevice: {
    readonly connectVersionStatus?: AgentWitchLocalConnectVersionStatus;
    readonly installBundleVersion: string | null;
  } | null;
  readonly isThisMacReachable: boolean;
  readonly isWakeServerReachable: boolean;
}): ConnectThisMacModalNotice | null => {
  if (input.tooOldRefusal !== null) {
    return {
      kind: "version_too_old",
      installBundleVersion: input.tooOldRefusal.installBundleVersion,
      minBundleVersion: input.tooOldRefusal.minBundleVersion,
      downloadUrl: input.tooOldRefusal.downloadUrl,
    };
  }

  if (input.thisMacDevice?.connectVersionStatus === "too_old") {
    return {
      kind: "version_too_old",
      installBundleVersion: input.thisMacDevice.installBundleVersion,
      minBundleVersion: AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
      downloadUrl: AGENT_WITCH_LOCAL_DOWNLOAD_URL,
    };
  }

  if (input.thisMacDevice === null || input.isThisMacReachable) {
    return null;
  }

  return input.isWakeServerReachable
    ? { kind: "retry" }
    : { kind: "not_running" };
};
