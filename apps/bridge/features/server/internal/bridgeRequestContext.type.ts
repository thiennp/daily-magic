import type http from "node:http";

export interface BridgeCorsContext {
  readonly allowed: boolean;
  readonly headers: Record<string, string>;
}

export interface BridgeRequestContext {
  readonly request: http.IncomingMessage;
  readonly response: http.ServerResponse;
  readonly wakePort: number;
  readonly cors: BridgeCorsContext;
  readonly pathname: string;
  readonly readJsonBody: () => Promise<unknown>;
}
