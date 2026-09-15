import type { HarnessInstallItemKind } from "../harnessInstallBundle.types";

export interface LocalHarnessCandidateItem {
  readonly id: string;
  readonly kind: HarnessInstallItemKind;
  readonly title: string;
  readonly sourcePath: string;
  readonly relativePath: string;
  readonly selected: boolean;
}

export interface LocalHarnessCandidateSet {
  readonly proposedSlug: string;
  readonly proposedName: string;
  readonly sourceRoot: string;
  readonly repoPath: string;
  readonly items: readonly LocalHarnessCandidateItem[];
}

export interface LocalHarnessRevealResult {
  readonly scanRoots: readonly string[];
  readonly sets: readonly LocalHarnessCandidateSet[];
}
