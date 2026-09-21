import type { AgentBootstrapManifest } from "./agentBootstrapManifest.type";

export const renderAgentBootstrapGitHooksMarkdown = (
  manifest: AgentBootstrapManifest,
): string => {
  const preCommitRows = manifest.gitHooks.preCommit
    .map((row) => `| ${row.step} | ${row.when} | ${row.run} |`)
    .join("\n");

  const prePushRows = manifest.gitHooks.prePush
    .map((row) => `| ${row.step} | ${row.when} | ${row.run} |`)
    .join("\n");

  const policies = manifest.gitHooks.policies.map((p) => `- ${p}`).join("\n");
  const conventional = manifest.gitHooks.commitMsg.conventional
    .map((c) => `\`${c}\``)
    .join(", ");
  const ticket = manifest.gitHooks.commitMsg.ticketPrefix
    .map((c) => `\`${c} …\``)
    .join(", ");

  const sources = manifest.gitHooks.sources
    .map((s) => "`" + s + "`")
    .join(", ");

  return [
    "# Git hooks manifest (Husky)",
    "",
    "Authoritative source: `.cursor/harness/agent-bootstrap.manifest.json`. Regenerate with `npm run harness:sync`.",
    "",
    "Machine enforcement for commits. Agents load via `npm run harness:bootstrap -- --workflow=commit`, not every turn.",
    "",
    `Sources: ${sources}.`,
    "",
    "## pre-commit (staged files)",

    "| Step | When staged paths match | Command / script |",
    "| ---- | ----------------------- | ---------------- |",
    preCommitRows,
    "",
    "## pre-push",
    "",
    "| Step | When | Command / script |",
    "| ---- | ---- | ---------------- |",
    prePushRows,
    "",
    "## commit-msg",
    "",
    `- Conventional commits: ${conventional}`,
    `- Ticket prefix also accepted: ${ticket}`,
    "",
    "## Policy",
    "",
    policies,
    "",
    "## Agent workflows (beyond hooks)",
    "",
    "- Verify: `npm run harness:bootstrap -- --workflow=verify`",
    `- Command: @.cursor/commands/${manifest.workflows.verify.command}`,
  ].join("\n");
};
