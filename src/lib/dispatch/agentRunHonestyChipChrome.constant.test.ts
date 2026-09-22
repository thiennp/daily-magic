import { describe, expect, it } from "vitest";

import { AGENT_RUN_HONESTY_CHIP_LABEL } from "@/lib/dispatch/agentRunHonestyCopy.constant";
import { AGENT_RUN_HONESTY_CHIP_CHROME } from "@/lib/dispatch/agentRunHonestyChipChrome.constant";

describe("AGENT_RUN_HONESTY_CHIP_CHROME", () => {
  it("maps Pimi locked labels to chrome roles", () => {
    expect(AGENT_RUN_HONESTY_CHIP_LABEL.connecting).toBe("Connecting");
    expect(AGENT_RUN_HONESTY_CHIP_CHROME.connecting).toBe("progress");
    expect(AGENT_RUN_HONESTY_CHIP_LABEL.running).toBe("In progress");
    expect(AGENT_RUN_HONESTY_CHIP_CHROME.running).toBe("progress");
    expect(AGENT_RUN_HONESTY_CHIP_CHROME.waiting_you).toBe("attention");
    expect(AGENT_RUN_HONESTY_CHIP_CHROME.passed).toBe("success");
    expect(AGENT_RUN_HONESTY_CHIP_CHROME.degraded).toBe("warning");
    expect(AGENT_RUN_HONESTY_CHIP_CHROME.failed).toBe("error");
    expect(AGENT_RUN_HONESTY_CHIP_CHROME.stopped).toBe("stop");
    expect(AGENT_RUN_HONESTY_CHIP_CHROME.timed_out).toBe("stop");
  });
});
