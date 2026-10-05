import type { ProjectPitfallContent } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

/** Seeds: protecting local work, machines, and secrets. */
export const PROJECT_PITFALL_SEEDS_SAFETY: readonly ProjectPitfallContent[] = [
  {
    id: "dirty-home-checkout",
    symptom: "Unsaved work in the main ~/daily-magic folder is lost.",
    cause:
      "Someone ran a reset, clean, or checkout in the shared home folder, which keeps uncommitted work on purpose.",
    avoidance:
      "Never reset or clean ~/daily-magic. Do all work in a separate git worktree under /tmp, created from the latest main.",
    check: { kind: "id", value: "pit.dirty-home-checkout" },
    keywords: ["reset", "clean", "checkout", "worktree", "home", "stash"],
    tags: ["git", "safety"],
    severity: "block",
  },
  {
    id: "box-no-gh-auth",
    symptom:
      "Pushing to GitHub from the box fails with a login or permission error.",
    cause: "The box has no GitHub login for this repo.",
    avoidance:
      "Push from the Mac instead. Never copy GitHub keys or tokens onto the box.",
    check: { kind: "id", value: "pit.box-no-gh-auth" },
    keywords: ["push", "ship", "box", "github", "auth", "permission denied"],
    tags: ["git", "machines"],
    severity: "warn",
  },
  {
    id: "secrets-in-logs",
    symptom:
      "A password, token, or key shows up in a log, a chat message, or a report.",
    cause:
      "Printing settings, environment variables, or key files while debugging.",
    avoidance:
      "Never print a secret. Only say whether it exists, where it is stored, and a short fingerprint (the first characters of its hash).",
    check: { kind: "id", value: "pit.secrets-in-logs" },
    keywords: ["secret", "token", "key", "password", "env", "log", "redact"],
    tags: ["security"],
    severity: "block",
  },
];
