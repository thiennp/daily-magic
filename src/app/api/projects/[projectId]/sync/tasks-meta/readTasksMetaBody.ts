import type { IdbFailureKind } from "@/features/projects/sync/public-api/types";

export type TasksMetaBody = {
  readonly batch?: unknown;
  /** Optional IDB outcome from client reconcile — Soft degrade if failed. */
  readonly idb?: {
    readonly ok: boolean;
    readonly failure?: IdbFailureKind;
  };
};

export const readTasksMetaBody = async (
  request: Request,
): Promise<TasksMetaBody | null> => {
  try {
    return (await request.json()) as TasksMetaBody;
  } catch {
    return null;
  }
};
