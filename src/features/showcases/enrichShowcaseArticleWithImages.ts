import { buildShowcaseTopicArticleImage } from "@/features/showcases/buildShowcaseTopicArticleImage";
import { SHOWCASE_ARTICLE_TOPIC_SCREEN_BY_SLUG } from "@/features/showcases/showcaseArticleTopicScreenMap.constant";
import { resolveShowcaseTopicScreenCaption } from "@/features/showcases/showcaseTopicScreenCaptions.constant";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const articleHasImage = (article: ShowcaseArticle): boolean =>
  article.sections.some((section) => section.image !== undefined);

export const enrichShowcaseArticleWithImages = (
  article: ShowcaseArticle,
): ShowcaseArticle => {
  if (articleHasImage(article)) {
    return article;
  }

  const topicScreenId = SHOWCASE_ARTICLE_TOPIC_SCREEN_BY_SLUG[article.slug];

  if (!topicScreenId) {
    return article;
  }

  const image = buildShowcaseTopicArticleImage(topicScreenId, {
    alt: `${article.title} — product screen`,
    caption: resolveShowcaseTopicScreenCaption(topicScreenId),
  });

  const [firstSection, ...restSections] = article.sections;

  if (!firstSection) {
    return {
      ...article,
      sections: [{ image }],
    };
  }

  return {
    ...article,
    sections: [{ ...firstSection, image }, ...restSections],
  };
};
