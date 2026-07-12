import ComponentCard from "@/components/common/ComponentCard";
import AgentWitchLogo from "@/components/branding/AgentWitchLogo";
import AgentWitchLogoMark from "@/components/branding/AgentWitchLogoMark";
import {
  BRAND_LOGO_INTRO,
  BRAND_LOGO_MEANING_ITEMS,
} from "@/features/styleguide/brandLogoMeaning.constant";

export default function BrandLogoSection() {
  return (
    <section id="brand-logo" className="scroll-mt-28">
      <h2 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Brand logo
      </h2>
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {BRAND_LOGO_INTRO}
      </p>

      <div className="space-y-5 sm:space-y-6">
        <ComponentCard
          title="Logo lockup"
          desc="Use the full lockup in headers, onboarding, and marketing surfaces."
        >
          <div className="flex flex-wrap items-center gap-10">
            <AgentWitchLogo />
            <AgentWitchLogoMark className="h-12 w-12 text-zinc-900 dark:text-zinc-100" />
          </div>
        </ComponentCard>

        <ComponentCard
          title="Symbol meaning"
          desc="Use this language in brand guidelines, team onboarding, or landing page copy."
        >
          <dl className="space-y-6">
            {BRAND_LOGO_MEANING_ITEMS.map((item) => (
              <div key={item.title}>
                <dt className="text-sm font-semibold text-gray-900 dark:text-white/90">
                  {item.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </ComponentCard>
      </div>
    </section>
  );
}
