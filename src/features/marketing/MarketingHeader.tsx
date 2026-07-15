import Link from "next/link";

import AgentWitchLogo from "@/components/branding/AgentWitchLogo";
import MarketingHeaderNav from "@/features/marketing/MarketingHeaderNav";

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
          <AgentWitchLogo surface="light" />
        </Link>
        <MarketingHeaderNav showSignIn={showSignIn} />
      </div>
    </header>
  );
}
