import { describe, expect, it } from "vitest";

import { resolveWsTestComposerWriterAgentCompleted } from "@/features/agent/utils/resolveWsTestComposerWriterAgentCompleted";

describe("resolveWriterAgentWizardAdvanceOnSelect (AGENT-036)", () => {
  it("advances the wizard when the user re-confirms the remembered CLI after rewind", () => {
    expect(
      resolveWsTestComposerWriterAgentCompleted({
        hasConfirmedWriterAgentSelection: true,
        isSteppedComposer: true,
        hasRememberedWriterAgentSelection: true,
        hasRewoundWizard: true,
      }),
    ).toBe(true);
  });
});
