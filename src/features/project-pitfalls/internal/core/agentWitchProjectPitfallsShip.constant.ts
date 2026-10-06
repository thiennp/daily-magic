import type { ProjectPitfallContent } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

/** AgentWitch (daily-magic) project rules: pushing work and updating main (project-scoped since 094). */
export const AGENTWITCH_PROJECT_PITFALLS_SHIP: readonly ProjectPitfallContent[] = [
  {
    id: "main-moved-rebase",
    symptom:
      "Your push or your update of main is rejected because main has new commits.",
    cause: "Someone else updated main after you created your branch.",
    avoidance:
      "Get the latest main, put your commits on top of it in a new branch with the next round number (for example -r2), and push that. Never force-push.",
    check: { kind: "id", value: "pit.main-moved-rebase" },
    keywords: ["ship", "push", "main", "rebase", "rejected", "update main"],
    tags: ["git", "ship"],
    severity: "warn",
  },
  {
    id: "health-lag",
    symptom:
      "You report the work as done, but the live site still runs the old version.",
    cause:
      "The deploy finishes after main is updated, so the health check still shows the old commit.",
    avoidance:
      "Wait until the health check shows the same commit as main, then run the smoke test. Only then report the work as done.",
    check: { kind: "id", value: "pf.health-matches-main" },
    keywords: ["ship", "deploy", "health", "commit", "smoke", "done"],
    tags: ["deploy", "ship"],
    severity: "block",
  },
  {
    id: "local-suite-gate",
    symptom: "You wait for GitHub checks on your branch, but they never start.",
    cause: "GitHub checks only run on main, not on other branches.",
    avoidance:
      "Do not wait for GitHub. Run the tests, the type check, and the ci:architecture check on your own machine and share the results.",
    check: { kind: "id", value: "pit.local-suite-gate" },
    keywords: ["ci", "github", "checks", "actions", "tests", "ship", "push"],
    tags: ["ci", "ship"],
    severity: "warn",
  },
  {
    id: "no-prs",
    symptom: "A pull request was opened for daily-magic.",
    cause: "Habit from other repos. This repo does not use pull requests.",
    avoidance:
      "Never open a pull request for daily-magic. Push your branch and tell the lead it is ready; the lead updates main.",
    check: { kind: "id", value: "pit.no-prs" },
    keywords: ["pr", "pull request", "review", "merge", "github", "ship"],
    tags: ["git", "ship"],
    severity: "warn",
  },
];
