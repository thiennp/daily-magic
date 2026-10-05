/** Phone-width breakpoint (Tailwind `md` is 768px). */
const MOBILE_MAX_VIEWPORT_WIDTH = 767;

/**
 * Touch-only, phone-width client: coarse primary pointer, no fine pointer at
 * all (so touchscreen laptops with a trackpad/mouse never match), touch points
 * present, and a narrow viewport. All four must hold.
 */
export default function isTouchOnlyNarrowClient(input: {
  readonly primaryPointerCoarse: boolean;
  readonly anyPointerFine: boolean;
  readonly maxTouchPoints: number;
  readonly viewportWidth: number | null;
}): boolean {
  return (
    input.primaryPointerCoarse &&
    !input.anyPointerFine &&
    input.maxTouchPoints > 0 &&
    input.viewportWidth !== null &&
    input.viewportWidth <= MOBILE_MAX_VIEWPORT_WIDTH
  );
}
