"use client";

import Button from "@/components/ui/button/Button";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

interface GroupDispatchPolicyFieldsProps {
  readonly groupId: string;
  readonly policy: DispatchPolicyValue;
  readonly isSaving: boolean;
  readonly saveState: "idle" | "ok" | "fail";
  readonly onPolicyChange: (policy: DispatchPolicyValue) => void;
  readonly onSave: () => void;
}

export default function GroupDispatchPolicyFields({
  groupId,
  policy,
  isSaving,
  saveState,
  onPolicyChange,
  onSave,
}: GroupDispatchPolicyFieldsProps) {
  return (
    <>
      <h3 className="text-sm font-semibold text-awc-fg">
        {C.dispatchSectionTitle}
      </h3>
      <p className="mt-1 text-xs text-awc-fg-muted">
        {C.dispatchLegend}
      </p>
      <p className="mt-1 text-xs text-awc-fg-muted">
        {C.approvalTip}
      </p>
      <fieldset className="mt-3 space-y-2">
        <legend className="sr-only">{C.dispatchSectionTitle}</legend>
        <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-awc-border p-3">
          <input
            type="radio"
            name={`dispatch-policy-${groupId}`}
            checked={policy === DispatchPolicy.APPROVAL}
            onChange={() => {
              onPolicyChange(DispatchPolicy.APPROVAL);
            }}
            className="mt-1"
          />
          <span>
            <span className="block text-sm font-medium text-awc-fg">
              {C.approvalLabel}
            </span>
            <span className="block text-xs text-awc-fg-muted">
              {C.approvalHelper}
            </span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-awc-border p-3">
          <input
            type="radio"
            name={`dispatch-policy-${groupId}`}
            checked={policy === DispatchPolicy.OPEN}
            onChange={() => {
              onPolicyChange(DispatchPolicy.OPEN);
            }}
            className="mt-1"
          />
          <span>
            <span className="block text-sm font-medium text-awc-fg">
              {C.openLabel}
            </span>
            <span className="block text-xs text-awc-fg-muted">
              {C.openHelper}
            </span>
          </span>
        </label>
      </fieldset>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button onClick={() => void onSave()} disabled={isSaving}>
          {isSaving ? C.savingPolicy : C.savePolicy}
        </Button>
        {saveState === "fail" ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => void onSave()}
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
}
