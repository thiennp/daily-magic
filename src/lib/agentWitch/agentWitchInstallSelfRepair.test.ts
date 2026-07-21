import { describe, expect, it } from "vitest";

import { AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES } from "@/lib/agentWitch/agentWitchClientInstallScripts.constant";
import { listAgentWitchInstallScriptNames } from "@/lib/agentWitch/listAgentWitchInstallScriptNames";
import { renderInstallAgentWitchScript } from "@/lib/agentWitch/renderInstallAgentWitchScript";
import {
  isAgentWitchInstallScriptName,
  readAgentWitchInstallScriptSource,
} from "@/lib/agentWitch/readAgentWitchInstallScriptSource";

const readRelativeInstallImports = (source: string): readonly string[] => {
  const imports = new Set<string>();

  for (const match of source.matchAll(/from\s+["']\.\/([^"']+)["']/g)) {
    const importPath = match[1];
    if (importPath === undefined) {
      continue;
    }

    imports.add(importPath.endsWith(".ts") ? importPath : `${importPath}.ts`);
  }

  return [...imports];
};

describe("agent witch install self-repair", () => {
  it("serves every client dependency from the install script allowlist", () => {
    for (const scriptName of AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES) {
      expect(isAgentWitchInstallScriptName(scriptName)).toBe(true);
      expect(
        readAgentWitchInstallScriptSource(scriptName).length,
      ).toBeGreaterThan(0);
    }
  });

  it("downloads every client dependency when install is re-run", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com");

    for (const scriptName of AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES) {
      expect(script).toContain(
        `https://www.agentwitch.com/install/agent-witch/scripts/${scriptName}`,
      );
      expect(script).toContain(`-o "\${INSTALL_DIR}/${scriptName}"`);
    }
  });

  it("AGENT-044: ships every relative import required by client install scripts", () => {
    const installScriptNames = new Set(listAgentWitchInstallScriptNames());

    for (const scriptName of AGENT_WITCH_CLIENT_INSTALL_SCRIPT_NAMES) {
      const source = readAgentWitchInstallScriptSource(scriptName);

      for (const dependencyName of readRelativeInstallImports(source)) {
        expect(
          installScriptNames,
          `${scriptName} imports missing ${dependencyName}`,
        ).toContain(dependencyName);
      }
    }
  });

  it("reuses the active profile on repair installs", () => {
    const script = renderInstallAgentWitchScript("https://www.agentwitch.com");

    expect(script).toContain("active-profile.json");
    expect(script).toContain("config.wsUrl = wsUrl");
  });
});
