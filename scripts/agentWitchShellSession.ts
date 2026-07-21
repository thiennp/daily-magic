import { randomUUID } from "node:crypto";

import type { IPty } from "node-pty";

import { isProcessAlive } from "./isProcessAlive";

type SendMessage = (message: Record<string, unknown>) => void;

export interface AgentWitchPtySession {
  readonly shellSessionId: string;
  readonly pty: IPty;
  readonly mode: "interactive" | "agent";
  readonly runId: string | null;
}

const sessions = new Map<string, AgentWitchPtySession>();

let ptyModule: typeof import("node-pty") | null | undefined;

const loadPty = async (): Promise<typeof import("node-pty") | null> => {
  if (ptyModule !== undefined) {
    return ptyModule;
  }
  try {
    ptyModule = await import("node-pty");
    return ptyModule;
  } catch {
    ptyModule = null;
    return null;
  }
};

export const isNodePtyAvailable = async (): Promise<boolean> =>
  (await loadPty()) !== null;

const emitShellData = (
  send: SendMessage,
  shellSessionId: string,
  chunk: string,
  requestId: string | undefined,
): void => {
  if (chunk.length === 0) {
    return;
  }
  send({
    type: "shell.data",
    payload: { shellSessionId, chunk },
    requestId,
  });
};

export const closeShellPtySession = (
  shellSessionId: string,
  send: SendMessage,
  requestId?: string,
): void => {
  const session = sessions.get(shellSessionId);
  if (session === undefined) {
    return;
  }
  sessions.delete(shellSessionId);
  try {
    session.pty.kill();
  } catch {
    // already exited
  }
  send({
    type: "shell.session.closed",
    payload: { shellSessionId },
    requestId,
  });
};

export const writeShellPtyInput = (
  shellSessionId: string,
  data: string,
): boolean => {
  const session = sessions.get(shellSessionId);
  if (session === undefined) {
    return false;
  }
  session.pty.write(data);
  return true;
};

export const resizeShellPty = (
  shellSessionId: string,
  cols: number,
  rows: number,
): boolean => {
  const session = sessions.get(shellSessionId);
  if (session === undefined) {
    return false;
  }
  session.pty.resize(Math.max(cols, 20), Math.max(rows, 5));
  return true;
};

export const getShellPtySession = (
  shellSessionId: string,
): AgentWitchPtySession | undefined => sessions.get(shellSessionId);

/** True when an agent-mode PTY for this runId is still registered and its pid lives. */
export const isAgentPtyRunAlive = (runId: string): boolean => {
  for (const session of sessions.values()) {
    if (session.mode !== "agent" || session.runId !== runId) {
      continue;
    }
    return isProcessAlive(session.pty.pid);
  }
  return false;
};

export const openInteractiveShellPty = async (input: {
  readonly shellSessionId: string;
  readonly cwd: string;
  readonly cols: number;
  readonly rows: number;
  readonly send: SendMessage;
  readonly requestId?: string;
}): Promise<boolean> => {
  const pty = await loadPty();
  if (pty === null) {
    input.send({
      type: "shell.data",
      payload: {
        shellSessionId: input.shellSessionId,
        chunk:
          "node-pty is not available on this Mac. Install Agent Witch deps again.\r\n",
      },
      requestId: input.requestId,
    });
    return false;
  }

  const existing = sessions.get(input.shellSessionId);
  if (existing !== undefined) {
    closeShellPtySession(input.shellSessionId, input.send, input.requestId);
  }

  const shellPath = process.env.SHELL?.trim() || "/bin/zsh";
  let child: IPty;
  try {
    child = pty.spawn(shellPath, ["-l"], {
      name: "xterm-256color",
      cols: input.cols,
      rows: input.rows,
      cwd: input.cwd,
      env: process.env as Record<string, string>,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    input.send({
      type: "shell.data",
      payload: {
        shellSessionId: input.shellSessionId,
        chunk: `Could not open a live Mac PTY (${message}).\r\n`,
      },
      requestId: input.requestId,
    });
    return false;
  }

  sessions.set(input.shellSessionId, {
    shellSessionId: input.shellSessionId,
    pty: child,
    mode: "interactive",
    runId: null,
  });

  input.send({
    type: "shell.session.opened",
    payload: { shellSessionId: input.shellSessionId, mode: "interactive" },
    requestId: input.requestId,
  });

  child.onData((chunk) => {
    emitShellData(input.send, input.shellSessionId, chunk, input.requestId);
  });

  child.onExit(() => {
    if (sessions.get(input.shellSessionId)?.pty === child) {
      sessions.delete(input.shellSessionId);
      input.send({
        type: "shell.session.closed",
        payload: { shellSessionId: input.shellSessionId },
        requestId: input.requestId,
      });
    }
  });

  return true;
};

export const spawnAgentCommandInPty = async (input: {
  readonly shellSessionId?: string;
  readonly runId: string;
  readonly command: string;
  readonly args: readonly string[];
  readonly cwd: string;
  readonly send: SendMessage;
  readonly requestId?: string;
  readonly onData: (chunk: string) => void;
  readonly onExit: (exitCode: number) => void;
}): Promise<{ readonly shellSessionId: string; readonly usedPty: boolean }> => {
  const shellSessionId = input.shellSessionId ?? randomUUID();
  const pty = await loadPty();
  if (pty === null) {
    return { shellSessionId, usedPty: false };
  }

  let child: IPty;
  try {
    child = pty.spawn(input.command, [...input.args], {
      name: "xterm-256color",
      cols: 120,
      rows: 32,
      cwd: input.cwd,
      env: process.env as Record<string, string>,
    });
  } catch (error) {
    // node-pty can throw (e.g. posix_spawnp failed). Fall back to pipe spawn.
    console.error(
      "[agent-witch] PTY spawn failed; falling back to pipe:",
      error instanceof Error ? error.message : error,
    );
    return { shellSessionId, usedPty: false };
  }

  sessions.set(shellSessionId, {
    shellSessionId,
    pty: child,
    mode: "agent",
    runId: input.runId,
  });

  input.send({
    type: "shell.session.opened",
    payload: {
      shellSessionId,
      mode: "agent",
      runId: input.runId,
    },
    requestId: input.requestId,
  });

  child.onData((chunk) => {
    emitShellData(input.send, shellSessionId, chunk, input.requestId);
    input.onData(chunk);
  });

  child.onExit(({ exitCode }) => {
    if (sessions.get(shellSessionId)?.pty === child) {
      sessions.delete(shellSessionId);
      input.send({
        type: "shell.session.closed",
        payload: { shellSessionId },
        requestId: input.requestId,
      });
    }
    input.onExit(exitCode ?? -1);
  });

  return { shellSessionId, usedPty: true };
};

export const clearShellPtySessionsForTests = (): void => {
  for (const session of sessions.values()) {
    try {
      session.pty.kill();
    } catch {
      // ignore
    }
  }
  sessions.clear();
  ptyModule = undefined;
};
