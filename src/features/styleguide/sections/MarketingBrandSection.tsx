import ComponentCard from "@/components/common/ComponentCard";
import AgentWitchLogo from "@/components/branding/AgentWitchLogo";
import MarketingCtaBand from "@/features/marketing/MarketingCtaBand";
import MarketingStatusBadge from "@/features/marketing/MarketingStatusBadge";
import {
  MARKETING_BUTTON_PRIMARY_CLASSES,
  MARKETING_BUTTON_SECONDARY_CLASSES,
  MARKETING_DESIGN_SYSTEM_VERSION,
  MARKETING_DISPLAY_HEADING_CLASSES,
  MARKETING_EYEBROW_CLASSES,
  MARKETING_ICON_TILE_CLASSES,
  MARKETING_SURFACE_ELEVATED_CLASSES,
} from "@/features/marketing/marketingDesignSystem.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

const SWATCHES = [
  { label: "Canvas", className: "bg-gray-50" },
  { label: "Brand 600", className: "bg-brand-600" },
  { label: "Brand 50", className: "bg-brand-50" },
  { label: "Navy band", className: "bg-gray-950" },
] as const;

export default function MarketingBrandSection() {
  return (
    <section id="marketing-brand" className="scroll-mt-28">
      <h2 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Marketing brand ({MARKETING_DESIGN_SYSTEM_VERSION})
      </h2>
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        Public-site tokens for Agent Witch landing, login, and legal pages. Logo
        lockup stays unchanged; surfaces use border-first cards, brand blue CTAs,
        and optional navy or brand bands for contrast.
      </p>

      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Logo on marketing canvas" desc="Unchanged AW mark + wordmark.">
          <div className="rounded-xl bg-gray-50 p-6">
            <AgentWitchLogo surface="light" />
          </div>
        </ComponentCard>

        <ComponentCard title="Color swatches" desc="Tailwind tokens from @theme brand + gray.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SWATCHES.map((swatch) => (
              <div key={swatch.label} className="space-y-2">
                <div
                  className={mergeMarketingClasses(
                    "h-14 rounded-lg ring-1 ring-gray-200",
                    swatch.className,
                  )}
                />
                <p className="text-xs font-medium text-gray-600">{swatch.label}</p>
              </div>
            ))}
          </div>
        </ComponentCard>

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

        <ComponentCard title="Buttons & badges" desc="Primary, secondary, status pills.">
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

        <ComponentCard title="Elevated card" desc="Default marketing panel.">
          <div className={mergeMarketingClasses(MARKETING_SURFACE_ELEVATED_CLASSES, "p-6")}>
            <p className="text-sm font-semibold text-gray-900">Card title</p>
            <p className="mt-2 text-sm text-gray-600">
              White fill, gray-200 border, sm shadow — no heavy drop shadows.
            </p>
          </div>
        </ComponentCard>

        <ComponentCard title="CTA band" desc="Full-width call to action on landing.">
          <MarketingCtaBand />
        </ComponentCard>
      </div>
    </section>
  );
}
