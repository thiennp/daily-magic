import { shouldMinifyAgentWitchInstallScripts } from "@/lib/agentWitch/prepareAgentWitchInstallScriptForShipping";

export const assertShippedAgentWitchInstallScriptIsMinified = (input: {
  readonly scriptName: string;
  readonly shipped: string;
  readonly source: string;
}): void => {
  if (!shouldMinifyAgentWitchInstallScripts()) {
    return;
  }

  if (input.source.length < 300) {
    return;
  }

  if (input.shipped.length >= input.source.length) {
    throw new Error(
      `${input.scriptName} was not minified (${input.shipped.length} bytes shipped vs ${input.source.length} bytes source)`,
    );
  }

  if (input.shipped.includes("/**")) {
    throw new Error(`${input.scriptName} still contains block comments`);
  }
};
