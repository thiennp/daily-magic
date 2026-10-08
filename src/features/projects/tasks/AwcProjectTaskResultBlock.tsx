"use client";

import { useState } from "react";

import type { ProjectTaskMeta } from "@/features/projects/tasks/projectTask.type";
import { resolveTaskResultBlock } from "@/features/projects/tasks/utils/resolveTaskResultBlock";

/** Short "why" box for failed / denied / timed-out tasks. */
export default function AwcProjectTaskResultBlock({
  task,
}: {
  readonly task: ProjectTaskMeta;
}) {
  const [expanded, setExpanded] = useState(false);
  const result = resolveTaskResultBlock(task);
  if (result === null) return null;
  const isBad = result.tone === "bad";

  return (
    <div
      role={isBad ? "alert" : undefined}
      className={`mt-3 rounded-lg border p-3 text-[13px] ${
        isBad
          ? "border-awc-bad bg-awc-bad-soft text-awc-bad"
          : "border-awc-border bg-awc-tile text-awc-fg"
      }`}
    >
      <p className="m-0 font-semibold">{result.title}</p>
      {result.body.length > 0 ? (
        <pre className="m-0 mt-1 font-sans break-words whitespace-pre-wrap">
          {expanded ? result.body : result.preview}
          {!expanded && result.truncated ? "…" : ""}
        </pre>
      ) : null}
      {result.truncated ? (
        <button
          type="button"
          className="mt-2 text-[12px] font-medium underline"
          onClick={() => setExpanded((open) => !open)}
        >
          {expanded ? "Show less" : "Show full output"}
        </button>
      ) : null}
    </div>
  );
}
