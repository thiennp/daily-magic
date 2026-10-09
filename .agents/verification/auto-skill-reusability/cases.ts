/** Synthetic fixtures shaped like real auto-skill episodes. No real names or tickets. */

export const KNOWN_NAMES = ["Dana Fox", "Review Bot"] as const;

export const SCRUB_CASES: readonly {
  readonly label: string;
  readonly input: string;
  readonly mustNotContain: readonly string[];
  readonly mustContain: readonly string[];
}[] = [
  {
    label: "ticket + PR + hash + sender, as in a status message",
    input:
      "Saved 12 sessions for Alarm/NRG-3260 (06-07/10). Tip 306a44bb62 pushed as PR 4745, Dana Fox asked Review Bot to refactor.",
    mustNotContain: [
      "NRG-3260",
      "306a44bb62",
      "4745",
      "Dana Fox",
      "Review Bot",
    ],
    mustContain: ["<ticket>", "<commit>", "<pr>", "<person>"],
  },
  {
    label: "url, home path, uuid",
    input:
      "see https://git.example.com/org/repo/pull/9 in ~/work/app/src and run 81459574-dd1e-44a5-96dd-ffd46344da37",
    mustNotContain: ["https://", "~/work", "81459574"],
    mustContain: ["<url>", "<path>", "<id>"],
  },
  {
    label: "standards and plain words survive",
    input: "Use UTF-8 and SHA-256; the defaced build needs <build-command>.",
    mustNotContain: [],
    mustContain: ["UTF-8", "SHA-256", "defaced", "<build-command>"],
  },
];

const draft = (name: string, description: string, steps: readonly string[]) =>
  [
    "---",
    `name: ${name}`,
    `description: ${description}`,
    "version: 0.1.0",
    "status: draft",
    'source_message_ids: ["m1","m2"]',
    "---",
    "## When to use",
    "When a repeated task needs the same procedure.",
    "## Steps",
    ...steps.map((step, i) => `${i + 1}. ${step}`),
    "## Pitfalls",
    "- Skipping verification.",
    "## Verification",
    "- Checks pass.",
  ].join("\n");

export const VALIDATE_CASES: readonly {
  readonly label: string;
  readonly markdown: string;
  readonly expect: "ok" | string;
}[] = [
  {
    label: "good: generic name, placeholders",
    markdown: draft(
      "review-migration-naming",
      "Use when a schema migration needs a naming review before merge.",
      ["Read <migration-file>.", "Compare names with <naming-rule>."],
    ),
    expect: "ok",
  },
  {
    label: "bad: ticket key in the name",
    markdown: draft(
      "alarm-nrg-3260-patterns",
      "Use when reviewing alarm patterns.",
      ["Read <file>.", "Fix NRG-3260."],
    ),
    expect: "not_reusable",
  },
  {
    label: "bad: PR number in a step",
    markdown: draft("ship-change", "Use when shipping a change.", [
      "Merge PR 4745.",
      "Run <build-command>.",
    ]),
    expect: "not_reusable",
  },
  {
    label: "bad: sender name in a step",
    markdown: draft("ask-for-review", "Use when a change needs review.", [
      "Ask Dana Fox to review.",
      "Run <build-command>.",
    ]),
    expect: "not_reusable",
  },
  {
    label: "bad: description repeats the name",
    markdown: draft("run-focused-checks", "run-focused-checks", [
      "Read <file>.",
      "Run <build-command>.",
    ]),
    expect: "description_repeats_name",
  },
  {
    label: "bad: one step only",
    markdown: draft("tiny-skill", "Use when doing a tiny thing.", ["Do it."]),
    expect: "too_few_steps",
  },
];

export const DEDUPE_CASES: readonly {
  readonly label: string;
  readonly name: string;
  readonly steps: readonly string[];
  readonly expect: "create_new" | "update_draft" | "skip_exact";
}[] = [
  {
    label: "same name as an open draft",
    name: "Review Migration Naming",
    steps: ["a", "b"],
    expect: "update_draft",
  },
  {
    label: "same steps, other name",
    name: "check-migration-names",
    steps: ["Read <migration-file>.", "Compare names with <naming-rule>."],
    expect: "update_draft",
  },
  {
    label: "unrelated skill",
    name: "rotate-api-keys",
    steps: ["List keys.", "Rotate <key>."],
    expect: "create_new",
  },
];

/** Raw transcript for the optional live LLM check (`--live`). */
export const LIVE_TRANSCRIPT = [
  "Saved 12 Cursor sessions for Alarm/NRG-3260 into history on the MKX52CMWN7 computer.",
  "Dana Fox: please check the migration names in PR 4745 against the naming rule in ~/work/app/docs/naming.md",
  "Review Bot: read https://git.example.com/org/repo/pull/4745, compared 14 migration names, 2 broke the rule, fixed them in commit 306a44bb62.",
  "Dana Fox: thanks, tests are green, merge it.",
].join("\n");
