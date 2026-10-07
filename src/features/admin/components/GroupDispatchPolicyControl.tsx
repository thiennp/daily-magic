"use client";

import { useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import GroupDispatchPolicyFields from "@/features/admin/components/GroupDispatchPolicyFields";
import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

interface GroupDispatchPolicyControlProps {
  readonly groupId: string;
  readonly embedded?: boolean;
}

export default function GroupDispatchPolicyControl({
  groupId,
  embedded = false,
}: GroupDispatchPolicyControlProps) {
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

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "dispatchPolicy" in data &&
        typeof (data as { dispatchPolicy: string }).dispatchPolicy === "string"
      ) {
        const nextPolicy = (data as { dispatchPolicy: string }).dispatchPolicy;
        if (
          nextPolicy === DispatchPolicy.OPEN ||
          nextPolicy === DispatchPolicy.APPROVAL
        ) {
          setPolicy(nextPolicy);
        }
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
  };

  const content = (
    <GroupDispatchPolicyFields
      groupId={groupId}
      policy={policy}
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
  );

  if (embedded) {
    return (
      <div className="mt-6 rounded-lg border border-awc-border p-4">
        {content}
      </div>
    );
  }

  return (
    <AppPanel as="aside" padding="compact" className="h-fit">
      {content}
    </AppPanel>
  );
}
