export const meta = {
  name: "fsa-fractal-loop",
  description:
    "Fractal Slice Architecture loop: one bounded unit per round, reviewed for zero logic change, fast-forward pushed to main, next unit chosen automatically",
  whenToUse:
    "Gradually migrating src/features to FSA public-api boundaries without a big-bang refactor",
  phases: [
    {
      title: "Round",
      detail:
        "one agent applies .cursor/commands/command-fsa-loop-round.md steps 0-5 to one unit and commits",
    },
    {
      title: "Review",
      detail:
        "an independent agent confirms no logic change and fixes problems",
    },
    {
      title: "Push",
      detail:
        "fast-forward push to main; if main moved, drop the round and redo it",
    },
  ],
};

// args: { maxRounds?: number, maxConsecutiveBlocks?: number }
const MAX_ROUNDS = (args && args.maxRounds) || 400;
const MAX_BLOCKS = (args && args.maxConsecutiveBlocks) || 8;
const MAX_REDOS = 3;

const ROUND_SCHEMA = {
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: [
        "committed",
        "blocked",
        "finished",
        "needs-human",
        "preflight-failed",
      ],
    },
    unit: { type: "string" },
    baseSha: { type: "string" },
    note: { type: "string" },
  },
  required: ["status", "note"],
};

const REVIEW_SCHEMA = {
  type: "object",
  properties: {
    ok: { type: "boolean" },
    fixed: { type: "boolean" },
    problems: { type: "array", items: { type: "string" } },
  },
  required: ["ok", "problems"],
};

const PUSH_SCHEMA = {
  type: "object",
  properties: {
    result: { type: "string", enum: ["pushed", "main-moved", "failed"] },
    note: { type: "string" },
  },
  required: ["result", "note"],
};

const roundPrompt = (n) =>
  `Run ONE round (round ${n}) of the FSA loop: .cursor/commands/command-fsa-loop-round.md steps 0-5 up to and including the commit, but STOP before the review and the push (other agents do those). ` +
  `Never ask the user anything. Decide yourself. ` +
  `If step 1 returns done, return status "finished". If it returns needs-human, return "needs-human" with the unit and reason in note. ` +
  `If preflight fails, return "preflight-failed". If verification fails or a limit is exceeded, revert and block the unit as the playbook says, push that state-only commit to main as the playbook says, and return "blocked". ` +
  `On success return "committed" with the unit, base sha and a one-line note.`;

const reviewPrompt = (round) =>
  `Review the latest commit (git show HEAD) for FSA unit "${round.unit}" (base ${round.baseSha}). The one question: is there ANY logic or behavior change? ` +
  `Allowed in the diff: new public-api/*.ts files that only re-export, changed import paths/specifiers in importers, .agents/fsa/state.json, a README line. ` +
  `Also fail it if: files were moved or renamed; a public-api file contains logic, an index.ts barrel, or is empty; a 'use client' file imports public-api/infrastructure; ` +
  `a symbol was renamed or its type changed; a default export became named (or the reverse); the baseline .agents/fsa/depcruise-baseline.json grew. ` +
  `Also run \`npx tsc --noEmit\` and \`npm run fsa:deps\`. ` +
  `If you find a problem, FIX it (git commit --amend, no --no-verify) and re-run those checks, then return ok=true, fixed=true. ` +
  `If you cannot fix it, change nothing and return ok=false with the problems.`;

const pushPrompt = () =>
  `Push the latest FSA round to main, fast-forward only, per step 5 of .cursor/commands/command-fsa-loop-round.md: ` +
  `\`git fetch origin main\`; if \`git merge-base --is-ancestor origin/main HEAD\` fails, do NOT merge, rebase or force: return "main-moved". ` +
  `Otherwise \`git push origin HEAD:main\` (hooks must pass, never --no-verify). If the push is rejected because main moved meanwhile, return "main-moved". ` +
  `Any other failure: return "failed" with the error in note.`;

const blockAndPush = (round, why) =>
  agent(
    `Undo the latest FSA round for unit "${round.unit}" (${why}). \`git fetch origin main && git reset --hard origin/main\` (this drops only our own unpushed round commit), ` +
      `then \`npm run fsa:next -- block ${round.unit} "${why.replace(/"/g, "'")}"\`, commit .agents/fsa/state.json ("chore(fsa): block ${round.unit}"), ` +
      `and push it to main fast-forward only (if main moved, fetch, reset to origin/main, and redo the block + commit once). Touch nothing else.`,
    { label: `block ${round.unit}`, phase: "Push" },
  );

const redos = {};
let blockedInARow = 0;
let committed = 0;
let blocked = 0;
let stopReason = "round cap reached";

for (let n = 1; n <= MAX_ROUNDS; n++) {
  const round = await agent(roundPrompt(n), {
    label: `round ${n}`,
    phase: "Round",
    schema: ROUND_SCHEMA,
  });
  if (!round) {
    stopReason = `round ${n} agent died`;
    break;
  }
  if (
    round.status === "finished" ||
    round.status === "needs-human" ||
    round.status === "preflight-failed"
  ) {
    stopReason = `${round.status}: ${round.note}`;
    break;
  }
  if (round.status === "blocked") {
    blocked += 1;
    blockedInARow += 1;
    log(
      `round ${n}: blocked ${round.unit} (${blockedInARow}/${MAX_BLOCKS}) — ${round.note}`,
    );
    if (blockedInARow >= MAX_BLOCKS) {
      stopReason = `${MAX_BLOCKS} blocked units in a row`;
      break;
    }
    continue;
  }

  const review = await agent(reviewPrompt(round), {
    label: `review ${n}`,
    phase: "Review",
    schema: REVIEW_SCHEMA,
  });
  if (!review || !review.ok) {
    await blockAndPush(
      round,
      `review failed: ${review ? review.problems.join("; ") : "review agent died"}`,
    );
    blocked += 1;
    blockedInARow += 1;
    log(`round ${n}: review rejected ${round.unit}, reverted and blocked`);
    if (blockedInARow >= MAX_BLOCKS) {
      stopReason = `${MAX_BLOCKS} blocked units in a row`;
      break;
    }
    continue;
  }

  const push = await agent(pushPrompt(), {
    label: `push ${n}`,
    phase: "Push",
    schema: PUSH_SCHEMA,
  });
  if (push && push.result === "pushed") {
    committed += 1;
    blockedInARow = 0;
    log(
      `round ${n}: ${round.unit} pushed${review.fixed ? " (review fixed it)" : ""}`,
    );
    continue;
  }
  if (push && push.result === "main-moved") {
    redos[round.unit] = (redos[round.unit] || 0) + 1;
    log(
      `round ${n}: main moved, redoing ${round.unit} on the new main (${redos[round.unit]}/${MAX_REDOS})`,
    );
    if (redos[round.unit] >= MAX_REDOS) {
      await blockAndPush(round, "main kept moving; retry later");
      blocked += 1;
    }
    // next iteration's preflight resets to origin/main, so the unit is redone from scratch
    continue;
  }
  stopReason = `push failed: ${push ? push.note : "push agent died"}`;
  break;
}

const report = await agent(
  `Finish the FSA loop run per the "Finish" section of .cursor/commands/command-fsa-loop-round.md: reset to origin/main, run \`npm run build\` and \`npm run fsa:deps\`, ` +
    `write .agents/fsa/last-run.md (units done, blocked units with reasons, baseline count before/after, next unit), commit and push it fast-forward only to main. ` +
    `Return the report text. Stop reason: ${stopReason}. Committed: ${committed}. Blocked: ${blocked}.`,
  { label: "finish report", phase: "Push" },
);

return { stopReason, committed, blocked, report };
