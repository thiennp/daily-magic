import { describe, expect, it } from "vitest";

import {
  AWL_REPAIR_MANUALLY_COPY,
  AWL_REPAIR_MANUALLY_HEALTH_COMMAND,
  AWL_REPAIR_MANUALLY_UPDATE_COMMAND,
} from "./awlRepairManuallyCopy.constant";

describe("AWL_REPAIR_MANUALLY_COPY (COPY.md §6 lock)", () => {
  it("matches the Product EN strings exactly", () => {
    expect(AWL_REPAIR_MANUALLY_COPY).toEqual({
      title: "Repair manually",
      intro:
        "Run these steps in Terminal on this computer. Start at step 1 and stop once the check works.",
      restartTitle: "Restart AgentWitch Local",
      updateTitle: "Update AgentWitch Local",
      updateHelper:
        "Keeps this computer linked to your account. If it can't find the link, go to step 3.",
      reconnectTitle: "Reconnect this computer",
      reconnectHelper:
        "Only if step 2 didn't help. On Home, choose Connect this computer and run the command it shows.",
      checkTitle: "Check it works",
      checkHelper:
        'If you see a line that starts with {"ok":true, AgentWitch Local is running. Then refresh Home. Don\'t share this output, because it can include a private link code.',
      copy: "Copy",
      copied: "Copied",
    });
  });

  it("uses the locked update and health commands", () => {
    expect(AWL_REPAIR_MANUALLY_UPDATE_COMMAND).toBe(
      "curl -fsSL https://www.agentwitch.com/install/agent-witch-update.sh | bash",
    );
    expect(AWL_REPAIR_MANUALLY_HEALTH_COMMAND).toBe(
      "curl -sS -m 5 http://127.0.0.1:43347/health",
    );
  });
});
