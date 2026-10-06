/**
 * Writes the prod-origin update + repair script (what /install/agent-witch-update.sh
 * and /install/agent-witch-repair.sh serve) for runAgentWitchRepairE2e.sh.
 * Run: npx tsx scripts/agentWitchRepair/renderAgentWitchRepairE2eScripts.ts <outDir>
 */
import fs from "node:fs";
import path from "node:path";

import { renderRepairAgentWitchScript } from "@/lib/agentWitch/repair/renderRepairAgentWitchScript";

const outDir = path.resolve(process.argv[2] ?? "tmp/awl-repair-e2e");
const outFile = path.join(outDir, "agent-witch-update.sh");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  outFile,
  renderRepairAgentWitchScript("https://www.agentwitch.com"),
);
console.log(`Wrote ${outFile}`);
