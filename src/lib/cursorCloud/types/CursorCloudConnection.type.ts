export default interface CursorCloudConnection {
  readonly userId: string;
  readonly apiKeyName: string | null;
  readonly cursorUserEmail: string | null;
  readonly connectedAt: string;
  readonly updatedAt: string;
}

export interface CursorCloudConnectionSummary {
  readonly connected: boolean;
  readonly apiKeyName: string | null;
  readonly cursorUserEmail: string | null;
  readonly connectedAt: string | null;
}
