interface AwcProjectPresenceBadgeProps {
  readonly statusIcon: "online" | "offline" | "reconnecting";
  readonly text: string;
  readonly variant?: "plain" | "pill";
}

const DOT_CLASS_BY_STATUS: Record<
  AwcProjectPresenceBadgeProps["statusIcon"],
  string
> = {
  online: "bg-success-500",
  offline: "bg-awc-border-strong dark:bg-gray-600",
  reconnecting: "bg-warning-500",
};

const TEXT_CLASS_BY_STATUS: Record<
  AwcProjectPresenceBadgeProps["statusIcon"],
  string
> = {
  online: "text-awc-fg dark:text-gray-200",
  offline: "text-awc-fg-muted dark:text-gray-400",
  reconnecting: "text-awc-fg dark:text-gray-200",
};

const PILL_CLASS_BY_STATUS: Record<
  AwcProjectPresenceBadgeProps["statusIcon"],
  string
> = {
  online:
    "bg-awc-tile-2 text-awc-fg ring-1 ring-awc-border dark:bg-white/10 dark:text-gray-100 dark:ring-white/15",
  offline:
    "bg-awc-tile text-awc-fg-muted ring-1 ring-awc-border dark:bg-white/5 dark:text-gray-400 dark:ring-white/10",
  reconnecting:
    "bg-awc-tile-2 text-awc-fg ring-1 ring-awc-border dark:bg-white/10 dark:text-gray-100 dark:ring-white/15",
};

export default function AwcProjectPresenceBadge({
  statusIcon,
  text,
  variant = "plain",
}: AwcProjectPresenceBadgeProps) {
  const isPill = variant === "pill";
  return (
    <p
      role="status"
      aria-label={`Computer status: ${text}`}
      className={`inline-flex shrink-0 items-center gap-1.5 text-xs ${
        isPill
          ? `rounded-full px-2.5 py-1 font-medium ${PILL_CLASS_BY_STATUS[statusIcon]}`
          : TEXT_CLASS_BY_STATUS[statusIcon]
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT_CLASS_BY_STATUS[statusIcon]}`}
      />
      {text}
    </p>
  );
}
