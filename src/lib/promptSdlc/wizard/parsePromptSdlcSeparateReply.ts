import {
  isArrayWithEachItem,
  isBoolean,
  isNonEmptyString,
  isNumber,
  isOneOf,
  isString,
  isType,
} from "guardz";

import { PROMPT_SDLC_WIZARD_MAX_SPLIT_OPTIONS } from "./promptSdlcWizardLimits.constant";
import { extractPromptSdlcJsonObject } from "./extractPromptSdlcJsonObject";
import type { PromptSdlcWizardSplitOption } from "./types/PromptSdlcWizardSplitOption.type";

const isModule = isType({
  id: isNonEmptyString,
  title: isNonEmptyString,
  prompt: isNonEmptyString,
  order: isNumber,
});

const isOption = isType<PromptSdlcWizardSplitOption>({
  id: isNonEmptyString,
  title: isNonEmptyString,
  summary: isString,
  topology: isOneOf("chain", "parallel"),
  modules: isArrayWithEachItem(isModule),
  recommended: isBoolean,
});

export const parsePromptSdlcSeparateReply = (
  raw: string,
): readonly PromptSdlcWizardSplitOption[] => {
  const parsed = extractPromptSdlcJsonObject(raw);
  if (
    !isType({
      options: isArrayWithEachItem(isOption),
    })(parsed)
  ) {
    throw new Error("Separate reply did not match the expected shape.");
  }
  const options = parsed.options.slice(0, PROMPT_SDLC_WIZARD_MAX_SPLIT_OPTIONS);
  const recommendedCount = options.filter((item) => item.recommended).length;
  if (options.length === 0) {
    throw new Error("Separate reply had no options.");
  }
  if (recommendedCount !== 1) {
    const withDefault = options.map((item, index) => ({
      ...item,
      recommended: index === 0,
    }));
    return withDefault;
  }
  return options;
};
