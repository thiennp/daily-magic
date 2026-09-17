#!/usr/bin/env node
/**
 * Agent Witch — legacy CLI path. Orchestration lives in AWI entry + runtime-client slice.
 *
 * Run: npx tsx scripts/agent-witch.ts
 */
export { startAgentWitchClient } from "../apps/install/entry/agent-witch";

import { startAgentWitchClient } from "../apps/install/entry/agent-witch";
import { isAgentWitchBundled } from "./agentWitchBundled.constant";
import { runAgentWitchReportCli } from "./agentWitchReportCli";
import { isAgentWitchScriptEntryPoint } from "./isAgentWitchScriptEntryPoint";

if (isAgentWitchScriptEntryPoint(import.meta.url) && !isAgentWitchBundled()) {
  const reportArgvIndex = process.argv.indexOf("report");
  if (reportArgvIndex >= 0) {
    process.exit(runAgentWitchReportCli(process.argv.slice(reportArgvIndex)));
  }
  void startAgentWitchClient();
}
