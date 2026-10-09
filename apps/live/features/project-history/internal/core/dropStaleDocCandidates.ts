import type { DocEvaluation } from "./evaluateDocSource";
import {
  findBrokenDocReferences,
  type DocReferenceProbe,
} from "./findBrokenDocReferences";

/**
 * A draft that names files or npm scripts the folder no longer has would teach
 * a bot a wrong step, so it is not asked about. The doc is counted as
 * `stale_references` in the scan status.
 */
export const dropStaleDocCandidates = (
  evaluations: readonly DocEvaluation[],
  probe: DocReferenceProbe,
): readonly DocEvaluation[] =>
  evaluations.map((row): DocEvaluation =>
    row.kind === "candidate" &&
    findBrokenDocReferences(row.markdown, probe).length > 0
      ? { kind: "skip", reason: "stale_references" }
      : row,
  );
