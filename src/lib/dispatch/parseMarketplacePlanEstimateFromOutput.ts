const MARKETPLACE_PLAN_ESTIMATE_MARKER = "[[MARKETPLACE_PLAN_ESTIMATE]]";

export type ParsedMarketplacePlanEstimateFromOutput = {
  readonly backend: string | null;
  readonly reasonCode: string | null;
  readonly catalogModelId: string | null;
};

const readKeyValueLine = (line: string, key: string): string | null => {
  const prefix = `${key}=`;
  if (!line.startsWith(prefix)) {
    return null;
  }
  const value = line.slice(prefix.length).trim();
  return value.length > 0 ? value : null;
};

const foldMarketplacePlanEstimateLine = (
  acc: ParsedMarketplacePlanEstimateFromOutput,
  line: string,
): ParsedMarketplacePlanEstimateFromOutput => {
  if (line.startsWith("[[")) {
    return acc;
  }
  const backend =
    readKeyValueLine(line, "marketplacePlanEstimateBackend") ?? acc.backend;
  const reasonCode =
    readKeyValueLine(line, "marketplacePlanEstimateReasonCode") ??
    acc.reasonCode;
  const modelId = readKeyValueLine(line, "marketplacePlanEstimateModelId");
  const catalogModelId =
    modelId !== null && modelId !== "null" ? modelId : acc.catalogModelId;
  return { backend, reasonCode, catalogModelId };
};

export const parseMarketplacePlanEstimateFromOutput = (
  output: string,
): ParsedMarketplacePlanEstimateFromOutput | null => {
  const markerIndex = output.indexOf(MARKETPLACE_PLAN_ESTIMATE_MARKER);
  if (markerIndex === -1) {
    return null;
  }

  const afterMarker = output.slice(
    markerIndex + MARKETPLACE_PLAN_ESTIMATE_MARKER.length,
  );
  const blockLines = afterMarker
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const folded = blockLines
    .slice(0, 8)
    .reduce(foldMarketplacePlanEstimateLine, {
      backend: null,
      reasonCode: null,
      catalogModelId: null,
    });

  if (
    folded.backend === null &&
    folded.reasonCode === null &&
    folded.catalogModelId === null
  ) {
    return null;
  }

  return folded;
};
