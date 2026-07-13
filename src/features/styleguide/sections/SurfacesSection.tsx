import AppAccentPanel from "@/components/surfaces/AppAccentPanel";
import AppHero from "@/components/surfaces/AppHero";
import AppPageHeader from "@/components/surfaces/AppPageHeader";
import AppPanel from "@/components/surfaces/AppPanel";
import LocalTerminalPre from "@/components/surfaces/LocalTerminalPre";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

export default function SurfacesSection() {
  return (
    <section id="surfaces" className="scroll-mt-24 space-y-6">
      <AppPageHeader
        title="App surfaces"
        description="Shared page shells for panels, heroes, accent callouts, and terminal blocks. Use these instead of copying Tailwind color classes in feature code."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <AppPanel>
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            AppPanel
          </h3>
          <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
            Default white card for reports, agent composer, marketplace, and
            admin sections.
          </p>
        </AppPanel>

        <AppAccentPanel>
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            AppAccentPanel
          </h3>
          <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
            Brand-tinted surface for onboarding and highlights.
          </p>
        </AppAccentPanel>
      </div>

      <AppHero variant="neutral">
        <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>AppHero neutral</p>
        <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">
          Welcome surfaces
        </h3>
        <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Home dashboard hero and similar top-of-page introductions.
        </p>
      </AppHero>

      <AppHero variant="brand">
        <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>AppHero brand</p>
        <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">
          Connect your Mac
        </h3>
        <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
          Install and pairing flows use the brand hero variant.
        </p>
      </AppHero>

      <AppPanel>
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          LocalTerminalPre
        </h3>
        <LocalTerminalPre className="mt-3">
          curl -fsSL https://agentwitch.com/install/agent-witch.sh | bash
        </LocalTerminalPre>
      </AppPanel>
    </section>
  );
}
