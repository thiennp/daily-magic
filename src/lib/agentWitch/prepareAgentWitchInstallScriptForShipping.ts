import { minifyAgentWitchInstallScriptSource } from "@/lib/agentWitch/minifyAgentWitchInstallScriptSource";

const shippingCache = new Map<string, string>();

export const shouldMinifyAgentWitchInstallScripts = (): boolean =>
  process.env.AGENT_WITCH_MINIFY_INSTALL_SCRIPTS !== "0";

export const prepareAgentWitchInstallScriptForShipping = async (input: {
  readonly scriptName: string;
  readonly source: string;
}): Promise<string> => {
  if (!shouldMinifyAgentWitchInstallScripts()) {
    return input.source;
  }

  const cached = shippingCache.get(input.scriptName);
  if (cached !== undefined) {
    return cached;
  }

  const minified = await minifyAgentWitchInstallScriptSource(
    input.source,
    input.scriptName,
  );
  shippingCache.set(input.scriptName, minified);
  return minified;
};

export const clearAgentWitchInstallScriptShippingCache = (): void => {
  shippingCache.clear();
};
