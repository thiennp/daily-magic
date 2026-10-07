import { describe, expect, it } from "vitest";

import { AWC_MESSENGER_WINDOW_KINDS } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { PROJECT_MESSAGE_WINDOW_KINDS } from "@/lib/projects/acl/messaging/messenger/projectMessageWindowKind.constant";

describe("OW9 window kinds: UI parser list = server enum", () => {
  it("has the same values in the same order", () => {
    expect([...AWC_MESSENGER_WINDOW_KINDS]).toEqual([
      ...PROJECT_MESSAGE_WINDOW_KINDS,
    ]);
  });
});
