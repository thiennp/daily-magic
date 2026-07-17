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
  return (
    <figure className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03]">
      <picture>
        <source srcSet={pngSrc} type="image/png" />
        <img
          src={svgSrc}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full"
        />
      </picture>
      <figcaption className="border-t border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
        {caption}
      </figcaption>
    </figure>
  );
}
