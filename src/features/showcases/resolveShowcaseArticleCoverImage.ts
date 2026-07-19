import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";
import type { ShowcaseArticleImage } from "@/features/showcases/types/ShowcaseArticle.type";

/** First section image — used as the card cover on home and /showcases. */
export const resolveShowcaseArticleCoverImage = (
  article: ShowcaseArticle,
): ShowcaseArticleImage | null => {
  for (const section of article.sections) {
    if (section.image !== undefined) {
      return section.image;
    }
  }

  return null;
};
