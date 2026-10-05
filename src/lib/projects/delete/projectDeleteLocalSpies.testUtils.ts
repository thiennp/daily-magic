import { vi } from "vitest";

/** Shared spies standing in for fs / child_process / fetch so tests can assert they were never used. */
export const localSpies = {
  fsCall: vi.fn(),
  childProcessCall: vi.fn(),
  fetchCall: vi.fn(),
};

const proxyTo = (spy: unknown): object => new Proxy({}, { get: () => spy });

export const fsModule = () => ({
  default: proxyTo(localSpies.fsCall),
  promises: proxyTo(localSpies.fsCall),
  readFileSync: localSpies.fsCall,
  writeFileSync: localSpies.fsCall,
  rmSync: localSpies.fsCall,
  unlinkSync: localSpies.fsCall,
  readFile: localSpies.fsCall,
  rm: localSpies.fsCall,
  unlink: localSpies.fsCall,
});

export const childProcessModule = () => ({
  default: proxyTo(localSpies.childProcessCall),
  exec: localSpies.childProcessCall,
  execFile: localSpies.childProcessCall,
  spawn: localSpies.childProcessCall,
  execSync: localSpies.childProcessCall,
});

export const resetLocalSpies = (): void => {
  localSpies.fsCall.mockReset();
  localSpies.childProcessCall.mockReset();
  localSpies.fetchCall.mockReset();
  vi.stubGlobal("fetch", localSpies.fetchCall);
};

export const expectNoLocalCalls = (
  expectFn: typeof import("vitest").expect,
): void => {
  expectFn(localSpies.fsCall).not.toHaveBeenCalled();
  expectFn(localSpies.childProcessCall).not.toHaveBeenCalled();
  expectFn(localSpies.fetchCall).not.toHaveBeenCalled();
};
