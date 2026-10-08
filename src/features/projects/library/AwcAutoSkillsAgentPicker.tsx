"use client";

import { AUTO_SKILL_AGENTS } from "@/features/projects/library/autoSkillsJudges.constant";

interface AwcAutoSkillsAgentPickerProps {
  readonly value: string | null;
  readonly busy: boolean;
  readonly onChange: (agent: string | null) => void;
}

/** Which coding agent judges; shown while the judge can be a coding agent. */
export default function AwcAutoSkillsAgentPicker({
  value,
  busy,
  onChange,
}: AwcAutoSkillsAgentPickerProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] font-medium uppercase tracking-wide text-awc-fg-subtle">
        Coding agent
      </span>
      <select
        value={value ?? ""}
        disabled={busy}
        onChange={(event) => onChange(event.target.value || null)}
        className="w-full max-w-[260px] rounded-lg border border-awc-border bg-white px-3 py-1.5 text-sm text-awc-fg focus:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-white/[0.04] dark:text-white"
      >
        {AUTO_SKILL_AGENTS.map((agent) => (
          <option key={agent.value ?? "any"} value={agent.value ?? ""}>
            {agent.label}
          </option>
        ))}
      </select>
    </label>
  );
}
