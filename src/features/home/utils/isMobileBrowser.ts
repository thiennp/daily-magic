import detectMobileClient from "@/lib/mobile/detectMobileClient";

/** @deprecated Prefer `detectMobileClient` / `useIsMobileClient`; kept as alias. */
const isMobileBrowser = (): boolean => detectMobileClient();

export default isMobileBrowser;
