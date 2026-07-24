import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_APP_DIR_NAME,
  AGENT_WITCH_BUNDLED_DEPS_DIR_NAME,
  AGENT_WITCH_DEPS_ARCHIVE_FILE_NAME,
} from "../src/lib/agentWitch/agentWitchInstallApp.constant";

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
      "node-pty is missing. Run npm install before building the Agent Witch bundle.",
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

export const buildAgentWitchBundledDepsArchive = (input: {
  readonly workspaceRoot: string;
  readonly appDir: string;
}): string => {
  const depsDir = path.join(input.appDir, AGENT_WITCH_BUNDLED_DEPS_DIR_NAME);
  const archivePath = path.join(
    input.appDir,
    AGENT_WITCH_DEPS_ARCHIVE_FILE_NAME,
  );

  fs.rmSync(depsDir, { recursive: true, force: true });
  fs.mkdirSync(depsDir, { recursive: true });
  copyNodePtyForAgentWitchBundle({
    workspaceRoot: input.workspaceRoot,
    depsDir,
  });

  fs.rmSync(archivePath, { force: true });
  execFileSync(
    "tar",
    [
      "-czf",
      archivePath,
      "-C",
      input.appDir,
      AGENT_WITCH_BUNDLED_DEPS_DIR_NAME,
    ],
    { stdio: "pipe" },
  );
  fs.rmSync(depsDir, { recursive: true, force: true });

  return path.join(
    AGENT_WITCH_APP_DIR_NAME,
    AGENT_WITCH_DEPS_ARCHIVE_FILE_NAME,
  );
};
