const UNTITLED = "Untitled question";

export const describeWorkflowEntryPointSummary = (
  labels: readonly string[],
): string => {
  if (labels.length === 0) {
    return "No questions yet";
  }

  const titled = labels
    .map((label) => label.trim())
    .filter((label) => label.length > 0);

  if (titled.length === 0) {
    return labels.length === 1
      ? `1 ${UNTITLED.toLowerCase()}`
      : `${labels.length} ${UNTITLED.toLowerCase()}s`;
  }

  if (titled.length === 1) {
    return titled[0];
  }

  return `${titled.length} questions · ${titled[0]}, …`;
};
