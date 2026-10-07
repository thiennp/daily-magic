import { describe, expect, it } from "vitest";

import { releaseProjectMessagesHeldForComputerAck } from "@/lib/projects/acl/messaging/releaseProjectMessagesHeldForComputerAck";

describe("releaseProjectMessagesHeldForComputerAck", () => {
  it("does not delete rows when History turns off (keep-300)", async () => {
    await expect(
      releaseProjectMessagesHeldForComputerAck({ projectId: "p1" }),
    ).resolves.toBe(0);
  });
});
