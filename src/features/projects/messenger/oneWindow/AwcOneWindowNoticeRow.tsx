import { OW_NOTICE_CLASS } from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";

interface AwcOneWindowNoticeRowProps {
  readonly text: string;
  readonly timeLabel?: string;
  readonly action?: { readonly label: string; readonly onClick: () => void };
}

/** In-feed notice row (archived / wake / quiet / joined). */
export default function AwcOneWindowNoticeRow({
  text,
  timeLabel,
  action,
}: AwcOneWindowNoticeRowProps) {
  return (
    <div className={OW_NOTICE_CLASS} role="note">
      <span className="min-w-[200px] flex-1">{text}</span>
      {action !== undefined ? (
        <button
          type="button"
          onClick={action.onClick}
          className="rounded-lg border border-awc-control-border bg-awc-surface px-2.5 py-1 text-[12.5px] font-medium text-awc-fg hover:bg-awc-surface-2"
        >
          {action.label}
        </button>
      ) : null}
      {timeLabel !== undefined ? (
        <span className="text-[12px] text-awc-fg-subtle">{timeLabel}</span>
      ) : null}
    </div>
  );
}
