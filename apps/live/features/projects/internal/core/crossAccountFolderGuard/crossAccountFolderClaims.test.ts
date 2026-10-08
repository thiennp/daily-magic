import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  claimCrossAccountFolder,
  readCrossAccountFolderClaims,
} from "./crossAccountFolderClaims";
import { AGENT_WITCH_PROFILES_DIR_NAME_FOR_CLAIMS } from "./crossAccountFolderGuard.constant";

describe("crossAccountFolderClaims", () => {
  const dirs: string[] = [];

  const createTempDir = () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "test-tmp-"));
    dirs.push(dir);
    return dir;
  };

  afterEach(() => {
    for (const d of dirs) {
      fs.rmSync(d, { recursive: true, force: true });
    }
    dirs.length = 0;
  });

  it("write + re-read", () => {
    const installDir = createTempDir();
    fs.mkdirSync(
      path.join(
        installDir,
        AGENT_WITCH_PROFILES_DIR_NAME_FOR_CLAIMS,
        "a@a.com",
      ),
      { recursive: true },
    );

    const res = claimCrossAccountFolder({
      installDir,
      accountEmail: "a@a.com",
      projectId: "p1",
      folderRealPath: "/a",
    });
    expect(res.ok).toBe(true);

    const claims = readCrossAccountFolderClaims(installDir);
    expect(claims).toHaveLength(1);
    expect(claims[0].accountEmail).toBe("a@a.com");
  });

  it("refusal leaves file unchanged", () => {
    const installDir = createTempDir();
    fs.mkdirSync(
      path.join(
        installDir,
        AGENT_WITCH_PROFILES_DIR_NAME_FOR_CLAIMS,
        "a@a.com",
      ),
      { recursive: true },
    );
    fs.mkdirSync(
      path.join(
        installDir,
        AGENT_WITCH_PROFILES_DIR_NAME_FOR_CLAIMS,
        "b@b.com",
      ),
      { recursive: true },
    );

    claimCrossAccountFolder({
      installDir,
      accountEmail: "a@a.com",
      projectId: "p1",
      folderRealPath: "/a",
    });

    const claimsBefore = readCrossAccountFolderClaims(installDir);

    const res = claimCrossAccountFolder({
      installDir,
      accountEmail: "b@b.com",
      projectId: "p2",
      folderRealPath: "/a",
    });
    expect(res.ok).toBe(false);

    const claimsAfter = readCrossAccountFolderClaims(installDir);
    expect(claimsAfter).toEqual(claimsBefore);
  });

  it("claim of a removed profile is ignored/pruned", () => {
    const installDir = createTempDir();
    fs.mkdirSync(
      path.join(
        installDir,
        AGENT_WITCH_PROFILES_DIR_NAME_FOR_CLAIMS,
        "a@a.com",
      ),
      { recursive: true },
    );
    fs.mkdirSync(
      path.join(
        installDir,
        AGENT_WITCH_PROFILES_DIR_NAME_FOR_CLAIMS,
        "b@b.com",
      ),
      { recursive: true },
    );

    claimCrossAccountFolder({
      installDir,
      accountEmail: "a@a.com",
      projectId: "p1",
      folderRealPath: "/a",
    });

    fs.rmSync(
      path.join(
        installDir,
        AGENT_WITCH_PROFILES_DIR_NAME_FOR_CLAIMS,
        "a@a.com",
      ),
      { recursive: true, force: true },
    );

    const res = claimCrossAccountFolder({
      installDir,
      accountEmail: "b@b.com",
      projectId: "p2",
      folderRealPath: "/a",
    });
    expect(res.ok).toBe(true);

    const claims = readCrossAccountFolderClaims(installDir);
    expect(claims).toHaveLength(1);
    expect(claims[0].accountEmail).toBe("b@b.com");
  });
});
