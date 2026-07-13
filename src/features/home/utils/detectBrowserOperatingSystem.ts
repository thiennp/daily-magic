export type BrowserOperatingSystem = "mac" | "windows" | "other";

const detectBrowserOperatingSystem = (): BrowserOperatingSystem => {
  if (typeof navigator === "undefined") {
    return "other";
  }

  const navigatorWithUserAgentData = navigator as Navigator & {
    readonly userAgentData?: { readonly platform?: string };
  };
  const platform =
    navigatorWithUserAgentData.userAgentData?.platform ??
    navigator.platform ??
    "";
  const normalized = `${platform} ${navigator.userAgent}`.toLowerCase();

  if (normalized.includes("mac")) {
    return "mac";
  }

  if (normalized.includes("win")) {
    return "windows";
  }

  return "other";
};

export default detectBrowserOperatingSystem;
