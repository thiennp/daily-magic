import { AWC_PROJECT_MESSENGER_COPY } from "@/features/projects/messenger/awcProjectMessengerCopy.constant";

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
    `rounded-lg px-2.5 py-1.5 text-xs font-medium ${
      active
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200"
    }`;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex gap-1 rounded-xl border border-gray-200 p-0.5 dark:border-gray-800">
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
      <span className="text-xs text-gray-500">
        {mode === "task" ? copy.modeTaskHint : copy.modeMessageHint}
      </span>
    </div>
  );
}
