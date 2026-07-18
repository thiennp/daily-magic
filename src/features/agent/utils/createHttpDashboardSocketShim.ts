/**
 * Duck-typed WebSocket stand-in: sends go to HTTP, receives come from SSE separately.
 */
export const createHttpDashboardSocketShim = (): WebSocket => {
  const shim = {
    binaryType: "blob" as BinaryType,
    bufferedAmount: 0,
    extensions: "",
    protocol: "",
    readyState: WebSocket.OPEN,
    url: "/api/agent-witch/dashboard/messages",
    onclose: null,
    onerror: null,
    onmessage: null,
    onopen: null,
    CLOSING: WebSocket.CLOSING,
    CLOSED: WebSocket.CLOSED,
    CONNECTING: WebSocket.CONNECTING,
    OPEN: WebSocket.OPEN,
    close: (): void => undefined,
    send: (data: string | ArrayBufferLike | Blob | ArrayBufferView): void => {
      const body =
        typeof data === "string"
          ? data
          : data instanceof Blob
            ? "[blob]"
            : String(data);
      if (body === "[blob]") {
        return;
      }
      void fetch("/api/agent-witch/dashboard/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }).catch(() => undefined);
    },
    addEventListener: (): void => undefined,
    removeEventListener: (): void => undefined,
    dispatchEvent: (): boolean => false,
  };

  return shim as unknown as WebSocket;
};
