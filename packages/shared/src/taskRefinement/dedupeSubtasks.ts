import { normalizeTaskTitle } from "./normalizeTaskTitle";

export type DedupableSubtask = {
  readonly title: string;
  readonly skillId?: string | undefined;
  readonly skillParams?: Readonly<Record<string, unknown>> | undefined;
};

const stableParams = (params: Readonly<Record<string, unknown>>): string =>
  JSON.stringify(
    Object.keys(params)
      .sort()
      .map((key) => [key, params[key]]),
  );

/** Same skill with the same params is one task; otherwise the same normalized title is. */
export const subtaskDedupeKey = (subtask: DedupableSubtask): string =>
  subtask.skillId !== undefined
    ? `skill:${subtask.skillId}:${stableParams(subtask.skillParams ?? {})}`
    : `title:${normalizeTaskTitle(subtask.title)}`;

/** Drop repeats (within the list, or against keys that already exist). First one wins. */
export const dedupeSubtasks = <T extends DedupableSubtask>(
  subtasks: readonly T[],
  existingKeys: ReadonlySet<string> = new Set(),
): { readonly kept: readonly T[]; readonly dropped: readonly T[] } => {
  const seen = new Set(existingKeys);
  const kept: T[] = [];
  const dropped: T[] = [];
  for (const subtask of subtasks) {
    const key = subtaskDedupeKey(subtask);
    (seen.has(key) ? dropped : kept).push(subtask);
    seen.add(key);
  }
  return { kept, dropped };
};
