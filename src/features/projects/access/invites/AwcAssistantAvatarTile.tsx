import { assistantInitials } from "@/features/projects/access/invites/awcSupportedAssistants";

/** Small initials tile for a supported assistant. */
export default function AwcAssistantAvatarTile({
  label,
}: {
  readonly label: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-awc-surface-2 text-xs font-semibold text-awc-fg"
    >
      {assistantInitials(label)}
    </span>
  );
}
