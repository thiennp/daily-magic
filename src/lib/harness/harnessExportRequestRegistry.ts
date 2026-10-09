import type { BorrowedHarnessExportSet } from "@/lib/harness/types/HarnessExportResult.type";
import { parseHarnessExportResultPayload } from "@/lib/harness/types/HarnessExportResult.type";

type HarnessExportResolver = {
  readonly resolve: (sets: readonly BorrowedHarnessExportSet[]) => void;
  readonly reject: (error: Error) => void;
};

/** Who a pending export is between: only the lender's agent may answer it. */
export type HarnessExportParties = {
  readonly lenderUserId: string;
  readonly borrowerUserId: string;
};

const pendingHarnessExports = new Map<string, HarnessExportResolver>();
const pendingHarnessExportParties = new Map<string, HarnessExportParties>();

export const peekHarnessExportParties = (
  requestId: string | undefined,
): HarnessExportParties | undefined =>
  requestId === undefined
    ? undefined
    : pendingHarnessExportParties.get(requestId);

export const registerHarnessExportRequest = (
  requestId: string,
  parties: HarnessExportParties,
  timeoutMs: number = 15_000,
): Promise<readonly BorrowedHarnessExportSet[]> =>
  new Promise((resolve, reject) => {
    pendingHarnessExportParties.set(requestId, parties);
    const timeout = setTimeout(() => {
      pendingHarnessExports.delete(requestId);
      pendingHarnessExportParties.delete(requestId);
      reject(new Error("Harness export timed out."));
    }, timeoutMs);

    pendingHarnessExports.set(requestId, {
      resolve: (sets) => {
        clearTimeout(timeout);
        pendingHarnessExports.delete(requestId);
        pendingHarnessExportParties.delete(requestId);
        resolve(sets);
      },
      reject: (error) => {
        clearTimeout(timeout);
        pendingHarnessExports.delete(requestId);
        pendingHarnessExportParties.delete(requestId);
        reject(error);
      },
    });
  });

export const completeHarnessExportRequest = (
  requestId: string | undefined,
  payload: unknown,
): boolean => {
  if (requestId === undefined || requestId.length === 0) {
    return false;
  }

  const pending = pendingHarnessExports.get(requestId);

  if (pending === undefined) {
    return false;
  }

  const parsed = parseHarnessExportResultPayload(payload);

  if (parsed?.success === true && parsed.sets !== undefined) {
    pending.resolve(parsed.sets);
    return true;
  }

  pending.reject(
    new Error(parsed?.errorMessage ?? "Harness export failed on owner Mac."),
  );
  return true;
};
