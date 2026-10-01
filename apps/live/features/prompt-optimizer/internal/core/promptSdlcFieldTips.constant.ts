export const PROMPT_SDLC_FIELD_TIPS = {
  goal: {
    title: "Goal",
    practice:
      "Write the outcome a reader can check. Run uses the text in this field.",
    example: "Reply to a support ticket using only facts in the ticket.",
  },
  prompt: {
    title: "Prompt",
    practice:
      "Paste the prompt you use today. Name the files it should change, or use a git repo, so the judge knows where to look. The judge runs it, reads those changes, and checks the tokens. The improver rewrites this text.",
    example:
      "Update replies/latest.md for the customer. Use only facts from the ticket.",
  },
  folder: {
    title: "Folder",
    practice:
      "Choose the project folder. The judge reads git changes, or the files the prompt names when this folder is not a git repo. After the score is saved, those edits are put back, including a commit the run made and cache files it wrote, so the next round starts from the same folder.",
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
      "Choose who runs the prompt. A separate pass scores the changes. Another pass checks the tokens and suggests what to cut before the improver runs. I'll score it when you want to score the changes yourself.",
    example: "Claude",
  },
  judgeInstructions: {
    title: "Instructions for the judge",
    practice:
      "Optional. If the prompt needs an input, put that input here. Name the file to check when the folder is not a git repo. The score is about the changes, the tokens, and the delay. It does not score the prompt wording.",
    example:
      "Input: Where is my refund?\nCheck: replies/latest.md\nWanted: The ticket has no refund.\nMark down: A file that invents a refund amount.",
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
      "Optional. Used with the goal when rewriting. The improver also receives the token suggestion. It does not see the judge instructions, so repeat the input and the file to change.",
    example:
      "Keep the reply under four sentences.\nInput: Where is my refund?\nWanted output: The ticket has no refund. Ask which order.",
  },
  runner: {
    title: "Runner",
    practice:
      "In the four-step wizard, the runner executes each module prompt in step 4. The judge scores the changes only.",
    example: "Claude",
  },
  runnerInstructions: {
    title: "Runner instructions",
    practice:
      "Optional. Sent with each module prompt when the runner executes. Use for folder context or output shape.",
    example: "Write only to module-output.md in the project root.",
  },
  maxTrials: {
    title: "Max trials",
    practice:
      "Caps how many runner+judge trials Step 4 may run per module (AW maxTrials). Default 1. Hard stop if spend/token ceilings trip first.",
    example: "1",
  },
  maxSpendUsd: {
    title: "Max spend (USD)",
    practice:
      "Optional compose-time dollar ceiling (AW maxSpendUsd). Before Step 4 you confirm confirmedMaxSpendUsd; hard stop uses errorKind budget_exceeded.",
    example: "2.50",
  },
  confirmedTokenBudget: {
    title: "Confirmed token budget",
    practice:
      "Hard token ceiling for Step 4 after you approve or edit the judge proposal (confirmedTokenBudget).",
    example: "24000",
  },
  confirmedMaxSpendUsd: {
    title: "Confirmed max spend (USD)",
    practice:
      "Hard dollar ceiling for Step 4 (confirmedMaxSpendUsd). Soft warn near the limit; hard stop fails with budget_exceeded.",
    example: "0.24",
  },
  passScore: {
    title: "Step 2 pass score",
    practice:
      "The evaluate step stops when a revision reaches this score, or when it hits the round limit.",
    example: "75",
  },
  modulePassScore: {
    title: "Step 4 pass score",
    practice:
      "Each module in step 4 passes when the judge score reaches this number.",
    example: "88",
  },
} as const;

export type PromptSdlcFieldTipId = keyof typeof PROMPT_SDLC_FIELD_TIPS;
