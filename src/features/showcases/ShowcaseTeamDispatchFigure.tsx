import ShowcasePngFigure from "@/features/showcases/ShowcasePngFigure";
import {
  buildTeamDispatchShowcasePngPath,
  buildTeamDispatchShowcaseSvgPath,
  resolveTeamDispatchShowcaseScreenDimensions,
  type TeamDispatchShowcaseScreenId,
} from "@/features/showcases/teamDispatchShowcaseScreens.constant";

interface ShowcaseTeamDispatchFigureProps {
  readonly screenId: TeamDispatchShowcaseScreenId;
  readonly alt: string;
  readonly caption: string;
}

export default function ShowcaseTeamDispatchFigure({
  screenId,
  alt,
  caption,
}: ShowcaseTeamDispatchFigureProps) {
  const { width, height } =
    resolveTeamDispatchShowcaseScreenDimensions(screenId);

  return (
    <ShowcasePngFigure
      pngSrc={buildTeamDispatchShowcasePngPath(screenId)}
      svgSrc={buildTeamDispatchShowcaseSvgPath(screenId)}
      width={width}
      height={height}
      alt={alt}
      caption={caption}
      preferSvg
    />
  );
}
