import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";
import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";

const NL = "\n";

/**
 * Plain markdown for GET /for-agents (agent-only). No HTML, no site chrome.
 * Same sections as the former guideline document, plus Live tools.
 */
export const formatAgentAccessGuidelineMarkdown = (): string => {
  const guideline = buildAgentAccessGuideline();
  const liveGuide = buildAgentAccessLiveGuide();

  const liveTools = liveGuide.tools.flatMap((tool) => [
    `- ${tool.name}. ${tool.description}`,
  ]);

  const sections = guideline.sections.flatMap((section) => [
    `## ${section.heading}`,
    "",
    ...section.body.flatMap((paragraph) => [paragraph, ""]),
  ]);

  const lines: readonly string[] = [
    `# ${guideline.title}`,
    "",
    guideline.description,
    "",
    "## Live tools",
    "",
    ...liveTools,
    "",
    ...sections,
  ];

  return lines.join(NL).replace(/\n+$/u, "") + NL;
};
