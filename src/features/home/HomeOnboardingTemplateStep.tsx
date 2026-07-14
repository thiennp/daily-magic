"use client";

import Link from "next/link";

import AppHero from "@/components/surfaces/AppHero";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  APP_SURFACE_EYEBROW_TEXT_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import CapabilityTemplatePicker from "@/features/capabilities/CapabilityTemplatePicker";
import { useAppPath } from "@/features/demo/DemoPreviewContext";

interface HomeOnboardingTemplateStepProps {
  readonly onSaved: () => void;
}

export default function HomeOnboardingTemplateStep({
  onSaved,
}: HomeOnboardingTemplateStepProps) {
  const appPath = useAppPath();

  return (
    <AppHero variant="neutral">
      <p className={APP_SURFACE_EYEBROW_TEXT_CLASS}>Getting started</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white/90">
        Create your first workflow or agent
      </h1>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Build your own in Library — no template required. Or browse presets
        below; each includes a harness bundle (rules, skills, commands,
        instructions, and a specialist subagent) that installs to your Mac when
        Agent Witch is online.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={appPath("/library")}
          className={APP_SURFACE_CTA_PRIMARY_SM_CLASS}
        >
          Create in Library
        </Link>
        <Link
          href={appPath("/library")}
          className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
        >
          Open Library
        </Link>
      </div>
      <CapabilityTemplatePicker onSaved={onSaved} />
    </AppHero>
  );
}
