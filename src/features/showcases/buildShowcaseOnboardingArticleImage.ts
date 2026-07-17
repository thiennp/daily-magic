import { buildShowcaseOnboardingPngPath } from "@/features/showcases/onboardingShowcaseScreens.constant";
import type { OnboardingShowcaseScreenId } from "@/features/showcases/onboardingShowcaseScreens.constant";
import type { ShowcaseArticleImage } from "@/features/showcases/types/ShowcaseArticle.type";

export const buildShowcaseOnboardingArticleImage = (
  screenId: OnboardingShowcaseScreenId,
  input: {
    readonly alt: string;
    readonly caption: string;
  },
): ShowcaseArticleImage => ({
  screenId,
  src: buildShowcaseOnboardingPngPath(screenId),
  alt: input.alt,
  caption: input.caption,
});
