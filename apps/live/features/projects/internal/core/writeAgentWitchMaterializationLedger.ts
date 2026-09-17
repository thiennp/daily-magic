import fs from "node:fs";
import path from "node:path";

import type { AgentWitchMaterializationLedger } from "./agentWitchMaterializationLedger.types";

export const writeAgentWitchMaterializationLedger = (
  ledgerFilePath: string,
  ledger: AgentWitchMaterializationLedger,
): void => {
  fs.mkdirSync(path.dirname(ledgerFilePath), { recursive: true });
  fs.writeFileSync(ledgerFilePath, `${JSON.stringify(ledger, null, 2)}\n`);
};
