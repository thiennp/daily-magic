import type { OnboardingShowcaseScreenId } from "@/features/showcases/onboardingShowcaseScreens.constant";
import type { AutomationShowcaseScreenId } from "@/features/showcases/automationShowcaseScreens.constant";

export type ShowcaseSupportLevel = "full" | "partial";

export interface ShowcaseArticleImage {
  readonly screenId?: OnboardingShowcaseScreenId;
  readonly automationScreenId?: AutomationShowcaseScreenId;
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

export interface ShowcaseArticleSection {
  readonly heading?: string;
  readonly paragraphs?: readonly string[];
  readonly bullets?: readonly string[];
  readonly image?: ShowcaseArticleImage;
}

export interface ShowcaseTryNextLink {
  readonly label: string;
  readonly href: string;
}

export interface ShowcaseRelatedLink {
  readonly slug: string;
  readonly label: string;
}

export default interface ShowcaseArticle {
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly category: string;
  readonly supportLevel: ShowcaseSupportLevel;
  readonly readMinutes: number;
  readonly whatYouNeed: readonly string[];
  readonly tryNext: ShowcaseTryNextLink;
  readonly relatedShowcases?: readonly ShowcaseRelatedLink[];
  readonly sections: readonly ShowcaseArticleSection[];
}
