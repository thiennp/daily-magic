import type { ProjectFolderStatusResult } from "@/features/projects/settings/folder/projectFolderBridge";

const CHIP = "rounded-full px-2 py-0.5 text-[12px] font-medium";

/** Found / Missing / Git chips from the computer's own check; a skeleton while it answers. */
export default function AwcProjectFolderStatusChips({
  result,
}: {
  readonly result: ProjectFolderStatusResult | "loading";
}) {
  if (result === "loading") {
    return (
      <span
        className="h-5 w-28 animate-pulse rounded-full bg-awc-tile"
        role="status"
        aria-label="Checking the folder"
      />
    );
  }
  if (result.kind === "unreachable" || result.status === null) {
    return (
      <span className={`${CHIP} bg-awc-tile text-awc-fg-muted`}>
        Not checked from this browser
      </span>
    );
  }
  const { folderFound, isGitRepo } = result.status;
  return (
    <>
      <span
        className={`${CHIP} ${folderFound ? "bg-awc-tile text-awc-fg" : "bg-awc-warn-soft text-awc-fg"}`}
      >
        {folderFound ? "Found" : "Missing"}
      </span>
      {folderFound ? (
        <span className={`${CHIP} bg-awc-tile text-awc-fg-muted`}>
          {isGitRepo ? "Git repo" : "Not a git repo"}
        </span>
      ) : null}
    </>
  );
}
