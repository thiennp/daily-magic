import { botToBotFlowSections } from "@/features/showcases/articles/botToBot.sections.flow";
import { botToBotSetupSections } from "@/features/showcases/articles/botToBot.sections.setup";
import type { ShowcaseArticleSection } from "@/features/showcases/types/ShowcaseArticle.type";

export const botToBotSections: readonly ShowcaseArticleSection[] = [
  ...botToBotSetupSections,
  ...botToBotFlowSections,
];
