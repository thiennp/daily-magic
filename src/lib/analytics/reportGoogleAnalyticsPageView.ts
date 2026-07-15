type GtagFn = (
  command: "config" | "event",
  targetId: string,
  params?: Readonly<Record<string, string>>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

const reportGoogleAnalyticsPageView = (
  measurementId: string,
  path: string,
): void => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", measurementId, {
    page_path: path,
  });
};

export default reportGoogleAnalyticsPageView;
