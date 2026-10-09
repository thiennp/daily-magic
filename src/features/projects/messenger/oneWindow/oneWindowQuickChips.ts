import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

export type OneWindowQuickChip = {
  readonly id: string;
  readonly label: string;
  /** Text dropped into the composer (the user still presses send). */
  readonly text: string;
};

const MAX_TICKET_CHIPS = 2;
const MAX_LABEL_CHARS = 32;
const STATIC_CHIPS: readonly OneWindowQuickChip[] = [
  {
    id: "summary",
    label: "Summarize progress",
    text: "Summarize where the project stands and what is next.",
  },
  {
    id: "blocked",
    label: "What is blocked?",
    text: "What is blocked right now, and what do you need from me?",
  },
];

const clip = (value: string, max: number): string =>
  value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;

/** "Work on {ticket}" for tasks nobody started, then the fixed shortcuts. */
export const buildOneWindowQuickChips = (
  records: readonly ProjectTaskRecord[],
): readonly OneWindowQuickChip[] => {
  const tickets = records
    .filter((r) => r.status === "queued" || r.status === "planned")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, MAX_TICKET_CHIPS)
    .map((r) => ({
      id: `ticket-${r.id}`,
      label: `Work on ${clip(r.title, MAX_LABEL_CHARS)}`,
      text: `Work on ${r.title}`,
    }));
  return [...tickets, ...STATIC_CHIPS];
};
