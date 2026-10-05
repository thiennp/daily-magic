import { describe, expect, it } from "vitest";

import { defaultMessengerTaskAssignee } from "@/features/projects/messenger/utils/defaultMessengerTaskAssignee";

describe("defaultMessengerTaskAssignee", () => {
  it("prefills bot thread and clears whole", () => {
    expect(defaultMessengerTaskAssignee("mem-wake")).toBe("mem-wake");
    expect(defaultMessengerTaskAssignee("whole")).toBe("");
    expect(defaultMessengerTaskAssignee(null)).toBe("");
  });
});
