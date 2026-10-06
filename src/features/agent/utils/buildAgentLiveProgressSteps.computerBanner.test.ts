import { describe, expect, it } from "vitest";

import { buildAgentLiveProgressSteps } from "@/features/agent/utils/buildAgentLiveProgressSteps";

const PREPARE_STEPS = [
  ["Preparing agent", "done"],
  ["Ready for your message", "active"],
  ["Analyzing…", "pending"],
  ["Working…", "pending"],
];

describe("buildAgentLiveProgressSteps ready banner wording", () => {
  it.each([
    "Claude is ready on your computer.\nUse New task below when you are ready.\n",
    "Preparing claude-cli CLI on your computer…\nClaude is ready on your computer.\n",
    "Preparing claude-cli CLI on your Mac…\nClaude is ready on your Mac.\n",
  ])("treats the banner as chrome for %j", (output) => {
    const result = buildAgentLiveProgressSteps({ status: "idle", output });

    expect(result.steps.map((step) => [step.label, step.state])).toEqual(
      PREPARE_STEPS,
    );
    expect(result.replyPreview).toBeNull();
  });
});
