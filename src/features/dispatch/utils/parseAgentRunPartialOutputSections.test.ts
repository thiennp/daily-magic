import { describe, expect, it } from "vitest";

import { parseAgentRunPartialOutputSections } from "@/features/dispatch/utils/parseAgentRunPartialOutputSections";

describe("parseAgentRunPartialOutputSections (DISPATCH-003)", () => {
  it("parses markdown file tables from checkpoint context", () => {
    const sections = parseAgentRunPartialOutputSections(
      [
        "| File | Change | What |",
        "|------|--------|------|",
        "| src/hooks/useIsLocalMachine.ts | New | Pings local identity |",
        "| src/HomeConnectedMacsPanel.tsx | Modified | Renders log button |",
      ].join("\n"),
    );

    expect(sections).toEqual([
      {
        kind: "table",
        table: {
          headers: ["File", "Change", "What"],
          rows: [
            ["src/hooks/useIsLocalMachine.ts", "New", "Pings local identity"],
            [
              "src/HomeConnectedMacsPanel.tsx",
              "Modified",
              "Renders log button",
            ],
          ],
        },
      },
    ]);
  });

  it("highlights branch-behind lines as callouts", () => {
    expect(
      parseAgentRunPartialOutputSections(
        "Branch is 5 commits behind origin/main.",
      ),
    ).toEqual([
      {
        kind: "callout",
        text: "Branch is 5 commits behind origin/main.",
      },
    ]);
  });
});
