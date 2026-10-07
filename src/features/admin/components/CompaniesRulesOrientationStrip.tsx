"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

interface ProjectOption {
  readonly id: string;
  readonly name: string;
}

interface CompaniesRulesOrientationStripProps {
  readonly groupId: string | null;
  readonly canConfigureDispatchPolicy: boolean;
  readonly onOpenCompanySettings: () => void;
}

export default function CompaniesRulesOrientationStrip({
  groupId,
  canConfigureDispatchPolicy,
  onOpenCompanySettings,
}: CompaniesRulesOrientationStripProps) {
  const [policy, setPolicy] = useState<DispatchPolicyValue | null>(null);
  const [projects, setProjects] = useState<readonly ProjectOption[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    if (!groupId) {
      setPolicy(null);
      return;
    }

    void (async () => {
      const response = await fetch(
        `/api/admin/groups/${groupId}/dispatch-policy`,
      );
      if (!response.ok) {
        return;
      }
      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "dispatchPolicy" in data &&
        typeof (data as { dispatchPolicy: string }).dispatchPolicy === "string"
      ) {
        const next = (data as { dispatchPolicy: string }).dispatchPolicy;
        if (
          next === DispatchPolicy.OPEN ||
          next === DispatchPolicy.APPROVAL
        ) {
          setPolicy(next);
        }
      }
    })();
  }, [groupId]);

  useEffect(() => {
    void (async () => {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        return;
      }
      const data: unknown = await response.json();
      if (
        typeof data !== "object" ||
        data === null ||
        !("projects" in data) ||
        !Array.isArray((data as { projects: unknown }).projects)
      ) {
        return;
      }
      const next: ProjectOption[] = [];
      for (const raw of (data as { projects: unknown[] }).projects) {
        if (
          typeof raw === "object" &&
          raw !== null &&
          "id" in raw &&
          "name" in raw &&
          typeof (raw as { id: unknown }).id === "string" &&
          typeof (raw as { name: unknown }).name === "string"
        ) {
          next.push({
            id: (raw as { id: string }).id,
            name: (raw as { name: string }).name,
          });
        }
      }
      setProjects(next);
      if (next.length > 0) {
        setSelectedProjectId((current) =>
          current && next.some((project) => project.id === current)
            ? current
            : next[0].id,
        );
      }
    })();
  }, []);

  const policyLabel =
    policy === DispatchPolicy.OPEN
      ? C.openLabel
      : policy === DispatchPolicy.APPROVAL
        ? C.approvalLabel
        : null;
  const policyHelper =
    policy === DispatchPolicy.OPEN
      ? C.openHelper
      : policy === DispatchPolicy.APPROVAL
        ? C.approvalHelper
        : null;

  const safetyHref =
    selectedProjectId.length > 0
      ? `/projects/${encodeURIComponent(selectedProjectId)}#pitfalls`
      : null;

  return (
    <AppPanel padding="compact">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {C.rulesStripTitle}
      </h2>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {C.dispatchSectionTitle}
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {C.dispatchTip}
          </p>
          {groupId && policyLabel ? (
            <>
              <p className="mt-3 text-sm font-semibold text-gray-800 dark:text-white/90">
                {policyLabel}
              </p>
              {policyHelper ? (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {policyHelper}
                </p>
              ) : null}
              <div className="mt-3">
                <Button size="sm" variant="outline" onClick={onOpenCompanySettings}>
                  {canConfigureDispatchPolicy ? C.changePolicy : C.viewPolicy}
                </Button>
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {groupId
                ? C.runsLoading
                : "Create a company to set who can send tasks to this computer."}
            </p>
          )}
        </section>

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
                    setSelectedProjectId(event.target.value);
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
      </div>
    </AppPanel>
  );
}
