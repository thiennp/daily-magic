interface AwcProjectPresenceBadgeProps {
  readonly statusIcon: "online" | "offline" | "reconnecting";
  readonly text: string;
}

const DOT_CLASS_BY_STATUS: Record<
  AwcProjectPresenceBadgeProps["statusIcon"],
  string
> = {
  online: "bg-success-500",
  offline: "bg-gray-300 dark:bg-gray-600",
  reconnecting: "bg-warning-500",
};

const TEXT_CLASS_BY_STATUS: Record<
  AwcProjectPresenceBadgeProps["statusIcon"],
  string
> = {
  online: "text-gray-700 dark:text-gray-200",
  offline: "text-gray-500 dark:text-gray-400",
  reconnecting: "text-gray-700 dark:text-gray-200",
};

export default function AwcProjectPresenceBadge({
  statusIcon,
  text,
}: AwcProjectPresenceBadgeProps) {
  return (
    <p
      className={`inline-flex items-center gap-1.5 text-xs ${TEXT_CLASS_BY_STATUS[statusIcon]}`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT_CLASS_BY_STATUS[statusIcon]}`}
      />
      {text}
    </p>
  );
}
