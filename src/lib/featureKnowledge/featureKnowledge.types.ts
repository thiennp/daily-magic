export interface FeatureKnowledgeChunk {
  readonly id: string;
  readonly featureSlug: string;
  readonly sourcePath: string;
  readonly section: string;
  readonly text: string;
  readonly vector: Readonly<Record<string, number>>;
}

export interface FeatureKnowledgeIndex {
  readonly version: 1;
  readonly builtAt: string;
  readonly idf: Readonly<Record<string, number>>;
  readonly chunks: readonly FeatureKnowledgeChunk[];
}

export interface FeatureKnowledgeSearchHit {
  readonly chunk: FeatureKnowledgeChunk;
  readonly score: number;
}

export interface FeatureKnowledgeQueryResult {
  readonly query: string;
  readonly hits: readonly FeatureKnowledgeSearchHit[];
  readonly context: string;
}
