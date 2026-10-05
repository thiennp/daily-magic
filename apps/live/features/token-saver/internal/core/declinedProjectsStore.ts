import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type {
  DeclinedProjectEntry,
  DeclinedProjectsStore,
} from "../../public-api/setupProject.types";
import type { CliFs } from "./cliFs.types";
import { createNodeCliFs } from "./createNodeCliFs";
import { resolveDeclinePathKey } from "./resolveDeclinePathKey";
import { resolveDeclinedProjectsPath } from "./resolveDeclinedProjectsPath";
import { writeTextFileAtomic } from "./writeTextFileAtomic";

const emptyStore = (): DeclinedProjectsStore => ({ byRealpath: {} });

const parseStore = (raw: string): DeclinedProjectsStore => {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return emptyStore();
    }
    const byRealpath = (parsed as { byRealpath?: unknown }).byRealpath;
    if (typeof byRealpath !== "object" || byRealpath === null) {
      return emptyStore();
    }
    return { byRealpath: byRealpath as DeclinedProjectsStore["byRealpath"] };
  } catch {
    return emptyStore();
  }
};

export const readDeclinedProjectsStore = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
  fs: CliFs = createNodeCliFs(),
): DeclinedProjectsStore => {
  const filePath = resolveDeclinedProjectsPath(layout);
  if (!fs.exists(filePath)) {
    return emptyStore();
  }
  return parseStore(fs.readUtf8(filePath));
};

const writeStore = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
  store: DeclinedProjectsStore,
  fs: CliFs,
): void => {
  writeTextFileAtomic({
    fs,
    filePath: resolveDeclinedProjectsPath(layout),
    contents: `${JSON.stringify(store, null, 2)}\n`,
  });
};

export const declineProjectForCwd = (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly cwd: string;
  readonly fs?: CliFs;
  readonly nowIso?: string;
}): DeclinedProjectEntry => {
  const fs = input.fs ?? createNodeCliFs();
  const key = resolveDeclinePathKey(input.cwd, fs);
  const entry: DeclinedProjectEntry = {
    declinedAt: input.nowIso ?? new Date().toISOString(),
    cwd: input.cwd,
  };
  const store = readDeclinedProjectsStore(input.layout, fs);
  writeStore(input.layout, { byRealpath: { ...store.byRealpath, [key]: entry } }, fs);
  return entry;
};

export const clearProjectDecline = (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly cwd: string;
  readonly fs?: CliFs;
}): boolean => {
  const fs = input.fs ?? createNodeCliFs();
  const key = resolveDeclinePathKey(input.cwd, fs);
  const store = readDeclinedProjectsStore(input.layout, fs);
  if (store.byRealpath[key] === undefined) {
    return false;
  }
  const rest = Object.fromEntries(
    Object.entries(store.byRealpath).filter(([entryKey]) => entryKey !== key),
  );
  writeStore(input.layout, { byRealpath: rest }, fs);
  return true;
};

export const isDeclinedCwd = (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly cwd: string;
  readonly fs?: CliFs;
}): boolean => {
  const fs = input.fs ?? createNodeCliFs();
  const key = resolveDeclinePathKey(input.cwd, fs);
  return readDeclinedProjectsStore(input.layout, fs).byRealpath[key] !== undefined;
};
