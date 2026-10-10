"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import AdminCostBreakdownPanel from "@/features/admin/components/AdminCostBreakdownPanel";
import AdminCostBudgetPanel from "@/features/admin/components/AdminCostBudgetPanel";
import AdminDashboardStatCard from "@/features/admin/components/AdminDashboardStatCard";
import { BILLING_COPY } from "@/features/billing/public-api/types";
import { useAdminCostControl } from "@/features/billing/public-api/presentation";

const LINK_CLASS =
  "rounded-lg bg-awc-surface-2 px-3 py-2 text-sm text-awc-fg hover:text-awc-blue-600";

/** Staff admin overview: cost estimate first, then where to act. */
export default function AdminDashboard() {
  const { data, isLoading, error, refresh } = useAdminCostControl();

  if (isLoading) {
    return (
      <p className="text-sm text-awc-fg-muted">
        {BILLING_COPY.adminCostLoading}
      </p>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-awc-bad">
          {error ?? BILLING_COPY.adminCostError}
        </p>
        <Button size="sm" variant="outline" onClick={() => void refresh()}>
          {BILLING_COPY.tryAgain}
        </Button>
      </div>
    );
  }

  const { signals } = data;

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-awc-fg">Admin dashboard</h1>
          <p className="text-sm text-awc-fg-muted">Month {data.month}</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => void refresh()}>
          Refresh
        </Button>
      </header>
      <AdminCostBudgetPanel data={data} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminDashboardStatCard
          label={BILLING_COPY.adminGateLabel}
          value={data.trialGate}
        />
        <AdminDashboardStatCard
          label="Counted users"
          value={String(signals.countedUsers)}
          hint="Trial or free, in the estimate"
        />
        <AdminDashboardStatCard
          label="Excluded users"
          value={String(signals.eligibleUsers - signals.countedUsers)}
          hint="Left out by an admin"
        />
        <AdminDashboardStatCard
          label="If every user counted"
          value={`€${signals.estimatedAllUsersSpendEur.toFixed(2)}`}
          hint={`${signals.eligibleUsers} trial/free users`}
        />
      </div>
      <AdminCostBreakdownPanel signals={signals} />
      <div className="flex flex-wrap gap-2">
        <Link href="/admin/users" className={LINK_CLASS}>
          Manage users and exclusions
        </Link>
        <Link href="/admin/cost-control" className={LINK_CLASS}>
          Cost control details
        </Link>
      </div>
    </div>
  );
}
