import {
  AGENT_WITCH_MIN_NODE_MAJOR,
  AGENT_WITCH_NODE_INSTALL_HINT,
  AGENT_WITCH_MIN_NODE_VERSION_LABEL,
} from "../src/lib/agentWitch/agentWitchNodeRuntime.constant";

export const buildAgentWitchNodeRuntimeTooOldMessage = (
  currentVersion: string,
): string =>
  [
    `Node.js ${AGENT_WITCH_MIN_NODE_VERSION_LABEL} or newer is required (found ${currentVersion}).`,
    AGENT_WITCH_NODE_INSTALL_HINT,
  ].join(" ");

export const assertAgentWitchNodeRuntimeVersion = (): void => {
  const major = Number.parseInt(
    process.version.slice(1).split(".")[0] ?? "",
    10,
  );

  if (Number.isNaN(major) || major < AGENT_WITCH_MIN_NODE_MAJOR) {
    process.stderr.write(
      `[agent-witch] ${buildAgentWitchNodeRuntimeTooOldMessage(process.version)}\n`,
    );
    process.exit(1);
  }
};
