import { spawnSync } from "node:child_process";
import path from "node:path";

import type { AgentWitchInstallScriptName } from "@/lib/agentWitch/readAgentWitchInstallScriptSource";

export const verifyShippedAgentWitchInstallModuleLoads = (input: {
  readonly installDir: string;
  readonly scriptName: AgentWitchInstallScriptName;
}): void => {
  const tsxCli = path.join(process.cwd(), "node_modules/tsx/dist/cli.mjs");
  const scriptPath = path.join(input.installDir, input.scriptName);
  const result = spawnSync(
    process.execPath,
    [
      tsxCli,
      "--eval",
      `import(${JSON.stringify(scriptPath)}).then(() => process.exit(0), (error) => { console.error(error); process.exit(1); });`,
    ],
    {
      cwd: input.installDir,
      encoding: "utf8",
      timeout: 60_000,
      env: {
        ...process.env,
        AGENT_WITCH_HOME: input.installDir,
      },
    },
  );

  if (result.status !== 0) {
    throw new Error(
      `Failed to load ${input.scriptName} from shipped install: ${result.stderr || result.stdout}`,
    );
  }
};
