"use client";

export type DownloadStepKey = "download" | "install" | "setup";

export const DOWNLOAD_STEPS: readonly {
  key: DownloadStepKey;
  label: string;
}[] = [
  { key: "download", label: "Download" },
  { key: "install", label: "Install" },
  { key: "setup", label: "Set up" },
];

interface DownloadStepTabsProps {
  readonly step: DownloadStepKey;
  readonly doneSteps: readonly DownloadStepKey[];
  readonly onSelect: (step: DownloadStepKey) => void;
}

/** Download / Install / Set up tab strip (roving tabindex, arrow keys). */
export default function DownloadStepTabs({
  step,
  doneSteps,
  onSelect,
}: DownloadStepTabsProps) {
  const move = (from: number, delta: number) => {
    const next = (from + delta + DOWNLOAD_STEPS.length) % DOWNLOAD_STEPS.length;
    onSelect(DOWNLOAD_STEPS[next].key);
    document.getElementById(`tab-${DOWNLOAD_STEPS[next].key}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Steps"
      className="flex gap-1 overflow-x-auto overflow-y-hidden border-b border-awc-border-strong"
    >
      {DOWNLOAD_STEPS.map((item, index) => {
        const selected = item.key === step;
        return (
          <button
            key={item.key}
            id={`tab-${item.key}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="download-step-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(item.key)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") move(index, 1);
              else if (event.key === "ArrowLeft") move(index, -1);
              else return;
              event.preventDefault();
            }}
            className={`-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-awc-blue-600 ${selected ? "border-awc-blue-600 font-semibold text-awc-blue-700" : "border-transparent font-medium text-awc-fg-muted hover:bg-awc-fill hover:text-awc-fg"}`}
          >
            <span className="grid size-5 place-items-center rounded-full bg-awc-fill text-xs font-semibold">
              {doneSteps.includes(item.key) ? "✓" : index + 1}
            </span>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
