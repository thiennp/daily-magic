import { companyOnboardIn30Minutes } from "@/features/showcases/articles/public-api/types";
import { onboardIn15Minutes } from "@/features/showcases/articles/public-api/types";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

export const ONBOARDING_SHOWCASE_ARTICLES: readonly ShowcaseArticle[] = [
  onboardIn15Minutes,
  companyOnboardIn30Minutes,
];

export const listOnboardingShowcaseArticleImages = (article: ShowcaseArticle) =>
  article.sections.flatMap((section) => (section.image ? [section.image] : []));
