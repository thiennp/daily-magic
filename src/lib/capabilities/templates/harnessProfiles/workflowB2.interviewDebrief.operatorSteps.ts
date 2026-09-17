import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const INTERVIEW_DEBRIEF_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "interview-debrief-operator-confirm",
      title: "Confirm candidate, role, and interview notes",
      content: [
        "1. Check candidate and role match who you interviewed.",
        "2. Fill strengths with concrete interview evidence (not vibes alone).",
        "3. Add concerns if any; leave blank only when there were none.",
        "4. Reply ready when the form reflects your notes.",
      ].join("\n"),
    },
    {
      id: "interview-debrief-operator-clarify",
      title: "Answer clarifying questions and add missing signal",
      content: [
        "1. Answer the agent’s questions with specific examples from the interview.",
        "2. Name severity for concerns (minor vs blocking) when asked.",
        "3. Reply when you are done answering.",
      ].join("\n"),
    },
    {
      id: "interview-debrief-operator-review",
      title: "Review debrief before you share with the committee",
      content: [
        "1. Read strengths, concerns, and the hire / no-hire / hold recommendation.",
        "2. Ask for edits if tone is unfair or evidence is thin.",
        "3. Reply approve when you are ready to paste into your hiring doc or ATS.",
      ].join("\n"),
    },
  ];
