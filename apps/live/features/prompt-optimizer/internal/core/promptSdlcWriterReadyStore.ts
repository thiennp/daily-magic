import fs from "node:fs";
import path from "node:path";

type PromptSdlcWriterReadyFile = Readonly<
  Record<string, { readonly message: string }>
>;

const readyPath = (storePath: string): string =>
  path.join(path.dirname(storePath), "prompt-optimizer-writer-ready.json");

const readReadyFile = (storePath: string): PromptSdlcWriterReadyFile => {
  const filePath = readyPath(storePath);
  if (!fs.existsSync(filePath)) {
    return {};
  }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return typeof parsed === "object" && parsed !== null
      ? (parsed as PromptSdlcWriterReadyFile)
      : {};
  } catch {
    return {};
  }
};

const writeReadyFile = (
  storePath: string,
  ready: PromptSdlcWriterReadyFile,
): void => {
  fs.mkdirSync(path.dirname(storePath), { recursive: true });
  fs.writeFileSync(readyPath(storePath), `${JSON.stringify(ready, null, 2)}\n`);
};

export const readRememberedPromptSdlcWriter = (
  storePath: string,
  writer: string,
): string | null => readReadyFile(storePath)[writer]?.message ?? null;

export const rememberPromptSdlcWriterReady = (
  storePath: string,
  writer: string,
  message: string,
): void => {
  writeReadyFile(storePath, {
    ...readReadyFile(storePath),
    [writer]: { message },
  });
};

export const forgetPromptSdlcWriterReady = (
  storePath: string,
  writer: string,
): void => {
  const ready = readReadyFile(storePath);
  if (ready[writer] === undefined) {
    return;
  }
  writeReadyFile(
    storePath,
    Object.fromEntries(Object.entries(ready).filter(([id]) => id !== writer)),
  );
};
