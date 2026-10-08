import { AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY as C } from "@/features/projects/access/invites/awcProjectInviteAddAssistantCopy.constant";
import AwcAssistantAvatarTile from "@/features/projects/access/invites/AwcAssistantAvatarTile";
import type { AwcSupportedAssistant } from "@/features/projects/access/invites/awcSupportedAssistants";

interface Props {
  readonly items: readonly AwcSupportedAssistant[];
  readonly value: string;
  readonly onSelect: (id: string) => void;
}

const ROW = "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left";

/** Radio-card rows, 2 columns on desktop and 1 on phone. */
export default function AwcSupportedAssistantsList({
  items,
  value,
  onSelect,
}: Props) {
  return (
    <div
      role="radiogroup"
      aria-label={C.dialogTitle}
      className="grid max-h-[50vh] gap-2 overflow-auto sm:grid-cols-2"
    >
      {items.map((a) => (
        <button
          key={a.id}
          type="button"
          role="radio"
          aria-checked={a.id === value}
          data-assistant-option={a.id}
          onClick={() => onSelect(a.id)}
          className={`${ROW} ${a.id === value ? "border-awc-border-strong bg-awc-surface-2" : "border-awc-border bg-awc-surface"}`}
        >
          <AwcAssistantAvatarTile label={a.label} />
          <span className="grid min-w-0">
            <span className="text-[13px] font-semibold text-awc-fg">
              {a.label}
            </span>
            <span className="text-xs text-awc-fg-muted">{a.hint}</span>
          </span>
        </button>
      ))}
      {items.length === 0 ? (
        <p className="m-0 text-sm text-awc-fg-muted">{C.dialogNoMatch}</p>
      ) : null}
    </div>
  );
}
