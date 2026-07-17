"use client";

import { useEffect, useRef } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

interface AgentMacShellXtermProps {
  readonly canWrite: boolean;
  readonly onData?: (data: string) => void;
  readonly onResize?: (cols: number, rows: number) => void;
  readonly writeChunk?: string | null;
  readonly chunkSeq?: number;
  readonly clearToken?: number;
}

export default function AgentMacShellXterm({
  canWrite,
  onData,
  onResize,
  writeChunk = null,
  chunkSeq = 0,
  clearToken = 0,
}: AgentMacShellXtermProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const onDataRef = useRef(onData);
  const onResizeRef = useRef(onResize);

  useEffect(() => {
    onDataRef.current = onData;
  }, [onData]);

  useEffect(() => {
    onResizeRef.current = onResize;
  }, [onResize]);

  useEffect(() => {
    const host = hostRef.current;
    if (host === null) {
      return;
    }

    const terminal = new Terminal({
      convertEol: true,
      cursorBlink: canWrite,
      disableStdin: !canWrite,
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      fontSize: 13,
      theme: {
        background: "#0b1020",
        foreground: "#e5e7eb",
      },
    });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(host);
    fitAddon.fit();
    terminalRef.current = terminal;
    fitRef.current = fitAddon;

    const dataDisposable = terminal.onData((data) => {
      if (canWrite) {
        onDataRef.current?.(data);
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit();
      onResizeRef.current?.(terminal.cols, terminal.rows);
    });
    resizeObserver.observe(host);

    return () => {
      dataDisposable.dispose();
      resizeObserver.disconnect();
      terminal.dispose();
      terminalRef.current = null;
      fitRef.current = null;
    };
  }, [canWrite]);

  useEffect(() => {
    if (writeChunk !== null && writeChunk.length > 0) {
      terminalRef.current?.write(writeChunk);
    }
  }, [writeChunk, chunkSeq]);

  useEffect(() => {
    if (clearToken > 0) {
      terminalRef.current?.clear();
    }
  }, [clearToken]);

  return (
    <div
      ref={hostRef}
      className="h-72 w-full overflow-hidden rounded-lg border border-gray-800 bg-[#0b1020] p-2"
      data-testid="agent-mac-shell-xterm"
    />
  );
}
