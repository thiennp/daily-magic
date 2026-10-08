import { describe, it, expect } from "vitest";
import WebSocket from "ws";
import {
  bindAgentWitchLiveRunSocket,
  resolveAgentWitchLiveRunSocket,
} from "./agentWitchLiveRunSocket";

describe("agentWitchLiveRunSocket", () => {
  it("returns open socket as-is", () => {
    const socket = { readyState: WebSocket.OPEN } as WebSocket;
    expect(resolveAgentWitchLiveRunSocket(socket)).toBe(socket);
  });

  it("resolves closed socket to newer bound socket of the same profile", () => {
    const socket1 = { readyState: WebSocket.CLOSED } as WebSocket;
    const socket2 = { readyState: WebSocket.OPEN } as WebSocket;

    bindAgentWitchLiveRunSocket("profile1", socket1);
    bindAgentWitchLiveRunSocket("profile1", socket2);

    expect(resolveAgentWitchLiveRunSocket(socket1)).toBe(socket2);
  });

  it("never resolves to another profile's socket", () => {
    const socket1 = { readyState: WebSocket.CLOSED } as WebSocket;
    const socket2 = { readyState: WebSocket.OPEN } as WebSocket;

    bindAgentWitchLiveRunSocket("profile1", socket1);
    bindAgentWitchLiveRunSocket("profile2", socket2);

    expect(resolveAgentWitchLiveRunSocket(socket1)).toBe(socket1);
  });

  it("falls back to original when nothing open", () => {
    const socket1 = { readyState: WebSocket.CLOSED } as WebSocket;
    const socket2 = { readyState: WebSocket.CLOSED } as WebSocket;

    bindAgentWitchLiveRunSocket("profile1", socket1);
    bindAgentWitchLiveRunSocket("profile1", socket2);

    expect(resolveAgentWitchLiveRunSocket(socket1)).toBe(socket1);
  });
});
