import fs from "node:fs";
import path from "node:path";

import { AGENT_WITCH_LOCAL_INSTALL_ENTRY_POINTS } from "@/lib/agentWitch/agentWitchLocalInstallEntryPoints.constant";
import { collectAgentWitchInstallScriptDependencies } from "@/lib/agentWitch/collectAgentWitchInstallScriptDependencies";
import { extractAgentWitchInstallDownloadTargets } from "@/lib/agentWitch/extractAgentWitchInstallDownloadTargets";
import type { AgentWitchInstallScriptName } from "@/lib/agentWitch/readAgentWitchInstallScriptSource";
import {
  isAgentWitchInstallScriptName,
  readAgentWitchInstallScriptSource,
} from "@/lib/agentWitch/readAgentWitchInstallScriptSource";

export type AgentWitchMockInstallLayoutIssue = {
  readonly entryPoint: string;
  readonly missingDependency: string;
};

export const findAgentWitchMockInstallLayoutIssues = (input: {
  readonly installBashScript: string;
  readonly entryPoints?: readonly string[];
}): readonly AgentWitchMockInstallLayoutIssue[] => {
  const downloadedScripts = extractAgentWitchInstallDownloadTargets(
    input.installBashScript,
  );
  const entryPoints =
    input.entryPoints ?? AGENT_WITCH_LOCAL_INSTALL_ENTRY_POINTS;
  const issues: AgentWitchMockInstallLayoutIssue[] = [];

  for (const entryPoint of entryPoints) {
    if (!isAgentWitchInstallScriptName(entryPoint)) {
      continue;
    }

    const dependencies = collectAgentWitchInstallScriptDependencies(
      entryPoint,
      readAgentWitchInstallScriptSource,
    );

    for (const dependencyName of dependencies) {
      if (!downloadedScripts.has(dependencyName)) {
        issues.push({
          entryPoint,
          missingDependency: dependencyName,
        });
      }
    }
  }

  return issues;
};

export const materializeAgentWitchMockInstall = (input: {
  readonly installDir: string;
  readonly scriptNames: Iterable<string>;
  readonly readSource?: (scriptName: AgentWitchInstallScriptName) => string;
}): void => {
  const readSource = input.readSource ?? readAgentWitchInstallScriptSource;

  fs.mkdirSync(input.installDir, { recursive: true });

  for (const scriptName of input.scriptNames) {
    if (!isAgentWitchInstallScriptName(scriptName)) {
      continue;
    }

    const targetPath = path.join(input.installDir, scriptName);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, readSource(scriptName), "utf8");
  }
};

export const verifyAgentWitchMockInstallOnDisk = (input: {
  readonly installDir: string;
  readonly entryPoints: readonly AgentWitchInstallScriptName[];
  readonly readSource: (scriptName: AgentWitchInstallScriptName) => string;
}): readonly AgentWitchMockInstallLayoutIssue[] => {
  const issues: AgentWitchMockInstallLayoutIssue[] = [];

  for (const entryPoint of input.entryPoints) {
    const dependencies = collectAgentWitchInstallScriptDependencies(
      entryPoint,
      input.readSource,
    );

    for (const dependencyName of dependencies) {
      const dependencyPath = path.join(input.installDir, dependencyName);
      if (!fs.existsSync(dependencyPath)) {
        issues.push({
          entryPoint,
          missingDependency: dependencyName,
        });
      }
    }
  }

  return issues;
};
