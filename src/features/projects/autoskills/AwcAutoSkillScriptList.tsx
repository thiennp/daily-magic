import type {
  AutoSkillScriptInfo,
  AutoSkillScriptInfoEntry,
} from "@/features/project-auto-skills/public-api/types";

const CHIP =
  "rounded-full border border-awc-border px-2 py-0.5 text-[11.5px] text-awc-fg-muted";

const replayLabel = (entry: AutoSkillScriptInfoEntry): string => {
  const { status, exitCode, ms, note } = entry.replay;
  if (status === "not_replayed") {
    return `Not replayed${note !== null ? ` (${note})` : ""}`;
  }
  const time = ms === null ? "" : `, ${ms} ms`;
  return status === "ok"
    ? `Replay ok (exit ${exitCode ?? 0}${time})`
    : `Replay failed (exit ${exitCode ?? "none"}${time})`;
};

/** Scripts of a question: permission chips, replay result and the run warning. */
export default function AwcAutoSkillScriptList({
  info,
}: {
  readonly info: AutoSkillScriptInfo;
}) {
  return (
    <div className="mt-2 text-[13px] text-awc-fg">
      <p className="m-0 font-medium">Scripts ({info.scripts.length})</p>
      <p className="mt-0.5 text-[12.5px] text-awc-fg-muted">
        These scripts will run on your computer when an agent chooses this
        skill.
      </p>
      <ul className="mt-1 list-none space-y-1.5 p-0">
        {info.scripts.map((script) => (
          <li key={script.name}>
            <span className="font-mono text-[12.5px]">{script.name}</span>
            <span className="text-awc-fg-muted"> {script.description}</span>
            <span className="mt-1 flex flex-wrap items-center gap-1.5">
              <span className={CHIP}>
                {script.permissions.write ? "Writes files" : "Read only"}
              </span>
              <span className={CHIP}>
                {script.permissions.network ? "Uses network" : "No network"}
              </span>
              <span className={CHIP}>{replayLabel(script)}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
