"use client";

import { useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import CompaniesRulesOrientationDispatchCard from "@/features/admin/components/CompaniesRulesOrientationDispatchCard";
import CompaniesRulesOrientationSafetyCard from "@/features/admin/components/CompaniesRulesOrientationSafetyCard";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import type { CompaniesRulesOrientationProject } from "@/features/admin/types/companiesRulesOrientationProject.type";
import loadCompaniesRulesOrientationProjects from "@/features/admin/utils/loadCompaniesRulesOrientationProjects";
import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

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
  const [projects, setProjects] = useState<
    readonly CompaniesRulesOrientationProject[]
  >([]);
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
        if (next === DispatchPolicy.OPEN || next === DispatchPolicy.APPROVAL) {
          setPolicy(next);
        }
      }
    })();
  }, [groupId]);

  useEffect(() => {
    void (async () => {
      const next = await loadCompaniesRulesOrientationProjects();
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

  return (
    <AppPanel padding="compact">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {C.rulesStripTitle}
      </h2>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <CompaniesRulesOrientationDispatchCard
          groupId={groupId}
          policy={policy}
          canConfigureDispatchPolicy={canConfigureDispatchPolicy}
          onOpenCompanySettings={onOpenCompanySettings}
        />
        <CompaniesRulesOrientationSafetyCard
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectedProjectIdChange={setSelectedProjectId}
        />
      </div>
    </AppPanel>
  );
}
