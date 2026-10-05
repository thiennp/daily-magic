import { describe, expect, it } from "vitest";

import { loadProjectMessengerComputerSeats } from "@/lib/projects/acl/messaging/messenger/loadProjectMessengerComputerSeats";

describe("loadProjectMessengerComputerSeats", () => {
  it("returns empty until Mac exposes owner-computer memberships", async () => {
    expect(await loadProjectMessengerComputerSeats("proj-1")).toEqual([]);
  });
});
