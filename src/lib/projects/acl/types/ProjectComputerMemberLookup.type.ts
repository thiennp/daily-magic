/**
 * Port: true iff `deviceId` is an ACTIVE `member_kind='computer'` seat on
 * `projectId` (covers the owner's computer-as-agent and member computers).
 */
export type ProjectComputerMemberLookup = (input: {
  readonly projectId: string;
  readonly deviceId: string;
}) => Promise<boolean>;
