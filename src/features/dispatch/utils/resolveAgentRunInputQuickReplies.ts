export type AgentRunInputQuickReply = {
  readonly label: string;
  readonly response: string;
};

export const resolveAgentRunInputQuickReplies = (
  question: string,
): readonly AgentRunInputQuickReply[] => {
  const asksPullVsCommit =
    /pull.+commit|commit.+as[- ]?is|upstream commits?/i.test(question);
  const asksApproval =
    /match|approve|committed|look(s)? (good|right)|want (these )?changes/i.test(
      question,
    );

  if (asksPullVsCommit) {
    const replies: AgentRunInputQuickReply[] = [
      {
        label: "Pull first, then commit",
        response:
          "Yes — pull the upstream commits first, then commit these changes.",
      },
      {
        label: "Commit as-is",
        response: "Yes — commit as-is and handle the merge separately.",
      },
    ];
    if (asksApproval) {
      replies.push({
        label: "Request changes",
        response: "No — please revise before committing.",
      });
    }
    return replies;
  }

  if (asksApproval) {
    return [
      {
        label: "Yes, approve",
        response: "Yes, this matches what I want.",
      },
      {
        label: "Request changes",
        response: "No — please revise before continuing.",
      },
    ];
  }

  if (question.trim().endsWith("?")) {
    return [
      { label: "Yes", response: "Yes." },
      { label: "No", response: "No." },
    ];
  }

  return [];
};
