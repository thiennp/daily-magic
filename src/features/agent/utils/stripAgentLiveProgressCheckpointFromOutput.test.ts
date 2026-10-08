import { describe, expect, it } from "vitest";
import { stripAgentLiveProgressCheckpointFromOutput } from "./stripAgentLiveProgressCheckpointFromOutput";

describe("stripAgentLiveProgressCheckpointFromOutput", () => {
  it("removes AWAITING_INPUT block (marker + 1 line) and CHECKPOINT_QA block (marker + Q/A lines)", () => {
    const input = `[[PROGRESS]]
Some info
[[AWAITING_INPUT]]
Are you sure?
[[CHECKPOINT_QA]]
Q: Are you sure?
A: Yes
agent-witch@linux ~ $
Here is the rest`;
    const result = stripAgentLiveProgressCheckpointFromOutput(input);
    expect(result).not.toContain("[[AWAITING_INPUT]]");
    expect(result).not.toContain("Are you sure?");
    expect(result).not.toContain("[[CHECKPOINT_QA]]");
    expect(result).not.toContain("Q: Are you sure?");
    expect(result).not.toContain("A: Yes");
    expect(result).toContain("[[PROGRESS]]\nSome info");
    expect(result).toContain("agent-witch@linux ~ $\nHere is the rest");
  });

  it("keeps output after markers", () => {
    const input = `[[AWAITING_INPUT]]\nQuestion?\n[[CHECKPOINT_QA]]\nQ: Question?\nA: Yes\n\nfinal markdown summary`;
    const result = stripAgentLiveProgressCheckpointFromOutput(input);
    expect(result).toContain("final markdown summary");
    expect(result).not.toContain("[[AWAITING_INPUT]]");
    expect(result).not.toContain("Question?");
  });
});
