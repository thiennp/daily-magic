import AppPanel from "@/components/surfaces/AppPanel";
import { BILLING_COPY } from "@/features/billing/public-api/types";
import type { AdminCostControlSignals } from "@/features/billing/public-api/types";

export default function AdminCostBreakdownPanel({
  signals,
}: {
  readonly signals: AdminCostControlSignals;
}) {
  const rows = [
    { label: "Railway", value: signals.railwaySpendEur },
    { label: "Neon", value: signals.neonSpendEur },
    { label: "Related infra", value: signals.relatedInfraSpendEur },
    { label: "Estimated users", value: signals.estimatedUserSpendEur },
  ];
  const max = Math.max(...rows.map((row) => row.value), 1);

  return (
    <AppPanel>
      <h2 className="text-sm font-semibold text-awc-fg">
        {BILLING_COPY.adminSignalsHeading}
      </h2>
      <ul className="mt-3 space-y-3">
        {rows.map((row) => (
          <li key={row.label} className="text-sm">
            <div className="flex justify-between text-awc-fg">
              <span>{row.label}</span>
              <span className="font-medium">€{row.value.toFixed(2)}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-awc-fill">
              <div
                className="h-full rounded-full bg-awc-ok-dot"
                style={{ width: `${(row.value / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-awc-fg-muted">
        Bots, test accounts and excluded users are not counted in the estimated
        users line.
      </p>
    </AppPanel>
  );
}
