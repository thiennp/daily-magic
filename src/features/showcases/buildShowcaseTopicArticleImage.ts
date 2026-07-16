import {
  buildShowcaseTopicSvgPath,
  type ShowcaseTopicScreenId,
} from "@/features/showcases/showcaseTopicScreens.constant";
import type { ShowcaseArticleImage } from "@/features/showcases/types/ShowcaseArticle.type";

export const buildShowcaseTopicArticleImage = (
  screenId: ShowcaseTopicScreenId,
  input: {
    readonly alt: string;
    readonly caption: string;
  },
): ShowcaseArticleImage => ({
  topicScreenId: screenId,
  src: buildShowcaseTopicSvgPath(screenId),
  alt: input.alt,
  caption: input.caption,
});
