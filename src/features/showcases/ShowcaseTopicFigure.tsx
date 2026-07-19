import ShowcasePngFigure from "@/features/showcases/ShowcasePngFigure";
import {
  buildShowcaseTopicPngPath,
  buildShowcaseTopicSvgPath,
  resolveShowcaseTopicScreenDimensions,
  type ShowcaseTopicScreenId,
} from "@/features/showcases/showcaseTopicScreens.constant";

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
  const { width, height } = resolveShowcaseTopicScreenDimensions(screenId);

  return (
    <ShowcasePngFigure
      pngSrc={buildShowcaseTopicPngPath(screenId)}
      svgSrc={buildShowcaseTopicSvgPath(screenId)}
      width={width}
      height={height}
      alt={alt}
      caption={caption}
      preferSvg
    />
  );
}
