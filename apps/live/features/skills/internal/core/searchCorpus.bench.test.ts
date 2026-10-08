import { describe, expect, it } from "vitest";

import { buildSkillCorpus, searchSkillCorpus } from "./searchCorpus";
import type { IndexedSkill } from "./skillIndex.types";

const DIMS = 768;
const COUNT = 5_000;
const VOCAB = Array.from({ length: 800 }, (_, i) => `term${i}`);

/** Deterministic pseudo-random so the run is repeatable. */
const rng = (seed: number) => () => {
  seed = (seed * 1_664_525 + 1_013_904_223) % 4_294_967_296;
  return seed / 4_294_967_296;
};

const synthetic = (): IndexedSkill[] => {
  const next = rng(7);
  const word = () => VOCAB[Math.floor(next() * VOCAB.length)]!;
  return Array.from({ length: COUNT }, (_, i) => ({
    skillId: `s${i}`,
    projectId: "p",
    name: `${word()} ${word()}`,
    description: Array.from({ length: 12 }, word).join(" "),
    whenToUse: Array.from({ length: 10 }, word).join(" "),
    keywords: Array.from({ length: 4 }, word).join(" "),
    version: 1,
    hasScripts: false,
    updatedAt: "",
    vector: Float32Array.from({ length: DIMS }, next),
  }));
};

describe("searchSkillCorpus benchmark", () => {
  it("answers over 5,000 skills well inside the fast-path budget", () => {
    const corpus = buildSkillCorpus(synthetic());
    const queryVector = Float32Array.from({ length: DIMS }, rng(99));
    searchSkillCorpus(corpus, { query: "term1 term2", queryVector, k: 5 });
    const started = performance.now();
    const hits = searchSkillCorpus(corpus, {
      query: "term10 term20 term30 term40",
      queryVector,
      k: 5,
    });
    const elapsedMs = performance.now() - started;
    expect(hits).toHaveLength(5);
    // Target is <50 ms; the bound is generous so slow CI machines stay green.
    expect(elapsedMs).toBeLessThan(250);
  });
});
