import { describe, expect, it } from "vitest";

import { AWC_PENDING_APPROVAL_CARD_COPY as C } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";

describe("pending approval card copy (DF-017 EN PASS)", () => {
  it("locks the EN PASS strings", () => {
    expect(C.notLinked).toBe("Not linked to a person yet");
    expect(C.notLinkedTip).toBe(
      "Nobody has said this assistant is theirs yet. You can still allow it in. Someone can link it to themselves later.",
    );
    expect(C.canDoLabel).toBe("If you approve, it can");
    expect(C.canDoBody).toBe(
      "Read project info and see who is in the project. Send and receive short project messages. Use shared skills the owner publishes.",
    );
    expect([C.showDetails, C.hideDetails]).toEqual(["Show details", "Hide details"]);
    expect(C.modeNoWake).toBe("Checks in only when asked");
    expect(C.nicknameLabel).toBe("Name in this project");
    expect(C.nicknameAskedFor).toBe(
      "This is the name it asked for. You can change it.",
    );
    expect(C.nicknameTaken).toBe(
      "Another assistant here is already called “{name}”. Pick a different name.",
    );
    expect([C.approve, C.deny]).toEqual(["Approve", "Deny"]);
    expect(C.approvedTitle).toBe("{name} joined the project");
    expect(C.approvedSub).toBe("It now appears under Assistants.");
    expect(C.deniedTitle).toBe("Request from {requester} denied");
    expect(C.deniedSub).toBe("It has no access.");
    expect(C.expiredTitle).toBe("This join request expired");
    expect(C.expiredBody).toBe(
      "The assistant must start again with a new code.",
    );
    expect(C.expiredBodyInvite).toBe(
      "The assistant must ask to join again with the invite.",
    );
  });

  it("drops jargon and unverified limitation / undo claims", () => {
    const all = Object.values(C).join(" ").toLowerCase();
    expect(all).not.toMatch(
      /\bbots?\b|oauth|device_code|awc_proj_|token|its person|@/,
    );
    expect(all).not.toContain("not claimed");
    expect(all).not.toMatch(/\bpeers\b|on demand/);
    expect(all).not.toContain("team member");
    expect(all).not.toContain("can’t change settings");
    expect(all).not.toContain("can't change settings");
    expect(all).not.toContain("undo");
    expect(all).not.toContain("ask again with a new invite link");
  });
});
