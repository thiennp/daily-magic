"use client";

import AgentRunPartialOutputSections from "@/features/dispatch/AgentRunPartialOutputSections";
import type { AgentRunSemanticOutput } from "@/features/dispatch/utils/formatAgentRunSemanticOutput";
import { hasAgentRunSemanticOutput } from "@/features/dispatch/utils/formatAgentRunSemanticOutput";

interface AgentRunArtifactListProps {
  readonly artifacts: AgentRunSemanticOutput["artifacts"];
}

const AgentRunArtifactList = ({ artifacts }: AgentRunArtifactListProps) => {
  if (artifacts.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-3">
      {artifacts.map((artifact, index) => (
        <li
          key={`${artifact.title}-${index}`}
          className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900/40"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {artifact.kind}
            {artifact.title.length > 0 ? ` · ${artifact.title}` : ""}
          </p>
          {artifact.url !== undefined && artifact.url.length > 0 ? (
            <a
              href={artifact.url}
              className="mt-2 block text-sm text-brand-700 underline dark:text-brand-300"
              target="_blank"
              rel="noreferrer"
            >
              {artifact.url}
            </a>
          ) : null}
          {artifact.body.length > 0 ? (
            <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-100">
              {artifact.body}
            </pre>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

interface AgentRunSemanticOutputViewProps {
  readonly formatted: AgentRunSemanticOutput;
  readonly fallbackPlain?: string;
}

export default function AgentRunSemanticOutputView({
  formatted,
  fallbackPlain,
}: AgentRunSemanticOutputViewProps) {
  if (!hasAgentRunSemanticOutput(formatted)) {
    return fallbackPlain !== undefined && fallbackPlain.length > 0 ? (
      <pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {fallbackPlain}
      </pre>
    ) : null;
  }

  return (
    <div className="mt-2 space-y-4">
      <AgentRunArtifactList artifacts={formatted.artifacts} />
      <AgentRunPartialOutputSections sections={formatted.sections} />
      {formatted.plainText.length > 0 ? (
        <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          {formatted.plainText}
        </pre>
      ) : null}
    </div>
  );
}
