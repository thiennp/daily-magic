import fs from "node:fs";

import { AGENT_WITCH_MATERIALIZATION_LEDGER_VERSION } from "./agentWitchMaterialization.constants";
import type { AgentWitchMaterializationLedger } from "./agentWitchMaterializationLedger.types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readAgentWitchMaterializationLedger = (
  ledgerFilePath: string,
): AgentWitchMaterializationLedger => {
  if (!fs.existsSync(ledgerFilePath)) {
    return { version: AGENT_WITCH_MATERIALIZATION_LEDGER_VERSION, entries: {} };
  }

  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(ledgerFilePath, "utf8"));
    if (
      isRecord(parsed) &&
      parsed.version === AGENT_WITCH_MATERIALIZATION_LEDGER_VERSION &&
      isRecord(parsed.entries)
    ) {
      return {
        version: AGENT_WITCH_MATERIALIZATION_LEDGER_VERSION,
        entries: parsed.entries as AgentWitchMaterializationLedger["entries"],
      };
    }
  } catch {
    return {
      version: AGENT_WITCH_MATERIALIZATION_LEDGER_VERSION,
      entries: {},
    };
  }

  return { version: AGENT_WITCH_MATERIALIZATION_LEDGER_VERSION, entries: {} };
};
