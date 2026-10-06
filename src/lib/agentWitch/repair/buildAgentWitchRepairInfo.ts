import { AGENT_WITCH_INSTALL_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchInstallBundleVersion";
import { AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION } from "@/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant";
import { AGENT_WITCH_REPAIR_COPY } from "@/lib/agentWitch/repair/agentWitchRepairCopy.constant";
import {
  buildAgentWitchRepairCommands,
  type AgentWitchRepairCommands,
} from "@/lib/agentWitch/repair/buildAgentWitchRepairCommands";

export interface AgentWitchRepairInfo {
  readonly ok: true;
  /** Below this AWL bundle the device is too old (same as the connect gate). */
  readonly minBundleVersion: string;
  /** Latest shipped bundle; the repair verifies the install reaches it. */
  readonly bundleVersion: string;
  readonly commands: AgentWitchRepairCommands;
  readonly copy: typeof AGENT_WITCH_REPAIR_COPY;
}

/** Public payload for GET /install/agent-witch/repair (no secrets, no auth). */
export const buildAgentWitchRepairInfo = (
  origin: string,
): AgentWitchRepairInfo => ({
  ok: true,
  minBundleVersion: AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION,
  bundleVersion: AGENT_WITCH_INSTALL_BUNDLE_VERSION,
  commands: buildAgentWitchRepairCommands(origin),
  copy: AGENT_WITCH_REPAIR_COPY,
});
