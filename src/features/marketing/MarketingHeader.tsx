import Link from "next/link";

import AgentWitchLogo from "@/components/branding/AgentWitchLogo";
import { MARKETING_CTA_PRIMARY_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface MarketingHeaderProps {
  readonly showSignIn?: boolean;
}

export default function MarketingHeader({
  showSignIn = true,
}: MarketingHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Agent Witch home">
          <AgentWitchLogo />
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/styleguide"
            className="text-zinc-600 transition hover:text-zinc-900"
          >
            Styleguide
          </Link>
          {showSignIn ? (
            <Link
              href="/login"
              className="text-zinc-600 transition hover:text-zinc-900"
            >
              Sign in
            </Link>
          ) : null}
          <Link
            href="/#get-started"
            aria-label="Get started with sign in"
            className={mergeMarketingClasses(MARKETING_CTA_PRIMARY_CLASSES, "h-10 px-4")}
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
