import {
  isArrayWithEachItem,
  isNonEmptyString,
  isString,
  isType,
} from "guardz";

import { extractPromptSdlcJsonObject } from "./extractPromptSdlcJsonObject";
import type PromptSdlcWizardVariable from "./types/PromptSdlcWizardVariable.type";

const isVariable = isType<PromptSdlcWizardVariable>({
  name: isNonEmptyString,
  description: isString,
  sampleValue: isString,
});

export const parsePromptSdlcGeneralizeReply = (
  raw: string,
): {
  readonly templatedPrompt: string;
  readonly variables: readonly PromptSdlcWizardVariable[];
} => {
  const parsed = extractPromptSdlcJsonObject(raw);
  if (
    !isType({
      templatedPrompt: isNonEmptyString,
      variables: isArrayWithEachItem(isVariable),
    })(parsed)
  ) {
    throw new Error("Generalize reply did not match the expected shape.");
  }
  return parsed;
};
