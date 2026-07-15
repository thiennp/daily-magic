import { HOME_MARKETING_HERO_COPY } from "@/features/home/constants/homeMarketingLandingCopy.constant";
import { MARKETING_TEXT_SECONDARY_CLASSES } from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

export default function HomeMarketingHeroSteps() {
  return (
    <ol
      className={mergeMarketingClasses(
        "mt-4 list-none space-y-2.5 text-base leading-relaxed",
        MARKETING_TEXT_SECONDARY_CLASSES,
      )}
      aria-label="How Agent Witch works in three steps"
    >
      {HOME_MARKETING_HERO_COPY.steps.map((step, index) => (
        <li key={step} className="flex gap-3">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900"
            aria-hidden
          >
            {index + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}
