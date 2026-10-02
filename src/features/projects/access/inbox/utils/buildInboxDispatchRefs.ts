import type { AwcProjectInboxRefs } from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

export const buildInboxDispatchRefs = (input: {
  readonly prUrl: string;
  readonly commitSha: string;
  readonly localPath: string;
  readonly allowClaimId: string;
}): AwcProjectInboxRefs | undefined => {
  const refs: Record<string, string> = {};
  if (input.prUrl.trim()) refs.prUrl = input.prUrl.trim();
  if (input.commitSha.trim()) refs.commitSha = input.commitSha.trim();
  if (input.localPath.trim()) refs.localPath = input.localPath.trim();
  if (input.allowClaimId.trim()) refs.allowClaimId = input.allowClaimId.trim();
  return Object.keys(refs).length > 0 ? refs : undefined;
};
