/** Display crop for showcase article screenshots (related area + padding). */
export const SHOWCASE_FIGURE_FRAME_CLASS =
  "overflow-hidden rounded-lg bg-white dark:bg-gray-900";

export const SHOWCASE_FIGURE_IMAGE_CLASS =
  "aspect-[16/10] h-auto w-full object-cover object-top";

export const SHOWCASE_FIGURE_PADDING_CLASS = "p-3 sm:p-4";

/** Prefer curated SVG when PNG is a full-page capture taller than ~square. */
export const shouldPreferShowcaseSvgFallback = (
  width: number,
  height: number,
): boolean => height / width > 1.05;
