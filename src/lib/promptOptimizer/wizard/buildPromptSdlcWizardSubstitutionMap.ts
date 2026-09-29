import type PromptSdlcWizardVariable from "./types/PromptSdlcWizardVariable.type";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const seedPromptSdlcWizardParameterValues = (
  variables: readonly PromptSdlcWizardVariable[],
): Readonly<Record<string, string>> =>
  Object.fromEntries(variables.map((item) => [item.name, item.sampleValue]));

export const buildPromptSdlcWizardSubstitutionMap = (
  wizard: Pick<PromptSdlcWizardState, "variables" | "parameterValues">,
): Record<string, string> => {
  const map: Record<string, string> = { ...wizard.parameterValues };
  for (const variable of wizard.variables) {
    if (map[variable.name] === undefined || map[variable.name].trim() === "") {
      map[variable.name] = variable.sampleValue;
    }
  }
  return map;
};
