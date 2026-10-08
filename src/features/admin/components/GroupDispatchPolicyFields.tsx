"use client";

import Button from "@/components/ui/button/Button";
import InfoTip from "@/components/ui/infoTip/InfoTip";
import GroupDispatchPolicyStatus from "@/features/admin/components/GroupDispatchPolicyStatus";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

interface GroupDispatchPolicyFieldsProps {
  readonly groupId: string;
  readonly companyName: string;
  readonly policy: DispatchPolicyValue;
  readonly savedPolicy: DispatchPolicyValue;
  readonly canEdit: boolean;
  readonly isSaving: boolean;
  readonly saveState: "idle" | "ok" | "fail";
  readonly onPolicyChange: (policy: DispatchPolicyValue) => void;
  readonly onSave: () => void;
}

const OPTIONS = [
  {
    value: DispatchPolicy.APPROVAL,
    label: C.approvalLabel,
    helper: C.approvalHelper,
  },
  { value: DispatchPolicy.OPEN, label: C.openLabel, helper: C.openHelper },
] as const;

export default function GroupDispatchPolicyFields({
  groupId,
  companyName,
  policy,
  savedPolicy,
  canEdit,
  isSaving,
  saveState,
  onPolicyChange,
  onSave,
}: GroupDispatchPolicyFieldsProps) {
  const dirty = policy !== savedPolicy;
  return (
    <form
      className="mt-3 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (canEdit && dirty && !isSaving) {
          onSave();
        }
      }}
    >
      <fieldset className="space-y-2">
        <legend className="flex items-center gap-2 text-sm font-medium text-awc-fg">
          {C.dispatchLegend}
          <InfoTip text={C.approvalTip} label="About approval" />
        </legend>
        {OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${
              policy === option.value
                ? "border-awc-blue-600 bg-awc-accent-soft"
                : "border-awc-border-strong bg-awc-surface"
            }`}
          >
            <input
              type="radio"
              name={`dispatch-policy-${groupId}`}
              checked={policy === option.value}
              disabled={!canEdit}
              onChange={() => {
                onPolicyChange(option.value);
              }}
              className="mt-1"
            />
            <span>
              <span className="block text-sm font-semibold text-awc-fg">
                {option.label}
              </span>
              <span className="block text-sm text-awc-fg-muted">
                {option.helper}
              </span>
            </span>
          </label>
        ))}
      </fieldset>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={!canEdit || !dirty || isSaving}>
          {isSaving ? C.savingPolicy : C.savePolicy}
        </Button>
        {!canEdit ? (
          <span className="text-sm text-awc-fg-muted">
            {C.onlyAdminsChange}
          </span>
        ) : dirty ? (
          <span className="text-sm text-awc-fg-muted">{C.unsavedChange}</span>
        ) : null}
      </div>
      <GroupDispatchPolicyStatus
        saveState={saveState}
        savedPolicy={savedPolicy}
        companyName={companyName}
        onRetry={onSave}
      />
    </form>
  );
}
