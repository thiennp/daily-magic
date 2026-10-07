/**
 * Soft-degrade guard where Neon meta adapter receives IDB input (SPEC §11.3).
 * IDB failure must never trigger a Neon write or a bad upsert.
 * Neon stays unchanged; Load older falls through without IDB.
 */

export type IdbFailureKind =
  | "quota"
  | "blocked"
  | "corrupt"
  | "unavailable"
  | "write_fail"
  | "read_fail";

export type IdbReadResult<T> =
  | { readonly ok: true; readonly entries: readonly T[] }
  | {
      readonly ok: false;
      readonly failure: IdbFailureKind;
      readonly message?: string;
    };

export type NeonUpsertDecision =
  | { readonly allowUpsert: true; readonly idbEntries: readonly unknown[] }
  | {
      readonly allowUpsert: false;
      readonly reason: "idb_failure_soft_degrade";
      readonly failure: IdbFailureKind;
      /** Empty — pager skips IDB layer. */
      readonly idbEntries: readonly [];
      /** Neon must not be written from this IDB outcome. */
      readonly neonWriteForbidden: true;
    };

/**
 * Decide whether reconcile/upsert may push Neon meta after an IDB touch.
 * Any IDB failure → Soft degrade: no Neon write, empty idbEntries for pager.
 */
export const decideNeonUpsertGivenIdb = <T>(
  idb: IdbReadResult<T> | { readonly ok: false; readonly failure: IdbFailureKind },
): NeonUpsertDecision => {
  if (idb.ok) {
    return { allowUpsert: true, idbEntries: idb.entries };
  }
  return {
    allowUpsert: false,
    reason: "idb_failure_soft_degrade",
    failure: idb.failure,
    idbEntries: [],
    neonWriteForbidden: true,
  };
};

/** Map DOM / IDB error names to SPEC failure kinds. */
export const classifyIdbError = (error: unknown): IdbFailureKind => {
  const name =
    error !== null &&
    typeof error === "object" &&
    "name" in error &&
    typeof (error as { name: unknown }).name === "string"
      ? (error as { name: string }).name
      : "";
  const message =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "";
  const blob = `${name} ${message}`.toLowerCase();
  if (blob.includes("quota") || name === "QuotaExceededError") {
    return "quota";
  }
  if (
    blob.includes("blocked") ||
    name === "BlockedError" ||
    blob.includes("versionchange")
  ) {
    return "blocked";
  }
  if (
    blob.includes("corrupt") ||
    blob.includes("invalidstate") ||
    name === "InvalidStateError"
  ) {
    return "corrupt";
  }
  if (
    blob.includes("unavailable") ||
    blob.includes("security") ||
    name === "SecurityError" ||
    blob.includes("indexeddb is not available")
  ) {
    return "unavailable";
  }
  if (blob.includes("write") || blob.includes("put") || blob.includes("abort")) {
    return "write_fail";
  }
  return "read_fail";
};

/**
 * Safe wrapper: run an IDB op; on throw return Soft-degrade result.
 * Never rethrows to callers that would then upsert Neon.
 */
export const softIdbCall = async <T>(
  op: () => Promise<readonly T[]>,
): Promise<IdbReadResult<T>> => {
  try {
    const entries = await op();
    return { ok: true, entries };
  } catch (error) {
    return {
      ok: false,
      failure: classifyIdbError(error),
      message: error instanceof Error ? error.message : String(error),
    };
  }
};

/**
 * Gate for History reconcile → Dispatch upsert.
 * If IDB failed during the same reconcile, refuse Neon write.
 */
export const gateNeonUpsertAfterIdb = async <TMeta extends object>(input: {
  readonly idb: IdbReadResult<unknown>;
  readonly upsert: () => Promise<
    | { readonly ok: true; readonly upserted: readonly TMeta[] }
    | { readonly ok: false; readonly reason: string }
  >;
}): Promise<
  | {
      readonly ok: true;
      readonly upserted: readonly TMeta[];
      readonly idbDegraded: false;
    }
  | {
      readonly ok: true;
      readonly upserted: readonly [];
      readonly idbDegraded: true;
      readonly failure: IdbFailureKind;
      readonly neonUnchanged: true;
    }
  | { readonly ok: false; readonly reason: string }
> => {
  const decision = decideNeonUpsertGivenIdb(input.idb);
  if (!decision.allowUpsert) {
    return {
      ok: true,
      upserted: [],
      idbDegraded: true,
      failure: decision.failure,
      neonUnchanged: true,
    };
  }
  const result = await input.upsert();
  if (!result.ok) {
    return { ok: false, reason: result.reason };
  }
  return {
    ok: true,
    upserted: result.upserted,
    idbDegraded: false,
  };
};
