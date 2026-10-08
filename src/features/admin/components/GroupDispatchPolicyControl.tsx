"use client";

import { useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import GroupDispatchPolicyFields from "@/features/admin/components/GroupDispatchPolicyFields";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

interface GroupDispatchPolicyControlProps {
  readonly groupId: string;
  readonly companyName: string;
  readonly canEdit: boolean;
}

const isPolicy = (value: unknown): value is DispatchPolicyValue =>
  value === DispatchPolicy.OPEN || value === DispatchPolicy.APPROVAL;

export default function GroupDispatchPolicyControl({
  groupId,
  companyName,
  canEdit,
}: GroupDispatchPolicyControlProps) {
  const [saved, setSaved] = useState<DispatchPolicyValue>(
    DispatchPolicy.APPROVAL,
  );
  const [policy, setPolicy] = useState<DispatchPolicyValue>(
    DispatchPolicy.APPROVAL,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "ok" | "fail">("idle");

  useEffect(() => {
    void (async () => {
      await Promise.resolve();
      setSaveState("idle");
      const response = await fetch(
        `/api/admin/groups/${groupId}/dispatch-policy`,
      );
      if (!response.ok) {
        return;
      }
      const data = (await response.json()) as { dispatchPolicy?: unknown };
      if (isPolicy(data.dispatchPolicy)) {
        setSaved(data.dispatchPolicy);
        setPolicy(data.dispatchPolicy);
      }
    })();
  }, [groupId]);

  const savePolicy = async (): Promise<void> => {
    setIsSaving(true);
    setSaveState("idle");
    const response = await fetch(
      `/api/admin/groups/${groupId}/dispatch-policy`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dispatchPolicy: policy }),
      },
    );
    setIsSaving(false);
    setSaveState(response.ok ? "ok" : "fail");
    if (response.ok) {
      setSaved(policy);
    }
  };

  return (
    <AppPanel padding="compact" aria-labelledby="pol-h">
      <h2 id="pol-h" className="text-lg font-semibold text-awc-fg">
        {C.dispatchSectionTitle}
      </h2>
      <GroupDispatchPolicyFields
        groupId={groupId}
        companyName={companyName}
        policy={policy}
        savedPolicy={saved}
        canEdit={canEdit}
        isSaving={isSaving}
        saveState={saveState}
        onPolicyChange={(next) => {
          setPolicy(next);
          setSaveState("idle");
        }}
        onSave={() => {
          void savePolicy();
        }}
      />
    </AppPanel>
  );
}
