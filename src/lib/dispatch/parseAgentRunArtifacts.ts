import {
  type AgentRunArtifactBlock,
  type AgentRunArtifactKind,
} from "@/lib/dispatch/agentRunArtifact.constant";

const ARTIFACT_KINDS: readonly AgentRunArtifactKind[] = [
  "markdown",
  "text",
  "file",
  "image",
  "json",
  "table",
];

const isArtifactKind = (value: string): value is AgentRunArtifactKind =>
  (ARTIFACT_KINDS as readonly string[]).includes(value);

const parseArtifactHeader = (
  headerLines: readonly string[],
): Omit<AgentRunArtifactBlock, "body"> => {
  const parsed = headerLines.reduce<{
    readonly kind: AgentRunArtifactKind;
    readonly title: string;
    readonly url?: string;
  }>(
    (acc, line) => {
      const match = /^([a-z]+):\s*(.*)$/i.exec(line.trim());
      if (match === null) {
        return acc;
      }

      const key = match[1]?.toLowerCase() ?? "";
      const value = match[2]?.trim() ?? "";
      if (key === "kind" && isArtifactKind(value)) {
        return { ...acc, kind: value };
      }
      if (key === "title") {
        return { ...acc, title: value };
      }
      if (key === "url" && value.length > 0) {
        return { ...acc, url: value };
      }
      return acc;
    },
    { kind: "markdown", title: "" },
  );

  return parsed.url !== undefined
    ? { kind: parsed.kind, title: parsed.title, url: parsed.url }
    : { kind: parsed.kind, title: parsed.title };
};

const ARTIFACT_BLOCK_PATTERN = /\[\[ARTIFACT\]\]([\s\S]*?)\[\[\/ARTIFACT\]\]/g;

export const parseAgentRunArtifacts = (
  output: string,
): readonly AgentRunArtifactBlock[] =>
  Array.from(output.matchAll(ARTIFACT_BLOCK_PATTERN)).flatMap((match) => {
    const rawBlock = (match[1] ?? "").trim();
    if (rawBlock.length === 0) {
      return [];
    }

    const separatorIndex = rawBlock.indexOf("\n---\n");
    const headerPart =
      separatorIndex >= 0 ? rawBlock.slice(0, separatorIndex) : rawBlock;
    const bodyPart =
      separatorIndex >= 0
        ? rawBlock.slice(separatorIndex + "\n---\n".length)
        : "";

    const headerLines = headerPart.split(/\r?\n/).filter((line) => line.trim());
    const meta = parseArtifactHeader(headerLines);
    return [{ ...meta, body: bodyPart.trim() }];
  });

export const stripAgentRunArtifactsFromOutput = (output: string): string =>
  output
    .replace(ARTIFACT_BLOCK_PATTERN, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
