import { describe, expect, it } from "vitest";

import { countActiveAssistantMembers } from "@/features/projects/access/humanInvites/utils/countActiveAssistantMembers";
import type { AccessMemberForHumanFilter } from "@/features/projects/access/humanInvites/utils/filterJoinedHumanMembers";

const member = (
  over: Partial<AccessMemberForHumanFilter>,
): AccessMemberForHumanFilter => ({ id: "m", userId: "u", isAgent: false, ...over });

describe("countActiveAssistantMembers (DF-036)", () => {
  it("counts active bots and legacy isAgent rows, not people or computers", () => {
    expect(
      countActiveAssistantMembers([
        member({ memberKind: "bot" }),
        member({ isAgent: true }),
        member({ memberKind: "computer", isAgent: true }),
        member({ memberKind: "human" }),
        member({ memberKind: "bot", status: "removed" }),
      ]),
    ).toBe(2);
  });

  it("is 0 for an owner-only project", () => {
    expect(countActiveAssistantMembers([])).toBe(0);
  });
});
