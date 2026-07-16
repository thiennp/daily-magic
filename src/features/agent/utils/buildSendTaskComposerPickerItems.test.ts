import { describe, expect, it } from "vitest";

import { buildSendTaskComposerPickerItems } from "@/features/agent/utils/buildSendTaskComposerPickerItems";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

describe("buildSendTaskComposerPickerItems", () => {
  it("lists library workflows before agents, then writer agents, then custom task", () => {
    const items = buildSendTaskComposerPickerItems([
      {
        id: "agent-b",
        name: "Bug triage",
        type: CapabilityType.AGENT,
      } as never,
      {
        id: "workflow-a",
        name: "Release notes",
        type: CapabilityType.WORKFLOW,
      } as never,
    ]);

    expect(items.map((item) => item.label)).toEqual([
      "Release notes",
      "Bug triage",
      "Claude (terminal)",
      "Codex (ChatGPT)",
      "Cursor",
      "Antigravity",
      "Custom task",
    ]);
  });
});
