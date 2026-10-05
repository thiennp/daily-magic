import type { ProjectPitfallContent } from "@/features/project-pitfalls/internal/core/projectPitfall.type";

/** Seeds 1-4: checks and builds. Plain-language copy; exact commands only in check.value. */
export const PROJECT_PITFALL_SEEDS_BUILD: readonly ProjectPitfallContent[] = [
  {
    id: "arch-max-lines",
    symptom:
      "The ci:architecture check fails at the very end because a file has more than 100 lines of code.",
    cause:
      "Files grew past the 100-line limit and the check only ran at the last step.",
    avoidance:
      "Run the ci:architecture check before you ask for review. If a file is too long, move helpers or tests into their own files.",
    check: { kind: "command", value: "npm run ci:architecture" },
    keywords: [
      "arch",
      "architecture",
      "ci:architecture",
      "lines",
      "split",
      "review",
    ],
    tags: ["ci", "architecture"],
    severity: "block",
  },
  {
    id: "symlink-node-modules",
    symptom:
      "The build fails in a copied project folder with an error about the project root or files outside it.",
    cause:
      "node_modules was linked (symlinked) from another folder, so the build tool sees files outside the project.",
    avoidance:
      "Do not link node_modules from another folder. Make a real copy of node_modules (on a Mac, a fast clone copy) from a checkout with the same package-lock.json.",
    check: { kind: "id", value: "pit.symlink-node-modules" },
    keywords: [
      "build",
      "turbopack",
      "node_modules",
      "symlink",
      "worktree",
      "install",
    ],
    tags: ["build", "worktree"],
    severity: "warn",
  },
  {
    id: "install-bundle-clobber",
    symptom:
      "After a build, deps.tar.gz or agent-witch.js in the install folder is missing or changed.",
    cause: "The build rewrites install files that are checked into git.",
    avoidance:
      "After every build, restore deps.tar.gz and agent-witch.js from git, and check that both files exist before you commit.",
    check: {
      kind: "command",
      value:
        "test -f public/install/agent-witch/app/deps.tar.gz && test -f public/install/agent-witch/app/agent-witch.js",
    },
    keywords: [
      "build",
      "bundle",
      "install",
      "deps.tar.gz",
      "agent-witch.js",
      "restore",
    ],
    tags: ["build", "install"],
    severity: "warn",
  },
  {
    id: "stale-next",
    symptom:
      "Type checking fails with errors about pages or routes that no longer exist.",
    cause:
      "Old build files are left in the .next folder from an earlier build.",
    avoidance:
      "Delete the .next folder and rebuild, then run the type check again before you treat the error as real.",
    check: { kind: "id", value: "pit.stale-next" },
    keywords: ["build", "next", ".next", "typecheck", "tsc", "flaky"],
    tags: ["build", "typecheck"],
    severity: "warn",
  },
];
