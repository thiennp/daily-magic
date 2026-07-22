import { listAgentWitchInstallScriptNames } from "@/lib/agentWitch/listAgentWitchInstallScriptNames";
import {
  isAgentWitchInstallScriptName,
  readAgentWitchInstallScriptSource,
} from "@/lib/agentWitch/readAgentWitchInstallScriptSource";

const FORBIDDEN_REPO_SRC_IMPORT = /(?:from\s*|import\s*\(\s*)["']\.\.\/src\//;

export type AgentWitchForbiddenRepoSrcImportIssue = {
  readonly scriptName: string;
};

/** Install scripts must not import ../src — that path does not exist under ~/.agent-witch. */
export const findAgentWitchInstallScriptsWithRepoSrcImports =
  (): readonly AgentWitchForbiddenRepoSrcImportIssue[] => {
    const issues: AgentWitchForbiddenRepoSrcImportIssue[] = [];

    for (const scriptName of listAgentWitchInstallScriptNames()) {
      if (!isAgentWitchInstallScriptName(scriptName)) {
        continue;
      }
      const source = readAgentWitchInstallScriptSource(scriptName);
      if (FORBIDDEN_REPO_SRC_IMPORT.test(source)) {
        issues.push({ scriptName });
      }
    }

    return issues;
  };
