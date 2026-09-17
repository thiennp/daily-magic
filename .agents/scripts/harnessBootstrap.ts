/**
 * Agent harness bootstrap — single source for routing, workflows, and git-hook checks.
 *
 * npm run harness:bootstrap
 * npm run harness:bootstrap -- --workflow=verify
 * npm run harness:bootstrap -- --match="quick commit"
 * npm run harness:bootstrap -- --json
 * npm run harness:sync  (regenerate git-hooks.md from manifest)
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  getAgentBootstrapManifestPath,
  loadAgentBootstrapManifest,
  matchRoutingRow,
} from "./lib/loadAgentBootstrapManifest";
import { renderAgentBootstrapGitHooksMarkdown } from "./lib/renderAgentBootstrapGitHooksMarkdown";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(__dirname, "../..");
const GIT_HOOKS_DOC = path.join(APP_ROOT, ".cursor/harness/git-hooks.md");

const argv = process.argv.slice(2);

const readFlag = (name: string): string | null => {
  const eq = argv.find((arg) => arg.startsWith(`${name}=`));
  if (eq) {
    return eq.slice(name.length + 1);
  }
  const idx = argv.indexOf(name);
  if (idx >= 0 && argv[idx + 1] && !argv[idx + 1].startsWith("--")) {
    return argv[idx + 1];
  }
  return null;
};

const hasFlag = (name: string): boolean => argv.includes(name);

const printSummary = (): void => {
  const manifest = loadAgentBootstrapManifest();
  const lines = [
    "# Agent harness bootstrap",
    `manifest: ${getAgentBootstrapManifestPath()}`,
    "",
    "## Routing (first match wins)",
    ...manifest.routing
      .sort((a, b) => a.priority - b.priority)
      .map((row) => {
        const target =
          row.command ?? (row.workflow ? `(workflow only)` : "(context)");
        const workflowSuffix = row.workflow ? ` [${row.workflow}]` : "";
        const docSuffix = row.doc ? ` → read ${row.doc}` : "";
        return `${row.priority}. ${row.signals.slice(0, 3).join(" | ")}${row.signals.length > 3 ? " | …" : ""} → ${target}${workflowSuffix}${docSuffix}`;
      }),
    "",
    "## Workflows",
    ...Object.entries(manifest.workflows).map(
      ([key, wf]) => `- ${key}: ${wf.scripts.join(" && ")}`,
    ),
    "",
    'Use: npm run harness:bootstrap -- --workflow=<name> | --match="user text" | --json',
  ];
  process.stdout.write(`${lines.join("\n")}\n`);
};

const printWorkflow = (workflowKey: string): void => {
  const manifest = loadAgentBootstrapManifest();
  const workflow = manifest.workflows[workflowKey];
  if (!workflow) {
    process.stderr.write(`Unknown workflow: ${workflowKey}\n`);
    process.exit(1);
  }
  const lines = [
    `# Workflow: ${workflowKey}`,
    workflow.description,
    "",
    "## Scripts",
    ...workflow.scripts.map((s) => `- \`${s}\``),
  ];
  if (workflow.command) {
    lines.push("", `## Command`, `- @.cursor/commands/${workflow.command}`);
  }
  if (workflow.includesGitHooks) {
    lines.push("", "## Git hooks", "- `.cursor/harness/git-hooks.md`");
  }
  process.stdout.write(`${lines.join("\n")}\n`);
};

const printMatch = (text: string): void => {
  const manifest = loadAgentBootstrapManifest();
  const row = matchRoutingRow(manifest, text);
  if (!row) {
    process.stdout.write(JSON.stringify({ matched: false }, null, 2));
    process.stdout.write("\n");
    return;
  }
  const workflow =
    row.workflow && manifest.workflows[row.workflow]
      ? manifest.workflows[row.workflow]
      : null;
  process.stdout.write(
    JSON.stringify(
      {
        matched: true,
        priority: row.priority,
        command: row.command,
        workflow: row.workflow,
        scripts: workflow?.scripts ?? [],
        includesGitHooks: workflow?.includesGitHooks ?? false,
        doc: row.doc ?? null,
      },
      null,
      2,
    ),
  );
  process.stdout.write("\n");
};

const writeGitHooksDoc = (): void => {
  const manifest = loadAgentBootstrapManifest();
  const markdown = renderAgentBootstrapGitHooksMarkdown(manifest);
  writeFileSync(GIT_HOOKS_DOC, markdown, "utf8");
  process.stdout.write(`Wrote ${GIT_HOOKS_DOC}\n`);
};

const main = (): void => {
  if (hasFlag("--write-git-hooks")) {
    writeGitHooksDoc();
    return;
  }

  if (hasFlag("--json")) {
    process.stdout.write(
      `${JSON.stringify(loadAgentBootstrapManifest(), null, 2)}\n`,
    );
    return;
  }

  const workflow = readFlag("--workflow");
  if (workflow) {
    printWorkflow(workflow);
    return;
  }

  const matchText = readFlag("--match");
  if (matchText) {
    printMatch(matchText);
    return;
  }

  printSummary();
};

main();
