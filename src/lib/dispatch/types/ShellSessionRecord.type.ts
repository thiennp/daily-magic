export default interface ShellSessionRecord {
  readonly shellSessionId: string;
  readonly ownerUserId: string;
  readonly deviceId: string | null;
  readonly activeRunId: string | null;
  readonly mode: "interactive" | "agent";
  readonly createdAt: number;
}
