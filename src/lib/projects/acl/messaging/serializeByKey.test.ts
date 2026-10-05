import { describe, expect, it } from "vitest";

import { serializeByKey } from "@/lib/projects/acl/messaging/serializeByKey";

const tick = () => new Promise((resolve) => setTimeout(resolve, 1));

describe("serializeByKey", () => {
  it("runs same-key tasks one after another and other keys in parallel", async () => {
    const log: string[] = [];
    const task = (name: string) => async () => {
      log.push(`start ${name}`);
      await tick();
      log.push(`end ${name}`);
      return name;
    };
    const results = await Promise.all([
      serializeByKey("k", task("a1")),
      serializeByKey("k", task("a2")),
      serializeByKey("other", task("b")),
    ]);
    expect(results).toEqual(["a1", "a2", "b"]);
    expect(log.indexOf("end a1")).toBeLessThan(log.indexOf("start a2"));
    expect(log.indexOf("start b")).toBeLessThan(log.indexOf("end a1"));
  });

  it("runs the next task after a failed one", async () => {
    const failed = serializeByKey("k", async () => {
      throw new Error("boom");
    });
    const next = serializeByKey("k", async () => "ok");
    await expect(failed).rejects.toThrow("boom");
    await expect(next).resolves.toBe("ok");
  });
});
