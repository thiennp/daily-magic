import { describe, expect, it } from "vitest";

import { runPool } from "./scanRunPool";

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

describe("runPool", () => {
  it("never runs more than the limit at once and visits every item", async () => {
    const live = { now: 0, max: 0 };
    const seen: number[] = [];
    await runPool(
      [1, 2, 3, 4, 5, 6, 7],
      3,
      () => false,
      async (item) => {
        live.now += 1;
        live.max = Math.max(live.max, live.now);
        await sleep(5);
        seen.push(item);
        live.now -= 1;
      },
    );
    expect(live.max).toBe(3);
    expect([...seen].sort()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("hands out items oldest first", async () => {
    const started: number[] = [];
    await runPool(
      [10, 20, 30],
      2,
      () => false,
      async (item) => {
        started.push(item);
        await sleep(1);
      },
    );
    expect(started).toEqual([10, 20, 30]);
  });

  it("stops handing out items once told to, and lets running ones finish", async () => {
    const done: number[] = [];
    const stop = { value: false };
    await runPool(
      [1, 2, 3, 4, 5, 6],
      2,
      () => stop.value,
      async (item) => {
        await sleep(2);
        done.push(item);
        if (item === 2) stop.value = true;
      },
    );
    expect(done.length).toBeLessThan(6);
    expect(done).toContain(1);
    expect(done).toContain(2);
  });

  it("copes with no items", async () => {
    await runPool(
      [],
      3,
      () => false,
      async () => undefined,
    );
  });
});
