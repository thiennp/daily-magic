import { automateRecurringWorkWithoutHeadcount } from "@/features/showcases/articles/public-api/types";
import { standardizeAiWorkAcrossTheTeam } from "@/features/showcases/articles/public-api/types";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

export const LEADERSHIP_SHOWCASE_ARTICLES: readonly ShowcaseArticle[] = [
  automateRecurringWorkWithoutHeadcount,
  standardizeAiWorkAcrossTheTeam,
] as const;

export const isLeadershipShowcaseCategory = (category: string): boolean =>
  category === "For leadership";
