import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";
import {
  ACTIVITY_SEGMENT_ACTIVE_CLASS,
  ACTIVITY_SEGMENT_IDLE_CLASS,
} from "@/features/projects/messenger/activityChrome.constant";

export type AwcMessengerComposerMode = "message" | "task";

interface AwcMessengerComposerModeToggleProps {
  readonly mode: AwcMessengerComposerMode;
  readonly disabled: boolean;
  readonly onMode: (mode: AwcMessengerComposerMode) => void;
}

export default function AwcMessengerComposerModeToggle({
  mode,
  disabled,
  onMode,
}: AwcMessengerComposerModeToggleProps) {
  const copy = AWC_PROJECT_MESSENGER_COPY;
  const chip = (active: boolean) =>
    active ? ACTIVITY_SEGMENT_ACTIVE_CLASS : ACTIVITY_SEGMENT_IDLE_CLASS;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex gap-1 rounded-xl border border-awc-border p-0.5 dark:border-gray-800">
        <button
          type="button"
          className={chip(mode === "message")}
          aria-pressed={mode === "message"}
          disabled={disabled}
          onClick={() => {
            onMode("message");
          }}
        >
          {copy.modeMessage}
        </button>
        <button
          type="button"
          className={chip(mode === "task")}
          aria-pressed={mode === "task"}
          disabled={disabled}
          onClick={() => {
            onMode("task");
          }}
        >
          {copy.modeTask}
        </button>
      </div>
      <span className="text-xs text-awc-fg-muted">
        {mode === "task" ? copy.modeTaskHint : copy.modeMessageHint}
      </span>
    </div>
  );
}
