import { PROJECT_TASK_RECORDS_COPY as C } from "@/features/projects/tasks/projectTaskRecordsCopy.constant";

export type ProjectTaskRecordsView = "board" | "list";

const VIEWS: readonly ProjectTaskRecordsView[] = ["board", "list"];

/** Board / List switch for the planned-work section. */
export default function AwcProjectTaskRecordViewToggle({
  view,
  onChange,
}: {
  readonly view: ProjectTaskRecordsView;
  readonly onChange: (view: ProjectTaskRecordsView) => void;
}) {
  return (
    <div role="group" aria-label={C.viewAria} className="flex gap-1.5">
      {VIEWS.map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={view === v}
          className={`rounded-full border px-2.5 py-1 text-[13px] font-medium ${
            view === v
              ? "border-awc-fg bg-awc-fg text-awc-surface"
              : "border-awc-border-strong bg-awc-surface text-awc-fg-muted hover:bg-awc-tile"
          }`}
          onClick={() => onChange(v)}
        >
          {v === "board" ? C.viewBoard : C.viewList}
        </button>
      ))}
    </div>
  );
}
