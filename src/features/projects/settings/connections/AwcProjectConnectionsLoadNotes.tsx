import type { ProjectConnectionsLoadState } from "@/features/projects/settings/connections/projectConnection.types";
import { CONNECTION_BTN_PRIMARY } from "@/features/projects/settings/connections/projectConnectionClasses.constant";
import { PROJECT_CONNECTIONS_COPY as C } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";

interface AwcProjectConnectionsLoadNotesProps {
  readonly loadState: ProjectConnectionsLoadState;
  readonly isOwner: boolean;
  readonly onRetry: () => void;
}

const NOTE = "text-[13px] text-awc-fg-muted dark:text-gray-400";

/** Loading / error / unavailable / forbidden lines under the Connections intro. */
export default function AwcProjectConnectionsLoadNotes({
  loadState,
  isOwner,
  onRetry,
}: AwcProjectConnectionsLoadNotesProps) {
  return (
    <>
      {loadState === "loading" ? (
        <>
          <p role="status" className="text-sm font-medium text-awc-fg-muted">
            {C.loading}
          </p>
          <ul
            aria-hidden="true"
            className="divide-y divide-awc-border rounded-awc-lg border border-awc-border"
          >
            {[0, 1, 2, 3].map((row) => (
              <li key={row} className="flex flex-col gap-2 px-4 py-4">
                <span className="h-3.5 w-2/5 animate-pulse rounded bg-awc-tile" />
                <span className="h-3 w-3/5 animate-pulse rounded bg-awc-tile" />
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {loadState === "error" ? (
        <div
          role="alert"
          className="flex flex-col items-start gap-2 rounded-awc-lg border border-awc-bad/30 bg-awc-bad-soft p-4"
        >
          <h4 className="text-sm font-semibold text-awc-fg">{C.errorTitle}</h4>
          <p className="text-sm text-awc-fg-muted">{C.errorBody}</p>
          <button
            type="button"
            className={CONNECTION_BTN_PRIMARY}
            onClick={onRetry}
          >
            {C.errorRetry}
          </button>
        </div>
      ) : null}
      {loadState === "unavailable" ? (
        <p className={NOTE} role="status">
          {C.unavailable}
        </p>
      ) : null}
      {!isOwner ? (
        <p className="rounded-awc-lg bg-awc-tile px-3 py-2.5 text-[13px] text-awc-fg dark:bg-white/5">
          {C.forbidden}
        </p>
      ) : null}
    </>
  );
}
