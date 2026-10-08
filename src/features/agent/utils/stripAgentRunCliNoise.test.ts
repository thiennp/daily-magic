import { describe, expect, it } from "vitest";

import { formatAgentRunPartialOutputForDisplay } from "@/features/agent/utils/formatAgentRunPartialOutputForDisplay";
import { stripAgentRunCliNoise } from "@/features/agent/utils/stripAgentRunCliNoise";

const codexStart = [
  ", [[NEXT_ACTIONS]], or",
  "[[AGENT_RUN_WRITER_EXECUTION]]",
  "agentRunWriterExecutionBackend=cli-writer-api-key-missing",
  "Reading additional input from stdin...",
  "2026-10-08T15:11:16.152731Z ERROR codex_models_manager::cache: failed",
  "OpenAI Codex v0.144.6",
  "--------",
  "workdir: /Users/x/baby-care",
  "model: gpt",
  "--------",
  "user",
  "Read docs/BRIEF.md.",
  "3. Do not put [[AWAITING_INPUT]] inside the estimate block.",
];

/** Exact junk from Thien's ask modal (qa/ask-context/thien-2126.png). */
const thienAskContextJunk = [
  ", [[NEXT_ACTIONS]], or [[AWAITING_INPUT]] inside the estimate block.",
  "4. Never use [[AWAITING_INPUT]] to ask the operator to confirm an estimate — proceed automatically.",
  "finding so the operator sees enriched results.",
  "7. Do not nest [[PROGRESS]], [[NEXT_ACTIONS]], or [[AWAITING_INPUT]] inside wave blocks.",
  "\u001b[36muser\u001b[0m",
  "Match design screens f1-* onboarding (welcome, sign-in, privacy, add baby, units, notif) and f2-* multi-baby (switcher, add, twins, edit, archive, delete, restore). Edit src; build; commit.",
].join("\n");

describe("stripAgentRunCliNoise", () => {
  it("returns nothing while only the banner and echoed prompt exist", () => {
    expect(stripAgentRunCliNoise(codexStart.join("\n"))).toBe("");
  });

  it("keeps the agent reply after the echoed prompt", () => {
    const output = [...codexStart, "codex", "Writing SPEC.md now."].join("\n");
    expect(stripAgentRunCliNoise(output)).toBe("Writing SPEC.md now.");
  });

  it("leaves plain output untouched", () => {
    expect(stripAgentRunCliNoise("Opened brief.md")).toBe("Opened brief.md");
  });

  it("3945994e: drops harness rules, ANSI user chrome, and mid-sentence fragments", () => {
    const cleaned = stripAgentRunCliNoise(thienAskContextJunk);
    expect(cleaned).toBe(
      "Match design screens f1-* onboarding (welcome, sign-in, privacy, add baby, units, notif) and f2-* multi-baby (switcher, add, twins, edit, archive, delete, restore). Edit src; build; commit.",
    );
    expect(cleaned).not.toMatch(/\[\[|NEXT_ACTIONS|AWAITING_INPUT|PROGRESS/);
    expect(cleaned).not.toMatch(/\[36m|user/);
    expect(cleaned).not.toMatch(/Never use|Do not nest|enriched results/);

    const formatted =
      formatAgentRunPartialOutputForDisplay(thienAskContextJunk);
    expect(formatted.sections).toEqual([
      {
        kind: "paragraph",
        text: "Match design screens f1-* onboarding (welcome, sign-in, privacy, add baby, units, notif) and f2-* multi-baby (switcher, add, twins, edit, archive, delete, restore). Edit src; build; commit.",
      },
    ]);
    expect(formatted.progressUpdates).toEqual([]);
  });

  it("strips orphaned ANSI fragments without the ESC byte", () => {
    expect(stripAgentRunCliNoise("[36muser [0m\nClean reply.")).toBe(
      "Clean reply.",
    );
  });

  it("never shows raw marker syntax in Show full context sections", () => {
    const formatted = formatAgentRunPartialOutputForDisplay(
      "Built the screens. [[NEXT_ACTIONS]]\n\n| Screen | State |\n| --- | --- |\n| f1 | done |",
    );
    expect(formatted.sections[0]).toEqual({
      kind: "paragraph",
      text: "Built the screens.",
    });
    expect(formatted.sections[1]).toEqual({
      kind: "table",
      table: { headers: ["Screen", "State"], rows: [["f1", "done"]] },
    });
    expect(
      formatted.sections
        .filter((section) => section.kind === "paragraph")
        .map((section) => section.text)
        .join("\n"),
    ).not.toMatch(/\[\[/);
  });
});
