"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import CapabilityTemplatePicker from "@/features/capabilities/CapabilityTemplatePicker";

interface MarketplacePresetSectionProps {
  readonly variant?: "panel" | "plain";
}

export default function MarketplacePresetSection({
  variant = "plain",
}: MarketplacePresetSectionProps) {
  const content = (
    <>
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>
        Preset agents & workflows
      </h2>
      <p className={`mt-2 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Official starters with harness bundles (rules, skills, commands,
        instructions, and a specialist subagent). Save one to your library and
        install the bundle on your Mac when Agent Witch is online.
      </p>
      <CapabilityTemplatePicker />
    </>
  );

  if (variant === "panel") {
    return <AppPanel>{content}</AppPanel>;
  }

  return <section>{content}</section>;
}
