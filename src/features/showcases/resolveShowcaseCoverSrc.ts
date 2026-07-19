import { buildShowcaseAutomationSvgPath } from "@/features/showcases/automationShowcaseScreens.constant";
import { buildShowcaseOnboardingSvgPath } from "@/features/showcases/onboardingShowcaseScreens.constant";
import { buildShowcaseTopicSvgPath } from "@/features/showcases/showcaseTopicScreens.constant";
import { buildTeamDispatchShowcaseSvgPath } from "@/features/showcases/teamDispatchShowcaseScreens.constant";
import type { ShowcaseArticleImage } from "@/features/showcases/types/ShowcaseArticle.type";

/**
 * Card/cover src: always use curated SVGs when a screen id exists.
 * Full-page PNGs are illegible at card size and often mismatch the story.
 */
export const resolveShowcaseCoverSrc = (
  image: ShowcaseArticleImage,
): string => {
  if (image.automationScreenId) {
    return buildShowcaseAutomationSvgPath(image.automationScreenId);
  }

  if (image.screenId) {
    return buildShowcaseOnboardingSvgPath(image.screenId);
  }

  if (image.topicScreenId) {
    return buildShowcaseTopicSvgPath(image.topicScreenId);
  }

  if (image.teamDispatchScreenId) {
    return buildTeamDispatchShowcaseSvgPath(image.teamDispatchScreenId);
  }

  if (image.src.endsWith(".png")) {
    return image.src.replace(/\.png$/u, ".svg");
  }

  return image.src;
};
