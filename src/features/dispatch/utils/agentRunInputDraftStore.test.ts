import { describe, expect, it } from "vitest";

import {
  clearAgentRunInputDraft,
  getAgentRunInputDraft,
  setAgentRunInputDraft,
} from "@/features/dispatch/utils/agentRunInputDraftStore";

describe("agentRunInputDraftStore", () => {
  it("keeps a draft per run and question until cleared", () => {
    setAgentRunInputDraft("run-1", "Go ahead?", "Yes.");
    expect(getAgentRunInputDraft("run-1", "Go ahead? ")).toBe("Yes.");
    expect(getAgentRunInputDraft("run-1", "Other?")).toBe("");
    expect(getAgentRunInputDraft("run-2", "Go ahead?")).toBe("");
    clearAgentRunInputDraft("run-1", "Go ahead?");
    expect(getAgentRunInputDraft("run-1", "Go ahead?")).toBe("");
  });
});
