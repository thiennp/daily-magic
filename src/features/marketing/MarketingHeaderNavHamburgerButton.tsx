import { MARKETING_HEADER_LINK_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

interface MarketingHeaderNavHamburgerButtonProps {
  readonly mobileOpen: boolean;
  readonly onToggle: () => void;
}

export default function MarketingHeaderNavHamburgerButton({
  mobileOpen,
  onToggle,
}: MarketingHeaderNavHamburgerButtonProps) {
  return (
    <button
      type="button"
      className={mergeMarketingClasses(
        MARKETING_HEADER_LINK_CLASSES,
        "inline-flex min-h-10 items-center justify-center rounded-lg px-3 py-2 lg:hidden",
      )}
      aria-expanded={mobileOpen}
      aria-controls="marketing-header-mobile-nav"
      aria-label="Open navigation menu"
      onClick={onToggle}
    >
      <span className="sr-only">Open navigation menu</span>
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M2 6.75A.75.75 0 012.75 6h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 6.75zm0 5.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 5.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
