import { describe, expect, it } from "vitest";

import {
  AUTOMATION_SHOWCASE_SCREEN,
  buildShowcaseAutomationImagePaths,
} from "@/features/showcases/automationShowcaseScreens.constant";
import { buildShowcaseAutomationArticleImage } from "@/features/showcases/buildShowcaseAutomationArticleImage";

describe("automation showcase screens", () => {
  it("builds png and svg paths for a screen id", () => {
    expect(
      buildShowcaseAutomationImagePaths(
        AUTOMATION_SHOWCASE_SCREEN.NEW_AUTOMATION,
      ),
    ).toEqual({
      png: "/showcases/automations/02-new-automation.png",
      svg: "/showcases/automations/02-new-automation.svg",
    });
  });

  it("builds article images with automationScreenId for picture fallback", () => {
    expect(
      buildShowcaseAutomationArticleImage(
        AUTOMATION_SHOWCASE_SCREEN.AUTOMATIONS_LIST,
        {
          alt: "Automations list",
          caption: "Scheduled jobs",
        },
      ),
    ).toEqual({
      automationScreenId: "03-automations-list",
      src: "/showcases/automations/03-automations-list.png",
      alt: "Automations list",
      caption: "Scheduled jobs",
    });
  });
});
