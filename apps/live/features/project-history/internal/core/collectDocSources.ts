import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import type { DocSource } from "./convertDocToSkillDraft";
import {
  DOC_INGEST_MAX_DOC_BYTES,
  DOC_INGEST_SOURCES,
} from "./docIngest.constants";

/** Git blob id of the file content, so `source: path@sha` matches `git hash-object`. */
export const gitBlobSha = (bytes: Buffer): string =>
  createHash("sha1")
    .update(`blob ${bytes.length}\0`)
    .update(bytes)
    .digest("hex");

const readSource = (
  folder: string,
  relPath: string,
  kind: DocSource["kind"],
): DocSource | null => {
  try {
    const bytes = fs.readFileSync(path.join(folder, relPath));
    return bytes.length > DOC_INGEST_MAX_DOC_BYTES
      ? null
      : { relPath, kind, text: bytes.toString("utf8"), sha: gitBlobSha(bytes) };
  } catch {
    return null;
  }
};

const listFiles = (folder: string, dir: string, kind: string): string[] => {
  try {
    return fs
      .readdirSync(path.join(folder, dir), { withFileTypes: true })
      .flatMap((entry) =>
        kind === "skill"
          ? entry.isDirectory()
            ? [`${dir}/${entry.name}/SKILL.md`]
            : []
          : entry.isFile() &&
              entry.name.endsWith(".md") &&
              entry.name !== "README.md"
            ? [`${dir}/${entry.name}`]
            : [],
      )
      .sort();
  } catch {
    return [];
  }
};

/** Docs in the three source folders, read-only, oversized files skipped. */
export const collectDocSources = (folder: string): readonly DocSource[] =>
  DOC_INGEST_SOURCES.flatMap(({ dir, kind }) =>
    listFiles(folder, dir, kind)
      .map((relPath) => readSource(folder, relPath, kind))
      .filter((source): source is DocSource => source !== null),
  );
