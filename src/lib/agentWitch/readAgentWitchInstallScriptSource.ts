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

const resolveExistingInstallArtifactPath = (
  scriptName: AgentWitchInstallScriptName,
): string => {
  const filePath = AGENT_WITCH_INSTALL_SCRIPT_ALLOWLIST[scriptName];
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `AgentWitch bundle is missing at ${filePath}. Run npm run build:agent-witch.`,
    );
  }

  return filePath;
};

export const readAgentWitchInstallScriptSource = (
  scriptName: AgentWitchInstallScriptName,
): string =>
  fs.readFileSync(resolveExistingInstallArtifactPath(scriptName), "utf8");

/** Archives (deps.tar.gz) ship as raw bytes; only text bundles are minified. */
export const isAgentWitchInstallBinaryArtifactName = (
  scriptName: AgentWitchInstallScriptName,
): boolean => scriptName.endsWith(".tar.gz");

export const readAgentWitchInstallArtifactBytes = (
  scriptName: AgentWitchInstallScriptName,
): Uint8Array<ArrayBuffer> =>
  new Uint8Array(
    fs.readFileSync(resolveExistingInstallArtifactPath(scriptName)),
  );

export const readAgentWitchClientSource = (): string =>
  readAgentWitchInstallScriptSource(
    bundleRelativePath as AgentWitchInstallScriptName,
  );
