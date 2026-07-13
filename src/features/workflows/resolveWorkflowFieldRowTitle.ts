import { WORKFLOW_BUILDER_QUESTIONS_SECTION } from "@/features/workflows/workflowBuilderCopy.constant";

const resolveWorkflowFieldRowTitle = (
  label: string,
  index: number,
): string => {
  const trimmedLabel = label.trim();

  if (trimmedLabel.length > 0) {
    return trimmedLabel;
  }

  return `${WORKFLOW_BUILDER_QUESTIONS_SECTION.untitledQuestion} ${index + 1}`;
};

export default resolveWorkflowFieldRowTitle;
