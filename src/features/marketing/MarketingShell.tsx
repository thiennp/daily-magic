import type { ReactNode } from "react";

import GridShape from "@/components/common/GridShape";
import MarketingFooter from "@/features/marketing/MarketingFooter";
import MarketingHeader from "@/features/marketing/MarketingHeader";

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
    <div className="relative min-h-screen bg-zinc-50">
      <GridShape />
      <MarketingHeader showSignIn={showSignIn} />
      <main className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {children}
      </main>
      {showFooter ? <MarketingFooter /> : null}
    </div>
  );
}
