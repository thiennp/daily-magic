import type { AwcMessengerBotStatus } from "@/features/projects/messenger/types/awcProjectMessenger.type";
import { formatMessengerBotStatusLabel } from "@/features/projects/messenger/utils/formatMessengerBotStatusLabel";

interface AwcMessengerStatusDotProps {
  readonly status: AwcMessengerBotStatus;
}

export default function AwcMessengerStatusDot({
  status,
}: AwcMessengerStatusDotProps) {
  const label = formatMessengerBotStatusLabel(status);
  const dotClass =
    status === "working"
      ? "bg-emerald-600"
      : status === "silent" || status === "checks_on_demand"
        ? "bg-amber-600"
        : "bg-gray-200 shadow-[inset_0_0_0_2px_#667085]";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
      <span className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`} aria-hidden />
      <span>{label}</span>
    </span>
  );
}
