import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  readAgentWitchHostServices,
  resolveAgentWitchAccountLaunchAgentLabel,
  resolveAgentWitchAccountSystemdUnitName,
} from "@agent-witch/install-layout";
import type {
  AgentWitchHostServiceAccount,
  AgentWitchHostServicesFile,
} from "@agent-witch/install-layout/types";

import {
  backupAgentWitchHostServicesFiles,
  restoreAgentWitchHostServicesBackup,
} from "./backupAgentWitchHostServicesFiles";
import { acquireAgentWitchHostServicesMigrationLock } from "./hostServicesMigrationLock";
import {
  appendAgentWitchHostServicesMigrationAttempt,
  readAgentWitchHostServicesMigrationAttempts,
} from "./hostServicesMigrationState";
import { listAgentWitchMigratableAccounts } from "./listAgentWitchMigratableAccounts";
import {
  migrateAgentWitchMonolithToAccountServices,
  type AgentWitchHostServicesMigrationDeps,
} from "./migrateAgentWitchMonolithToAccountServices";
import { planAgentWitchHostServicesMigration } from "./planAgentWitchHostServicesMigration";
import { verifyAgentWitchAccountHostsUp } from "./verifyAgentWitchAccountHostsUp";

const GMAIL = "nguyenphongthien@gmail.com";
const AGT = "agt-c7f998a3@agents.agentwitch.com";
const THIRD = "third@example.com";
const ROOT_WAKE_PORT = 47892;

const roots: string[] = [];

afterEach(() => {
  for (const root of roots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

const makeMac = (emails: readonly string[] = [GMAIL, AGT]) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-iso4-"));
  roots.push(root);
  const homeDir = root;
  const installDir = path.join(root, ".agent-witch");
  const launchAgentsDir = path.join(homeDir, "Library", "LaunchAgents");
  fs.mkdirSync(launchAgentsDir, { recursive: true });
  fs.writeFileSync(
    path.join(launchAgentsDir, "com.agent-witch.plist"),
    "<plist>legacy</plist>\n",
  );
  fs.mkdirSync(installDir, { recursive: true });
  fs.writeFileSync(
    path.join(installDir, "wake-port.json"),
    JSON.stringify({ wakePort: ROOT_WAKE_PORT }),
  );
  fs.writeFileSync(
    path.join(installDir, "local-app-accounts.json"),
    `${JSON.stringify(
      {
        accounts: [
          {
            email: GMAIL,
            port: 65376,
            pid: 11,
            startedAt: "2026-10-08T00:00:00.000Z",
          },
          {
            email: AGT,
            port: 60704,
            pid: 11,
            startedAt: "2026-10-08T00:00:00.000Z",
          },
        ],
      },
      null,
      2,
    )}\n`,
  );
  const addProfile = (email: string): void => {
    const dir = path.join(installDir, "profiles", email);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "config.json"),
      JSON.stringify({ wsUrl: `wss://x/${email}` }),
    );
    fs.writeFileSync(
      path.join(dir, "device-keypair.json"),
      JSON.stringify({ secret: email }),
    );
  };
  for (const email of emails) {
    addProfile(email);
  }
  return { homeDir, installDir, launchAgentsDir, addProfile };
};

const snapshotSecrets = (installDir: string): Record<string, string> =>
  Object.fromEntries(
    fs.readdirSync(path.join(installDir, "profiles")).flatMap((email) =>
      ["config.json", "device-keypair.json"].map((name) => {
        const filePath = path.join(installDir, "profiles", email, name);
        return [filePath, fs.readFileSync(filePath, "utf8")];
      }),
    ),
  );

const fakeDeps = (
  overrides: Partial<AgentWitchHostServicesMigrationDeps> = {},
): Partial<AgentWitchHostServicesMigrationDeps> => {
  const nextPort = { value: 48000 };
  return {
    isRunningUnderSystemd: () => false,
    startAccountHosts: vi.fn(async () => undefined),
    stopAccountHosts: vi.fn(async () => undefined),
    verifyAccountHostsUp: vi.fn(async () => ({ ok: true as const })),
    allocateWakePort: async () => {
      nextPort.value += 1;
      return nextPort.value;
    },
    log: () => undefined,
    ...overrides,
  };
};

const account = (
  email: string,
  wakePort: number,
  installDir: string,
): AgentWitchHostServiceAccount => ({
  email,
  launchAgentLabel: resolveAgentWitchAccountLaunchAgentLabel(installDir, email),
  systemdUnitName: resolveAgentWitchAccountSystemdUnitName(email),
  wakePort,
});

describe("planAgentWitchHostServicesMigration", () => {
  const existing = (emails: readonly string[]): AgentWitchHostServicesFile => ({
    version: 1,
    mode: "per-account",
    updatedAt: "2026-10-08T00:00:00.000Z",
    accounts: emails.map((email, index) =>
      account(email, 48000 + index, "/x/.agent-witch"),
    ),
  });

  it.each([
    [[], null, { kind: "skip", reason: "no_accounts" }],
    [[GMAIL], null, { kind: "skip", reason: "single_account" }],
    [[AGT, GMAIL], null, { kind: "migrate", newEmails: [AGT, GMAIL] }],
    [[AGT, GMAIL], [AGT, GMAIL], { kind: "noop" }],
    [
      [AGT, GMAIL, THIRD],
      [AGT, GMAIL],
      { kind: "migrate", newEmails: [THIRD] },
    ],
    [[GMAIL], [AGT, GMAIL], { kind: "noop" }],
  ] as const)("accounts %j existing %j", (accounts, listed, expected) => {
    expect(
      planAgentWitchHostServicesMigration({
        accounts,
        existing: listed === null ? null : existing(listed),
      }),
    ).toEqual(expected);
  });

  it("lists only profiles with a config.json object", () => {
    const { installDir } = makeMac();
    fs.mkdirSync(path.join(installDir, "profiles", "empty@example.com"));
    expect(listAgentWitchMigratableAccounts(installDir)).toEqual([AGT, GMAIL]);
  });
});

describe("host services migration lock", () => {
  it("is exclusive while the holder lives and taken over when dead or stale", () => {
    const { installDir } = makeMac();
    const first = acquireAgentWitchHostServicesMigrationLock(installDir, {
      pid: 100,
      now: () => 0,
      isProcessAlive: () => true,
    });
    expect(first).not.toBeNull();
    expect(
      acquireAgentWitchHostServicesMigrationLock(installDir, {
        pid: 200,
        now: () => 1_000,
        isProcessAlive: () => true,
      }),
    ).toBeNull();
    expect(
      acquireAgentWitchHostServicesMigrationLock(installDir, {
        pid: 200,
        now: () => 1_000,
        isProcessAlive: () => false,
      }),
    ).not.toBeNull();
    expect(
      acquireAgentWitchHostServicesMigrationLock(installDir, {
        pid: 300,
        now: () => 11 * 60_000,
        isProcessAlive: () => true,
      }),
    ).not.toBeNull();
    first?.release();
    // 100 no longer holds it, so its release must not remove 300's lock.
    expect(
      acquireAgentWitchHostServicesMigrationLock(installDir, {
        pid: 400,
        now: () => 11 * 60_000,
        isProcessAlive: () => true,
      }),
    ).toBeNull();
  });
});

describe("backup and restore", () => {
  it("round-trips service files, removes new ones, never copies secrets", () => {
    const { homeDir, installDir, launchAgentsDir } = makeMac();
    const secrets = snapshotSecrets(installDir);
    const accounts = [
      account(GMAIL, 0, installDir),
      account(AGT, 0, installDir),
    ];
    const backupDir = backupAgentWitchHostServicesFiles({
      installDir,
      homeDir,
      platform: "darwin",
      accounts,
      now: new Date("2026-10-08T15:30:00.000Z"),
    });
    expect(path.basename(backupDir)).toBe("host-services-20261008T153000Z");
    const backedUp = fs.readdirSync(backupDir);
    expect(backedUp.some((name) => /config|keypair/.test(name))).toBe(false);

    const accountPlist = path.join(
      launchAgentsDir,
      `${accounts[0]!.launchAgentLabel}.plist`,
    );
    const accountWake = path.join(
      installDir,
      "profiles",
      GMAIL,
      "wake-port.json",
    );
    fs.writeFileSync(accountPlist, "new");
    fs.writeFileSync(accountWake, "{}");
    fs.writeFileSync(path.join(installDir, "host-services.json"), "{}");
    fs.writeFileSync(
      path.join(launchAgentsDir, "com.agent-witch.plist"),
      "changed",
    );

    restoreAgentWitchHostServicesBackup(backupDir);

    expect(fs.existsSync(accountPlist)).toBe(false);
    expect(fs.existsSync(accountWake)).toBe(false);
    expect(fs.existsSync(path.join(installDir, "host-services.json"))).toBe(
      false,
    );
    expect(
      fs.readFileSync(
        path.join(launchAgentsDir, "com.agent-witch.plist"),
        "utf8",
      ),
    ).toBe("<plist>legacy</plist>\n");
    expect(snapshotSecrets(installDir)).toEqual(secrets);
  });
});

describe("verifyAgentWitchAccountHostsUp", () => {
  it("needs a live non-self host per account whose /health names the account", async () => {
    const accounts = [account(GMAIL, 1, "/x"), account(AGT, 2, "/x")];
    const rows = [
      { email: GMAIL, port: 65376, pid: 21, startedAt: "" },
      { email: AGT, port: 60704, pid: 22, startedAt: "" },
    ];
    const clock = { value: 0 };
    const deps = {
      readDiscovery: () => rows,
      isProcessAlive: () => true,
      sleep: async (ms: number) => {
        clock.value += ms;
      },
      now: () => clock.value,
    };
    await expect(
      verifyAgentWitchAccountHostsUp({
        installDir: "/x",
        accounts,
        selfPid: 99,
        deps: {
          ...deps,
          fetchHealth: async (port) => ({
            ok: true,
            profileEmail: port === 65376 ? GMAIL : AGT,
          }),
        },
      }),
    ).resolves.toEqual({ ok: true });

    const failed = await verifyAgentWitchAccountHostsUp({
      installDir: "/x",
      accounts,
      selfPid: 22,
      timeoutMs: 3_000,
      deps: {
        ...deps,
        fetchHealth: async () => ({ ok: true, profileEmail: GMAIL }),
      },
    });
    expect(failed.ok).toBe(false);
    expect(failed.ok ? "" : failed.reason).toContain(
      `${AGT}: no live account host`,
    );
    expect(clock.value).toBeLessThanOrEqual(3_000);
  });
});

describe("migrateAgentWitchMonolithToAccountServices (AWL-ISO-4)", () => {
  it("moves Thien's two-account Mac onto one LaunchAgent per account", async () => {
    const { homeDir, installDir, launchAgentsDir } = makeMac();
    const secrets = snapshotSecrets(installDir);
    const discoveryBefore = fs.readFileSync(
      path.join(installDir, "local-app-accounts.json"),
      "utf8",
    );
    const deps = fakeDeps();

    const result = await migrateAgentWitchMonolithToAccountServices({
      installDir,
      homeDir,
      platform: "darwin",
      bundleVersion: "296",
      selfPid: 11,
      deps,
    });

    expect(result.kind).toBe("migrated");
    const services = readAgentWitchHostServices(installDir);
    expect(services?.accounts.map((row) => row.email)).toEqual([AGT, GMAIL]);
    const labels = services?.accounts.map((row) => row.launchAgentLabel) ?? [];
    expect(new Set(labels).size).toBe(2);
    labels.forEach((label) =>
      expect(label).toMatch(/^com\.agent-witch\.[0-9a-f]{12}$/),
    );
    const wakePorts = services?.accounts.map((row) => row.wakePort) ?? [];
    expect(new Set([...wakePorts, ROOT_WAKE_PORT]).size).toBe(3);
    for (const row of services?.accounts ?? []) {
      const plist = fs.readFileSync(
        path.join(launchAgentsDir, `${row.launchAgentLabel}.plist`),
        "utf8",
      );
      expect(plist).toContain(
        `<key>AGENT_WITCH_HOST_ACCOUNT</key>\n    <string>${row.email}</string>`,
      );
    }
    expect(
      fs.readFileSync(
        path.join(launchAgentsDir, "com.agent-witch.plist"),
        "utf8",
      ),
    ).toBe("<plist>legacy</plist>\n");
    expect(
      fs.readFileSync(path.join(installDir, "local-app-accounts.json"), "utf8"),
    ).toBe(discoveryBefore);
    expect(snapshotSecrets(installDir)).toEqual(secrets);
    expect(deps.startAccountHosts).toHaveBeenCalledWith(services);
    expect(
      readAgentWitchHostServicesMigrationAttempts(installDir).map(
        (row) => row.result,
      ),
    ).toEqual(["migrated"]);

    // Idempotent: second start is a noop and takes no new backup.
    const backupsBefore = fs.readdirSync(path.join(installDir, "backups"));
    const again = await migrateAgentWitchMonolithToAccountServices({
      installDir,
      homeDir,
      platform: "darwin",
      bundleVersion: "296",
      deps: fakeDeps(),
    });
    expect(again.kind).toBe("noop");
    expect(fs.readdirSync(path.join(installDir, "backups"))).toEqual(
      backupsBefore,
    );
  });

  it("adds an account installed later without touching the existing rows", async () => {
    const { homeDir, installDir, addProfile } = makeMac();
    await migrateAgentWitchMonolithToAccountServices({
      installDir,
      homeDir,
      platform: "darwin",
      bundleVersion: "296",
      deps: fakeDeps(),
    });
    const before = readAgentWitchHostServices(installDir)?.accounts ?? [];
    addProfile(THIRD);
    const verify = vi.fn(async () => ({ ok: true as const }));

    const result = await migrateAgentWitchMonolithToAccountServices({
      installDir,
      homeDir,
      platform: "darwin",
      bundleVersion: "296",
      now: () => new Date("2026-10-09T00:00:00.000Z"),
      deps: fakeDeps({ verifyAccountHostsUp: verify }),
    });

    expect(result.kind).toBe("migrated");
    const after = readAgentWitchHostServices(installDir)?.accounts ?? [];
    expect(after.filter((row) => row.email !== THIRD)).toEqual(before);
    expect(after.map((row) => row.email)).toEqual([AGT, GMAIL, THIRD]);
    expect(new Set(after.map((row) => row.wakePort)).size).toBe(3);
  });

  it("rolls back when the account hosts do not come up and waits for the next bundle", async () => {
    const { homeDir, installDir, launchAgentsDir } = makeMac();
    const discoveryBefore = fs.readFileSync(
      path.join(installDir, "local-app-accounts.json"),
      "utf8",
    );
    const deps = fakeDeps({
      verifyAccountHostsUp: async () => ({
        ok: false as const,
        reason: "gmail: no live account host",
      }),
    });

    const result = await migrateAgentWitchMonolithToAccountServices({
      installDir,
      homeDir,
      platform: "darwin",
      bundleVersion: "296",
      deps,
    });

    expect(result.kind).toBe("rolled_back");
    expect(deps.stopAccountHosts).toHaveBeenCalledWith(
      expect.objectContaining({ mode: "per-account" }),
      [AGT, GMAIL],
    );
    expect(fs.existsSync(path.join(installDir, "host-services.json"))).toBe(
      false,
    );
    expect(fs.readdirSync(launchAgentsDir)).toEqual(["com.agent-witch.plist"]);
    expect(
      fs.readFileSync(
        path.join(launchAgentsDir, "com.agent-witch.plist"),
        "utf8",
      ),
    ).toBe("<plist>legacy</plist>\n");
    for (const email of [GMAIL, AGT]) {
      expect(
        fs.existsSync(
          path.join(installDir, "profiles", email, "wake-port.json"),
        ),
      ).toBe(false);
    }
    expect(
      fs.readFileSync(path.join(installDir, "local-app-accounts.json"), "utf8"),
    ).toBe(discoveryBefore);
    expect(
      readAgentWitchHostServicesMigrationAttempts(installDir).at(-1),
    ).toMatchObject({
      result: "rolled_back",
      bundleVersion: "296",
      reason: "gmail: no live account host",
    });

    const sameBundle = await migrateAgentWitchMonolithToAccountServices({
      installDir,
      homeDir,
      platform: "darwin",
      bundleVersion: "296",
      deps: fakeDeps(),
    });
    expect(sameBundle).toEqual({
      kind: "skipped",
      reason: "rolled_back_on_this_bundle",
    });

    const nextBundle = await migrateAgentWitchMonolithToAccountServices({
      installDir,
      homeDir,
      platform: "darwin",
      bundleVersion: "297",
      deps: fakeDeps(),
    });
    expect(nextBundle.kind).toBe("migrated");
  });

  it("leaves a single-account install alone", async () => {
    const { homeDir, installDir } = makeMac([GMAIL]);
    const deps = fakeDeps();
    await expect(
      migrateAgentWitchMonolithToAccountServices({
        installDir,
        homeDir,
        platform: "linux",
        bundleVersion: "296",
        deps,
      }),
    ).resolves.toEqual({ kind: "skipped", reason: "single_account" });
    expect(fs.existsSync(path.join(installDir, "host-services.json"))).toBe(
      false,
    );
    expect(fs.existsSync(path.join(installDir, "backups"))).toBe(false);
    expect(deps.startAccountHosts).not.toHaveBeenCalled();
  });

  it("is busy while another process holds the lock", async () => {
    const { homeDir, installDir } = makeMac();
    await expect(
      migrateAgentWitchMonolithToAccountServices({
        installDir,
        homeDir,
        platform: "darwin",
        bundleVersion: "296",
        deps: fakeDeps({ acquireLock: () => null }),
      }),
    ).resolves.toEqual({ kind: "busy" });
  });

  it("writes systemd user units on Linux under systemd, none without it", async () => {
    const underSystemd = makeMac();
    const unitDir = path.join(
      underSystemd.homeDir,
      ".config",
      "systemd",
      "user",
    );
    await migrateAgentWitchMonolithToAccountServices({
      installDir: underSystemd.installDir,
      homeDir: underSystemd.homeDir,
      platform: "linux",
      bundleVersion: "296",
      deps: fakeDeps({ isRunningUnderSystemd: () => true }),
    });
    const units = fs.readdirSync(unitDir).toSorted();
    expect(units).toEqual(
      [
        resolveAgentWitchAccountSystemdUnitName(AGT),
        resolveAgentWitchAccountSystemdUnitName(GMAIL),
      ].toSorted(),
    );
    expect(fs.readFileSync(path.join(unitDir, units[0]!), "utf8")).toContain(
      "Environment=AGENT_WITCH_HOST_ACCOUNT=",
    );

    const setsid = makeMac();
    const deps = fakeDeps({ isRunningUnderSystemd: () => false });
    const result = await migrateAgentWitchMonolithToAccountServices({
      installDir: setsid.installDir,
      homeDir: setsid.homeDir,
      platform: "linux",
      bundleVersion: "296",
      deps,
    });
    expect(result.kind).toBe("migrated");
    expect(fs.existsSync(path.join(setsid.homeDir, ".config", "systemd"))).toBe(
      false,
    );
    expect(deps.startAccountHosts).toHaveBeenCalledTimes(1);
  });

  it("keeps only the last 20 attempts", () => {
    const { installDir } = makeMac();
    for (const index of Array.from({ length: 25 }, (_, i) => i)) {
      appendAgentWitchHostServicesMigrationAttempt(installDir, {
        at: String(index),
        bundleVersion: "296",
        result: "migrated",
      });
    }
    const attempts = readAgentWitchHostServicesMigrationAttempts(installDir);
    expect(attempts).toHaveLength(20);
    expect(attempts[0]?.at).toBe("5");
  });
});

import { clearStaleAgentWitchHostServicesMigrationLock } from "./hostServicesMigrationLock";

describe("clearStaleAgentWitchHostServicesMigrationLock", () => {
  it("removes stale locks but leaves fresh ones alone", () => {
    const tmpDir = path.join(os.tmpdir(), `test-lock-${Date.now()}`);
    fs.mkdirSync(tmpDir, { recursive: true });
    try {
      const lockPath = path.join(tmpDir, "host-services-migration.lock");
      fs.writeFileSync(lockPath, JSON.stringify({ pid: 1234, at: 1000 }));

      // Fresh, alive -> do not clear
      expect(
        clearStaleAgentWitchHostServicesMigrationLock(tmpDir, {
          now: () => 1000,
          isProcessAlive: () => true,
        }),
      ).toBe(false);
      expect(fs.existsSync(lockPath)).toBe(true);

      // Alive but too old -> clear
      expect(
        clearStaleAgentWitchHostServicesMigrationLock(tmpDir, {
          now: () => 1000 + 10 * 60_000 + 1,
          isProcessAlive: () => true,
        }),
      ).toBe(true);
      expect(fs.existsSync(lockPath)).toBe(false);

      fs.writeFileSync(lockPath, JSON.stringify({ pid: 1234, at: 1000 }));

      // Fresh but dead -> clear
      expect(
        clearStaleAgentWitchHostServicesMigrationLock(tmpDir, {
          now: () => 1000,
          isProcessAlive: () => false,
        }),
      ).toBe(true);
      expect(fs.existsSync(lockPath)).toBe(false);
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
