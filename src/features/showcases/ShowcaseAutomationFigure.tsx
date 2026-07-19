import ShowcasePngFigure from "@/features/showcases/ShowcasePngFigure";
import {
  buildShowcaseAutomationPngPath,
  buildShowcaseAutomationSvgPath,
  resolveShowcaseAutomationScreenDimensions,
  type AutomationShowcaseScreenId,
} from "@/features/showcases/automationShowcaseScreens.constant";

interface ShowcaseAutomationFigureProps {
  readonly screenId: AutomationShowcaseScreenId;
  readonly alt: string;
  readonly caption: string;
}

export default function ShowcaseAutomationFigure({
  screenId,
  alt,
  caption,
}: ShowcaseAutomationFigureProps) {
  const { width, height } = resolveShowcaseAutomationScreenDimensions(screenId);

  return (
    <ShowcasePngFigure
      pngSrc={buildShowcaseAutomationPngPath(screenId)}
      svgSrc={buildShowcaseAutomationSvgPath(screenId)}
      width={width}
      height={height}
      alt={alt}
      caption={caption}
      preferSvg
    />
  );
}
