import { AWC_TASKS_PRIMARY_BUTTON_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";

/** Warning when the project has no folder, or the folder is gone on its computer. */
export default function AwcProjectFolderMissingWarning({
  hasFolder,
  computerName,
  onChange,
}: {
  readonly hasFolder: boolean;
  readonly computerName: string;
  /** Opens the change dialog; null when only AgentWitch Local on the computer can fix it. */
  readonly onChange: (() => void) | null;
}) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded-awc-lg bg-awc-warn-soft px-3 py-2.5 text-[13px] text-awc-fg"
    >
      <span className="min-w-0 flex-1">
        <b className="font-semibold">
          {hasFolder
            ? "The project folder is missing."
            : "No project folder yet."}
        </b>{" "}
        Assistants cannot run tasks until a folder is set.{" "}
        {onChange === null
          ? `Open AgentWitch Local on ${computerName} to choose one.`
          : null}
      </span>
      {onChange !== null ? (
        <button
          type="button"
          className={AWC_TASKS_PRIMARY_BUTTON_CLASS}
          onClick={onChange}
        >
          Change folder
        </button>
      ) : null}
    </div>
  );
}
