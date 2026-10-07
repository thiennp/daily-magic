import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import esbuild from "esbuild";

import {
  resolveAgentWitchInstallBundleOutfile,
  resolveAgentWitchShippedInstallBundleAppDir,
} from "@agent-witch/install-bundle";
import { buildAgentWitchBundledDepsArchive } from "./buildAgentWitchBundledDepsArchive";
import { resolveAgentWitchBundleCommitSha } from "./resolveAgentWitchBundleCommitSha";

const workspaceRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const entryPath = path.join(workspaceRoot, "scripts/agentWitchAppEntry.ts");
const outDir = resolveAgentWitchShippedInstallBundleAppDir(workspaceRoot);
const outfile = resolveAgentWitchInstallBundleOutfile(workspaceRoot);

const buildAgentWitchInstallBundle = async (): Promise<void> => {
  fs.mkdirSync(outDir, { recursive: true });

  await esbuild.build({
    entryPoints: [entryPath],
    outfile,
    bundle: true,
    platform: "node",
    format: "cjs",
    target: "node18",
    sourcemap: false,
    minify: true,
    legalComments: "none",
    logLevel: "info",
    banner: {
      js: `#!/usr/bin/env node
var __agentWitchImportMetaUrl=require("url").pathToFileURL(__filename).href;`,
    },
    define: {
      "process.env.AGENT_WITCH_BUNDLED": '"1"',
      // DF-032: local /health reports which build is running.
      "process.env.AGENT_WITCH_BUNDLE_COMMIT_SHA": JSON.stringify(
        resolveAgentWitchBundleCommitSha() ?? "",
      ),
      "import.meta.url": "__agentWitchImportMetaUrl",
    },
    external: ["node-pty"],
  });

  fs.chmodSync(outfile, 0o755);
  const depsArchiveRelativePath = buildAgentWitchBundledDepsArchive({
    workspaceRoot,
    appDir: outDir,
  });
  process.stdout.write(`Built AgentWitch bundle -> ${outfile}\n`);
  process.stdout.write(
    `Built AgentWitch deps archive -> ${path.join(outDir, path.basename(depsArchiveRelativePath))}\n`,
  );
};

void buildAgentWitchInstallBundle().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Failed to build AgentWitch bundle: ${message}\n`);
  process.exit(1);
});
