import { buildShowcaseOnboardingSvgPath } from "@/features/showcases/onboardingShowcaseScreens.constant";
import ShowcaseArticleFigure from "@/features/showcases/ShowcaseArticleFigure";
import type { OnboardingShowcaseScreenId } from "@/features/showcases/onboardingShowcaseScreens.constant";

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
  return (
    <ShowcaseArticleFigure
      src={buildShowcaseOnboardingSvgPath(screenId)}
      alt={alt}
      caption={caption}
    />
  );
}
