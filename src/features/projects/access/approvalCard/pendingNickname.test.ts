import { describe, expect, it } from "vitest";

import {
  formatPendingNicknameTaken,
  pendingNicknameDefault,
  pendingNicknameHelp,
  pendingNicknameIssue,
} from "@/features/projects/access/approvalCard/pendingNickname";

describe("pendingNicknameDefault (DF-017 prefill order)", () => {
  const preset = "Kai";

  it("requesterLabel first — the name it registered with", () => {
    expect(
      pendingNicknameDefault(
        {
          requesterLabel: " NRG Lead ",
          suggestedProjectDisplayName: "Scout",
          requesterIsAgent: true,
        },
        preset,
      ),
    ).toBe("NRG Lead");
  });

  it("then suggestedProjectDisplayName", () => {
    expect(
      pendingNicknameDefault(
        { requesterLabel: null, suggestedProjectDisplayName: "Scout" },
        preset,
      ),
    ).toBe("Scout");
  });

  it("skips a requesterLabel the server would reject (format), not swaps it", () => {
    expect(
      pendingNicknameDefault(
        { requesterLabel: "bot@host", suggestedProjectDisplayName: "Scout" },
        preset,
      ),
    ).toBe("Scout");
  });

  it("then the free preset for assistants; empty for people", () => {
    expect(pendingNicknameDefault({ requesterLabel: " " }, preset)).toBe("Kai");
    expect(
      pendingNicknameDefault({ requesterIsAgent: false }, preset),
    ).toBe("");
  });
});

describe("nickname field messages", () => {
  it("format issues mirror the server rule", () => {
    expect(pendingNicknameIssue("NRG Lead")).toBeNull();
    expect(pendingNicknameIssue("")).toBe("Enter a name before Approve.");
    expect(pendingNicknameIssue("A")).toBe("Use 2–32 letters.");
    expect(pendingNicknameIssue("a".repeat(33))).toBe("Use 2–32 letters.");
    expect(pendingNicknameIssue("NRG  Lead")).toBe(
      "Use letters only, with single spaces between words.",
    );
  });

  it("help line names the requested name; taken copy quotes the name", () => {
    expect(pendingNicknameHelp("NRG Lead", "NRG Lead")).toBe(
      "This is the name it asked for. You can change it.",
    );
    expect(pendingNicknameHelp("Nova", "NRG Lead")).toBe(
      "Letters and single spaces, 2–32 characters.",
    );
    expect(formatPendingNicknameTaken(" NRG Lead ")).toBe(
      "Another assistant here is already called “NRG Lead”. Pick a different name.",
    );
  });
});
