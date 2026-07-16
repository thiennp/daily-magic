import { describe, expect, it } from "vitest";

import {
  HOME_LEADERSHIP_SHOWCASE_SLUGS,
  HOME_TEAMS_SHOWCASE_SLUGS,
  getHomeLeadershipShowcases,
  getHomeTeamsShowcases,
} from "@/features/showcases/homeShowcaseRegistry";

describe("homeShowcaseRegistry", () => {
  it("resolves leadership and team home selections", () => {
    expect(getHomeLeadershipShowcases()).toHaveLength(
      HOME_LEADERSHIP_SHOWCASE_SLUGS.length,
    );
    expect(getHomeTeamsShowcases()).toHaveLength(
      HOME_TEAMS_SHOWCASE_SLUGS.length,
    );
  });

  it("prioritizes automation and cost stories on the team row", () => {
    expect(HOME_TEAMS_SHOWCASE_SLUGS[0]).toBe(
      "automate-for-yourself-or-your-team",
    );
    expect(HOME_LEADERSHIP_SHOWCASE_SLUGS[0]).toBe(
      "automate-recurring-work-without-headcount",
    );
  });
});
