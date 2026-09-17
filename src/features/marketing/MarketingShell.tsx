import type { ReactNode } from "react";

import MarketingAnnouncementBar from "@/features/marketing/MarketingAnnouncementBar";
import MarketingFooter from "@/features/marketing/MarketingFooter";
import MarketingHeader from "@/features/marketing/MarketingHeader";
import { MARKETING_PAGE_BACKGROUND_CLASSES } from "@/features/marketing/marketingDesignSystem.constant";
import { MARKETING_LIGHT_SURFACE_CLASS } from "@/features/marketing/marketingSurfaceClasses.constant";

interface MarketingShellProps {
  readonly children: ReactNode;
  readonly showSignIn?: boolean;
  readonly showFooter?: boolean;
}

export default function MarketingShell({
  children,
  showSignIn = true,
  showFooter = true,
}: MarketingShellProps) {
  return (
    <div
      className={`${MARKETING_LIGHT_SURFACE_CLASS} relative min-h-screen ${MARKETING_PAGE_BACKGROUND_CLASSES}`}
    >
      <MarketingAnnouncementBar />
      <MarketingHeader showSignIn={showSignIn} />
      <main className="relative mx-auto max-w-6xl px-6 py-10 sm:py-14">
        {children}
      </main>
      {showFooter ? <MarketingFooter /> : null}
    </div>
  );
}
