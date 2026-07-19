import {
  SHOWCASE_FIGURE_FRAME_CLASS,
  SHOWCASE_FIGURE_IMAGE_CLASS,
  SHOWCASE_FIGURE_PADDING_CLASS,
  shouldPreferShowcaseSvgFallback,
} from "@/features/showcases/showcaseFigureCrop.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface ShowcasePngFigureProps {
  readonly pngSrc: string;
  readonly svgSrc: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly caption: string;
}

export default function ShowcasePngFigure({
  pngSrc,
  svgSrc,
  width,
  height,
  alt,
  caption,
}: ShowcasePngFigureProps) {
  const preferSvg = shouldPreferShowcaseSvgFallback(width, height);
  const displayWidth = 960;
  const displayHeight = 600;

  return (
    <figure
      className={mergeMarketingClasses(
        "overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03]",
        SHOWCASE_FIGURE_PADDING_CLASS,
      )}
    >
      <div className={SHOWCASE_FIGURE_FRAME_CLASS}>
        {preferSvg ? (
          // eslint-disable-next-line @next/next/no-img-element -- curated SVG figure
          <img
            src={svgSrc}
            alt={alt}
            width={displayWidth}
            height={displayHeight}
            className={SHOWCASE_FIGURE_IMAGE_CLASS}
          />
        ) : (
          <picture>
            <source srcSet={pngSrc} type="image/png" />
            <img
              src={svgSrc}
              alt={alt}
              width={displayWidth}
              height={displayHeight}
              className={SHOWCASE_FIGURE_IMAGE_CLASS}
            />
          </picture>
        )}
      </div>
      <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        {caption}
      </figcaption>
    </figure>
  );
}
