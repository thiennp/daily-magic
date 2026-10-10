import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import { PROJECT_V5_REASON_CLASS } from "@/features/projects/public-api/types";

/**
 * (i) hint when the project has no owner computer: this browser holds the
 * long-term chat copy. Text stays visible (V5 reason pattern, not hover-only).
 */
export default function AwcMessengerNoComputerHint() {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  return (
    <p
      role="note"
      aria-label={copy.noComputerHintLabel}
      className={`flex items-start gap-1.5 ${PROJECT_V5_REASON_CLASS}`}
    >
      <span
        aria-hidden
        className="mt-px inline-grid size-4 shrink-0 place-items-center rounded-full border border-current text-[10px] font-semibold leading-none"
      >
        i
      </span>
      <span>{copy.noComputerHint}</span>
    </p>
  );
}
