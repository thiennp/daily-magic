import type WebSocket from "ws";

/**
 * Runs capture the socket that was live when they started. After the host
 * reconnects, that socket is closed and every heartbeat / input request /
 * result sent on it was silently dropped (QA 5/8, bundle 276). Each profile's
 * current socket is bound here on connect; run senders resolve through it.
 * Profiles never share a socket (monolith hosts bridge several profiles).
 */
const OPEN = 1;
const socketByProfile = new Map<string, WebSocket>();
const profileBySocket = new WeakMap<object, string>();

export const bindAgentWitchLiveRunSocket = (
  profileKey: string,
  socket: WebSocket,
): void => {
  socketByProfile.set(profileKey, socket);
  profileBySocket.set(socket, profileKey);
};

export const resolveAgentWitchLiveRunSocket = (
  socket: WebSocket,
): WebSocket => {
  if (socket.readyState === OPEN) {
    return socket;
  }
  const profileKey = profileBySocket.get(socket);
  const bound =
    profileKey === undefined ? undefined : socketByProfile.get(profileKey);
  return bound !== undefined && bound.readyState === OPEN ? bound : socket;
};
