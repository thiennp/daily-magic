import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import KnowledgeComputersList from "@/features/projects/knowledge-impact/KnowledgeComputersList";
import KnowledgeRepeatRateChart from "@/features/projects/knowledge-impact/KnowledgeRepeatRateChart";
import KnowledgeSharedCardsList from "@/features/projects/knowledge-impact/KnowledgeSharedCardsList";
import KnowledgeTokensPerRunChart from "@/features/projects/knowledge-impact/KnowledgeTokensPerRunChart";
import { buildProjectKnowledgeImpactView } from "@/lib/knowledge/buildProjectKnowledgeImpactView";

const row = (day: string, repeatsWith: number) => ({
  day,
  deviceId: "d1",
  runs: 4,
  holdoutRuns: 1,
  runsWith: 3,
  repeatsWith,
  repeatsHoldout: 1,
  cardsInjected: 5,
  injectedTokens: 600,
  mistakesAvoided: 2,
  estTokensSaved: 3000,
  correctionTurns: 0,
});

const view = {
  ...buildProjectKnowledgeImpactView({
    rows: [row("2026-10-05", 0), row("2026-10-13", 1)],
    computers: [
      {
        deviceId: "d1",
        label: "Work Mac",
        ownerName: "Pat",
        status: "degraded" as const,
        cardCount: 7,
        installBundleVersion: "283",
        lastReportAt: null,
      },
    ],
    windowDays: 30,
    includeComputers: true,
  }),
  sharedCards: [
    {
      cardId: "c1",
      kind: "mistake",
      takeaway: "Avoid <script> in prompts",
      files: ["a.ts"],
      outcome: "failed",
      commitSha: "abcdef123456",
      occurrences: 3,
      computerLabel: "Work Mac",
      updatedAt: "2026-10-08T00:00:00Z",
    },
  ],
};

describe("knowledge impact blocks", () => {
  it("renders charts with one polyline per series", () => {
    const html = renderToStaticMarkup(
      <KnowledgeRepeatRateChart impact={view} />,
    );
    expect(html).toContain("<polyline");
    expect(
      renderToStaticMarkup(<KnowledgeTokensPerRunChart impact={view} />),
    ).toContain("<rect");
  });

  it("shows computer status with a fix hint, and escapes shared note text", () => {
    const computers = renderToStaticMarkup(
      <KnowledgeComputersList impact={view} />,
    );
    expect(computers).toContain("Keyword only");
    expect(computers).toContain("Ollama");
    const cards = renderToStaticMarkup(
      <KnowledgeSharedCardsList impact={view} />,
    );
    expect(cards).toContain("Avoid &lt;script&gt;");
    expect(cards).toContain("abcdef1");
  });

  it("hides owner-only blocks for non-owners", () => {
    const member = { ...view, computers: null, sharedCards: null };
    expect(
      renderToStaticMarkup(<KnowledgeComputersList impact={member} />),
    ).toBe("");
    expect(
      renderToStaticMarkup(<KnowledgeSharedCardsList impact={member} />),
    ).toBe("");
  });
});
