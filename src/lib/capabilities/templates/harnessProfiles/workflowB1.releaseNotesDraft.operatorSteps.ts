import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const RELEASE_NOTES_DRAFT_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "release-notes-draft-operator-confirm",
      title: "Confirm version, audience, and change list",
      content: [
        "1. Check version matches the release you are shipping.",
        "2. Paste or refine changes so each item is understandable without internal jargon.",
        "3. Set audience (customers, internal, partners) and reply ready when inputs look complete.",
      ].join("\n"),
    },
    {
      id: "release-notes-draft-operator-grouping",
      title: "Review grouping, breaking changes, and tone",
      content: [
        "1. Read how the agent clustered items and surfaced breaking changes.",
        "2. Say what to rename, merge, split, or drop from the outline.",
        "3. Reply when grouping and tone feel right for your audience.",
      ].join("\n"),
    },
    {
      id: "release-notes-draft-operator-approve",
      title: "Approve release notes before you publish",
      content: [
        "1. Read the final draft for accuracy against the real change list.",
        "2. Ask for edits if anything is missing, too technical, or over-promises.",
        "3. Reply approve when the notes are ready for changelog, email, or in-app modal.",
      ].join("\n"),
    },
  ];
