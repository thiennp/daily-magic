import MarketingCtaLink from "@/features/marketing/MarketingCtaLink";

export default function HomeMarketingHeroActions() {
  return (
    <nav aria-label="Primary actions" className="flex flex-wrap gap-3">
      <MarketingCtaLink href="/#get-started">Get started free</MarketingCtaLink>
      <MarketingCtaLink href="/login" variant="secondary">
        Sign in
      </MarketingCtaLink>
    </nav>
  );
}
