/** Display frame for showcase article figures (full illustration, no crop). */
export const SHOWCASE_FIGURE_FRAME_CLASS =
  "overflow-hidden rounded-lg bg-white dark:bg-gray-900";

export const SHOWCASE_FIGURE_IMAGE_CLASS =
  "aspect-[16/10] min-h-[14rem] w-full object-contain object-center sm:min-h-[18rem]";

export const SHOWCASE_FIGURE_PADDING_CLASS = "p-4 sm:p-5";

/** Card covers: contain the full illustration so labels stay readable. */
export const SHOWCASE_CARD_COVER_IMAGE_BASE_CLASS =
  "w-full bg-zinc-50 object-contain object-center dark:bg-zinc-900";

/** Prefer curated SVG when PNG is a full-page capture taller than ~square. */
export const shouldPreferShowcaseSvgFallback = (
  width: number,
  height: number,
): boolean => height / width > 1.05;
