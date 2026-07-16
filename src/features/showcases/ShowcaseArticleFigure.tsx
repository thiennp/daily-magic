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
    <figure className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* eslint-disable-next-line @next/next/no-img-element -- public SVG sample UI assets */}
      <img
        src={src}
        alt={alt}
        width={960}
        height={560}
        className="h-auto w-full"
      />
      <figcaption className="border-t border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
        {caption}
      </figcaption>
    </figure>
  );
}
