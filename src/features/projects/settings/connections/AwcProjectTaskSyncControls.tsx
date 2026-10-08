"use client";

import { AWC_TASKS_INPUT_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import { PROJECT_TASK_SYNC_COPY as C } from "@/features/projects/settings/connections/projectTaskSyncCopy.constant";
import type {
  LinearTaskSyncState,
  LinearTaskSyncUpdate,
} from "@/features/projects/settings/connections/projectTaskSync.types";

interface AwcProjectTaskSyncControlsProps {
  readonly state: LinearTaskSyncState;
  readonly busy: boolean;
  readonly onUpdate: (change: LinearTaskSyncUpdate) => void;
}

/** Team picker, enable switch, and "import new issues" checkbox. */
export default function AwcProjectTaskSyncControls({
  state,
  busy,
  onUpdate,
}: AwcProjectTaskSyncControlsProps) {
  const hasTeam = state.externalTeamId !== null;
  const canToggle = hasTeam && !busy;

  return (
    <div className="space-y-2">
      <label className="block text-[13px] text-awc-fg-muted dark:text-gray-300">
        {C.teamLabel}
        <select
          className={`${AWC_TASKS_INPUT_CLASS} mt-1 max-w-xs`}
          value={state.externalTeamId ?? ""}
          disabled={busy}
          onChange={(event) =>
            onUpdate({ externalTeamId: event.target.value || null })
          }
        >
          <option value="">{C.teamPlaceholder}</option>
          {state.teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </label>
      {!hasTeam ? (
        <p className="text-[13px] text-awc-fg-subtle">{C.teamHint}</p>
      ) : null}
      <div className="flex items-center gap-2 text-sm text-awc-fg dark:text-white/90">
        <button
          type="button"
          role="switch"
          aria-checked={state.enabled}
          aria-label={C.switchLabel}
          disabled={!canToggle}
          onClick={() => onUpdate({ enabled: !state.enabled })}
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors disabled:opacity-45 ${
            state.enabled ? "bg-awc-primary" : "bg-awc-fill"
          }`}
        >
          <span
            className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
              state.enabled ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
        <span>{C.switchLabel}</span>
      </div>
      <label className="flex items-center gap-2 text-sm text-awc-fg dark:text-white/90">
        <input
          type="checkbox"
          checked={state.importNew}
          disabled={busy}
          onChange={(event) => onUpdate({ importNew: event.target.checked })}
        />
        {C.importNewLabel}
      </label>
    </div>
  );
}
