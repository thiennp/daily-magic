import { PRICING_FAQ_ITEMS } from "@/features/pricing/pricingCopy.constant";

export default function PricingFaq() {
  return (
    <section className="mt-16" aria-labelledby="pricing-faq-heading">
      <h2
        id="pricing-faq-heading"
        className="text-2xl font-bold tracking-[-0.02em] text-awc-fg"
      >
        Questions
      </h2>
      <div className="mt-6 flex flex-col gap-2">
        {PRICING_FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            className="rounded-xl border border-awc-border bg-awc-surface shadow-sm open:shadow-md"
          >
            <summary className="cursor-pointer list-none px-4 py-3.5 text-sm font-semibold text-awc-fg marker:content-none [&::-webkit-details-marker]:hidden">
              {item.question}
            </summary>
            <p className="max-w-[70ch] px-4 pb-4 text-sm leading-relaxed text-awc-fg-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
