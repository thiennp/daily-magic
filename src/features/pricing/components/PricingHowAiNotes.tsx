import { PRICING_HOW_AI_NOTES } from "@/features/pricing/pricingCopy.constant";

/** Skill-from-repeat + Prompt optimizer paths — outside package cards (rules 11–12). */
export default function PricingHowAiNotes() {
  const copy = PRICING_HOW_AI_NOTES;
  return (
    <section className="mt-16" aria-labelledby="pricing-how-ai-heading">
      <h2
        id="pricing-how-ai-heading"
        className="text-2xl font-bold tracking-[-0.02em] text-gray-900"
      >
        How AI runs (optional)
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            {copy.skillTitle}
          </h3>
          <p className="mt-2 text-sm text-gray-600">{copy.skillIntro}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
            {copy.skillOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            {copy.optimizerTitle}
          </h3>
          <p className="mt-2 text-sm text-gray-600">{copy.optimizerIntro}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-700">
            {copy.optimizerOptions.map((option) => (
              <li key={option}>{option}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-500">{copy.optimizerHelp}</p>
        </article>
      </div>
    </section>
  );
}
