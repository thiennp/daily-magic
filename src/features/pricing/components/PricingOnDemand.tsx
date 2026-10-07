import { PRICING_ON_DEMAND } from "@/features/pricing/pricingCopy.constant";
import {
  PRICING_PAGE_PATH,
  PRICING_SIGN_IN_HREF,
} from "@/features/pricing/pricingAuthHrefs.constant";
import Link from "next/link";

interface PricingOnDemandProps {
  readonly signedIn: boolean;
}

export default function PricingOnDemand({ signedIn }: PricingOnDemandProps) {
  const copy = PRICING_ON_DEMAND;
  const addHref = signedIn ? PRICING_PAGE_PATH : PRICING_SIGN_IN_HREF;
  return (
    <section className="mt-16" aria-labelledby="pricing-ondemand-heading">
      <h2
        id="pricing-ondemand-heading"
        className="text-2xl font-bold tracking-[-0.02em] text-awc-fg"
      >
        {copy.title}
      </h2>
      <p className="mt-2 max-w-3xl text-awc-fg-muted">{copy.sub}</p>
      <ul className="mt-6 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
        {copy.addons.map((addon) => (
          <li
            key={addon.title}
            className="flex flex-col rounded-2xl border border-awc-border bg-awc-surface p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-awc-fg">{addon.title}</h3>
            <p className="mt-1 text-2xl font-bold text-blue-950">{addon.price}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-awc-fg-muted">
              {addon.body}
            </p>
            <Link
              href={addHref}
              className="mt-5 inline-flex items-center justify-center rounded-2xl border border-awc-border px-4 py-2.5 text-sm font-semibold text-awc-fg hover:bg-awc-surface-2"
            >
              {signedIn ? "Add when ready" : "Sign in to add"}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-awc-fg-muted">{copy.controlNote}</p>
    </section>
  );
}
