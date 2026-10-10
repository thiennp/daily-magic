import AppPanel from "@/components/surfaces/AppPanel";
import { formatCostControlProgress } from "@/features/admin/utils/public-api/presentation";
import type {
  AdminCostControl,
  CostControlStatus,
} from "@/features/billing/public-api/types";
import { formatCostControlStatus } from "@/features/billing/public-api/types";

const STATUS_TEXT_CLASS: Record<CostControlStatus, string> = {
  under_budget: "text-awc-ok",
  near_limit: "text-awc-warn",
  over_budget: "text-awc-bad",
};

const STATUS_BAR_CLASS: Record<CostControlStatus, string> = {
  under_budget: "bg-awc-ok-dot",
  near_limit: "bg-awc-warn-dot",
  over_budget: "bg-awc-bad-dot",
};

export default function AdminCostBudgetPanel({
  data,
}: {
  readonly data: AdminCostControl;
}) {
  const progress = formatCostControlProgress(
    data.trialPlusAdminFreeSpendEur,
    data.budgetEur,
  );

  return (
    <AppPanel>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold text-awc-fg">
          Cost estimate vs budget
        </h2>
        <span
          className={`text-sm font-medium ${STATUS_TEXT_CLASS[data.status]}`}
        >
          {formatCostControlStatus(data.status)}
        </span>
      </div>
      <p className="mt-2 text-3xl font-semibold text-awc-fg">
        €{data.trialPlusAdminFreeSpendEur.toFixed(2)}
        <span className="ml-2 text-base font-normal text-awc-fg-muted">
          of €{data.budgetEur.toFixed(2)}
        </span>
      </p>
      <div
        role="progressbar"
        aria-label="Budget used"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="mt-3 h-2 overflow-hidden rounded-full bg-awc-fill"
      >
        <div
          className={`h-full rounded-full ${STATUS_BAR_CLASS[data.status]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </AppPanel>
  );
}
