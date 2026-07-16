import { describe, expect, it, vi } from "vitest";

import {
  focusAgentLiveTerminalSection,
  scrollAgentLiveTerminalIntoView,
} from "@/features/agent/utils/scrollAgentLiveTerminalIntoView";

describe("scrollAgentLiveTerminalIntoView", () => {
  it("scrolls the terminal section into view when present", () => {
    const element = {
      scrollIntoView: vi.fn(),
    } as unknown as HTMLElement;

    scrollAgentLiveTerminalIntoView(element);

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("ignores a missing element", () => {
    expect(() => {
      scrollAgentLiveTerminalIntoView(null);
      focusAgentLiveTerminalSection(null);
    }).not.toThrow();
  });
});
