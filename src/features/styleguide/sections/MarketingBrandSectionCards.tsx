import ComponentCard from "@/components/common/ComponentCard";
import AgentWitchLogo from "@/components/branding/AgentWitchLogo";
import MarketingCtaBand from "@/features/marketing/MarketingCtaBand";
import MarketingStatusBadge from "@/features/marketing/MarketingStatusBadge";
import {
  MARKETING_ANNOUNCEMENT_BAR_CLASSES,
  MARKETING_BUTTON_PRIMARY_CLASSES,
  MARKETING_BUTTON_SECONDARY_CLASSES,
  MARKETING_DISPLAY_HEADING_CLASSES,
  MARKETING_EYEBROW_CLASSES,
  MARKETING_ICON_TILE_CLASSES,
  MARKETING_METRIC_DESCRIPTION_CLASSES,
  MARKETING_METRIC_VALUE_CLASSES,
  MARKETING_SURFACE_ELEVATED_CLASSES,
} from "@/features/marketing/marketingDesignSystem.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";
import MarketingBrandColorSwatchesCard from "@/features/styleguide/sections/MarketingBrandColorSwatchesCard";

export default function MarketingBrandSectionCards() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <ComponentCard
        title="Announcement bar"
        desc="Navy strip above marketing header."
      >
        <p className={MARKETING_ANNOUNCEMENT_BAR_CLASSES}>
          Enterprise-grade approval controls, on hardware your company already
          owns.
        </p>
      </ComponentCard>

      <ComponentCard
        title="Logo on marketing canvas"
        desc="Unchanged AW mark + wordmark."
      >
        <div className="rounded-xl bg-gray-50 p-6">
          <AgentWitchLogo surface="light" />
        </div>
      </ComponentCard>

      <MarketingBrandColorSwatchesCard />

      <ComponentCard title="Typography" desc="Eyebrow, display heading, body.">
        <div className="space-y-4 rounded-xl bg-gray-50 p-6">
          <p className={MARKETING_EYEBROW_CLASSES}>Section eyebrow</p>
          <p
            className={mergeMarketingClasses(
              "text-3xl",
              MARKETING_DISPLAY_HEADING_CLASSES,
            )}
          >
            Delegate AI work on Macs you control
          </p>
          <p className="max-w-xl text-base text-gray-600">
            Body copy uses relaxed leading and gray-600 for secondary text on
            light surfaces.
          </p>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Buttons & badges"
        desc="Primary, secondary, status pills."
      >
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className={MARKETING_BUTTON_PRIMARY_CLASSES}>
            Primary
          </button>
          <button type="button" className={MARKETING_BUTTON_SECONDARY_CLASSES}>
            Secondary
          </button>
          <span className={MARKETING_ICON_TILE_CLASSES} aria-hidden="true">
            ◆
          </span>
          <MarketingStatusBadge tone="success">Delivered</MarketingStatusBadge>
          <MarketingStatusBadge tone="info">Pending</MarketingStatusBadge>
          <MarketingStatusBadge tone="neutral">Running</MarketingStatusBadge>
        </div>
      </ComponentCard>

      <ComponentCard
        title="Trust metrics"
        desc="Hero stat row with brand dividers."
      >
        <div className="grid gap-6 border-y border-brand-200 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:border-l lg:border-brand-200 lg:pl-6 first:lg:border-l-0">
            <p className={MARKETING_METRIC_VALUE_CLASSES}>~15 min</p>
            <p className={MARKETING_METRIC_DESCRIPTION_CLASSES}>
              to connect a Mac and run a first job
            </p>
          </div>
          <div className="lg:border-l lg:border-brand-200 lg:pl-6">
            <p className={MARKETING_METRIC_VALUE_CLASSES}>100%</p>
            <p className={MARKETING_METRIC_DESCRIPTION_CLASSES}>
              run history in one auditable place
            </p>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Elevated card" desc="Default marketing panel.">
        <div
          className={mergeMarketingClasses(
            MARKETING_SURFACE_ELEVATED_CLASSES,
            "p-6",
          )}
        >
          <p className="text-sm font-semibold text-gray-900">Card title</p>
          <p className="mt-2 text-sm text-gray-600">
            White fill, gray-200 border, sm shadow — no heavy drop shadows.
          </p>
        </div>
      </ComponentCard>

      <ComponentCard
        title="CTA band"
        desc="Full-width call to action on landing."
      >
        <MarketingCtaBand />
      </ComponentCard>
    </div>
  );
}
