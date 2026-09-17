import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../..",
);

const shims: Array<{ script: string; from: string }> = [
  {
    script: "readAgentWitchRunConfig.ts",
    from: "@agent-witch/install-runtime-client",
  },
  {
    script: "agentWitchLocalTrafficLog.ts",
    from: "@agent-witch/live-diagnostics",
  },
  {
    script: "agentWitchLocalWsTraceLog.ts",
    from: "@agent-witch/live-diagnostics",
  },
  {
    script: "agentWitchLocalRag.ts",
    from: "@agent-witch/live-knowledge",
  },
  {
    script: "agentWitchLocalMemory.ts",
    from: "@agent-witch/live-memory",
  },
  {
    script: "ensureAgentWitchProjectFolder.ts",
    from: "@agent-witch/live-projects",
  },
  {
    script: "agentWitchCloudApi.ts",
    from: "@agent-witch/live-projects",
  },
  {
    script: "parseHarnessInstallBundle.ts",
    from: "@agent-witch/live-harness",
  },
  {
    script: "agentWitchLocalAutomationStore.ts",
    from: "@agent-witch/live-automations",
  },
  {
    script: "tickAgentWitchScheduledAutomations.ts",
    from: "@agent-witch/live-automations",
  },
  {
    script: "agentWitchLocalApp.constants.ts",
    from: "@agent-witch/live-local-server",
  },
  {
    script: "formatAgentWitchRelativeTimeAgo.ts",
    from: "@agent-witch/live-local-server",
  },
  {
    script: "buildAgentWitchLocalAppShell.ts",
    from: "@agent-witch/live-shell/presentation",
  },
  {
    script: "buildAgentWitchLocalHomePage.ts",
    from: "@agent-witch/live-home/presentation",
  },
  {
    script: "buildAgentWitchLocalTaskPage.ts",
    from: "@agent-witch/live-tasks/presentation",
  },
  {
    script: "buildAgentWitchLocalWriterApiPage.ts",
    from: "@agent-witch/live-writer-settings/presentation",
  },
  {
    script: "buildAgentWitchLocalHarnessPage.ts",
    from: "@agent-witch/live-harness/presentation",
  },
  {
    script: "agentWitchLocalProjectsRegistry.ts",
    from: "@agent-witch/live-projects",
  },
  {
    script: "syncAgentWitchLocalProjectsFromCloud.ts",
    from: "@agent-witch/live-projects",
  },
];

const writerApiShims = [
  "applyWriterApiSettings",
  "readWriterApiSecrets",
  "resolveWriterExecutionBackend",
  "shouldUseWriterApi",
  "WriterApiProvider.constant",
  "WriterApiSecrets.type",
  "maskWriterApiKeyForDisplay",
  "resolveWriterApiModel",
  "writerApiKeyConsoleUrls.constant",
  "writerApiModelOptions.constant",
  "callWriterApi",
  "parseWriterLlmUsageFromApiBody",
  "estimateWriterLlmUsageCostUsd",
  "runWriterApiPrompt",
  "writeWriterApiSecrets",
  "resolveWriterApiProvider",
  "writerApiSecretsPath",
];

for (const { script, from } of shims) {
  const filePath = path.join(ROOT, "scripts", script);
  fs.writeFileSync(filePath, `export * from "${from}";\n`);
}

for (const name of writerApiShims) {
  const filePath = path.join(ROOT, "scripts/writerApi", name + ".ts");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const exportName = name
    .replace(/\.constant$/, ".constant")
    .replace(/\.type$/, ".type");
  fs.writeFileSync(
    filePath,
    `export * from "@agent-witch/install-runtime-client";\n`,
  );
}

process.stdout.write(
  `Wrote ${shims.length + writerApiShims.length} script shims\n`,
);
