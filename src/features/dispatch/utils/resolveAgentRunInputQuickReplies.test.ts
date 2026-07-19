import { describe, expect, it } from "vitest";

import { resolveAgentRunInputQuickReplies } from "@/features/dispatch/utils/resolveAgentRunInputQuickReplies";

describe("resolveAgentRunInputQuickReplies (DISPATCH-003)", () => {
  it("offers pull-first and commit-as-is replies for git strategy questions", () => {
    const replies = resolveAgentRunInputQuickReplies(
      "Does this match the changes you want committed? And should I pull the 5 upstream commits first, or commit as-is and handle the merge separately?",
    );

    expect(replies.map((reply) => reply.label)).toEqual([
      "Pull first, then commit",
      "Commit as-is",
      "Request changes",
    ]);
  });

  it("offers approve and request-changes for simple approval questions", () => {
    const replies = resolveAgentRunInputQuickReplies(
      "Does this summary match what you want?",
    );

    expect(replies.map((reply) => reply.label)).toEqual([
      "Yes, approve",
      "Request changes",
    ]);
  });
});
