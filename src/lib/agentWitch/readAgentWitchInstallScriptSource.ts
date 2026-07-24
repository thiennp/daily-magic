import fs from "node:fs";
import path from "node:path";

import { listAgentWitchInstallBundleArtifacts } from "@/lib/agentWitch/listAgentWitchInstallBundleArtifacts";

import { AGENT_WITCH_APP_DIR_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";

const shippedArtifactsRoot = path.join(
  process.cwd(),
  "public/install/agent-witch",
  AGENT_WITCH_APP_DIR_NAME,
);

const buildInstallScriptAllowlist = (): Record<string, string> => {
  const entries: Record<string, string> = {};

  for (const artifactPath of listAgentWitchInstallBundleArtifacts()) {
    const fileName = path.basename(artifactPath);
    entries[artifactPath] = path.join(shippedArtifactsRoot, fileName);
  }

  return entries;
};

const bundleRelativePath = listAgentWitchInstallBundleArtifacts()[0] ?? "";

const AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST = buildInstallScriptAllowlist();

export type AgentWitchInstallScriptName =
  keyof typeof AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST;

export const isAgentWitchInstallScriptName = (
  value: string,
): value is AgentWitchInstallScriptName =>
  Object.prototype.hasOwnProperty.call(
    AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST,
    value,
  );

export const readAgentWitchInstallScriptSource = (
  scriptName: AgentWitchInstallScriptName,
): string => {
  const filePath = AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST[scriptName];
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Agent Witch bundle is missing at ${filePath}. Run npm run build:agent-witch.`,
    );
  }

  return fs.readFileSync(filePath, "utf8");
};

export const readAgentWitchClientSource = (): string =>
  readAgentWitchInstallScriptSource(
    bundleRelativePath as AgentWitchInstallScriptName,
  );
