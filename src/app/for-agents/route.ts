import { formatAgentAccessGuidelineMarkdown } from "@/lib/agentAccess/formatAgentAccessGuidelineMarkdown";

export const dynamic = "force-static";

/**
 * Public agent guideline as plain markdown Response.
 * No React document, site chrome, or CSS modules — agents fetch this URL.
 */
export function GET(): Response {
  return new Response(formatAgentAccessGuidelineMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "X-Robots-Tag": "all",
    },
  });
}
