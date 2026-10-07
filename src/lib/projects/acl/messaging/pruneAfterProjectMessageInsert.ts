import { pruneProjectChatMessages } from "@/lib/projects/acl/messaging/pruneProjectChatMessages";

/** Post-insert keep-300 hook (one chat). */
export const pruneAfterProjectMessageInsert = async (input: {
  readonly projectId: string;
  readonly chatKey: string;
}): Promise<void> => {
  await pruneProjectChatMessages(input);
};
