import Button from "@/components/ui/button/Button";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

interface GroupDispatchPolicyStatusProps {
  readonly saveState: "idle" | "ok" | "fail";
  readonly savedPolicy: DispatchPolicyValue;
  readonly companyName: string;
  readonly onRetry: () => void;
}

export default function GroupDispatchPolicyStatus({
  saveState,
  savedPolicy,
  companyName,
  onRetry,
}: GroupDispatchPolicyStatusProps) {
  if (saveState === "ok") {
    const label =
      savedPolicy === DispatchPolicy.OPEN ? C.openLabel : C.approvalLabel;
    return (
      <p
        role="status"
        className="rounded-lg border border-awc-ok-dot/40 bg-awc-ok-soft px-4 py-3 text-sm text-awc-fg"
      >
        <b>{C.policySaved}</b> {label} {C.policyOnFor} {companyName}.
      </p>
    );
  }
  if (saveState === "fail") {
    return (
      <div
        role="alert"
        className="flex flex-wrap items-center gap-3 rounded-lg border border-awc-bad-dot/40 bg-awc-bad-soft px-4 py-3 text-sm text-awc-fg"
      >
        <p className="min-w-0 flex-1">
          <b>{C.policySaveFail}</b> {C.policySaveFailBody}
        </p>
        <Button size="sm" variant="outline" onClick={onRetry}>
          {C.tryAgain}
        </Button>
      </div>
    );
  }
  return null;
}
