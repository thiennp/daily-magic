import { describe, expect, it } from "vitest";

import { describeUnusableJudgeReplyCause } from "./describeUnusableJudgeReplyCause";

describe("describeUnusableJudgeReplyCause", () => {
  it("explains Codex ChatGPT-incompatible default model errors", () => {
    const raw = `ERROR: {"type":"error","status":400,"error":{"type":"invalid_request_error","message":"The 'gpt-6.1-sol' model is not supported when using Codex with a ChatGPT account."}}`;
    const cause = describeUnusableJudgeReplyCause(raw);
    expect(cause).toContain("~/.codex/config.toml");
    expect(cause).toContain('model = "gpt-5.5"');
    expect(cause).toContain("retry Step 2");
  });

  it("explains Codex malformed agent config errors", () => {
    const raw = `{"type":"item.completed","item":{"type":"error","message":"Ignoring malformed agent role definition: agents.ci-monitor-subagent.config_file must point to an existing file at /Users/thien.nguyen/nrg/nrg-core/.codex/agents/ci-monitor-subagent.toml: No such file or directory (os error 2)"}}`;
    const cause = describeUnusableJudgeReplyCause(raw);
    expect(cause).toContain("Codex did not run the judge prompt");
    expect(cause).toContain("ci-monitor-subagent.toml");
  });
});
