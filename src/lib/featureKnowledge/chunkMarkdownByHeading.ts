import {
  buildTermFrequency,
  tokenizeFeatureText,
} from "@/lib/featureKnowledge/tokenizeFeatureText";

export interface RawFeatureKnowledgeChunk {
  readonly id: string;
  readonly featureSlug: string;
  readonly sourcePath: string;
  readonly section: string;
  readonly text: string;
}

export const chunkMarkdownByHeading = (
  content: string,
): readonly { readonly section: string; readonly text: string }[] => {
  const lines = content.split("\n");
  const result = lines.reduce<{
    readonly chunks: { section: string; text: string }[];
    readonly currentSection: string;
    readonly buffer: string[];
  }>(
    (state, line) => {
      const headingMatch = /^#{1,3}\s+(.+)$/.exec(line);
      if (headingMatch) {
        const text = state.buffer.join("\n").trim();
        const chunks =
          text.length > 0
            ? [...state.chunks, { section: state.currentSection, text }]
            : state.chunks;

        return {
          chunks,
          currentSection: headingMatch[1]?.trim() ?? "Section",
          buffer: [],
        };
      }

      return { ...state, buffer: [...state.buffer, line] };
    },
    { chunks: [], currentSection: "Overview", buffer: [] },
  );

  const finalText = result.buffer.join("\n").trim();
  if (finalText.length === 0) {
    return result.chunks;
  }

  return [
    ...result.chunks,
    { section: result.currentSection, text: finalText },
  ];
};

export const computeIdf = (
  chunks: readonly RawFeatureKnowledgeChunk[],
): Readonly<Record<string, number>> => {
  const documentFrequency: Record<string, number> = {};

  for (const chunk of chunks) {
    const uniqueTerms = new Set(tokenizeFeatureText(chunk.text));
    for (const term of uniqueTerms) {
      documentFrequency[term] = (documentFrequency[term] ?? 0) + 1;
    }
  }

  const totalDocuments = Math.max(chunks.length, 1);
  const idf: Record<string, number> = {};

  for (const [term, frequency] of Object.entries(documentFrequency)) {
    idf[term] = Math.log((totalDocuments + 1) / (frequency + 1)) + 1;
  }

  return idf;
};

export const buildTfIdfVector = (
  text: string,
  idf: Readonly<Record<string, number>>,
): Readonly<Record<string, number>> => {
  const tf = buildTermFrequency(tokenizeFeatureText(text));
  const vector: Record<string, number> = {};

  for (const [term, weight] of Object.entries(tf)) {
    vector[term] = weight * (idf[term] ?? 1);
  }

  return vector;
};
