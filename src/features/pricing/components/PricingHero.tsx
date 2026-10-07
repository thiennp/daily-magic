import {
  PRICING_HERO_COPY,
} from "@/features/pricing/pricingCopy.constant";

export default function PricingHero() {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <h1 className="text-4xl font-bold tracking-[-0.03em] text-awc-fg sm:text-5xl">
        {PRICING_HERO_COPY.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-awc-fg-muted">
        {PRICING_HERO_COPY.lead}
      </p>
      <p className="mt-3 text-sm text-awc-fg-muted">
        <span className="font-medium text-awc-fg">
          {PRICING_HERO_COPY.tipTitle}.
        </span>{" "}
        {PRICING_HERO_COPY.tipBody}
      </p>
    </header>
  );
}
