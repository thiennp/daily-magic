export const buildAgentRunHonestyWaitingYouSummary = (input: {
  readonly approvalWaitingLabel?: string | null;
  readonly pendingQuestion?: string | null;
}): readonly string[] => {
  const approval = (input.approvalWaitingLabel ?? "").trim();
  if (approval.length > 0) {
    return [approval];
  }
  const question = (input.pendingQuestion ?? "").trim();
  if (question.length > 0) {
    return [question];
  }
  return ["Waiting on you — your input is needed to continue."];
};
