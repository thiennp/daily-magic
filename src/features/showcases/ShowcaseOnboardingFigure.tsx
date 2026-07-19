import ShowcasePngFigure from "@/features/showcases/ShowcasePngFigure";
import {
  buildShowcaseOnboardingPngPath,
  buildShowcaseOnboardingSvgPath,
  resolveShowcaseOnboardingScreenDimensions,
  type OnboardingShowcaseScreenId,
} from "@/features/showcases/onboardingShowcaseScreens.constant";

interface ShowcaseOnboardingFigureProps {
  readonly screenId: OnboardingShowcaseScreenId;
  readonly alt: string;
  readonly caption: string;
}

export default function ShowcaseOnboardingFigure({
  screenId,
  alt,
  caption,
}: ShowcaseOnboardingFigureProps) {
  const { width, height } = resolveShowcaseOnboardingScreenDimensions(screenId);

  return (
    <ShowcasePngFigure
      pngSrc={buildShowcaseOnboardingPngPath(screenId)}
      svgSrc={buildShowcaseOnboardingSvgPath(screenId)}
      width={width}
      height={height}
      alt={alt}
      caption={caption}
      preferSvg
    />
  );
}
