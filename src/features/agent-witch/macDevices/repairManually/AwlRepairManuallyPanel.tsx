"use client";

import { useMemo } from "react";

import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AwlRepairManuallyCommandBlock from "@/features/agent-witch/macDevices/repairManually/AwlRepairManuallyCommandBlock";
import { AWL_REPAIR_MANUALLY_COPY } from "@/features/agent-witch/macDevices/repairManually/awlRepairManuallyCopy.constant";
import { buildAwlRepairManuallySteps } from "@/features/agent-witch/macDevices/repairManually/buildAwlRepairManuallySteps";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

interface AwlRepairManuallyPanelProps {
  /** Defaults to the browser OS (Linux → systemd revive block). */
  readonly operatingSystem?: string;
  readonly hostname?: string;
}

const MUTED_CLASS = "mt-1 text-sm text-gray-500 dark:text-gray-400";

/** Static Repair manually steps — no health polling in v1. */
export default function AwlRepairManuallyPanel({
  operatingSystem,
  hostname,
}: AwlRepairManuallyPanelProps) {
  const copy = AWL_REPAIR_MANUALLY_COPY;
  const steps = useMemo(
    () =>
      buildAwlRepairManuallySteps({
        operatingSystem: operatingSystem ?? detectBrowserOperatingSystem(),
        hostname,
      }),
    [operatingSystem, hostname],
  );

  return (
    <section data-testid="awl-repair-manually">
      <h2 className="pr-10 text-lg font-semibold text-gray-900 dark:text-white/90">
        {copy.title}
      </h2>
      <p className={`mt-3 ${APP_SURFACE_BODY_TEXT_CLASS}`}>{copy.intro}</p>
      <ol className="mt-4 list-decimal space-y-4 pl-5">
        {steps.map((step) => (
          <li key={step.id} data-repair-step={step.id}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white/90">
              {step.title}
            </h3>
            {step.helper !== null ? (
              <p className={MUTED_CLASS}>{step.helper}</p>
            ) : null}
            {step.commands.map((item) => (
              <div key={item.command} className="mt-2">
                {item.label !== null ? (
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {item.label}
                  </p>
                ) : null}
                <AwlRepairManuallyCommandBlock command={item.command} />
                {item.note !== null ? (
                  <p className={MUTED_CLASS}>{item.note}</p>
                ) : null}
              </div>
            ))}
          </li>
        ))}
      </ol>
    </section>
  );
}
