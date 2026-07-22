import { readAgentWitchInstallRelativeImports } from "@/lib/agentWitch/readAgentWitchInstallRelativeImports";
import type { AgentWitchInstallScriptName } from "@/lib/agentWitch/readAgentWitchInstallScriptSource";
import { isAgentWitchInstallScriptName } from "@/lib/agentWitch/readAgentWitchInstallScriptSource";

export const collectAgentWitchInstallScriptDependencies = (
  entryPoint: AgentWitchInstallScriptName,
  readSource: (scriptName: AgentWitchInstallScriptName) => string,
): ReadonlySet<AgentWitchInstallScriptName> => {
  const dependencies = new Set<AgentWitchInstallScriptName>();
  const queue: AgentWitchInstallScriptName[] = [entryPoint];

  while (queue.length > 0) {
    const current = queue.pop();
    if (current === undefined) {
      continue;
    }

    const source = readSource(current);
    for (const dependencyName of readAgentWitchInstallRelativeImports(source)) {
      if (!isAgentWitchInstallScriptName(dependencyName)) {
        continue;
      }

      if (!dependencies.has(dependencyName)) {
        dependencies.add(dependencyName);
        queue.push(dependencyName);
      }
    }
  }

  return dependencies;
};
