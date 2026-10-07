/**
 * IndexedDB Soft degrade helpers at the pager / reconcile boundary (SPEC §11.3).
 * Human UI owns the real IDB client; History tests Soft degrade with fakes here.
 * When IDB fails: continue from local and/or Neon; never throw to block Load older;
 * never write bodies to Neon.
 */

export type ProjectSyncIdbFailureKind =
  | "quota_exceeded"
  | "open_blocked"
  | "corrupted"
  | "unavailable"
  | "write_fail"
  | "read_fail";

export class ProjectSyncIdbSoftError extends Error {
  readonly kind: ProjectSyncIdbFailureKind;
  constructor(kind: ProjectSyncIdbFailureKind, message?: string) {
    super(message ?? `idb_soft_degrade:${kind}`);
    this.name = "ProjectSyncIdbSoftError";
    this.kind = kind;
  }
}

export type ProjectSyncIdbReadResult<T> =
  | { readonly ok: true; readonly entries: readonly T[] }
  | {
      readonly ok: false;
      readonly kind: ProjectSyncIdbFailureKind;
      readonly entries: readonly [];
    };

/**
 * Soft-read IDB for pager: on any failure return empty slice + kind.
 * Caller always continues local → Neon → lost.
 */
export const softReadIdbEntries = async <T>(input: {
  readonly read: () => Promise<readonly T[]>;
}): Promise<ProjectSyncIdbReadResult<T>> => {
  try {
    const entries = await input.read();
    return { ok: true, entries };
  } catch (error: unknown) {
    const kind =
      error instanceof ProjectSyncIdbSoftError
        ? error.kind
        : "read_fail";
    return { ok: false, kind, entries: [] };
  }
};

export type ProjectSyncIdbWriteBatchResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly kind: ProjectSyncIdbFailureKind;
      /** True when Neon/local were left untouched by this IDB failure. */
      readonly neonUntouched: true;
      readonly localUntouched: true;
    };

/**
 * Soft-write IDB after reconcile: failure aborts IDB batch only.
 * Neon/local consistency is the caller's responsibility — this helper
 * never retries Neon and never promotes bodies.
 */
export const softWriteIdbBatch = async (input: {
  readonly write: () => Promise<void>;
}): Promise<ProjectSyncIdbWriteBatchResult> => {
  try {
    await input.write();
    return { ok: true };
  } catch (error: unknown) {
    const kind =
      error instanceof ProjectSyncIdbSoftError
        ? error.kind
        : "write_fail";
    return {
      ok: false,
      kind,
      neonUntouched: true,
      localUntouched: true,
    };
  }
};

/**
 * Map IDB Soft failure → empty idbEntries for loadPage (never throws).
 */
export const idbEntriesOrEmpty = <T>(
  result: ProjectSyncIdbReadResult<T>,
): readonly T[] => (result.ok ? result.entries : result.entries);
