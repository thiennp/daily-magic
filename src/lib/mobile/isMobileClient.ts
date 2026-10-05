import isIpadDesktopModeClient from "@/lib/mobile/isIpadDesktopModeClient";
import isMobileUserAgent from "@/lib/mobile/isMobileUserAgent";
import isTouchOnlyNarrowClient from "@/lib/mobile/isTouchOnlyNarrowClient";
import type MobileClientSignals from "@/lib/mobile/types/MobileClientSignals.type";

/**
 * Pure client orchestrator. Mobile when any of:
 * 1. `userAgentData.mobile === true`
 * 2. the UA is a phone/tablet
 * 3. iPadOS desktop mode (Mac UA + multi-touch)
 * 4. touch-only, coarse pointer, phone-width viewport
 * Desktop browsers (fine pointer, no touch, desktop UA) never match.
 */
export default function isMobileClient(signals: MobileClientSignals): boolean {
  if (signals.userAgentDataMobile === true) {
    return true;
  }

  if (isMobileUserAgent(signals.userAgent)) {
    return true;
  }

  if (isIpadDesktopModeClient(signals)) {
    return true;
  }

  return isTouchOnlyNarrowClient(signals);
}
