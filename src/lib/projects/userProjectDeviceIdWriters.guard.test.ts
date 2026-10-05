import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Guard: only setUserProjectLinkedDevice UPDATE-writes user_projects.device_id.
 * createUserProject may INSERT device_id (then sync). No other UPDATE paths.
 */
describe("user_projects.device_id writer choke point", () => {
  it("UPDATE device_id appears only in setUserProjectLinkedDevice", () => {
    const root = path.join(process.cwd(), "src/lib/projects");
    const offenders: string[] = [];
    const walk = (dir: string): void => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
          continue;
        }
        if (!entry.name.endsWith(".ts") || entry.name.endsWith(".test.ts")) {
          continue;
        }
        const src = fs.readFileSync(full, "utf8");
        if (!/UPDATE\s+user_projects[\s\S]*?device_id\s*=/.test(src)) {
          continue;
        }
        const rel = path.relative(process.cwd(), full);
        if (rel !== "src/lib/projects/setUserProjectLinkedDevice.ts") {
          offenders.push(rel);
        }
      }
    };
    walk(root);
    expect(offenders).toEqual([]);
  });
});
