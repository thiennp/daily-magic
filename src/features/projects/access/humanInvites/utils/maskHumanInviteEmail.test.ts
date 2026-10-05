import { describe, expect, it } from "vitest";

import { maskHumanInviteEmail } from "@/features/projects/access/humanInvites/utils/maskHumanInviteEmail";

describe("maskHumanInviteEmail", () => {
  it("masks local and domain label", () => {
    expect(maskHumanInviteEmail("thien@gmail.com")).toBe("t***@g***.com");
    expect(maskHumanInviteEmail("Ben@Example.com")).toBe("b***@e***.com");
  });

  it("returns null for invalid", () => {
    expect(maskHumanInviteEmail(null)).toBeNull();
    expect(maskHumanInviteEmail("not-an-email")).toBeNull();
  });
});
