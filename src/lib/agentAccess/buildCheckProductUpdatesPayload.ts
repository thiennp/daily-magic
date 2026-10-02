import { AGENT_ACCESS_TOOLS } from "@/lib/agentAccess/agentAccessTools.constant";
import {
  PRODUCT_CONNECT_METHOD_SUMMARY,
  PRODUCT_CONNECT_UPDATES,
  PRODUCT_CONNECT_UPDATES_ADAPT_HINT,
  PRODUCT_CONNECT_UPDATES_CATALOG_VERSION,
  type ProductConnectUpdateEntry,
} from "@/lib/agentAccess/productConnectUpdates.constant";
import { readAgentWitchServerRelease } from "@/lib/release/readAgentWitchServerRelease";

export const filterProductConnectUpdatesSince = (
  sinceCatalogVersion: number,
  catalog: readonly ProductConnectUpdateEntry[] = PRODUCT_CONNECT_UPDATES,
): readonly ProductConnectUpdateEntry[] =>
  catalog.filter((entry) => entry.catalogVersion > sinceCatalogVersion);

export interface CheckProductUpdatesPayload {
  readonly ok: true;
  readonly tipSha?: string;
  readonly catalogVersion: number;
  readonly hasUpdates: boolean;
  readonly entries: readonly ProductConnectUpdateEntry[];
  readonly tools: readonly {
    readonly name: string;
    readonly description: string;
  }[];
  readonly connect: typeof PRODUCT_CONNECT_METHOD_SUMMARY;
  readonly adaptHint: string;
}

export const buildCheckProductUpdatesPayload = (input: {
  readonly sinceCatalogVersion: number;
}): CheckProductUpdatesPayload => {
  const entries = filterProductConnectUpdatesSince(input.sinceCatalogVersion);
  const release = readAgentWitchServerRelease();
  const tipSha = release.shortCommitSha ?? release.commitSha ?? undefined;

  const payload: CheckProductUpdatesPayload = {
    ok: true,
    catalogVersion: PRODUCT_CONNECT_UPDATES_CATALOG_VERSION,
    hasUpdates: entries.length > 0,
    entries,
    tools: AGENT_ACCESS_TOOLS.map((tool) => ({
      name: tool.name,
      description: tool.description,
    })),
    connect: PRODUCT_CONNECT_METHOD_SUMMARY,
    adaptHint: PRODUCT_CONNECT_UPDATES_ADAPT_HINT,
  };

  if (tipSha !== undefined && tipSha.length > 0) {
    return { ...payload, tipSha };
  }
  return payload;
};
