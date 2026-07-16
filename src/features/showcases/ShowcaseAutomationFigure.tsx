import { buildShowcaseAutomationSvgPath } from "@/features/showcases/automationShowcaseScreens.constant";
import ShowcaseArticleFigure from "@/features/showcases/ShowcaseArticleFigure";
import type { AutomationShowcaseScreenId } from "@/features/showcases/automationShowcaseScreens.constant";

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
  return (
    <ShowcaseArticleFigure
      src={buildShowcaseAutomationSvgPath(screenId)}
      alt={alt}
      caption={caption}
    />
  );
}
