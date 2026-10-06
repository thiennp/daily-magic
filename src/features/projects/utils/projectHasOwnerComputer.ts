import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/**
 * Owner computer = the project's bound owner device (`deviceId`). With none,
 * the browser copy of chats is the long-term copy: never trimmed, and the
 * messenger shows the (i) "adding a computer is safer" hint.
 */
export const projectHasOwnerComputer = (
  project: Pick<UserProjectRecord, "deviceId">,
): boolean =>
  typeof project.deviceId === "string" && project.deviceId.trim() !== "";
