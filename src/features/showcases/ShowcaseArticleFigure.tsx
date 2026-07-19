import {
  SHOWCASE_FIGURE_FRAME_CLASS,
  SHOWCASE_FIGURE_IMAGE_CLASS,
  SHOWCASE_FIGURE_PADDING_CLASS,
} from "@/features/showcases/showcaseFigureCrop.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface ShowcaseArticleFigureProps {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

export default function ShowcaseArticleFigure({
  src,
  alt,
  caption,
}: ShowcaseArticleFigureProps) {
  return (
    <figure
      className={mergeMarketingClasses(
        "overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03]",
        SHOWCASE_FIGURE_PADDING_CLASS,
      )}
    >
      <div className={SHOWCASE_FIGURE_FRAME_CLASS}>
        {/* eslint-disable-next-line @next/next/no-img-element -- public showcase assets */}
        <img
          src={src}
          alt={alt}
          width={960}
          height={600}
          className={SHOWCASE_FIGURE_IMAGE_CLASS}
        />
      </div>
      <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        {caption}
      </figcaption>
    </figure>
  );
}
