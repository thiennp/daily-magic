import { PRICING_HOW_AI_NOTES } from "@/features/pricing/pricingCopy.constant";

/** Skill-from-repeat + Prompt optimizer paths — outside package cards (rules 11–12). */
export default function PricingHowAiNotes() {
  const copy = PRICING_HOW_AI_NOTES;
  return (
    <section className="mt-16" aria-labelledby="pricing-how-ai-heading">
      <h2
        id="pricing-how-ai-heading"
        className="text-2xl font-bold tracking-[-0.02em] text-awc-fg"
      >
        How AI runs (optional)
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-awc-border bg-awc-surface p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-awc-fg">
            {copy.skillTitle}
          </h3>
          <p className="mt-2 text-sm text-awc-fg-muted">{copy.skillIntro}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-awc-fg">
            {copy.skillOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-awc-border bg-awc-surface p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-awc-fg">
            {copy.optimizerTitle}
          </h3>
          <p className="mt-2 text-sm text-awc-fg-muted">{copy.optimizerIntro}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-awc-fg">
            {copy.optimizerOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-awc-fg-muted">{copy.optimizerHelp}</p>
        </article>
      </div>
    </section>
  );
}
