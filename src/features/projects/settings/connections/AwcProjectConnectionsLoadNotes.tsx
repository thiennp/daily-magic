import Button from "@/components/ui/button/Button";
import type { ProjectConnectionsLoadState } from "@/features/projects/settings/connections/projectConnection.types";
import { PROJECT_CONNECTIONS_COPY as C } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";

interface AwcProjectConnectionsLoadNotesProps {
  readonly loadState: ProjectConnectionsLoadState;
  readonly isOwner: boolean;
  readonly onRetry: () => void;
}

/** Loading / error / unavailable / forbidden lines under the Connections intro. */
export default function AwcProjectConnectionsLoadNotes({
  loadState,
  isOwner,
  onRetry,
}: AwcProjectConnectionsLoadNotesProps) {
  return (
    <>
      {loadState === "loading" ? (
        <p className="text-sm text-awc-fg-muted dark:text-gray-400">{C.loading}</p>
      ) : null}
      {loadState === "error" ? (
        <div className="flex flex-wrap items-center gap-2" role="alert">
          <p className="text-sm text-error-600 dark:text-error-400">
            {C.error}
          </p>
          <Button size="sm" variant="outline" onClick={onRetry}>
            {C.errorRetry}
          </Button>
        </div>
      ) : null}
      {loadState === "unavailable" ? (
        <p className="text-[13px] text-awc-fg-muted dark:text-gray-400" role="status">
          {C.unavailable}
        </p>
      ) : null}
      {!isOwner ? (
        <p className="text-[13px] text-awc-fg-muted dark:text-gray-400">
          {C.forbidden}
        </p>
      ) : null}
    </>
  );
}
