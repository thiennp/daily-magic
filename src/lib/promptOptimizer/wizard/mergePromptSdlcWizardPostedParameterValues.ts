import { listPromptTemplatePlaceholders } from "./listPromptTemplatePlaceholders";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

const WIZARD_PARAM_PREFIX = "wizardParam_";

export type PromptSdlcWizardParameterMergeResult =
  | {
      readonly ok: true;
      readonly parameterValues: Readonly<Record<string, string>>;
    }
  | {
      readonly ok: false;
      readonly errorMessage: string;
    };

export const readPostedWizardParameterFieldName = (name: string): string =>
  `${WIZARD_PARAM_PREFIX}${name}`;

export const mergePromptSdlcWizardPostedParameterValues = (input: {
  readonly wizard: PromptSdlcWizardState;
  readonly modulePrompt: string;
  readonly posted: URLSearchParams;
}): PromptSdlcWizardParameterMergeResult => {
  const placeholders = listPromptTemplatePlaceholders(input.modulePrompt);
  const next: Record<string, string> = { ...input.wizard.parameterValues };
  const knownNames = new Set(input.wizard.variables.map((item) => item.name));

  for (const name of placeholders) {
    const postedKey = readPostedWizardParameterFieldName(name);
    const fromPost = input.posted.get(postedKey);
    const value =
      fromPost !== null ? fromPost.trim() : (next[name]?.trim() ?? "");
    if (value.length === 0) {
      const hint = knownNames.has(name)
        ? `Fill in {{${name}}} before running this module.`
        : `Fill in {{${name}}} (not listed in Step 1) before running this module.`;
      return { ok: false, errorMessage: hint };
    }
    next[name] = value;
  }

  return { ok: true, parameterValues: next };
};
