import {
  readAgentWitchWakePortFromFile,
  resolveAgentWitchInstallDir,
  resolveAgentWitchRuntimeWakePort,
  resolveAgentWitchWakePortDir,
} from "@agent-witch/install-layout";

/** AWB loopback port for knowledge-report instructions (matches wake server binding). */
export const resolveAgentWitchKnowledgeReportWakePort = (
  env: NodeJS.ProcessEnv = process.env,
): number => {
  const installDir = resolveAgentWitchInstallDir();
  const portDir = resolveAgentWitchWakePortDir(installDir, env);
  const fromAccountOrRootFile = readAgentWitchWakePortFromFile(portDir);
  if (fromAccountOrRootFile !== null) {
    return fromAccountOrRootFile;
  }
  return resolveAgentWitchRuntimeWakePort(installDir);
};
