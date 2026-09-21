import { isArrayWithEachItem, isString } from "guardz";

const isStringArray = isArrayWithEachItem(isString);

export const parseWorkflowFieldSelectOptions = (
  value: unknown,
): readonly string[] => {
  if (!isStringArray(value)) {
    return [];
  }

  return value.flatMap((entry) => {
    const trimmed = entry.trim();
    return trimmed.length > 0 ? [trimmed] : [];
  });
};
