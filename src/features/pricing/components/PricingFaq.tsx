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
            className="group rounded-xl border border-awc-border bg-awc-surface shadow-sm"
          >
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3.5 font-semibold text-awc-fg marker:content-none after:mr-1 after:size-2 after:shrink-0 after:rotate-45 after:border-b-2 after:border-r-2 after:border-awc-blue-700 after:transition-transform group-open:after:-rotate-[135deg] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-awc-blue-600 [&::-webkit-details-marker]:hidden">
              {item.question}
            </summary>
            <p className="max-w-[70ch] px-4 pb-4 leading-relaxed text-awc-fg-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
