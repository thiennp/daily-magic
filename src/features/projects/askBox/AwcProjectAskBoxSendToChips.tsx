"use client";

import type { AskBoxSendTarget } from "@/features/projects/askBox/askBoxSendTarget";
import { PROJECT_ASK_BOX_COPY } from "@/features/projects/askBox/projectAskBoxCopy.constant";

interface AwcProjectAskBoxSendToChipsProps {
  readonly targets: readonly AskBoxSendTarget[];
  readonly value: string;
  readonly disabled: boolean;
  readonly onChange: (key: string) => void;
}

/** Send-to chips — assistants + optional This computer (task); no people. */
export default function AwcProjectAskBoxSendToChips({
  targets,
  value,
  disabled,
  onChange,
}: AwcProjectAskBoxSendToChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b border-awc-border bg-awc-surface px-3.5 py-2.5" role="group" aria-label={PROJECT_ASK_BOX_COPY.sendTo}>
      <span className="text-[13px] font-medium text-awc-fg-muted">{PROJECT_ASK_BOX_COPY.sendTo}</span>
      {targets.map((target) => {
        const pressed = target.key === value;
        return (
          <button
            key={target.key}
            type="button"
            disabled={disabled}
            aria-pressed={pressed}
            className={pressed ? "awc-focus-ring rounded-awc-pill bg-awc-blue-600 px-3 py-1 text-[13px] font-medium text-white" : "awc-focus-ring rounded-awc-pill bg-awc-tile-2 px-3 py-1 text-[13px] font-medium text-awc-fg transition hover:bg-awc-fill"}
            onClick={() => {
              onChange(target.key);
            }}
          >
            {target.label}
          </button>
        );
      })}
    </div>
  );
}
