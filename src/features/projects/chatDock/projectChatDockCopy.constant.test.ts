import { describe, expect, it } from "vitest";

import { PROJECT_CHAT_DOCK_COPY as C } from "@/features/projects/chatDock/projectChatDockCopy.constant";

describe("L3 V5-4 Chat dock — Product EN lock", () => {
  it("locks dock title / expand / exitFull / minimise / All assistants / oneRecipient", () => {
    expect(C["dock.title"]).toBe("New message");
    expect(C["dock.titleFull"]).toBe("Chat");
    expect(C["dock.expand"]).toBe("Full screen");
    expect(C["dock.exitFull"]).toBe("Exit full screen");
    expect(C["dock.minimise"]).toBe("Minimise");
    expect(C["dock.sendTo.allAssistants"]).toBe("All assistants");
    expect(C["dock.task.oneRecipient"]).toBe(
      "A task needs one recipient. Pick one assistant or This computer.",
    );
    expect(C["disabled.viewerMessage"]).toBe("Viewers can't send messages.");
  });

  it("never says bot, Mac, API, MCP, or token in locked dock strings", () => {
    for (const value of Object.values(C)) {
      expect(String(value)).not.toMatch(/\bbots?\b|\bMac\b|\bAPI\b|\bMCP\b|\btoken\b/i);
    }
  });
});
