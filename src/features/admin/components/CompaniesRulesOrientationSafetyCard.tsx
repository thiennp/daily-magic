"use client";

import Link from "next/link";

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
    <section className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {C.safetyKicker}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {C.safetyTip}
      </p>
      <p className="mt-3 text-sm font-semibold text-gray-800 dark:text-white/90">
        {C.safetyValue}
      </p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {C.safetyBody}
      </p>
      {projects.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          {C.safetyNoProjects}
        </p>
      ) : (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="flex-1 text-sm text-gray-700 dark:text-gray-300">
            <span className="sr-only">{C.safetyProjectSelectAria}</span>
            <select
              aria-label={C.safetyProjectSelectAria}
              value={selectedProjectId}
              onChange={(event) => {
                onSelectedProjectIdChange(event.target.value);
              }}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
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
