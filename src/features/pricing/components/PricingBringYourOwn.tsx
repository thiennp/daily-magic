import InfoTip from "@/components/ui/infoTip/InfoTip";
import { PRICING_BRING_YOUR_OWN } from "@/features/pricing/pricingCopy.constant";

export default function PricingBringYourOwn() {
  const copy = PRICING_BRING_YOUR_OWN;
  return (
    <section className="mt-16" aria-labelledby="pricing-byo-heading">
      <h2
        id="pricing-byo-heading"
        className="text-2xl font-bold tracking-[-0.02em] text-awc-fg"
      >
        {copy.title} <InfoTip text={copy.tip} label={copy.tipLabel} />
      </h2>
      <p className="mt-2 max-w-3xl text-awc-fg-muted">{copy.sub}</p>
      <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
        {copy.cards.map((card) => (
          <li
            key={card.title}
            className="rounded-2xl border border-awc-border bg-awc-surface p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-awc-fg">{card.title}</h3>
            <p className="mt-1 text-sm font-medium text-emerald-700">
              {card.price}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-awc-fg-muted">
              {card.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
