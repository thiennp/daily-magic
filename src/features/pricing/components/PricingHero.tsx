import InfoTip from "@/components/ui/infoTip/InfoTip";
import { PRICING_HERO_COPY } from "@/features/pricing/pricingCopy.constant";

export default function PricingHero() {
  return (
    <header className="mx-auto flex max-w-3xl flex-col items-center gap-3 pt-6 text-center">
      <h1
        id="page-h"
        tabIndex={-1}
        className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-[-0.03em] text-awc-fg"
      >
        {PRICING_HERO_COPY.title}
      </h1>
      <p className="max-w-[52ch] text-base text-awc-fg-muted">
        {PRICING_HERO_COPY.lead}{" "}
        <InfoTip
          text={PRICING_HERO_COPY.tipBody}
          label={PRICING_HERO_COPY.tipTitle}
        />
      </p>
    </header>
  );
}
