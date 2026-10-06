import { PRICING_BRING_YOUR_OWN } from "@/features/pricing/pricingCopy.constant";

export default function PricingBringYourOwn() {
  const copy = PRICING_BRING_YOUR_OWN;
  return (
    <section className="mt-16" aria-labelledby="pricing-byo-heading">
      <h2
        id="pricing-byo-heading"
        className="text-2xl font-bold tracking-[-0.02em] text-gray-900"
      >
        {copy.title}
      </h2>
      <p className="mt-2 max-w-3xl text-gray-600">{copy.sub}</p>
      <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
        {copy.cards.map((card) => (
          <li
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
            <p className="mt-1 text-sm font-medium text-emerald-700">
              {card.price}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {card.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
