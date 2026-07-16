import {
  buildTeamDispatchShowcasePngPath,
  type TeamDispatchShowcaseScreenId,
} from "@/features/showcases/teamDispatchShowcaseScreens.constant";
import type { ShowcaseArticleImage } from "@/features/showcases/types/ShowcaseArticle.type";

export const buildShowcaseTeamDispatchArticleImage = (
  screenId: TeamDispatchShowcaseScreenId,
  input: {
    readonly alt: string;
    readonly caption: string;
  },
): ShowcaseArticleImage => ({
  teamDispatchScreenId: screenId,
  src: buildTeamDispatchShowcasePngPath(screenId),
  alt: input.alt,
  caption: input.caption,
});
