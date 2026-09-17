import { readAgentWitchMaterializationLedger } from "./readAgentWitchMaterializationLedger";
import { resolveAgentWitchMaterializationPaths } from "./resolveAgentWitchMaterializationPaths";
import { resolveAgentWitchProjectStorageLayout } from "./resolveAgentWitchProjectStorageLayout";

const HARNESS_SET_PREFIX = "harness-set:";

export const parseHarnessSetSlugFromLedgerComponentId = (
  componentId: string,
): string | null => {
  const trimmed = componentId.trim();
  if (!trimmed.startsWith(HARNESS_SET_PREFIX)) {
    return null;
  }
  const slug = trimmed.slice(HARNESS_SET_PREFIX.length).trim();
  return slug.length > 0 ? slug : null;
};

export const listLinkedHarnessSetSlugsFromMaterializationLedger = (
  ledger: ReturnType<typeof readAgentWitchMaterializationLedger>,
): readonly string[] => {
  const slugs = new Set<string>();
  for (const entry of Object.values(ledger.entries)) {
    const fromId = parseHarnessSetSlugFromLedgerComponentId(entry.componentId);
    if (fromId !== null) {
      slugs.add(fromId);
    }
  }
  return [...slugs].sort((a, b) => a.localeCompare(b));
};

export const listLinkedHarnessSetSlugsFromProjectFolder = (
  projectFolderPath: string,
): readonly string[] => {
  const layout = resolveAgentWitchProjectStorageLayout(projectFolderPath);
  const { ledgerFilePath } = resolveAgentWitchMaterializationPaths(layout);
  const ledger = readAgentWitchMaterializationLedger(ledgerFilePath);
  return listLinkedHarnessSetSlugsFromMaterializationLedger(ledger);
};
