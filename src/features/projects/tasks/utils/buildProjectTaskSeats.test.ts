import { describe, expect, it } from "vitest";

import { buildProjectTaskSeats } from "@/features/projects/tasks/utils/buildProjectTaskSeats";
import type { AccessMembershipView } from "@/features/projects/access/utils/projectAccessApi.types";

const seat = (over: Partial<AccessMembershipView>): AccessMembershipView =>
  ({
    id: "m",
    userId: "u",
    teamLabel: null,
    scopes: [],
    createdAt: "",
    projectDisplayName: null,
    isAgent: false,
    ...over,
  }) as AccessMembershipView;

describe("buildProjectTaskSeats", () => {
  const hint = (kind?: string): string => (kind === "bot" ? " · bot" : "");
  it("falls back to displayName, then email, and skips nameless seats", () => {
    const seats = buildProjectTaskSeats(
      [
        seat({ id: "a", projectDisplayName: "Ada" }),
        seat({ id: "b", displayName: "Bo's Mac", memberKind: "bot" }),
        seat({ id: "c", email: "c@x.com" }),
        seat({ id: "d" }),
      ],
      hint,
    );
    expect(seats).toEqual([
      { id: "a", label: "Ada" },
      { id: "b", label: "Bo's Mac · bot" },
      { id: "c", label: "c@x.com" },
    ]);
  });
  it("drops viewers and inactive seats", () => {
    const seats = buildProjectTaskSeats(
      [
        seat({ id: "v", projectDisplayName: "V", role: "viewer" }),
        seat({ id: "p", projectDisplayName: "P", status: "pending" }),
      ],
      hint,
    );
    expect(seats).toEqual([]);
  });
});
