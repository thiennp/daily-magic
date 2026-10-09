import { describe, expect, it } from "vitest";

import { canEditAssistant } from "@/lib/projects/acl/authorizeMembershipEdit";

const base = {
  actorUserId: "me",
  isOwner: false,
  invitedBy: null,
  ownerMayOverride: false,
};

describe("canEditAssistant", () => {
  it("lets the inviter edit their own assistant", () => {
    expect(canEditAssistant({ ...base, invitedBy: "me" })).toBe(true);
  });
  it("keeps the owner out of other people's assistants", () => {
    expect(canEditAssistant({ ...base, isOwner: true, invitedBy: "u2" })).toBe(
      false,
    );
  });
  it("lets the owner edit seats with no recorded inviter", () => {
    expect(canEditAssistant({ ...base, isOwner: true })).toBe(true);
  });
  it("lets the owner remove anyone's assistant only with the override", () => {
    const owner = { ...base, isOwner: true, invitedBy: "u2" };
    expect(canEditAssistant({ ...owner, ownerMayOverride: true })).toBe(true);
  });
  it("refuses another member", () => {
    expect(canEditAssistant({ ...base, invitedBy: "u2" })).toBe(false);
  });
});
