import {
  buildShowcaseAutomationSvgPath,
  type AutomationShowcaseScreenId,
} from "@/features/showcases/automationShowcaseScreens.constant";
import type { ShowcaseArticleImage } from "@/features/showcases/types/ShowcaseArticle.type";

export const buildShowcaseAutomationArticleImage = (
  screenId: AutomationShowcaseScreenId,
  input: {
    readonly alt: string;
    readonly caption: string;
  },
): ShowcaseArticleImage => ({
  automationScreenId: screenId,
  src: buildShowcaseAutomationSvgPath(screenId),
  alt: input.alt,
  caption: input.caption,
});
