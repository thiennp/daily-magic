import { buildShowcaseTopicSvgPath } from "@/features/showcases/showcaseTopicScreens.constant";
import ShowcaseArticleFigure from "@/features/showcases/ShowcaseArticleFigure";
import type { ShowcaseTopicScreenId } from "@/features/showcases/showcaseTopicScreens.constant";

interface ShowcaseTopicFigureProps {
  readonly screenId: ShowcaseTopicScreenId;
  readonly alt: string;
  readonly caption: string;
}

export default function ShowcaseTopicFigure({
  screenId,
  alt,
  caption,
}: ShowcaseTopicFigureProps) {
  return (
    <ShowcaseArticleFigure
      src={buildShowcaseTopicSvgPath(screenId)}
      alt={alt}
      caption={caption}
    />
  );
}
