export type CompositionSnapshotItemScope = "project" | "run";

export type CompositionSnapshotComponentKind = "harness" | "workflow" | "agent";

export interface ProjectCompositionSnapshotItemWire {
  readonly componentId: string;
  readonly versionId: string;
  readonly kind: CompositionSnapshotComponentKind;
  readonly scope: CompositionSnapshotItemScope;
  readonly items: readonly {
    readonly itemKey: string;
    readonly relativePath: string;
    readonly contentSha256: string;
  }[];
}

export interface ProjectCompositionSnapshotWire {
  readonly id: string;
  readonly projectId: string;
  readonly digest: string;
  readonly entries: readonly ProjectCompositionSnapshotItemWire[];
}
