import { AgentWitchHub } from "../src/lib/agentWitch/agentWitchHub";
import { AgentWitchPairingStore } from "../src/lib/agentWitch/agentWitchPairingStore";
import {
  createCollector,
  registerPairedClients,
} from "../src/lib/agentWitch/agentWitchHub.testHelpers";
import { AGENT_WITCH_MESSAGE_TYPES } from "../src/lib/agentWitch/types/AgentWitchMessageType.constant";
import {
  beginAgentLiveTerminalSession,
  reduceAgentLiveTerminalMessage,
} from "../src/features/agent/utils/reduceAgentLiveTerminalMessage";
import { clearWriterSessionsForTests } from "../src/lib/dispatch/writerSessionRegistry";
import { resolveWriterCliCommands } from "./buildWriterCliInvocation";
import { runWriterSessionStart } from "./agentWitchWriterSession";
import { formatWriterSessionStartDisplayCommand } from "../src/lib/agentWitch/formatWriterCliDisplayCommand";
import os from "node:os";
import path from "node:path";

const WRITER_AGENT = process.env.WRITER_AGENT ?? "claude-cli";

const assertMacCliStreamsChunks = async (): Promise<void> => {
  const chunks: string[] = [];
  const installDir = path.join(os.homedir(), ".agent-witch");
  const result = await runWriterSessionStart({
    installDir,
    workspace: process.cwd(),
    writerAgent: WRITER_AGENT,
    commands: resolveWriterCliCommands({}),
    onChunk: (chunk) => {
      chunks.push(chunk);
      process.stdout.write(`[mac chunk] ${chunk}`);
    },
  });

  console.log("\n[mac result]", {
    exitCode: result.exitCode,
    output: result.output,
    chunkCount: chunks.length,
  });

  if (result.exitCode !== 0) {
    throw new Error(`Writer session start failed: ${result.output}`);
  }

  if (chunks.join("").trim().length === 0) {
    throw new Error("Mac writer session start produced no streamed chunks.");
  }
};

const assertHubRelaysChunksToTerminalReducer = async (): Promise<void> => {
  clearWriterSessionsForTests();
  const pairingStore = new AgentWitchPairingStore();
  const hub = new AgentWitchHub(pairingStore);
  const agent = createCollector();
  const dashboard = createCollector();
  await registerPairedClients(hub, pairingStore, agent.send, dashboard.send);

  const start = await hub.handleMessageAsync("dash-1", {
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_START,
    payload: { writerAgent: WRITER_AGENT },
    requestId: "local-writer-session-start",
  });

  const writerSessionId = start?.payload?.writerSessionId;
  if (typeof writerSessionId !== "string" || writerSessionId.length === 0) {
    throw new Error(`Writer session start failed: ${JSON.stringify(start)}`);
  }

  await hub.handleMessageAsync("agent-1", {
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_CHUNK,
    payload: {
      writerAgent: WRITER_AGENT,
      writerSessionId,
      chunk: "2.1.161 (Claude Code)\n",
    },
    requestId: "local-writer-session-chunk",
  });

  await hub.handleMessageAsync("agent-1", {
    type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_WRITER_SESSION_READY,
    payload: {
      writerAgent: WRITER_AGENT,
      writerSessionId,
      output:
        "Claude is ready on your Mac.\nSend a task from the box below when you are ready.\n",
      exitCode: 0,
    },
    requestId: "local-writer-session-ready",
  });

  let terminalState = beginAgentLiveTerminalSession(
    formatWriterSessionStartDisplayCommand(WRITER_AGENT as "claude-cli"),
    WRITER_AGENT as "claude-cli",
    null,
  );

  for (const message of dashboard.messages) {
    terminalState = reduceAgentLiveTerminalMessage(terminalState, message);
  }

  console.log("[hub terminal]", {
    status: terminalState.status,
    output: terminalState.output,
  });

  if (terminalState.status !== "finished") {
    throw new Error(
      `Expected finished terminal state, got ${terminalState.status}`,
    );
  }

  if (!terminalState.output.includes("Claude is ready on your Mac.")) {
    throw new Error("Terminal reducer did not include ready message output.");
  }
};

const run = async (): Promise<void> => {
  console.log(`Testing writer session stream for ${WRITER_AGENT}…`);
  await assertMacCliStreamsChunks();
  await assertHubRelaysChunksToTerminalReducer();
  console.log("Writer session stream local test passed.");
};

void run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Writer session stream local test failed: ${message}`);
  process.exitCode = 1;
});
