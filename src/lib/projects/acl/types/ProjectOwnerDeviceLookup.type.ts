/**
 * Port: true iff `deviceId` is the project's own linked computer
 * (user_projects.device_id) and that device is not revoked. Covers owners of
 * projects linked before mig 068 that have no owner computer seat row.
 */
export type ProjectOwnerDeviceLookup = (input: {
  readonly projectId: string;
  readonly deviceId: string;
}) => Promise<boolean>;
