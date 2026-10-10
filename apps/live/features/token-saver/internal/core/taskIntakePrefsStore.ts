import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type { CliFs } from "./cliFs.types";
import { createNodeCliFs } from "./createNodeCliFs";
import { resolveProfileScopedPath } from "./resolveProfileScopedPath";
import { TASK_INTAKE_PREFS_FILE_NAME } from "./tokenSaverMarkers.constants";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

type PrefsLayout = Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;

/** Remembered "always create a task" choice for one project on this computer. */
export interface TaskIntakePref {
  readonly mode: "always-yes";
  readonly folderRealPath: string;
  readonly savedAt: string;
}

export interface TaskIntakePrefsStore {
  readonly version: 1;
  readonly byProjectId: Readonly<Record<string, TaskIntakePref>>;
}

/** Local project-validity record: which folder is linked to which project for this account. */
export interface TaskIntakeFolderClaim {
  readonly accountEmail: string;
  readonly projectId: string | null;
  readonly folderRealPath: string;
}

const emptyStore = (): TaskIntakePrefsStore => ({
  version: 1,
  byProjectId: {},
});

const isPref = (value: unknown): value is TaskIntakePref => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    record.mode === "always-yes" &&
    typeof record.folderRealPath === "string" &&
    typeof record.savedAt === "string"
  );
};

const parseStore = (raw: string): TaskIntakePrefsStore => {
  try {
    const parsed: unknown = JSON.parse(raw);
    const byProjectId =
      typeof parsed === "object" && parsed !== null
        ? (parsed as { byProjectId?: unknown }).byProjectId
        : undefined;
    if (typeof byProjectId !== "object" || byProjectId === null) {
      return emptyStore();
    }
    const valid = Object.entries(byProjectId).filter(([, pref]) =>
      isPref(pref),
    );
    return {
      version: 1,
      byProjectId: Object.fromEntries(valid) as Record<string, TaskIntakePref>,
    };
  } catch {
    return emptyStore();
  }
};

const resolvePrefsPath = (layout: PrefsLayout): string =>
  resolveProfileScopedPath(layout, TASK_INTAKE_PREFS_FILE_NAME);

export const readTaskIntakePrefs = (
  layout: PrefsLayout,
  fs: CliFs = createNodeCliFs(),
): TaskIntakePrefsStore => {
  const filePath = resolvePrefsPath(layout);
  return fs.exists(filePath) ? parseStore(fs.readUtf8(filePath)) : emptyStore();
};

const writePrefs = (
  layout: PrefsLayout,
  store: TaskIntakePrefsStore,
  fs: CliFs,
): void => {
  writeTextFileAtomic({
    fs,
    filePath: resolvePrefsPath(layout),
    contents: `${JSON.stringify(store, null, 2)}\n`,
  });
};

const isSameOrInside = (folder: string, cwd: string): boolean =>
  cwd === folder || cwd.startsWith(`${folder}/`);

/**
 * The claim that makes `projectId` valid for `cwd` on this computer: same
 * account, same project, folder claimed, and cwd inside that folder.
 * No claim → the project is not valid here and nothing may fire.
 */
export const findValidFolderClaim = (input: {
  readonly claims: readonly TaskIntakeFolderClaim[];
  readonly projectId: string;
  readonly profileEmail: string | null;
  readonly cwd: string;
  readonly fs?: Pick<CliFs, "exists" | "realpath">;
}): TaskIntakeFolderClaim | null => {
  const fs = input.fs ?? createNodeCliFs();
  const email = input.profileEmail?.trim().toLowerCase() ?? null;
  const cwd = fs.exists(input.cwd) ? fs.realpath(input.cwd) : input.cwd;
  return (
    input.claims.find(
      (claim) =>
        claim.projectId === input.projectId &&
        (email === null || claim.accountEmail.trim().toLowerCase() === email) &&
        fs.exists(claim.folderRealPath) &&
        isSameOrInside(claim.folderRealPath, cwd),
    ) ?? null
  );
};

/** A saved pref counts only while its folder is still the project's valid claim. */
export const isTaskIntakePrefValid = (input: {
  readonly pref: TaskIntakePref | undefined;
  readonly claim: TaskIntakeFolderClaim | null;
}): boolean =>
  input.pref !== undefined &&
  input.claim !== null &&
  input.claim.folderRealPath === input.pref.folderRealPath;

export const rememberTaskIntakeYes = (input: {
  readonly layout: PrefsLayout;
  readonly projectId: string;
  readonly folderRealPath: string;
  readonly fs?: CliFs;
  readonly nowIso?: string;
}): TaskIntakePref => {
  const fs = input.fs ?? createNodeCliFs();
  const pref: TaskIntakePref = {
    mode: "always-yes",
    folderRealPath: input.folderRealPath,
    savedAt: input.nowIso ?? new Date().toISOString(),
  };
  const store = readTaskIntakePrefs(input.layout, fs);
  writePrefs(
    input.layout,
    {
      version: 1,
      byProjectId: { ...store.byProjectId, [input.projectId]: pref },
    },
    fs,
  );
  return pref;
};

export const forgetTaskIntake = (input: {
  readonly layout: PrefsLayout;
  readonly projectId: string;
  readonly fs?: CliFs;
}): boolean => {
  const fs = input.fs ?? createNodeCliFs();
  const store = readTaskIntakePrefs(input.layout, fs);
  if (store.byProjectId[input.projectId] === undefined) {
    return false;
  }
  const rest = Object.fromEntries(
    Object.entries(store.byProjectId).filter(([id]) => id !== input.projectId),
  );
  writePrefs(input.layout, { version: 1, byProjectId: rest }, fs);
  return true;
};

/** Drop prefs whose project no longer has a valid claim (left, revoked, folder gone or moved). */
export const pruneInvalidTaskIntakePrefs = (input: {
  readonly layout: PrefsLayout;
  readonly claims: readonly TaskIntakeFolderClaim[];
  readonly fs?: CliFs;
}): readonly string[] => {
  const fs = input.fs ?? createNodeCliFs();
  const store = readTaskIntakePrefs(input.layout, fs);
  const email = input.layout.profileEmail?.trim().toLowerCase() ?? null;
  const stale = Object.entries(store.byProjectId)
    .filter(
      ([projectId, pref]) =>
        !input.claims.some(
          (claim) =>
            claim.projectId === projectId &&
            claim.folderRealPath === pref.folderRealPath &&
            (email === null ||
              claim.accountEmail.trim().toLowerCase() === email) &&
            fs.exists(claim.folderRealPath),
        ),
    )
    .map(([projectId]) => projectId);
  if (stale.length === 0) {
    return [];
  }
  writePrefs(
    input.layout,
    {
      version: 1,
      byProjectId: Object.fromEntries(
        Object.entries(store.byProjectId).filter(
          ([projectId]) => !stale.includes(projectId),
        ),
      ),
    },
    fs,
  );
  return stale;
};
