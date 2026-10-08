import { describe, expect, it } from "vitest";

import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";

describe("PROJECT_PAGE_OVERVIEW_COPY (V5-5 EN)", () => {
  it("safety hits are all-time (no 30-day window)", () => {
    expect(C.safetyHitsNone).toBe("no hits yet");
    expect(C.safetyHitsSome(1)).toBe("1 hit logged");
    expect(C.safetyHitsSome(3)).toBe("3 hits logged");
    expect(`${C.safetyHitsNone} ${C.safetyHitsSome(2)}`).not.toMatch(/30 days/);
  });

  it("safety rules chip/summary use singular when total is 1", () => {
    expect(C.safetyRulesStat(1, 1)).toBe("1 of 1 safety rule on");
    expect(C.safetyRulesStat(2, 2)).toBe("2 of 2 safety rules on");
    expect(C.safetyRulesStat(0, 3)).toBe("0 of 3 safety rules on");
    expect(C.safetySummary(0, 0, 1, 1, 1, C.safetyHitsNone)).toBe(
      "0 Important · 0 Warning · 1 Note · 1 of 1 rule on · no hits yet",
    );
    expect(C.safetySummary(1, 1, 1, 3, 3, C.safetyHitsNone)).toBe(
      "1 Important · 1 Warning · 1 Note · 3 of 3 rules on · no hits yet",
    );
  });

  it("locked setup / attention / assistants / recent strings", () => {
    expect(C.attentionUnread("Ava")).toBe("You have unread messages from Ava.");
    expect(C.attentionRunApprovals(1)).toBe(
      "1 task is waiting for your approval.",
    );
    expect(C.attentionRunApprovals(3)).toBe(
      "3 tasks are waiting for your approval.",
    );
    expect(C.attentionJoinRequests(1)).toBe(
      "1 request to join is waiting for your approval.",
    );
    expect(C.attentionJoinRequests(2)).toBe(
      "2 requests to join are waiting for your approval.",
    );
    expect(C.setupPlaybookHint).toBe(
      "No playbook attached yet. Add one on this computer.",
    );
    expect(C.setupPlaybookDoneHint(1)).toBe("1 playbook attached");
    expect(C.setupPlaybookDoneHint(2)).toBe("2 playbooks attached");
    expect(C.setupFolder).toBe("Add a folder");
    expect(C.setupFolderHint).toBe("Where the project files live.");
    expect(C.setupGit).toBe("Add a code repository");
    expect(C.setupGitHint).toBe(
      "Optional. Lets assistants get and save the code.",
    );
    expect(C.setupGitDoneHint(1)).toBe("1 repository saved");
    expect(C.setupGitDoneHint(4)).toBe("4 repositories saved");
    expect(C.setupInvitePeopleHint).toBe("Right now it's only you.");
    expect(C.assistantsSilent).toBe("Hasn't answered yet");
    expect(C.assistantsLastTask("yesterday 15:15")).toBe(
      "Last task yesterday 15:15",
    );
    expect(C.compositionStat(2, 2, 3)).toBe(
      "2 playbooks · 2 workflows · 3 agents",
    );
    expect(C.recentEmpty).toBe("Nothing yet. Messages show up here.");
  });
});
