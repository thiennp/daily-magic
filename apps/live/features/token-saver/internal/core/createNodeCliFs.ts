import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { CliFs, CliHome, CliIo } from "./cliFs.types";

export const createNodeCliFs = (): CliFs => ({
  readUtf8: (filePath) => fs.readFileSync(filePath, "utf8"),
  writeUtf8: (filePath, contents) => {
    fs.writeFileSync(filePath, contents, "utf8");
  },
  exists: (filePath) => fs.existsSync(filePath),
  mkdirp: (dirPath) => {
    fs.mkdirSync(dirPath, { recursive: true });
  },
  rename: (from, to) => {
    fs.renameSync(from, to);
  },
  realpath: (filePath) => fs.realpathSync.native(filePath),
});

export const createNodeCliHome = (): CliHome => ({
  homedir: () => os.homedir(),
});

export const createNodeCliIo = (): CliIo => ({
  ...createNodeCliFs(),
  ...createNodeCliHome(),
});

/** Temp-dir backed io for tests (never the real home). */
export const createTempCliIo = (rootDir: string): CliIo => {
  const fsAdapter = createNodeCliFs();
  return {
    ...fsAdapter,
    homedir: () => rootDir,
    realpath: (filePath) => {
      const absolute = path.resolve(filePath);
      if (!fs.existsSync(absolute)) {
        return absolute;
      }
      return fs.realpathSync.native(absolute);
    },
  };
};
