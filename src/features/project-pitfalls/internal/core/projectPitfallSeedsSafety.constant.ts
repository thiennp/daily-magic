import type { ProjectPitfallContent } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

/** Generic platform seeds: apply to any software project (shown on every project). */
export const PROJECT_PITFALL_SEEDS_SAFETY: readonly ProjectPitfallContent[] = [
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
