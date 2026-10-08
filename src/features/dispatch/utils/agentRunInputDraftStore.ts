/**
 * a6053d1c: the "Yes." draft was lost when the question was reopened from
 * the floater. Keep one draft per run + question for this page load.
 */
const drafts = new Map<string, string>();

const draftKey = (agentRunId: string, question: string): string =>
  `${agentRunId}\n${question.trim()}`;

export const getAgentRunInputDraft = (
  agentRunId: string,
  question: string,
): string => drafts.get(draftKey(agentRunId, question)) ?? "";

export const setAgentRunInputDraft = (
  agentRunId: string,
  question: string,
  draft: string,
): void => {
  const key = draftKey(agentRunId, question);
  if (draft.length === 0) {
    drafts.delete(key);
    return;
  }
  drafts.set(key, draft);
};

export const clearAgentRunInputDraft = (
  agentRunId: string,
  question: string,
): void => {
  drafts.delete(draftKey(agentRunId, question));
};
