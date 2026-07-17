import { describe, expect, it } from "vitest";

import { buildShowcaseTeamDispatchArticleImage } from "@/features/showcases/buildShowcaseTeamDispatchArticleImage";
import agentDelegatesInsideYourCompany from "@/features/showcases/articles/agentDelegatesInsideYourCompany.article";
import {
  TEAM_DISPATCH_SHOWCASE_SCREEN,
  TEAM_DISPATCH_SHOWCASE_SCREEN_DIMENSIONS,
  buildTeamDispatchShowcasePngPath,
  buildTeamDispatchShowcaseSvgPath,
} from "@/features/showcases/teamDispatchShowcaseScreens.constant";

describe("teamDispatchShowcaseScreens", () => {
  it("builds png and svg paths for each screen", () => {
    expect(
      buildTeamDispatchShowcasePngPath(
        TEAM_DISPATCH_SHOWCASE_SCREEN.REQUEST_TASK,
      ),
    ).toBe("/showcases/team-dispatch/01-request-task.png");
    expect(
      buildTeamDispatchShowcaseSvgPath(TEAM_DISPATCH_SHOWCASE_SCREEN.APPROVAL),
    ).toBe("/showcases/team-dispatch/02-approval.svg");
  });

  it("article uses team dispatch images on key steps", () => {
    const images = agentDelegatesInsideYourCompany.sections.flatMap(
      (section) => (section.image ? [section.image] : []),
    );
    expect(images).toHaveLength(3);
    expect(images[0]?.teamDispatchScreenId).toBe(
      TEAM_DISPATCH_SHOWCASE_SCREEN.REQUEST_TASK,
    );
    expect(
      buildShowcaseTeamDispatchArticleImage(
        TEAM_DISPATCH_SHOWCASE_SCREEN.MAC_RUNNING,
        { alt: "a", caption: "b" },
      ).src,
    ).toContain(".png");
  });
});
