import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import esbuild from "esbuild";

import { AGENT_WITCH_APP_BUNDLE_FILE_NAME } from "../src/lib/agentWitch/agentWitchInstallApp.constant";

const workspaceRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const entryPath = path.join(workspaceRoot, "scripts/agentWitchAppEntry.ts");
const outDir = path.join(workspaceRoot, "public/install/agent-witch/app");
const outfile = path.join(outDir, AGENT_WITCH_APP_BUNDLE_FILE_NAME);

const buildAgentWitchInstallBundle = async (): Promise<void> => {
  fs.mkdirSync(outDir, { recursive: true });

  await esbuild.build({
    entryPoints: [entryPath],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node18",
    sourcemap: false,
    minify: true,
    legalComments: "none",
    logLevel: "info",
    banner: {
      js: "#!/usr/bin/env node",
    },
    define: {
      "process.env.AGENT_WITCH_BUNDLED": '"1"',
    },
    external: ["node-pty", "ws"],
  });

  fs.chmodSync(outfile, 0o755);
  process.stdout.write(`Built Agent Witch bundle -> ${outfile}\n`);
};

void buildAgentWitchInstallBundle().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Failed to build Agent Witch bundle: ${message}\n`);
  process.exit(1);
});
