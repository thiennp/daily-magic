import AppPanel from "@/components/surfaces/AppPanel";

interface AdminDashboardStatCardProps {
  readonly label: string;
  readonly value: string;
  readonly hint?: string;
}

export default function AdminDashboardStatCard({
  label,
  value,
  hint,
}: AdminDashboardStatCardProps) {
  return (
    <AppPanel padding="compact">
      <p className="text-xs font-semibold uppercase tracking-wide text-awc-fg-subtle">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-awc-fg">{value}</p>
      {hint ? <p className="mt-1 text-xs text-awc-fg-muted">{hint}</p> : null}
    </AppPanel>
  );
}
