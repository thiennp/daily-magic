export const awcProjectAccessMemberAnchorId = (userId: string): string =>
  `access-member-${encodeURIComponent(userId)}`;
