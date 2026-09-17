import fs from "node:fs";
import path from "node:path";

import { harnessSetComponentId } from "./agentWitchMaterialization.constants";
import type { AgentWitchMaterializationLedger } from "./agentWitchMaterializationLedger.types";

export type RemoveHarnessSetMaterializationSummary = {
  readonly removedPaths: readonly string[];
  readonly restoredPaths: readonly string[];
};

export const removeHarnessSetMaterializationFromLedger = (input: {
  readonly repoRoot: string;
  readonly setSlugs: readonly string[];
  readonly ledger: AgentWitchMaterializationLedger;
}): {
  readonly ledger: AgentWitchMaterializationLedger;
  readonly summary: RemoveHarnessSetMaterializationSummary;
} => {
  const targetComponentIds = new Set(
    input.setSlugs.map((slug) => harnessSetComponentId(slug)),
  );
  const removedPaths: string[] = [];
  const restoredPaths: string[] = [];
  const nextEntries: AgentWitchMaterializationLedger["entries"] = {};

  for (const [repoRelativePath, entry] of Object.entries(
    input.ledger.entries,
  )) {
    if (!targetComponentIds.has(entry.componentId)) {
      nextEntries[repoRelativePath] = entry;
      continue;
    }

    const destinationAbsolute = path.join(input.repoRoot, repoRelativePath);
    if (entry.backupPath !== undefined) {
      const backupAbsolute = path.join(input.repoRoot, entry.backupPath);
      if (fs.existsSync(backupAbsolute)) {
        fs.mkdirSync(path.dirname(destinationAbsolute), { recursive: true });
        fs.copyFileSync(backupAbsolute, destinationAbsolute);
        restoredPaths.push(repoRelativePath);
      } else if (fs.existsSync(destinationAbsolute)) {
        fs.rmSync(destinationAbsolute, { force: true });
      }
    } else if (fs.existsSync(destinationAbsolute)) {
      fs.rmSync(destinationAbsolute, { force: true });
    }

    removedPaths.push(repoRelativePath);
  }

  return {
    ledger: { version: 1, entries: nextEntries },
    summary: { removedPaths, restoredPaths },
  };
};
