export const meta = {
  name: "fsa-cycle-burndown",
  description:
    "Break runtime import cycles one per round with zero behavior change; each round is reviewed, then fast-forward pushed to main",
  whenToUse: "After the FSA loop: burn down barrel-induced import cycles",
  phases: [
    {
      title: "Round",
      detail:
        "one agent applies .cursor/commands/command-fsa-cycle-round.md steps 0-3 and commits",
    },
    {
      title: "Review",
      detail:
        "an independent agent confirms moved code is verbatim and the cycle is gone",
    },
    {
      title: "Push",
      detail:
        "fast-forward push to main; if main moved, drop the round and redo it",
    },
  ],
};

// args: { maxRounds?: number, maxConsecutiveBlocks?: number }
const MAX_ROUNDS = (args && args.maxRounds) || 200;
const MAX_BLOCKS = (args && args.maxConsecutiveBlocks) || 8;
const MAX_REDOS = 3;

const ROUND_SCHEMA = {
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: ["committed", "blocked", "finished", "preflight-failed"],
    },
    cycleKey: { type: "string" },
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
  `Run ONE round (round ${n}) of the FSA cycle burn-down: .cursor/commands/command-fsa-cycle-round.md steps 0-3 up to and including the commit; STOP before the review and push (other agents do those). ` +
  `Never ask the user anything; decide yourself. If step 1 returns done, return "finished". If preflight fails, return "preflight-failed". ` +
  `If the cycle cannot be broken within the limits without a behavior change, block it as the playbook says, push that state-only commit to main (fast-forward only), and return "blocked". ` +
  `On success return "committed" with the cycle key, base sha and a one-line note.`;

const reviewPrompt = (round) =>
  `Review the latest commit (git show HEAD), a cycle-breaking round (key ${round.cycleKey}, base ${round.baseSha}). The one question: is there ANY logic or behavior change? ` +
  `Allowed: declarations (types, interfaces, constants, enums, pure functions) moved VERBATIM into one new leaf file with the old location re-exporting them, import-path edits, \`import type\` conversions, .agents/fsa state files. ` +
  `Fail it if: any function body, signature, default/named export kind or runtime ordering changed; a React component or hook moved; an index.ts barrel was added; more than 6 files or 1 new file; the baseline .agents/fsa/depcruise-baseline.json grew; ` +
  `or the cycle is not actually gone (run \`npm run fsa:cycle -- count\` and compare with the previous count; run \`npx tsc --noEmit\` and \`npm run build\`). ` +
  `If you find a fixable problem, FIX it (git commit --amend, no --no-verify), re-run the checks, return ok=true fixed=true. If you cannot fix it, change nothing and return ok=false with problems.`;

const pushPrompt = () =>
  `Push the latest FSA round to main, fast-forward only: \`git fetch origin main\`; if \`git merge-base --is-ancestor origin/main HEAD\` fails, do NOT merge, rebase or force: return "main-moved". ` +
  `Otherwise \`git push origin HEAD:main\` (hooks must pass, never --no-verify). If rejected because main moved, return "main-moved". Any other failure: "failed" with the error in note.`;

const blockAndPush = (round, why) =>
  agent(
    `Undo the latest cycle round (${why}). \`git fetch origin main && git reset --hard origin/main\` (drops only our own unpushed commit), then ` +
      `\`npm run fsa:cycle -- block "${round.cycleKey}" "${why.replace(/"/g, "'")}"\`, commit .agents/fsa/cycles.json ("chore(fsa): block cycle"), ` +
      `and push fast-forward only (if main moved, fetch, reset to origin/main, redo block + commit once). Touch nothing else.`,
    { label: "block cycle", phase: "Push" },
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
  if (round.status === "finished" || round.status === "preflight-failed") {
    stopReason = `${round.status}: ${round.note}`;
    break;
  }
  if (round.status === "blocked") {
    blocked += 1;
    blockedInARow += 1;
    log(`round ${n}: blocked (${blockedInARow}/${MAX_BLOCKS}) — ${round.note}`);
    if (blockedInARow >= MAX_BLOCKS) {
      stopReason = `${MAX_BLOCKS} blocked cycles in a row`;
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
    log(`round ${n}: review rejected the cycle fix, reverted and blocked`);
    if (blockedInARow >= MAX_BLOCKS) {
      stopReason = `${MAX_BLOCKS} blocked cycles in a row`;
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
      `round ${n}: cycle fixed and pushed${review.fixed ? " (review fixed it)" : ""} — ${round.note}`,
    );
    continue;
  }
  if (push && push.result === "main-moved") {
    const k = round.cycleKey || "?";
    redos[k] = (redos[k] || 0) + 1;
    log(
      `round ${n}: main moved, redoing on the new main (${redos[k]}/${MAX_REDOS})`,
    );
    if (redos[k] >= MAX_REDOS) {
      await blockAndPush(round, "main kept moving; retry later");
      blocked += 1;
    }
    continue;
  }
  stopReason = `push failed: ${push ? push.note : "push agent died"}`;
  break;
}

const report = await agent(
  `Finish the cycle burn-down run: \`git fetch origin main && git reset --hard origin/main\`, run \`npm run fsa:cycle -- count\`, \`npm run fsa:deps\` and \`npm run build\`, ` +
    `append a "Cycle burn-down" section to .agents/fsa/last-run.md (cycles fixed this run, blocked with reasons, remaining count), commit and push fast-forward only to main. ` +
    `Return the report text. Stop reason: ${stopReason}. Fixed: ${committed}. Blocked: ${blocked}.`,
  { label: "finish report", phase: "Push" },
);

return { stopReason, committed, blocked, report };
