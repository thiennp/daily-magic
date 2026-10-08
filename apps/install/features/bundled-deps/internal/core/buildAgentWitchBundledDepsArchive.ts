import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { ensureNodePtySpawnHelpersExecutable } from "./ensureNodePtySpawnHelpersExecutable";
import {
  AWI_BUNDLED_DEPS_DIR_NAME,
  AWI_SHIPPED_APP_DIR_NAME,
  AWI_SHIPPED_DEPS_ARCHIVE_FILE_NAME,
} from "../../public-api/types";

const DARWIN_NODE_PTY_PREBUILD_ARCHITECTURES = [
  "darwin-arm64",
  "darwin-x64",
] as const;

const copyDirectory = (sourceDir: string, targetDir: string): void => {
  fs.mkdirSync(targetDir, { recursive: true });

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath);
      continue;
    }

    fs.copyFileSync(sourcePath, targetPath);
  }
};

const copyNodePtyForAgentWitchBundle = (input: {
  readonly workspaceRoot: string;
  readonly depsDir: string;
}): void => {
  const sourceRoot = path.join(input.workspaceRoot, "node_modules/node-pty");
  const targetRoot = path.join(input.depsDir, "node-pty");

  if (!fs.existsSync(sourceRoot)) {
    throw new Error(
      "node-pty is missing. Run npm install before building the AgentWitch bundle.",
    );
  }

  copyDirectory(path.join(sourceRoot, "lib"), path.join(targetRoot, "lib"));
  fs.copyFileSync(
    path.join(sourceRoot, "package.json"),
    path.join(targetRoot, "package.json"),
  );

  for (const architecture of DARWIN_NODE_PTY_PREBUILD_ARCHITECTURES) {
    const sourcePrebuild = path.join(sourceRoot, "prebuilds", architecture);
    if (!fs.existsSync(sourcePrebuild)) {
      continue;
    }

    copyDirectory(
      sourcePrebuild,
      path.join(targetRoot, "prebuilds", architecture),
    );
  }
};

/** Fixed epoch for archive members so `deps.tar.gz` is byte-stable across rebuilds. */
const AGENT_WITCH_DEPS_ARCHIVE_MTIME = "197001010000";

/**
 * Pack `deps/` with fixed file mtimes and `gzip -n` (no gzip header timestamp).
 * macOS bsdtar has no `--mtime`; GNU gzip timestamps otherwise flip the blob every build.
 */
const writeDeterministicDepsTarGz = (input: {
  readonly appDir: string;
  readonly depsDir: string;
  readonly archivePath: string;
}): void => {
  execFileSync(
    "find",
    [
      input.depsDir,
      "-exec",
      "touch",
      "-t",
      AGENT_WITCH_DEPS_ARCHIVE_MTIME,
      "{}",
      "+",
    ],
    { stdio: "pipe" },
  );
  execFileSync(
    "bash",
    [
      "-c",
      'COPYFILE_DISABLE=1 tar -cf - -C "$1" "$2" | gzip -n > "$3"',
      "agent-witch-deps-tar",
      input.appDir,
      AWI_BUNDLED_DEPS_DIR_NAME,
      input.archivePath,
    ],
    { stdio: "pipe" },
  );
};

export const buildAgentWitchBundledDepsArchive = (input: {
  readonly workspaceRoot: string;
  readonly appDir: string;
}): string => {
  const depsDir = path.join(input.appDir, AWI_BUNDLED_DEPS_DIR_NAME);
  const archivePath = path.join(
    input.appDir,
    AWI_SHIPPED_DEPS_ARCHIVE_FILE_NAME,
  );

  fs.rmSync(depsDir, { recursive: true, force: true });
  fs.mkdirSync(depsDir, { recursive: true });
  copyNodePtyForAgentWitchBundle({
    workspaceRoot: input.workspaceRoot,
    depsDir,
  });

  ensureNodePtySpawnHelpersExecutable(depsDir);
  fs.rmSync(archivePath, { force: true });
  writeDeterministicDepsTarGz({
    appDir: input.appDir,
    depsDir,
    archivePath,
  });
  fs.rmSync(depsDir, { recursive: true, force: true });

  return path.join(
    AWI_SHIPPED_APP_DIR_NAME,
    AWI_SHIPPED_DEPS_ARCHIVE_FILE_NAME,
  );
};
