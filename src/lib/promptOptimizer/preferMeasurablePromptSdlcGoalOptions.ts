import { isMeasurablePromptSdlcGoal } from "@/lib/promptOptimizer/scorePromptSdlcSuggestedGoal";

/** Drops vague writer goals when at least one measurable option remains. */
export const preferMeasurablePromptSdlcGoalOptions = (
  options: readonly string[],
): readonly string[] => {
  const measurable = options.filter(isMeasurablePromptSdlcGoal);
  if (measurable.length >= 1) {
    return measurable.slice(0, 3);
  }
  return options;
};
