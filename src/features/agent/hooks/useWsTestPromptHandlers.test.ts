import { describe, expect, it, vi } from "vitest";

import { useWsTestPromptHandlers } from "@/features/agent/hooks/useWsTestPromptHandlers";
import type { useWsTestTaskComposer } from "@/features/agent/hooks/useWsTestTaskComposer";

const buildComposer = (
  overrides: Partial<ReturnType<typeof useWsTestTaskComposer>> = {},
): ReturnType<typeof useWsTestTaskComposer> =>
  ({
    resolvedPrompt: "Ship the feature",
    isTeamDispatch: false,
    isLibraryPlaybook: true,
    libraryCapabilityId: "cap-1",
    selectedTargetUserId: "",
    selectedGroupId: "",
    selectedCapabilityId: "",
    resetComposer: vi.fn(),
    ...overrides,
  }) as ReturnType<typeof useWsTestTaskComposer>;

describe("useWsTestPromptHandlers (AGENT-046)", () => {
  it("does not clear composer fields when Start dispatch fails or errors", () => {
    const resetComposer = vi.fn();
    const sendClaudePrompt = vi.fn();
    const handlers = useWsTestPromptHandlers({
      composer: buildComposer({ resetComposer }),
      activeWriterAgent: "claude-cli",
      activeDeviceId: "mac-1",
      sendClaudePrompt,
      enqueueRun: vi.fn(),
    });

    handlers.onSend();

    expect(sendClaudePrompt).toHaveBeenCalledWith(
      "Ship the feature",
      expect.objectContaining({
        writerAgent: "claude-cli",
        targetDeviceId: "mac-1",
      }),
    );
    expect(resetComposer).not.toHaveBeenCalled();
  });

  it("still clears composer when the user clicks Clear", () => {
    const resetComposer = vi.fn();
    const handlers = useWsTestPromptHandlers({
      composer: buildComposer({ resetComposer }),
      activeWriterAgent: "claude-cli",
      activeDeviceId: "mac-1",
      sendClaudePrompt: vi.fn(),
      enqueueRun: vi.fn(),
    });

    handlers.onClear();

    expect(resetComposer).toHaveBeenCalledTimes(1);
  });
});
