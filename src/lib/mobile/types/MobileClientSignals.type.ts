/** Browser signals used to decide whether the current client is a mobile device. */
export default interface MobileClientSignals {
  readonly userAgent: string | null;
  /** `navigator.userAgentData.mobile` (Chromium only); null when unavailable. */
  readonly userAgentDataMobile: boolean | null;
  /** `navigator.userAgentData.platform ?? navigator.platform`. */
  readonly platform: string | null;
  readonly maxTouchPoints: number;
  /** `matchMedia("(pointer: coarse)").matches` */
  readonly primaryPointerCoarse: boolean;
  /** `matchMedia("(any-pointer: fine)").matches` — a mouse/trackpad exists. */
  readonly anyPointerFine: boolean;
  readonly viewportWidth: number | null;
}
