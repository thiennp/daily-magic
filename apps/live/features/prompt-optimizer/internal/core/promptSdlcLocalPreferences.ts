import fs from "node:fs";
import path from "node:path";

import {
  listPromptSdlcLocalWriters,
  PROMPT_SDLC_MANUAL_ACTOR,
} from "./choosePromptSdlcLocalModels";
import type { PromptSdlcLocalModelSelection } from "./promptSdlcLocalForm";
import {
  PROMPT_SDLC_LOCAL_DEFAULT_FOLDER,
  resolvePromptSdlcLocalFolder,
} from "./promptSdlcLocalFolder";

export type PromptSdlcLocalPreferences = {
  readonly folder: string;
  readonly judge: string;
  readonly improver: string;
  readonly runner: string;
};

const REMEMBERED_INTENTS = ["remember", "choose-folder", "run"];

const emptyPreferences = (): PromptSdlcLocalPreferences => ({
  folder: PROMPT_SDLC_LOCAL_DEFAULT_FOLDER,
  judge: "",
  improver: "",
  runner: "",
});

const preferencesPath = (storePath: string): string =>
  path.join(path.dirname(storePath), "prompt-optimizer-preferences.json");

const readString = (value: unknown): string =>
  typeof value === "string" ? value : "";

export const readPromptSdlcLocalPreferences = (
  storePath: string,
): PromptSdlcLocalPreferences => {
  const filePath = preferencesPath(storePath);
  if (!fs.existsSync(filePath)) {
    return emptyPreferences();
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (typeof parsed !== "object" || parsed === null) {
      return emptyPreferences();
    }
    const record = parsed as Record<string, unknown>;
    const folder = readString(record.folder).trim();
    return {
      folder: folder.length === 0 ? PROMPT_SDLC_LOCAL_DEFAULT_FOLDER : folder,
      judge: readString(record.judge),
      improver: readString(record.improver),
      runner: readString(record.runner),
    };
  } catch {
    return emptyPreferences();
  }
};

const writePreferences = (
  storePath: string,
  preferences: PromptSdlcLocalPreferences,
): void => {
  const filePath = preferencesPath(storePath);
  fs.mkdirSync(path.dirname(storePath), { recursive: true });
  const tmpPath = `${filePath}.tmp`;
  fs.writeFileSync(tmpPath, `${JSON.stringify(preferences, null, 2)}\n`);
  fs.renameSync(tmpPath, filePath);
};

export const isPromptSdlcRememberedActor = (
  actor: string,
  installedIds: readonly string[],
): boolean =>
  actor === PROMPT_SDLC_MANUAL_ACTOR ||
  listPromptSdlcLocalWriters(installedIds).some((id) => id === actor);

const nextActor = (
  posted: string | null,
  current: string,
  installedIds: readonly string[],
): string => {
  if (posted === null) {
    return current;
  }
  if (posted.length === 0) {
    return "";
  }
  return isPromptSdlcRememberedActor(posted, installedIds) ? posted : current;
};

const nextFolder = (folder: string | null, current: string): string => {
  if (folder === null) {
    return current;
  }
  const resolved = resolvePromptSdlcLocalFolder(folder);
  return resolved.ok ? resolved.display : current;
};

export const savePromptSdlcLocalPreferences = (input: {
  readonly storePath: string;
  readonly installedIds: readonly string[];
  readonly folder: string | null;
  readonly judge: string | null;
  readonly improver: string | null;
  readonly runner: string | null;
}): void => {
  const current = readPromptSdlcLocalPreferences(input.storePath);
  const preferences = {
    folder: nextFolder(input.folder, current.folder),
    judge: nextActor(input.judge, current.judge, input.installedIds),
    improver: nextActor(input.improver, current.improver, input.installedIds),
    runner: nextActor(input.runner, current.runner, input.installedIds),
  };
  if (
    preferences.folder === current.folder &&
    preferences.judge === current.judge &&
    preferences.improver === current.improver &&
    preferences.runner === current.runner
  ) {
    return;
  }
  writePreferences(input.storePath, preferences);
};

export const rememberedPromptSdlcLocalFolder = (folder: string): string => {
  const resolved = resolvePromptSdlcLocalFolder(folder);
  return resolved.ok ? resolved.display : PROMPT_SDLC_LOCAL_DEFAULT_FOLDER;
};

export const rememberedPromptSdlcLocalActor = (
  actor: string,
  installedIds: readonly string[],
): string => (isPromptSdlcRememberedActor(actor, installedIds) ? actor : "");

export const freshPromptSdlcLocalComposerDefaults = (input: {
  readonly storePath: string;
  readonly installedIds: readonly string[];
  readonly selection: PromptSdlcLocalModelSelection;
}): {
  readonly selection: PromptSdlcLocalModelSelection;
  readonly defaultFolder: string;
} => {
  const preferences = readPromptSdlcLocalPreferences(input.storePath);
  return {
    selection: {
      ...input.selection,
      judge: rememberedPromptSdlcLocalActor(
        preferences.judge,
        input.installedIds,
      ),
      improver: rememberedPromptSdlcLocalActor(
        preferences.improver,
        input.installedIds,
      ),
      runner: rememberedPromptSdlcLocalActor(
        preferences.runner,
        input.installedIds,
      ),
    },
    defaultFolder: rememberedPromptSdlcLocalFolder(preferences.folder),
  };
};

export const rememberPromptSdlcLocalPostedSelection = (input: {
  readonly storePath: string;
  readonly installedIds: readonly string[];
  readonly posted: URLSearchParams;
  readonly folder: string;
}): void => {
  const intent = input.posted.get("intent") ?? "";
  if (!REMEMBERED_INTENTS.includes(intent)) {
    return;
  }
  const postedFolder = input.posted.get("folder");
  savePromptSdlcLocalPreferences({
    storePath: input.storePath,
    installedIds: input.installedIds,
    folder:
      intent === "remember"
        ? postedFolder
        : postedFolder === null
          ? null
          : input.folder,
    judge: input.posted.get("judge"),
    improver: input.posted.get("improver"),
    runner: input.posted.get("runner"),
  });
};
