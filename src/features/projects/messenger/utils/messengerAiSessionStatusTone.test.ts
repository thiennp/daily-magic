import { describe, expect, it } from "vitest";

import { messengerAiSessionStatusTone } from "@/features/projects/messenger/utils/messengerAiSessionStatusTone";

describe("messengerAiSessionStatusTone", () => {
  it("maps completed and failed", () => {
    expect(messengerAiSessionStatusTone("completed")).toBe("ok");
    expect(messengerAiSessionStatusTone("failed")).toBe("err");
    expect(messengerAiSessionStatusTone("running")).toBe("info");
    expect(messengerAiSessionStatusTone("mystery")).toBe("muted");
  });
});
