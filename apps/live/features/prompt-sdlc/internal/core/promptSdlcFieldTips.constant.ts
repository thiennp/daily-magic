export const PROMPT_SDLC_FIELD_TIPS = {
  goal: {
    title: "Goal",
    practice:
      "Write the outcome a reader can check. Name who it is for and what must stay true.",
    example: "Reply to a support ticket using only facts in the ticket.",
  },
  prompt: {
    title: "Prompt",
    practice:
      "Paste the prompt you use today. Each round the judge scores this text. The improver rewrites it.",
    example:
      "You help support agents. Be warm. Solve the problem in the customer's words.",
  },
  folder: {
    title: "Folder",
    practice:
      "Choose the project folder when the prompt is about that code. The judge and the improver can read the Playbook and the code there.",
    example: "~/work/support-bot",
  },
  skill: {
    title: "Skill",
    practice:
      "Pick a skill to fill the prompt. Saving later starts from that skill's name, description, and file name.",
    example: "support-reply",
  },
  judge: {
    title: "Judge",
    practice:
      "Choose who scores the prompt each round. I'll score it when you want to type the score and the reason yourself.",
    example: "Claude",
  },
  judgeInstructions: {
    title: "Instructions for the judge",
    practice:
      "Optional. The judge reads the prompt with the goal and these instructions. It does not run the prompt or check a real output. Add 2 or 3 cases. Each case has an input, the output you want, and one failure to mark down. Put the same cases in the improver instructions.",
    example:
      "Input: Where is my refund?\nWanted output: The ticket has no refund. Ask which order.\nMark down: A reply that invents a refund amount.",
  },
  improver: {
    title: "Improver",
    practice:
      "Choose who rewrites the prompt when the score is under the pass score. I'll rewrite it when you want to edit the next prompt yourself.",
    example: "Codex",
  },
  improverInstructions: {
    title: "Instructions for the improver",
    practice:
      "Optional. Used with the goal when rewriting. The improver does not see the judge instructions, so repeat the input and output cases here.",
    example:
      "Keep the reply under four sentences.\nInput: Where is my refund?\nWanted output: The ticket has no refund. Ask which order.",
  },
  passScore: {
    title: "Pass score",
    practice:
      "The run passes at this score. 90 is the usual bar. Lower it when a useful prompt is enough.",
    example: "90",
  },
  roundLimit: {
    title: "Round limit",
    practice:
      "The run stops after this many scored rounds. 10 is the usual limit. It also stops when the score has not risen for 3 rounds.",
    example: "10",
  },
} as const;

export type PromptSdlcFieldTipId = keyof typeof PROMPT_SDLC_FIELD_TIPS;
