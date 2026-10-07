"use client";

import { useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
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
    setSaveState("idle");
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
    <>
      <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
        {C.dispatchSectionTitle}
      </h3>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {C.dispatchLegend}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {C.approvalTip}
      </p>
      <fieldset className="mt-3 space-y-2">
        <legend className="sr-only">{C.dispatchSectionTitle}</legend>
        <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
          <input
            type="radio"
            name={`dispatch-policy-${groupId}`}
            checked={policy === DispatchPolicy.APPROVAL}
            onChange={() => {
              setPolicy(DispatchPolicy.APPROVAL);
              setSaveState("idle");
            }}
            className="mt-1"
          />
          <span>
            <span className="block text-sm font-medium text-gray-800 dark:text-white/90">
              {C.approvalLabel}
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {C.approvalHelper}
            </span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
          <input
            type="radio"
            name={`dispatch-policy-${groupId}`}
            checked={policy === DispatchPolicy.OPEN}
            onChange={() => {
              setPolicy(DispatchPolicy.OPEN);
              setSaveState("idle");
            }}
            className="mt-1"
          />
          <span>
            <span className="block text-sm font-medium text-gray-800 dark:text-white/90">
              {C.openLabel}
            </span>
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {C.openHelper}
            </span>
          </span>
        </label>
      </fieldset>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          onClick={() => void savePolicy()}
          disabled={isSaving}
        >
          {isSaving ? C.savingPolicy : C.savePolicy}
        </Button>
        {saveState === "fail" ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => void savePolicy()}
            disabled={isSaving}
          >
            {C.tryAgain}
          </Button>
        ) : null}
      </div>
      {saveState === "ok" ? (
        <p className="mt-2 text-xs text-success-600 dark:text-success-400">
          {C.policySaved}{" "}
          {policy === DispatchPolicy.OPEN ? C.openLabel : C.approvalLabel} is
          now on.
        </p>
      ) : null}
      {saveState === "fail" ? (
        <p className="mt-2 text-xs text-error-600 dark:text-error-400">
          {C.policySaveFail}
        </p>
      ) : null}
    </>
  );

  if (embedded) {
    return (
      <div className="mt-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
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
