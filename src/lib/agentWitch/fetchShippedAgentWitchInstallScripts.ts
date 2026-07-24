import { assertShippedAgentWitchInstallScriptIsMinified } from "@/lib/agentWitch/assertShippedAgentWitchInstallScriptIsMinified";
import { buildShippedAgentWitchInstallScriptUrl } from "@/lib/agentWitch/buildShippedAgentWitchInstallScriptUrl";
import type { AgentWitchInstallScriptName } from "@/lib/agentWitch/readAgentWitchInstallScriptSource";
import {
  isAgentWitchInstallScriptName,
  readAgentWitchInstallScriptSource,
} from "@/lib/agentWitch/readAgentWitchInstallScriptSource";

export const fetchShippedAgentWitchInstallScripts = async (input: {
  readonly baseUrl: string;
  readonly scriptNames: Iterable<string>;
}): Promise<Map<string, string>> => {
  const shippedScripts = new Map<string, string>();

  for (const scriptName of input.scriptNames) {
    if (!isAgentWitchInstallScriptName(scriptName)) {
      throw new Error(`install script downloads unknown file: ${scriptName}`);
    }

    const response = await fetch(
      buildShippedAgentWitchInstallScriptUrl(input.baseUrl, scriptName),
    );
    if (!response.ok) {
      throw new Error(`fetch ${scriptName} failed with ${response.status}`);
    }

    const shipped = await response.text();
    if (!scriptName.endsWith(".js")) {
      assertShippedAgentWitchInstallScriptIsMinified({
        scriptName,
        shipped,
        source: readAgentWitchInstallScriptSource(scriptName),
      });
    } else if (shipped.trim().length === 0) {
      throw new Error(`${scriptName} shipped empty bundle`);
    }

    shippedScripts.set(scriptName, shipped);
  }

  return shippedScripts;
};

export const readShippedAgentWitchInstallScript = (
  shippedScripts: ReadonlyMap<string, string>,
  scriptName: AgentWitchInstallScriptName,
): string =>
  shippedScripts.get(scriptName) ??
  readAgentWitchInstallScriptSource(scriptName);
