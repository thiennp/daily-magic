"use client";

import Link from "next/link";

import InfoTip from "@/components/ui/infoTip/InfoTip";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import type { CompaniesRulesOrientationProject } from "@/features/admin/types/companiesRulesOrientationProject.type";

interface CompaniesRulesOrientationSafetyCardProps {
  readonly projects: readonly CompaniesRulesOrientationProject[];
  readonly selectedProjectId: string;
  readonly onSelectedProjectIdChange: (projectId: string) => void;
}

export default function CompaniesRulesOrientationSafetyCard({
  projects,
  selectedProjectId,
  onSelectedProjectIdChange,
}: CompaniesRulesOrientationSafetyCardProps) {
  const safetyHref =
    selectedProjectId.length > 0
      ? `/projects/${encodeURIComponent(selectedProjectId)}#pitfalls`
      : null;

  return (
    <section
      aria-labelledby="saf-k"
      className="rounded-xl border border-awc-border bg-awc-surface p-4"
    >
      <p
        id="saf-k"
        className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-awc-fg-muted"
      >
        {C.safetyKicker}
        <InfoTip text={C.safetyTip} label="About Safety rules" />
      </p>
      <p className="mt-3 text-sm font-semibold text-awc-fg">{C.safetyValue}</p>
      <p className="mt-1 text-sm text-awc-fg-muted">{C.safetyBody}</p>
      {projects.length === 0 ? (
        <p className="mt-3 text-sm text-awc-fg-muted">{C.safetyNoProjects}</p>
      ) : (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
          <label className="flex-1 text-sm font-medium text-awc-fg">
            {C.safetyProjectSelectAria}
            <select
              value={selectedProjectId}
              onChange={(event) => {
                onSelectedProjectIdChange(event.target.value);
              }}
              className="mt-1 w-full rounded-lg border border-awc-border px-3 py-2 text-sm font-normal"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
          {safetyHref ? (
            <Link
              href={safetyHref}
              className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              {C.safetyOpenCta}
            </Link>
          ) : null}
        </div>
      )}
    </section>
  );
}
